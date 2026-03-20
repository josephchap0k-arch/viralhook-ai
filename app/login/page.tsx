'use client'
 
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Brand } from '@/components/Navbar'
import Spinner from '@/components/Spinner'
 
type Mode = 'login' | 'register' | 'forgot'
 
export default function LoginPage() {
  const [mode, setMode]         = useState<Mode>('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState('')
 
  function reset() {
    setError('')
    setSuccess('')
  }
 
  async function handleLogin() {
    reset()
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }
 
  async function handleRegister() {
    reset()
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) setError(error.message)
      else setSuccess('Check your email to confirm your account.')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }
 
  async function handleForgot() {
    reset()
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      })
      if (error) setError(error.message)
      else setSuccess('Password reset link sent! Check your email.')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }
 
  function handleSubmit() {
    if (mode === 'login')    handleLogin()
    if (mode === 'register') handleRegister()
    if (mode === 'forgot')   handleForgot()
  }
 
  const titles: Record<Mode, string> = {
    login:    'Welcome back',
    register: 'Create your account',
    forgot:   'Reset your password',
  }
  const subtitles: Record<Mode, string> = {
    login:    'Sign in to start generating viral hooks',
    register: 'Join thousands of creators using ViralHook AI',
    forgot:   'Enter your email and we\'ll send you a reset link',
  }
  const btnLabels: Record<Mode, string> = {
    login:    'Sign In',
    register: 'Create Account',
    forgot:   'Send Reset Link',
  }
 
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255,255,255,.04)',
    border: '1px solid rgba(255,255,255,.10)',
    borderRadius: 12,
    color: '#f1f5f9',
    fontSize: 15,
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color .2s',
  }
 
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(155deg,#05080f 0%,#080d1c 40%,#0b1230 65%,#05080f 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
 
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', justifyContent: 'center', marginBottom: 28 }}>
            <Brand />
          </Link>
          <h1 style={{ margin: '0 0 10px', fontSize: 26, fontWeight: 800, letterSpacing: -.8, color: '#f1f5f9' }}>
            {titles[mode]}
          </h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: 15 }}>
            {subtitles[mode]}
          </p>
        </div>
 
        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)',
          borderRadius: 24, padding: '36px 32px',
          boxShadow: '0 24px 72px rgba(0,0,0,.5)',
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
 
          {/* Error */}
          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(248,113,113,.07)', border: '1px solid rgba(248,113,113,.17)',
              borderRadius: 11, padding: '11px 15px', color: '#f87171', fontSize: 13,
            }}>
              <span>⚠</span><span>{error}</span>
            </div>
          )}
 
          {/* Success */}
          {success && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(52,211,153,.07)', border: '1px solid rgba(52,211,153,.17)',
              borderRadius: 11, padding: '11px 15px', color: '#34d399', fontSize: 13,
            }}>
              <span>✓</span><span>{success}</span>
            </div>
          )}
 
          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,.5)')}
              onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,.10)')}
            />
          </div>
 
          {/* Password (not shown in forgot mode) */}
          {mode !== 'forgot' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,.5)')}
                onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,.10)')}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              />
            </div>
          )}
 
          {/* Forgot password link (only in login mode) */}
          {mode === 'login' && (
            <div style={{ textAlign: 'right', marginTop: -6 }}>
              <button
                onClick={() => { setMode('forgot'); reset() }}
                style={{ background: 'none', border: 'none', color: '#8b5cf6', fontSize: 13, cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
              >
                Forgot password?
              </button>
            </div>
          )}
 
          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              marginTop: 4,
              padding: '16px',
              background: loading ? 'rgba(139,92,246,.3)' : 'linear-gradient(135deg,#7c3aed,#6d28d9)',
              border: 'none',
              borderRadius: 14, color: '#fff', fontSize: 15, fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              fontFamily: 'inherit',
              transition: 'opacity .2s',
            }}
          >
            {loading ? <><Spinner /> Loading…</> : btnLabels[mode]}
          </button>
 
          {/* Mode switcher */}
          <div style={{ textAlign: 'center', marginTop: 4, fontSize: 13, color: '#475569' }}>
            {mode === 'login' && (
              <>Don't have an account?{' '}
                <button onClick={() => { setMode('register'); reset() }}
                  style={{ background: 'none', border: 'none', color: '#8b5cf6', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, padding: 0 }}>
                  Sign up
                </button>
              </>
            )}
            {mode === 'register' && (
              <>Already have an account?{' '}
                <button onClick={() => { setMode('login'); reset() }}
                  style={{ background: 'none', border: 'none', color: '#8b5cf6', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, padding: 0 }}>
                  Sign in
                </button>
              </>
            )}
            {mode === 'forgot' && (
              <>Remember it?{' '}
                <button onClick={() => { setMode('login'); reset() }}
                  style={{ background: 'none', border: 'none', color: '#8b5cf6', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, padding: 0 }}>
                  Back to sign in
                </button>
              </>
            )}
          </div>
 
          {mode === 'login' && (
            <p style={{ textAlign: 'center', margin: '4px 0 0', fontSize: 12, color: '#334155', lineHeight: 1.6 }}>
              5 free hooks per day · No credit card required.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}