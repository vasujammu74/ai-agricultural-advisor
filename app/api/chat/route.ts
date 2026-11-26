import { NextRequest, NextResponse } from 'next/server';
import { generateDemoAdvice } from '@/lib/demo-advice';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DUMMY_PREFIXES = ['dummy', 'replace', 'your-', 'xxxx', 'test-key', 'placeholder'];
function isDummyKey(key?: string): boolean {
  if (!key) return true;
  const lower = key.toLowerCase().trim();
  if (lower.length < 20) return true;
  return DUMMY_PREFIXES.some((p) => lower.startsWith(p) || lower.includes('replace-with'));
}

interface ChatRequestBody {
  message: string;
  language?: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
}

const SYSTEM_PROMPT = `You are AI Agricultural Advisor, a helpful, practical assistant for farmers in India.
Give clear, actionable, region-appropriate agricultural advice on crops, pests, soil, weather, fertilizer, irrigation, and livestock.
Keep answers concise (3-6 short paragraphs or bullet points) and easy to understand for a farmer with limited formal education.
If the question is not about agriculture, gently steer back to farming. If you are unsure, say so and recommend consulting a local agriculture officer.
Always respond in the same language/script the user wrote in. If the user writes in Telugu, reply in Telugu; Hindi in Hindi; etc.`;



export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ChatRequestBody;
    const message = (body.message || '').toString().trim();
    const language = (body.language || 'en').toString();
    const history = Array.isArray(body.history) ? body.history : [];

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    const sarvamKey = process.env.SARVAM_API_KEY;

    const openaiReady = !isDummyKey(openaiKey);
    const sarvamReady = !isDummyKey(sarvamKey);

    if (!openaiReady && !sarvamReady) {
      return NextResponse.json({
        answer: generateDemoAdvice(message, language),
        demo: true,
      });
    }

    const provider = openaiReady ? 'openai' : 'sarvam';
    const apiKey: string = (openaiReady ? openaiKey : sarvamKey) as string;

    if (provider === 'openai') {
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history.slice(-8).map((h) => ({ role: h.role, content: h.content })),
        { role: 'user', content: message },
      ];

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          messages,
          temperature: 0.5,
          max_tokens: 600,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        return NextResponse.json(
          { error: `AI service error (${res.status}).`, detail: errText.slice(0, 200) },
          { status: 502 }
        );
      }

      const data = await res.json();
      const answer = data?.choices?.[0]?.message?.content?.trim();
      if (!answer) {
        return NextResponse.json({ error: 'No answer returned.' }, { status: 502 });
      }
      return NextResponse.json({ answer, demo: false });
    }

    // Sarvam AI chat-style fallback (Chat Completions compatible)
    const res = await fetch('https://api.sarvam.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': apiKey,
      },
      body: JSON.stringify({
        model: 'sarvam-2b',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history.slice(-8).map((h) => ({ role: h.role, content: h.content })),
          { role: 'user', content: message },
        ],
        temperature: 0.5,
        max_tokens: 600,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { error: `AI service error (${res.status}).`, detail: errText.slice(0, 200) },
        { status: 502 }
      );
    }

    const data = await res.json();
    const answer = data?.choices?.[0]?.message?.content?.trim();
    if (!answer) {
      return NextResponse.json({ error: 'No answer returned.' }, { status: 502 });
    }
    return NextResponse.json({ answer, demo: false });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
