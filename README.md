# ViralHook AI

Generate 5 viral hooks for TikTok, Reels and YouTube Shorts in seconds, powered by AI.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Add your OpenAI API key to .env.local
#    (optional — mock hooks work without a key)

# 4. Start the dev server
npm run dev
```

Open **http://localhost:3000**

## Deploy to Vercel

```bash
npx vercel
```

Add `OPENAI_API_KEY` in **Vercel → Project → Settings → Environment Variables**.

## Features

| Feature | Free | Pro |
|---|---|---|
| Generations per day | 5 | Unlimited |
| All platforms | ✓ | ✓ |
| All tones | ✓ | ✓ |
| Hook history | ✓ | ✓ |
| Copy to clipboard | ✓ | ✓ |

## Stack

- Next.js 14 App Router
- React 18 + TypeScript
- OpenAI `gpt-4o-mini`
- localStorage auth (no database needed)
- Zero external UI dependencies
