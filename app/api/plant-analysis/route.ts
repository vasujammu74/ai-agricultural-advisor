import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

interface AnalyzeBody {
  image: string; // data URL
  language?: string;
}
interface DiseaseInfo {
  name: string;
  common_names?: string[];
  probability: number;
  details?: {
    description?: string;
    symptoms?: string;
    treatment?: {
      biological?: string[];
      chemical?: string[];
      prevention?: string[];
    };
  };
  is_healthy?: boolean;
  similar_images?: { url: string }[];
}

  is_healthy?: boolean;
  similar_images?: { url: string }[];
}

interface PlantInfo {
  name: string;
  common_names?: string[];
  probability: number;
  url?: string;
  description?: { value: string }[];
  taxonomy?: { [k: string]: string };
  image?: { url: string };
}

interface KindwiseResponse {
  result?: { 
    crop?: { suggestions?: PlantInfo[]};
    disease?: { suggestions?: DiseaseInfo[] };
    classification?: {
      suggestions?: DiseaseInfo[];
    };
    is_plant?: { probability: number; binary?: boolean; suggestions?: unknown[] };
    plant?: {
      name?: string;
      suggestions?: PlantInfo[];
      // legacy crop doctor format
      disease?: { suggestions?: DiseaseInfo[] };
    };
    crop_doc?: {
      plant?: { suggestions?: PlantInfo[] };
      disease?: { suggestions?: DiseaseInfo[] };
    };
  };
}

function fmtList(val: unknown): string | undefined {
  if (!val) return undefined;
  if (typeof val === 'string') return val;
  if (Array.isArray(val)) {
    const items = val
      .map((x) => (typeof x === 'string' ? x : (x as { name?: string })?.name || null))
      .filter(Boolean);
    return items.length ? items.map((i) => `• ${i}`).join('\n') : undefined;
  }
  return undefined;
}

const DUMMY_PREFIXES = ['dummy', 'replace', 'your-', 'xxxx', 'test-key', 'placeholder'];
function isDummyKey(key?: string): boolean {
  if (!key) return true;
  const lower = key.toLowerCase().trim();
  if (lower.length < 20) return true;
  return DUMMY_PREFIXES.some((p) => lower.startsWith(p) || lower.includes('replace-with'));
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AnalyzeBody;
    const image = (body.image || '').toString();
    const language = (body.language || 'en').toString();

    if (!image || !image.startsWith('data:image/')) {
      return NextResponse.json({ error: 'A valid image (data URL) is required.' }, { status: 400 });
    }

    const base64 = image.split(',')[1];
    if (!base64) {
      return NextResponse.json({ error: 'Invalid image data.' }, { status: 400 });
    }

    const apiKey: string = process.env.KINDWISE_API_KEY as string;

    if (isDummyKey(apiKey)) {
      return NextResponse.json({
        demo: true,
        plant: {
          name: 'Tomato',
          commonNames: ['Tomato', 'Solanum lycopersicum'],
          probability: 0.0,
          description:
            'Demonstration data — no Kindwise API key connected. Add KINDWISE_API_KEY to enable live plant identification.',
        },
        diseases: [],
        isPlant: true,
        message:
          'This is demonstration data. Connect a KINDWISE_API_KEY to perform real plant identification and disease detection.',
      });
    }

    // Try the Crop Doctor endpoint (handles plant + disease together).
    const endpoints = [
      'https://crop.kindwise.com/api/v1/identification?language=en&details=taxonomy,common_names,description,url,image,treatment,symptoms,severity,spreading',
      'https://api.kindwise.com/v1/identification?language=en&details=taxonomy,common_names,description,url,image,treatment,symptoms,severity,spreading',
    ];

    let lastError = '';
    let result: KindwiseResponse | null = null;

    for (const endpoint of endpoints) {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': apiKey,
        },
        body: JSON.stringify({ images: [base64] }),
      });

      if (res.ok) {
        result = (await res.json()) as KindwiseResponse;
        break;
      }

      lastError = `${res.status}: ${(await res.text()).slice(0, 160)}`;
      // If it's a 401/403 (auth) or 400 (bad request), don't bother trying the next endpoint.
      if (res.status === 401 || res.status === 403 || res.status === 400) break;
    }

    if (!result) {
      return NextResponse.json(
        { error: `Plant analysis service error. ${lastError}`.trim() },
        { status: 502 }
      );
    }

    const r = result.result;

    // Disease suggestions (crop doctor uses result.crop_doc.disease OR result.classification.suggestions)
    const diseaseSuggestions =
      r?.disease?.suggestions ||
      r?.crop_doc?.disease?.suggestions ||
      r?.plant?.disease?.suggestions ||
      r?.classification?.suggestions ||
      [];

    const plantSuggestions =
       r?.crop?.suggestions ||
      r?.crop_doc?.plant?.suggestions || 
      r?.plant?.suggestions || [];

    const topDisease: DiseaseInfo | undefined = diseaseSuggestions[0];
    const topPlant: PlantInfo | undefined =
      plantSuggestions[0] ||
      (r?.plant?.name
        ? { name: r.plant.name, probability: 1, common_names: [r.plant.name] }
        : undefined);

    const isPlant = r?.is_plant?.binary ?? (r?.is_plant?.probability ?? 1) > 0.5;

    if (!isPlant) {
      return NextResponse.json({
        demo: false,
        plant: null,
        diseases: [],
        isPlant: false,
        message:
          'This image does not appear to contain a plant. Please take a clear, well-lit photo of a plant or leaf and try again.',
      });
    }

    const diseases = diseaseSuggestions.slice(0, 3).map((d) => ({
      name: d.name,
      commonNames: d.common_names || [],
      probability: Math.round((d.probability ?? 0) * 100),
      isHealthy: Boolean(d.is_healthy),
      description: d.details?.description,
      symptoms: d.details?.symptoms,
      treatment: fmtList([
  ...(d.details?.treatment?.biological || []),
  ...(d.details?.treatment?.chemical || []),
]),

      prevention: fmtList(d.details?.treatment?.prevention),
      similarImage: d.similar_images?.[0]?.url,
    }));

    return NextResponse.json({
      demo: false,
      plant: topPlant
        ? {
            name: topPlant.name,
            commonNames: topPlant.common_names || [],
            probability: Math.round((topPlant.probability ?? 0) * 100),
            description: Array.isArray(topPlant.description)
              ? topPlant.description.map((d) => d.value).join(' ')
              : undefined,
            image: topPlant.image?.url || topPlant.url,
          }
        : null,
      diseases,
      isPlant: true,
      language,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
