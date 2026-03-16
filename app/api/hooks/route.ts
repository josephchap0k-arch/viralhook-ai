import { NextRequest, NextResponse } from 'next/server'
import { buildPrompt, getMockHooks } from '@/lib/prompts'

export async function POST(req: NextRequest) {
  try {
    const body     = await req.json()
    const topic    = ((body?.topic    as string) ?? '').trim()
    const platform = ((body?.platform as string) ?? 'All platforms').trim()
    const tone     = ((body?.tone     as string) ?? 'Curiosity').trim()

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required.' }, { status: 400 })
    }

    // ── Development / demo fallback ───────────────────────────
    if (!process.env.OPENAI_API_KEY) {
      const mockLines = getMockHooks(topic).join('\n')
      return NextResponse.json({ hooks: mockLines })
    }

    // ── OpenAI call ───────────────────────────────────────────
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: buildPrompt(topic, platform, tone) }],
        temperature: 0.92,
        max_tokens: 320,
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('[/api/hooks] OpenAI error:', text)
      return NextResponse.json({ error: 'AI generation failed. Try again.' }, { status: 500 })
    }

    const data  = await response.json()
    const hooks = (data.choices?.[0]?.message?.content as string | undefined)?.trim() ?? ''

    if (!hooks) {
      return NextResponse.json({ error: 'Empty response from AI.' }, { status: 500 })
    }

    return NextResponse.json({ hooks })
  } catch (err) {
    console.error('[/api/hooks]', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
