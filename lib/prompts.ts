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
export type Tone = (typeof TONES)[number]

// ─── Creator context presets ─────────────────────────────────────────────────

export const CREATOR_CONTEXTS = [
'someone who failed at this for months before figuring it out',
'someone who discovered a counterintuitive shortcut nobody talks about',
'someone who watched others make the same costly mistake over and over',
'someone who went from zero to results in 30 days by changing one thing',
] as const

export type CreatorContext = (typeof CREATOR_CONTEXTS)[number]

// ─── Main prompt builder ─────────────────────────────────────────────────────

export function buildPrompt(
topic: string,
platform: string,
tone: string,
creatorContext: string = CREATOR_CONTEXTS[0],
): string {
return `You are a top 1% viral content creator on ${platform}.
You are specifically: ${creatorContext}.
Tone: ${tone}.

Your hooks come FROM that lived experience — not advice ABOUT it.

Topic: ${topic}

Language:
- Write hooks in the same language the user uses in the topic input
- If the topic is in Spanish, output in Spanish
- If the topic is in English, output in English

━━━ THE ONLY STANDARD THAT MATTERS ━━━

Before writing each hook, ask yourself:
"Would someone stop their thumb in 0.3 seconds?"

If the answer is anything other than YES — rewrite it.

━━━ THE HOOK FORMULA ━━━

[REAL MOMENT the viewer can picture] + [SPECIFIC CONSEQUENCE] + [IMPLICIT ACCUSATION]

The accusation is never stated. It's felt.
The viewer should think: "this is exactly me."

━━━ HARD RULES ━━━

- 6–12 words maximum. Every word must earn its place
- The opening words must create immediate tension, discomfort, or curiosity
- Include a number, timeframe, dollar amount, or highly specific situation whenever possible
- Must feel written by someone who lived it, not generated
- Vary sentence rhythm and cadence so hooks don’t feel templated

━━━ REAL MOMENT (MANDATORY) ━━━

Every hook must contain a moment the viewer can visualize.

Bad:
"Your content isn't growing"

Good:
"Subís el video. 200 views. Igual que ayer."

━━━ CONSEQUENCE PRESSURE (MANDATORY) ━━━

Each hook must imply something is being lost RIGHT NOW.

Bad:
"You're making a mistake"

Good:
"Cada video que subís así pierde el 80% del alcance"

━━━ NO SAFE HOOKS ━━━

- No neutral tone
- No soft advice
- No “tips”
- Must feel like a call-out

━━━ PERSONAL TARGETING ━━━

Speak to ONE person.

Bad:
"Many creators do this"

Good:
"Vos lo estás haciendo ahora mismo"

━━━ ANTI-REPETITION ━━━

- Each hook must use a different structure
- Do not repeat patterns
- Do not start hooks the same way

━━━ FORBIDDEN FIRST WORDS ━━━

Most, Many, If you, Here's, The truth, Did you, Want to,
How to, This is, Learn, Discover, Find out, Are you

━━━ FORBIDDEN PHRASES ━━━

"shocking truth", "nobody tells you", "game-changer",
"secret", "most people", "life-changing"

━━━ EMOTIONAL TRIGGERS ━━━

Rotate across hooks:
- Shame
- Urgency
- Ego
- Fear
- Identity

━━━ CALIBRATION EXAMPLES ━━━

"Publiqué 47 videos. El error era el mismo en todos."
"Borrás el video a las 2 horas. Eso te cuesta 10k views."
"Editás 2 horas y el video muere en el segundo 3."
"300 seguidores después de un año. Una sola cosa lo explica."

━━━ FINAL FILTER ━━━

If it sounds generic — rewrite it.
If it feels safe — rewrite it.
If it doesn't hit emotionally — rewrite it.

Only output hooks that feel real, specific, and slightly uncomfortable.

━━━ OUTPUT FORMAT ━━━

Return ONLY 5 hooks.
One per line.
No numbers, no bullets, no commentary.`
}

// ─── Mock data ───────────────────────────────────────────────────────────────

export const MOCK_HOOKS: Record<string, string[]> = {
default: [
'Subís todos los días y seguís clavado en 200 views.',
'Editás 2 horas y el video muere en el segundo 3.',
'300 seguidores después de un año. Una sola cosa lo explica.',
'El algoritmo te enterró en el segundo 3. Vos lo pusiste ahí.',
'Cobré $0 por 6 meses. Cambié una línea. Todo cambió.',
],
}

export function getMockHooks(_topic: string): string[] {
return MOCK_HOOKS.default
}
