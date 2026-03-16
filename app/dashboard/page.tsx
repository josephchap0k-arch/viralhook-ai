'use client'

import { useState, useEffect, useRef, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  readUser, logoutUser, canGenerate, generationsLeft,
  recordGeneration, appendHistory, readHistory, removeHistory,
  type User, type HookEntry,
} from '@/lib/storage'
import { PLATFORMS, TONES } from '@/lib/prompts'
import { Brand } from '@/components/Navbar'
import HookCard from '@/components/HookCard'
import Spinner from '@/components/Spinner'
import Toast from '@/components/Toast'

type Tab = 'generate' | 'history'

function DashboardInner() {
  const router       = useRouter()
  const searchParams = useSearchParams()

  const [user,     setUser]     = useState<User | null>(null)
  const [tab,      setTab]      = useState<Tab>('generate')
  const [topic,    setTopic]    = useState('')
  const [platform, setPlatform] = useState('All platforms')
  const [tone,     setTone]     = useState('Curiosity')
  const [hooks,    setHooks]    = useState<string[]>([])
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [focused,  setFocused]  = useState(false)
  const [history,  setHistory]  = useState<HookEntry[]>([])
  const [toast,    setToast]    = useState('')
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const u = readUser()
    if (!u) { router.replace('/login'); return }
    setUser(u)
    setHistory(readHistory())
    if (searchParams.get('upgraded') === 'true') flash('🎉 Welcome to Pro! Unlimited hooks unlocked.')
  }, [router, searchParams])

  useEffect(() => {
    if (hooks.length > 0)
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
  }, [hooks])

  const flash = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }, [])

  async function generate() {
    if (!user) return
    if (!topic.trim()) { setError('Please enter a topic.'); return }
    if (!canGenerate(user)) { setError('Daily limit reached. Upgrade to Pro for unlimited.'); return }
    setError(''); setHooks([]); setLoading(true)
    try {
      const res  = await fetch('/api/hooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic.trim(), platform, tone }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Something went wrong.'); return }

      const parsed: string[] = data.hooks.split('\n').filter((l: string) => l.trim() !== '')
      const cleaned = parsed.map((h: string) => h.replace(/^\d+[\.\)\-]\s*/, '').trim())
      setHooks(cleaned)

      const updated = recordGeneration(user)
      setUser(updated)
      appendHistory({ topic: topic.trim(), platform, tone, hooks: cleaned })
      setHistory(readHistory())
      flash('✓ Hooks generated!')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function copyAll() {
    navigator.clipboard.writeText(hooks.map((h, i) => `${i + 1}. ${h}`).join('\n'))
    flash('✓ All hooks copied!')
  }

  function handleDeleteHistory(id: string) {
    removeHistory(id)
    setHistory(prev => prev.filter(h => h.id !== id))
    flash('Deleted.')
  }

  function loadFromHistory(entry: HookEntry) {
    setTopic(entry.topic)
    setPlatform(entry.platform)
    setTone(entry.tone)
    setHooks(entry.hooks)
    setTab('generate')
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 150)
  }

  function handleSignOut() {
    logoutUser()
    router.push('/')
  }

  if (!user) return null

  const isPro     = user.plan === 'pro'
  const remaining = generationsLeft(user)
  const canGen    = canGenerate(user)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(155deg,#05080f 0%,#080d1c 35%,#0b1230 62%,#06090f 100%)',
    }}>

      {/* ── Navbar ───────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100, height: 62,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px',
        background: 'rgba(5,8,15,.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,.06)',
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}><Brand /></Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {isPro
            ? <span style={{ fontSize: 12, fontWeight: 700, color: '#a5b4fc', background: 'rgba(99,102,241,.15)', border: '1px solid rgba(99,102,241,.3)', borderRadius: 100, padding: '4px 14px' }}>✦ Pro</span>
            : <span style={{ fontSize: 12, color: '#64748b', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 100, padding: '4px 13px' }}>{remaining} / 5 left today</span>
          }
          <span style={{ fontSize: 13, color: '#475569' }}>{user.name}</span>
          {!isPro && (
            <Link href="/pricing" style={{ fontSize: 12, fontWeight: 700, color: '#a5b4fc', background: 'rgba(99,102,241,.13)', border: '1px solid rgba(99,102,241,.3)', borderRadius: 9, padding: '7px 16px', textDecoration: 'none' }}>
              Upgrade →
            </Link>
          )}
          <button onClick={handleSignOut} style={{ fontSize: 13, color: '#334155', background: 'none', border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>
            Sign out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 940, margin: '0 auto', padding: '44px 24px 72px' }}>

        {/* ── Page header ── */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ margin: '0 0 6px', fontSize: 28, fontWeight: 800, letterSpacing: -1, color: '#f1f5f9' }}>
            Welcome back, {user.name.split(' ')[0]} 👋
          </h1>
          <p style={{ margin: 0, color: '#475569', fontSize: 15 }}>
            {isPro
              ? 'Pro plan — unlimited generations'
              : `Free plan — ${remaining} generation${remaining !== 1 ? 's' : ''} remaining today`
            }
          </p>
        </div>

        {/* ── Tabs ── */}
        <div style={{
          display: 'flex', gap: 4,
          background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)',
          borderRadius: 12, padding: 4, marginBottom: 28, width: 'fit-content',
        }}>
          {(['generate', 'history'] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '8px 20px', borderRadius: 9, border: 'none', fontFamily: 'inherit',
              fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all .2s',
              background: tab === t ? 'rgba(99,102,241,.25)' : 'transparent',
              color: tab === t ? '#a5b4fc' : '#475569',
            }}>
              {t === 'generate' ? '⚡ Generate' : `📋 History (${history.length})`}
            </button>
          ))}
        </div>

        {/* ── Generate tab ── */}
        {tab === 'generate' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 24, alignItems: 'start' }}>

            {/* Input card */}
            <div style={{ background: 'rgba(255,255,255,.028)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 22, padding: '30px 28px', boxShadow: '0 20px 60px rgba(0,0,0,.45)' }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#475569', letterSpacing: 2.2, marginBottom: 11 }}>
                YOUR TOPIC
              </label>
              <input
                value={topic}
                onChange={e => { setTopic(e.target.value); if (error) setError('') }}
                onKeyDown={e => e.key === 'Enter' && !loading && generate()}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="e.g. fitness, crypto, productivity…"
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,.3)',
                  border: error
                    ? '1px solid rgba(248,113,113,.6)'
                    : focused
                    ? '1px solid rgba(129,140,248,.7)'
                    : '1px solid rgba(255,255,255,.09)',
                  boxShadow: focused && !error ? '0 0 0 4px rgba(99,102,241,.11)' : 'none',
                  borderRadius: 13, padding: '14px 18px', color: '#f1f5f9', fontSize: 15,
                  outline: 'none', fontFamily: 'inherit', transition: 'border-color .2s, box-shadow .2s',
                }}
              />

              {/* Platform selector */}
              <SelectorRow label="PLATFORM" options={[...PLATFORMS]} value={platform} onChange={setPlatform} />

              {/* Tone selector */}
              <SelectorRow label="TONE" options={[...TONES]} value={tone} onChange={setTone} />

              {/* Error */}
              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, background: 'rgba(248,113,113,.07)', border: '1px solid rgba(248,113,113,.17)', borderRadius: 10, padding: '10px 14px', color: '#f87171', fontSize: 13 }}>
                  <span>⚠</span><span>{error}</span>
                </div>
              )}

              {/* Limit reached */}
              {!canGen && !error && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, background: 'rgba(99,102,241,.07)', border: '1px solid rgba(99,102,241,.2)', borderRadius: 10, padding: '10px 14px', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 13, color: '#a5b4fc' }}>Daily limit reached</span>
                  <Link href="/pricing" style={{ fontSize: 13, fontWeight: 700, color: '#a5b4fc', textDecoration: 'none' }}>Upgrade →</Link>
                </div>
              )}

              {/* Generate button */}
              <button
                onClick={generate}
                disabled={loading || !canGen}
                style={{
                  width: '100%', marginTop: 20, padding: '16px',
                  background: (loading || !canGen) ? 'rgba(99,102,241,.28)' : 'linear-gradient(135deg,#6366f1,#4f46e5)',
                  border: 'none', borderRadius: 13, color: '#fff', fontSize: 15, fontWeight: 700,
                  cursor: (loading || !canGen) ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  boxShadow: (loading || !canGen) ? 'none' : '0 6px 24px rgba(99,102,241,.4)',
                  fontFamily: 'inherit', transition: 'transform .2s',
                }}
                onMouseEnter={e => { if (!loading && canGen) (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)' }}
              >
                {loading
                  ? <><Spinner /> Generating…</>
                  : !canGen
                  ? '🔒 Upgrade for more'
                  : <><span style={{ fontSize: 18 }}>⚡</span> Generate 5 Hooks</>
                }
              </button>

              {!isPro && canGen && (
                <p style={{ textAlign: 'center', color: '#334155', fontSize: 12, margin: '12px 0 0' }}>
                  {remaining} free generation{remaining !== 1 ? 's' : ''} left today ·{' '}
                  <Link href="/pricing" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: 600 }}>Upgrade</Link>
                </p>
              )}
            </div>

            {/* Results panel */}
            <div ref={resultsRef}>
              {loading && <SkeletonLoader />}

              {!loading && hooks.length > 0 && (
                <div style={{ background: 'rgba(255,255,255,.028)', border: '1px solid rgba(99,102,241,.2)', borderRadius: 22, overflow: 'hidden', animation: 'fadeIn .4s ease both', boxShadow: '0 20px 60px rgba(0,0,0,.4)' }}>
                  {/* Results header */}
                  <div style={{ padding: '16px 22px', background: 'rgba(99,102,241,.08)', borderBottom: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16 }}>🎯</span>
                      <div>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#c7d2fe' }}>Your Viral Hooks</p>
                        <p style={{ margin: '1px 0 0', fontSize: 11, color: '#475569' }}>{platform} · {tone}</p>
                      </div>
                    </div>
                    <button onClick={copyAll} style={{ fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', padding: '5px 13px', borderRadius: 8, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', color: '#64748b', transition: 'all .15s' }}>
                      Copy all
                    </button>
                  </div>
                  {/* Hook list */}
                  {hooks.map((hook, i) => (
                    <HookCard key={i} index={i} text={hook} animate />
                  ))}
                  {/* Upsell footer */}
                  {!isPro && (
                    <div style={{ padding: '14px 22px', borderTop: '1px solid rgba(255,255,255,.05)', background: 'rgba(0,0,0,.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                      <p style={{ margin: 0, fontSize: 12, color: '#334155' }}>Unlimited hooks with Pro</p>
                      <Link href="/pricing" style={{ fontSize: 12, fontWeight: 700, color: '#a5b4fc', background: 'rgba(99,102,241,.12)', border: '1px solid rgba(99,102,241,.28)', borderRadius: 8, padding: '6px 14px', textDecoration: 'none' }}>
                        Upgrade ✦
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {!loading && hooks.length === 0 && (
                <div style={{ background: 'rgba(255,255,255,.02)', border: '1px dashed rgba(255,255,255,.07)', borderRadius: 22, padding: '64px 32px', textAlign: 'center', color: '#334155' }}>
                  <p style={{ fontSize: 34, margin: '0 0 12px' }}>🎯</p>
                  <p style={{ margin: 0, fontSize: 14 }}>Your hooks will appear here</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── History tab ── */}
        {tab === 'history' && (
          <div>
            {history.length === 0 ? (
              <div style={{ background: 'rgba(255,255,255,.02)', border: '1px dashed rgba(255,255,255,.07)', borderRadius: 22, padding: '80px 32px', textAlign: 'center', color: '#334155' }}>
                <p style={{ fontSize: 36, margin: '0 0 12px' }}>📋</p>
                <p style={{ margin: '0 0 4px', fontSize: 16, color: '#475569', fontWeight: 600 }}>No history yet</p>
                <p style={{ margin: 0, fontSize: 14 }}>Generate some hooks — they&apos;ll appear here.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {history.map(entry => (
                  <div
                    key={entry.id}
                    style={{ background: 'rgba(255,255,255,.028)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 18, overflow: 'hidden', transition: 'border-color .2s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(99,102,241,.25)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,.07)')}
                  >
                    {/* Entry header */}
                    <div style={{ padding: '13px 20px', background: 'rgba(255,255,255,.02)', borderBottom: '1px solid rgba(255,255,255,.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#c7d2fe' }}>{entry.topic}</span>
                        <span style={{ fontSize: 11, color: '#6366f1', fontWeight: 600, background: 'rgba(99,102,241,.12)', border: '1px solid rgba(99,102,241,.22)', padding: '2px 10px', borderRadius: 100 }}>
                          {entry.platform}
                        </span>
                        <span style={{ fontSize: 11, color: '#64748b' }}>{entry.tone}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 11, color: '#334155' }}>{new Date(entry.createdAt).toLocaleDateString()}</span>
                        <button onClick={() => loadFromHistory(entry)} style={{ fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', padding: '4px 12px', borderRadius: 7, background: 'rgba(99,102,241,.12)', border: '1px solid rgba(99,102,241,.25)', color: '#a5b4fc' }}>
                          Use again
                        </button>
                        <button onClick={() => handleDeleteHistory(entry.id)} style={{ fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', padding: '4px 12px', borderRadius: 7, background: 'rgba(248,113,113,.07)', border: '1px solid rgba(248,113,113,.15)', color: '#f87171' }}>
                          Delete
                        </button>
                      </div>
                    </div>
                    {/* Hook preview */}
                    <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {entry.hooks.slice(0, 3).map((h, i) => (
                        <p key={i} style={{ margin: 0, fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
                          <span style={{ color: '#818cf8', fontWeight: 700, marginRight: 8 }}>{i + 1}</span>{h}
                        </p>
                      ))}
                      {entry.hooks.length > 3 && (
                        <p style={{ margin: 0, fontSize: 12, color: '#334155' }}>+{entry.hooks.length - 3} more hooks</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Toast message={toast} />
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────
function SelectorRow({
  label, options, value, onChange,
}: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ marginTop: 18 }}>
      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#334155', letterSpacing: 2, marginBottom: 9 }}>
        {label}
      </label>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {options.map(o => (
          <button key={o} onClick={() => onChange(o)} style={{
            padding: '5px 11px', borderRadius: 8, fontSize: 12, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
            background: value === o ? 'rgba(99,102,241,.22)' : 'rgba(255,255,255,.04)',
            border: value === o ? '1px solid rgba(99,102,241,.45)' : '1px solid rgba(255,255,255,.07)',
            color: value === o ? '#a5b4fc' : '#475569',
          }}>{o}</button>
        ))}
      </div>
    </div>
  )
}

function SkeletonLoader() {
  return (
    <div style={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.055)', borderRadius: 22, padding: '22px 24px', animation: 'fadeIn .3s ease both' }}>
      <div style={{ fontSize: 12, color: '#334155', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg style={{ width: 13, height: 13, animation: 'spin .7s linear infinite' }} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,.1)" strokeWidth="3" />
          <path d="M4 12a8 8 0 018-8" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
        </svg>
        Generating hooks…
      </div>
      {[75, 60, 85, 68, 78].map((w, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,.04)' : 'none' }}>
          <div style={{ width: 24, height: 24, borderRadius: 7, flexShrink: 0, background: 'rgba(255,255,255,.05)', animation: `shimmer 1.4s ease-in-out ${i * .11}s infinite` }} />
          <div style={{ height: 12, borderRadius: 6, background: 'rgba(255,255,255,.05)', width: `${w}%`, animation: `shimmer 1.4s ease-in-out ${i * .11}s infinite` }} />
        </div>
      ))}
    </div>
  )
}

// ── Page export wrapped in Suspense (required for useSearchParams) ──
export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardInner />
    </Suspense>
  )
}
