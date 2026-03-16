'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createUser, loginUser } from '@/lib/storage'
import { Brand } from '@/components/Navbar'
import Spinner from '@/components/Spinner'

export default function LoginPage() {
  const router = useRouter()
  const [mode,     setMode]     = useState<'signin' | 'signup'>('signin')
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  useEffect(() => {
    try { if (localStorage.getItem('vh_user')) router.replace('/dashboard') } catch {}
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await new Promise(r => setTimeout(r, 500))
      if (mode === 'signup') {
        if (!name.trim()) { setError('Name is required.'); return }
        createUser(email.trim(), name.trim())
      } else {
        loginUser(email.trim())
      }
      router.push('/dashboard')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  function switchMode() {
    setMode(m => m === 'signin' ? 'signup' : 'signin')
    setError('')
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(155deg,#05080f 0%,#080d1c 40%,#0b1230 65%,#05080f 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ width: '100%', maxWidth: 440 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', justifyContent: 'center', marginBottom: 28 }}>
            <Brand />
          </Link>
          <h1 style={{ margin: '0 0 10px', fontSize: 26, fontWeight: 800, letterSpacing: -.8, color: '#f1f5f9' }}>
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: 15 }}>
            {mode === 'signin' ? 'Sign in to your dashboard' : 'Start generating viral hooks for free'}
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)',
          borderRadius: 24, padding: '36px 32px',
          boxShadow: '0 24px 72px rgba(0,0,0,.5)',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {mode === 'signup' && (
              <Field label="Full name"      type="text"     value={name}     onChange={setName}     placeholder="Your name" />
            )}
            <Field   label="Email address" type="email"    value={email}    onChange={setEmail}    placeholder="you@example.com" />
            <Field   label="Password"      type="password" value={password} onChange={setPassword} placeholder="••••••••" />

            {error && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(248,113,113,.07)', border: '1px solid rgba(248,113,113,.17)',
                borderRadius: 11, padding: '11px 15px', color: '#f87171', fontSize: 13,
              }}>
                <span>⚠</span><span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 4, padding: '16px',
                background: loading ? 'rgba(99,102,241,.3)' : 'linear-gradient(135deg,#6366f1,#4f46e5)',
                border: 'none', borderRadius: 14, color: '#fff', fontSize: 15, fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                boxShadow: loading ? 'none' : '0 6px 24px rgba(99,102,241,.4)',
                fontFamily: 'inherit', transition: 'transform .15s',
              }}
            >
              {loading
                ? <><Spinner /> {mode === 'signin' ? 'Signing in…' : 'Creating account…'}</>
                : mode === 'signin' ? 'Sign in →' : 'Create account →'
              }
            </button>
          </form>

          <p style={{ textAlign: 'center', margin: '22px 0 0', fontSize: 14, color: '#475569' }}>
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={switchMode}
              style={{
                background: 'none', border: 'none', color: '#818cf8',
                fontWeight: 600, cursor: 'pointer', fontSize: 14,
                padding: 0, fontFamily: 'inherit',
              }}
            >
              {mode === 'signin' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}

// ── Sub-component ─────────────────────────────────────────────
function Field({
  label, type, value, onChange, placeholder,
}: {
  label: string; type: string; value: string
  onChange: (v: string) => void; placeholder: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label style={{
        display: 'block', fontSize: 11, fontWeight: 700,
        color: '#475569', letterSpacing: 2, marginBottom: 8,
        textTransform: 'uppercase',
      }}>{label}</label>
      <input
        type={type}
        value={value}
        required
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          width: '100%', background: 'rgba(0,0,0,.3)',
          border: focused ? '1px solid rgba(129,140,248,.7)' : '1px solid rgba(255,255,255,.09)',
          boxShadow: focused ? '0 0 0 4px rgba(99,102,241,.11)' : 'none',
          borderRadius: 12, padding: '13px 16px', color: '#f1f5f9', fontSize: 15,
          outline: 'none', fontFamily: 'inherit', transition: 'border-color .2s, box-shadow .2s',
        }}
      />
    </div>
  )
}
