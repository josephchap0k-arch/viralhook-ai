'use client'

import Link from 'next/link'

interface NavbarProps {
  rightSlot?: React.ReactNode
  transparent?: boolean
}

export function Brand() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 30,
        height: 30,
        borderRadius: 9,
        background: 'linear-gradient(135deg,#6366f1,#818cf8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        boxShadow: '0 0 18px rgba(99,102,241,.55)',
      }}>⚡</div>
      <span style={{ fontWeight: 800, fontSize: 15.5, letterSpacing: -.5, color: '#f1f5f9' }}>
        Viral<span style={{ color: '#818cf8' }}>Hook</span>
        <span style={{ color: '#a5b4fc' }}> AI</span>
      </span>
    </div>
  )
}

export default function Navbar({ rightSlot, transparent = false }: NavbarProps) {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      height: 62,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      background: transparent ? 'transparent' : 'rgba(5,8,15,.92)',
      backdropFilter: 'blur(20px)',
      borderBottom: transparent ? 'none' : '1px solid rgba(255,255,255,.06)',
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <Brand />
      </Link>
      {rightSlot && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {rightSlot}
        </div>
      )}
    </nav>
  )
}

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,.05)',
      padding: '28px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16,
    }}>
      <Brand />
      <div style={{ display: 'flex', gap: 24 }}>
        {[['Pricing', '/pricing'], ['Privacy', '#'], ['Terms', '#'], ['Blog', '#']].map(([l, h]) => (
          <Link key={l} href={h} style={{ color: '#334155', fontSize: 13, textDecoration: 'none' }}>
            {l}
          </Link>
        ))}
      </div>
      <p style={{ margin: 0, color: '#1e293b', fontSize: 12 }}>
        © {new Date().getFullYear()} ViralHook AI
      </p>
    </footer>
  )
}
