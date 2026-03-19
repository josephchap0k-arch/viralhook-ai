'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Brand } from '@/components/Navbar'
import Spinner from '@/components/Spinner'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function handleGoogle() {
    setError('')
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) setError(error.message)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(155deg,#05080f 0%,#080d1c 40%,#0b1230 65%,#05080f 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', justifyContent: 'center', marginBottom: 28 }}>
            <Brand />
          </Link>
          <h1 style={{ margin: '0 0 10px', fontSize: 26, fontWeight: 800, letterSpacing: -.8, color: '#f1f5f9' }}>
            Welcome to ViralHook AI
          </h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: 15 }}>
            Sign in to start generating viral hooks
          </p>
        </div>

        <div style={{
          background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)',
          borderRadius: 24, padding: '36px 32px',
          boxShadow: '0 24px 72px rgba(0,0,0,.5)',
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
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
            onClick={handleGoogle}
            disabled={loading}
            style={{
              padding: '16px',
              background: loading ? 'rgba(255,255,255,.05)' : 'rgba(255,255,255,.08)',
              border: '1px solid rgba(255,255,255,.12)',
              borderRadius: 14, color: '#f1f5f9', fontSize: 15, fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              fontFamily: 'inherit',
            }}
          >
            {loading ? (
              <><Spinner /> Connecting…</>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </>
            )}
          </button>

          <p style={{ textAlign: 'center', margin: '8px 0 0', fontSize: 12, color: '#334155', lineHeight: 1.6 }}>
            5 free hooks per day · No credit card required.
          </p>
        </div>
      </div>
    </main>
  )
}