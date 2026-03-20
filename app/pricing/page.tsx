Pricing page · TSX
Copiar

'use client'
 
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { readUser } from '@/lib/storage'
import Navbar, { Footer } from '@/components/Navbar'
 
const CHECKOUT_URL = 'https://viralhook-ai.lemonsqueezy.com/checkout/buy/a6fbdd22-960f-43e2-8926-cddb4960f8cd'
 
const FREE_FEATURES = [
  '5 generations per day',
  'All 4 platforms',
  'All 4 tones',
  'Hook history (last 50)',
  'Copy to clipboard',
]
 
const PRO_FEATURES = [
  'Unlimited generations',
  'All 4 platforms',
  'All 4 tones',
  'Full hook history',
  'Copy to clipboard',
  'Priority generation speed',
  'Early access to new features',
]
 
const FAQ = [
  { q: 'Can I cancel anytime?',            a: 'Yes. Cancel anytime from your account — no questions asked. You keep access until the end of your billing period.' },
  { q: 'How many hooks on the free plan?', a: '5 generations per day on the free plan. Each gives you 5 hooks.' },
  { q: "What's the difference with Pro?",  a: 'Unlimited daily generations, priority speed, and early access to new features.' },
  { q: 'Can I get a refund?',              a: '30-day money-back guarantee. No questions asked.' },
]
 
export default function PricingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isPro,      setIsPro]      = useState(false)
 
  useEffect(() => {
    const user = readUser()
    setIsLoggedIn(!!user)
    setIsPro(user?.plan === 'pro')
  }, [])
 
  function handleUpgrade() {
    window.location.href = CHECKOUT_URL
  }
 
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(155deg,#05080f 0%,#080d1c 35%,#0b1230 62%,#06090f 100%)',
      display: 'flex', flexDirection: 'column',
    }}>
      <Navbar rightSlot={
        isLoggedIn
          ? <Link href="/dashboard" style={{ fontSize: 14, color: '#64748b', textDecoration: 'none' }}>Dashboard</Link>
          : <>
              <Link href="/login" style={{ fontSize: 14, color: '#64748b', textDecoration: 'none' }}>Sign in</Link>
              <Link href="/login" style={{ fontSize: 14, fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg,#6366f1,#4f46e5)', padding: '9px 20px', borderRadius: 10, textDecoration: 'none' }}>
                Get started
              </Link>
            </>
      } />
 
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 80px', flex: 1 }}>
 
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,.1)', border: '1px solid rgba(99,102,241,.24)', borderRadius: 100, padding: '6px 16px', marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#818cf8', display: 'inline-block' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#a5b4fc' }}>Simple, honest pricing</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(34px,7vw,54px)', fontWeight: 800, letterSpacing: -2,
            margin: '0 0 16px',
            background: 'linear-gradient(135deg,#fff,#c7d2fe 50%,#818cf8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Start free. Upgrade when ready.
          </h1>
          <p style={{ color: '#64748b', fontSize: 17, margin: '0 auto', maxWidth: 440 }}>
            Free forever. Go Pro for unlimited hooks at $9/month.
          </p>
        </div>
 
        {/* Plan cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, marginBottom: 80 }}>
 
          {/* Free */}
          <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 24, padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
            <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1.5 }}>Free</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
              <span style={{ fontSize: 52, fontWeight: 800, letterSpacing: -2, color: '#f1f5f9' }}>$0</span>
            </div>
            <p style={{ margin: '0 0 28px', fontSize: 14, color: '#64748b' }}>Forever free to get started</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
              {FREE_FEATURES.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#94a3b8' }}>
                  <span style={{ color: '#64748b' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <Link
              href={isLoggedIn ? '/dashboard' : '/login'}
              style={{ display: 'block', textAlign: 'center', padding: '14px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, color: '#94a3b8', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}
            >
              {isLoggedIn ? 'Go to dashboard' : 'Get started free'}
            </Link>
          </div>
 
          {/* Pro */}
          <div style={{ background: 'rgba(99,102,241,.07)', border: '1px solid rgba(99,102,241,.3)', borderRadius: 24, padding: '36px 32px', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 0 0 1px rgba(99,102,241,.1), 0 24px 64px rgba(99,102,241,.15)' }}>
            <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#6366f1,#4f46e5)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '5px 18px', borderRadius: 100, whiteSpace: 'nowrap' }}>
              ✦ MOST POPULAR
            </div>
            <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: 1.5 }}>Pro</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 52, fontWeight: 800, letterSpacing: -2, background: 'linear-gradient(135deg,#fff,#a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>$9</span>
              <span style={{ fontSize: 15, color: '#64748b' }}>/month</span>
            </div>
            <p style={{ margin: '0 0 28px', fontSize: 14, color: '#64748b' }}>Cancel anytime. No commitments.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
              {PRO_FEATURES.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#c7d2fe' }}>
                  <span style={{ color: '#818cf8' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={handleUpgrade}
              disabled={isPro}
              style={{
                padding: '15px',
                background: isPro ? 'rgba(99,102,241,.3)' : 'linear-gradient(135deg,#6366f1,#4f46e5)',
                border: 'none', borderRadius: 12, color: '#fff', fontSize: 15, fontWeight: 700,
                cursor: isPro ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                boxShadow: isPro ? 'none' : '0 6px 24px rgba(99,102,241,.45)',
                transition: 'transform .2s',
              }}
              onMouseEnter={e => { if (!isPro) (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)' }}
            >
              {isPro ? "✦ You're on Pro" : '⚡ Get Pro — $9/month'}
            </button>
            <p style={{ textAlign: 'center', margin: '12px 0 0', fontSize: 12, color: '#334155' }}>
              30-day money-back guarantee · Cancel anytime
            </p>
          </div>
        </div>
 
        {/* FAQ */}
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1, margin: '0 0 32px', textAlign: 'center', color: '#f1f5f9' }}>
            Common questions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
            {FAQ.map(({ q, a }) => (
              <div key={q} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: '22px 24px' }}>
                <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>{q}</p>
                <p style={{ margin: 0, fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      <Footer />
    </div>
  )
}