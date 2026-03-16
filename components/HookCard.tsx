'use client'

import { useState } from 'react'

interface HookCardProps {
  index: number
  text: string
  animate?: boolean
}

export default function HookCard({ index, text, animate = true }: HookCardProps) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(text).catch(() => {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    })
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
        padding: '16px 22px',
        borderBottom: '1px solid rgba(255,255,255,.045)',
        transition: 'background .15s',
        animation: animate ? `fadeUp .4s ease ${index * 0.06}s both` : 'none',
        cursor: 'default',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,.025)')}
      onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'transparent')}
    >
      {/* Number badge */}
      <span style={{
        flexShrink: 0,
        width: 26,
        height: 26,
        borderRadius: 8,
        background: 'rgba(99,102,241,.14)',
        border: '1px solid rgba(99,102,241,.22)',
        color: '#818cf8',
        fontSize: 11,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {index + 1}
      </span>

      {/* Hook text */}
      <p style={{ flex: 1, margin: 0, color: '#e2e8f0', fontSize: 14, lineHeight: 1.65 }}>
        {text}
      </p>

      {/* Copy button */}
      <button
        onClick={copy}
        style={{
          flexShrink: 0,
          borderRadius: 8,
          fontSize: 11,
          fontWeight: 600,
          padding: '5px 13px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'all .15s',
          background: copied ? 'rgba(99,102,241,.22)' : 'rgba(255,255,255,.04)',
          border: copied ? '1px solid rgba(99,102,241,.45)' : '1px solid rgba(255,255,255,.08)',
          color: copied ? '#a5b4fc' : '#64748b',
        }}
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
    </div>
  )
}
