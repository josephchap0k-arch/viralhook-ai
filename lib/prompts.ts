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
  return `You are a viral content strategist specialising in short-form video.

Generate exactly 5 viral hooks for a video about "${topic}".
Platform: ${platform}.
Tone: ${tone}.

Hard rules:
- Return ONLY the 5 hooks, one per line
- No numbering, no bullets, no dashes, no labels, no blank lines, no extra text
- Each hook must be 15 words or fewer
- Every hook must make someone stop scrolling immediately
- Rotate through these patterns:
  • Curiosity gap — hint at something unknown
  • Controversial take — challenge a mainstream belief
  • Surprising fact — counter-intuitive or shocking truth
  • Direct challenge — call out the viewer directly
  • Open loop — start a story that demands completion
- Language must feel native to ${platform}
- Tone must be ${tone.toLowerCase()}`
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
