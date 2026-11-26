import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface TtsRequestBody {
  text: string;
  language?: string;
}

const SARVAM_LANG_MAP: Record<string, string> = {
  en: 'en-IN',
  te: 'te-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  kn: 'kn-IN',
};

const DUMMY_PREFIXES = ['dummy', 'replace', 'your-', 'xxxx', 'test-key', 'placeholder'];
function isDummyKey(key?: string): boolean {
  if (!key) return true;
  const lower = key.toLowerCase().trim();
  if (lower.length < 20) return true;
  return DUMMY_PREFIXES.some((p) => lower.startsWith(p) || lower.includes('replace-with'));
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TtsRequestBody;
    const text = (body.text || '').toString().trim();
    const language = (body.language || 'en').toString();

    if (!text) {
      return NextResponse.json({ error: 'Text is required.' }, { status: 400 });
    }

    const apiKey = process.env.SARVAM_API_KEY;

    if (isDummyKey(apiKey)) {
      return NextResponse.json(
        {
          error:
            'Spoken responses need a real Sarvam AI key. Add SARVAM_API_KEY to .env.local. The browser can still show the answer as text.',
          demo: true,
        },
        { status: 501 }
      );
    }

    const targetLang = SARVAM_LANG_MAP[language] || 'en-IN';

    const res = await fetch('https://api.sarvam.ai/text-to-speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': apiKey as string,
      },
      body: JSON.stringify({
        inputs: [text],
        target_language_code: targetLang,
        speaker: 'meera',
        pitch: 0,
        pace: 1.0,
        loudness: 1.0,
        speech_sample_rate: 22050,
        enable_preprocessing: true,
        model: 'bulbul:v1',
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { error: `TTS service error (${res.status}).`, detail: errText.slice(0, 200) },
        { status: 502 }
      );
    }

    const data = await res.json();
    const audioBase64 = data?.audios?.[0];

    if (!audioBase64) {
      return NextResponse.json({ error: 'No audio returned.' }, { status: 502 });
    }

    const audioBuffer = Buffer.from(audioBase64, 'base64');
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': audioBuffer.length.toString(),
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
