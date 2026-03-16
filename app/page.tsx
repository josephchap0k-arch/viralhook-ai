'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar, { Footer } from '@/components/Navbar'

const EXAMPLE_HOOKS = [
  'Nobody tells you this secret about intermittent fasting',
  'The #1 mistake that kills every beginner\'s progress',
  'Stop eating "healthy" if you actually want to lose fat',
  'What happens to your body after 16 hours without food',
  'Every fitness influencer lied to you about metabolism',
]

const FEATURES = [
  { icon: '⚡', title: 'Instant generation',    desc: '5 hooks under 5 seconds, ready to copy.' },
  { icon: '🎯', title: 'Platform-optimised',    desc: 'Native feel for TikTok, Reels and Shorts.' },
  { icon: '🔥', title: 'Proven viral patterns', desc: 'Curiosity gaps, controversy, open loops.' },
  { icon: '🎨', title: 'Tone control',           desc: 'Match your brand voice exactly.' },
  { icon: '📋', title: 'Hook history',           desc: 'Every generation saved, revisit anytime.' },
  { icon: '✦',  title: 'Pro plan',               desc: '$29 once. Unlimited hooks, forever.' },
]

export default function LandingPage() {
  const router = useRouter()

  useEffect(() => {
    try {
      if (localStorage.getItem('vh_user')) router.replace('/dashboard')
    } catch {}
  }, [router])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(155deg,#05080f 0%,#080d1c 38%,#0b1230 64%,#05080f 100%)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Navbar rightSlot={
        <>
          <Link href="/pricing" style={{ fontSize: 14, color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>
            Pricing
          </Link>
          <Link href="/login" style={{ fontSize: 14, color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>
            Sign in
          </Link>
          <Link href="/login" style={{
            fontSize: 14, fontWeight: 700, color: '#fff',
            background: 'linear-gradient(135deg,#6366f1,#4f46e5)',
            padding: '9px 20px', borderRadius: 10, textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(99,102,241,.4)',
          }}>
            Get started free →
          </Link>
        </>
      } />

      {/* ── Hero ── */}
      <section style={{
        maxWidth: 760, margin: '0 auto', padding: '100px 24px 80px',
        textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(99,102,241,.1)', border: '1px solid rgba(99,102,241,.24)',
          borderRadius: 100, padding: '6px 16px', marginBottom: 32,
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#818cf8', boxShadow: '0 0 12px #818cf8',
            display: 'inline-block', animation: 'glow 2s ease-in-out infinite',
          }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#a5b4fc', letterSpacing: .3 }}>
            AI-Powered · Trusted by 14,000+ creators
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(40px,8.5vw,68px)', fontWeight: 800,
          letterSpacing: -2.5, lineHeight: 1.06, margin: '0 0 22px',
          background: 'linear-gradient(135deg,#fff 0%,#c7d2fe 50%,#818cf8 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Stop losing views.<br />Start with a killer hook.
        </h1>

        <p style={{
          color: '#64748b', fontSize: 18, lineHeight: 1.68,
          margin: '0 0 18px', maxWidth: 500,
        }}>
          Generate 5 viral hooks for{' '}
          <strong style={{ color: '#94a3b8' }}>TikTok, Reels and YouTube Shorts</strong>
          {' '}in seconds — powered by AI.
        </p>

        <div style={{ display: 'flex', gap: 20, marginBottom: 52, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['⚡ Under 5 seconds', '🎯 Platform-optimised', '🔥 Proven formats', '✦ Free to start'].map(t => (
            <span key={t} style={{ color: '#334155', fontSize: 13 }}>{t}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/login" style={{
            fontSize: 16, fontWeight: 700, color: '#fff',
            background: 'linear-gradient(135deg,#6366f1,#4f46e5)',
            padding: '16px 36px', borderRadius: 14, textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(99,102,241,.45)',
          }}>
            Generate Hooks Free →
          </Link>
          <Link href="/pricing" style={{
            fontSize: 15, fontWeight: 600, color: '#64748b',
            background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)',
            padding: '16px 28px', borderRadius: 14, textDecoration: 'none',
          }}>
            See pricing
          </Link>
        </div>
      </section>

      {/* ── Example hooks preview ── */}
      <section style={{ maxWidth: 680, margin: '0 auto 100px', padding: '0 24px', width: '100%' }}>
        <div style={{
          background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)',
          borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,.4)',
        }}>
          {/* Card header */}
          <div style={{
            padding: '14px 22px',
            background: 'rgba(99,102,241,.08)', borderBottom: '1px solid rgba(255,255,255,.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>🎯</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#c7d2fe' }}>Example output</span>
            </div>
            <span style={{
              fontSize: 12, color: '#6366f1', fontWeight: 600,
              background: 'rgba(99,102,241,.12)', border: '1px solid rgba(99,102,241,.24)',
              padding: '3px 12px', borderRadius: 100,
            }}>fitness</span>
          </div>
          {/* Hooks */}
          {EXAMPLE_HOOKS.map((hook, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 22px',
              borderBottom: i < EXAMPLE_HOOKS.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none',
            }}>
              <span style={{
                flexShrink: 0, width: 26, height: 26, borderRadius: 8,
                background: 'rgba(99,102,241,.14)', border: '1px solid rgba(99,102,241,.22)',
                color: '#818cf8', fontSize: 11, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{i + 1}</span>
              <p style={{ margin: 0, color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{hook}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features grid ── */}
      <section style={{ maxWidth: 1060, margin: '0 auto 100px', padding: '0 24px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <h2 style={{
            fontSize: 'clamp(28px,5vw,42px)', fontWeight: 800, letterSpacing: -1.5,
            margin: '0 0 14px',
            background: 'linear-gradient(135deg,#fff,#c7d2fe)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Everything you need to grow faster
          </h2>
          <p style={{ color: '#64748b', fontSize: 16, margin: 0 }}>
            Built for creators who take content seriously.
          </p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
          gap: 16,
        }}>
          {FEATURES.map(f => (
            <div
              key={f.title}
              style={{
                background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)',
                borderRadius: 18, padding: '26px 22px', transition: 'border-color .2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(99,102,241,.3)')}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,.07)')}
            >
              <div style={{ fontSize: 26, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>{f.title}</h3>
              <p style={{ margin: 0, fontSize: 13, color: '#475569', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section style={{ maxWidth: 760, margin: '0 auto 100px', padding: '0 24px', width: '100%' }}>
        <div style={{
          background: 'rgba(99,102,241,.08)', border: '1px solid rgba(99,102,241,.2)',
          borderRadius: 24, padding: '60px 40px', textAlign: 'center',
        }}>
          <h2 style={{
            margin: '0 0 14px', fontSize: 'clamp(26px,5vw,38px)',
            fontWeight: 800, letterSpacing: -1.2,
            background: 'linear-gradient(135deg,#fff,#c7d2fe)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Ready to go viral?
          </h2>
          <p style={{ color: '#64748b', fontSize: 16, margin: '0 0 32px' }}>
            Join 14,000+ creators using ViralHook AI every day.
          </p>
          <Link href="/login" style={{
            display: 'inline-block', fontSize: 16, fontWeight: 700, color: '#fff',
            background: 'linear-gradient(135deg,#6366f1,#4f46e5)',
            padding: '16px 44px', borderRadius: 14, textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(99,102,241,.45)',
          }}>
            Start for free →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
