'use client'
 
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Brand } from '@/components/Navbar'
import Spinner from '@/components/Spinner'
 
export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [success, setSuccess]     = useState(false)
 
  async function handleReset() {
    setError('')
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password })
      if (error) setError(error.message)
      else {
        setSuccess(true)
        setTimeout(() => router.push('/dashboard'), 2500)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
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
            Set new password
          </h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: 15 }}>
            Choose a strong password for your account
          </p>
        </div>
 
        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)',
          borderRadius: 24, padding: '36px 32px',
          boxShadow: '0 24px 72px rgba(0,0,0,.5)',
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
 
          {/* Success state */}
          {success ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
              padding: '12px 0', textAlign: 'center',
            }}>
              <div style={{ fontSize: 48 }}>✅</div>
              <p style={{ color: '#34d399', fontWeight: 700, fontSize: 16, margin: 0 }}>
                Password updated!
              </p>
              <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>
                Redirecting to dashboard…
              </p>
            </div>
          ) : (
            <>
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
 
              {/* New password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>New password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,.5)')}
                  onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,.10)')}
                />
              </div>
 
              {/* Confirm password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>Confirm password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = 'rgba(139,92,246,.5)')}
                  onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,.10)')}
                  onKeyDown={e => e.key === 'Enter' && handleReset()}
                />
              </div>
 
              {/* Submit */}
              <button
                onClick={handleReset}
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
                }}
              >
                {loading ? <><Spinner /> Updating…</> : 'Update Password'}
              </button>
 
              <div style={{ textAlign: 'center', fontSize: 13, color: '#475569' }}>
                <Link href="/login" style={{ color: '#8b5cf6', textDecoration: 'none', fontWeight: 600 }}>
                  Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}