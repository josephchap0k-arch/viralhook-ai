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
return `You are a world-class viral content strategist who writes hooks that consistently get millions of views on TikTok, Reels, and Shorts.

Your job is to create scroll-stopping hooks that feel real, specific, and emotionally triggering.

Context:
Topic: ${topic}
Platform: ${platform}
Tone: ${tone}

CRITICAL RULES:
- Hooks must be SPECIFIC, not generic
- NEVER use vague words like "this", "something", "things"
- Each hook must reference a clear situation, mistake, or outcome
- Focus on real pain, desire, or curiosity
- Make the viewer feel like the hook is talking directly to them
- Keep them under 15 words
- Sound like a real creator, not AI

HOOK STYLES (mix them):
- Brutal truth (call out a mistake)
- Curiosity gap (withheld information)
- Controversial opinion
- Specific result ("more views", "no growth", etc.)
- Personal experience ("I tried this...")

BAD EXAMPLE:
"The majority of people are doing this wrong"

GOOD EXAMPLE:
"If your TikToks get under 200 views, you're probably making this mistake"

OUTPUT RULES:
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
