import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured in Netlify.' },
        { status: 500 }
      );
    }

    const body = await request.json();

    const messages = Array.isArray(body.messages)
      ? body.messages
      : [
          {
            role: 'user',
            content: body.message || body.text || '',
          },
        ];

    const contents = messages
      .filter((item: any) => item && item.content)
      .map((item: any) => ({
        role: item.role === 'assistant' || item.role === 'model'
          ? 'model'
          : 'user',
        parts: [{ text: String(item.content) }],
      }));

    if (contents.length === 0) {
      return NextResponse.json(
        { error: 'Please enter a message.' },
        { status: 400 }
      );
    }

    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: 'You are a helpful AI agricultural advisor. Help farmers with crop cultivation, plant diseases, pests, soil health, irrigation, fertilizers, and farming practices. Give clear, practical answers in the language requested by the user. Do not pretend to diagnose a plant from text alone.',
              },
            ],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    const result = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error('Gemini API error:', result);

      return NextResponse.json(
        {
          error:
            result?.error?.message ||
            `Gemini API request failed (${geminiResponse.status}).`,
        },
        { status: geminiResponse.status }
      );
    }

    const reply = result?.candidates?.[0]?.content?.parts
      ?.map((part: any) => part.text || '')
      .join('')
      .trim();

    if (!reply) {
      return NextResponse.json(
        { error: 'Gemini did not return a response. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      reply,
      response: reply,
      message: reply,
    });
  } catch (error) {
    console.error('Chat API error:', error);

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
