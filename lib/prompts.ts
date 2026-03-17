export const PLATFORMS = [
  'All platforms',
  'TikTok',
  'Instagram Reels',
  'YouTube Shorts',
] as const

export const TONES = [
  'Curiosity',
  'Controversial',
  'Storytelling',
  'Educational',
] as const

export type Platform = (typeof PLATFORMS)[number]
export type Tone     = (typeof TONES)[number]

export function buildPrompt(topic: string, platform: string, tone: string): string {
return `You are a top 1% viral content creator who understands exactly what makes people stop scrolling.
Your job is to make people stop scrolling immediately.
If the hook doesn't feel slightly aggressive or uncomfortable, rewrite it.
Your hooks MUST feel addictive, emotional, and impossible to ignore.

Context:
Topic: ${topic}
Platform: ${platform}
Tone: ${tone}

CRITICAL RULES:
- Hooks must be SHORT (6–12 words max)
- ALWAYS include a number, result, or specific situation when possible
- The first 2–3 words MUST create tension or curiosity
- Each hook must trigger emotion: fear, curiosity, ego, or urgency
- Focus on outcomes people care about (views, growth, money, attention)
- Make the viewer feel they are doing something WRONG
- Avoid generic phrases completely
- Sound like a real creator, not AI

PSYCHOLOGICAL TRIGGERS TO USE:
- "You're doing this wrong"
- "Nobody tells you this"
- "This is why you're stuck"
- "Stop doing this"
- "This kills your growth"
- "You're wasting time if..."

STYLE VARIATION (mix naturally):
- Direct attack
- Hidden mistake
- Shocking truth
- Personal discovery
- Call-out

BAD:
"Most people are doing this wrong"

GOOD:
"Under 200 views? This is exactly why"

OUTPUT:
- Return ONLY 5 hooks
- One per line
- No numbering, no extra text
`
}

export const MOCK_HOOKS: Record<string, string[]> = {
  default: [
    'Nobody tells you this secret about growing fast',
    'The #1 mistake everyone makes at the start',
    'Stop doing this if you actually want results',
    'What the top 1% know that you don\'t',
    'I tried every method — here\'s what actually works',
  ],
}

export function getMockHooks(topic: string): string[] {
  return MOCK_HOOKS.default.map(h =>
    h.replace('growing fast', topic).replace('at the start', `with ${topic}`)
  )
}
