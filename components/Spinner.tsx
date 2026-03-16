'use client'

interface SpinnerProps {
  size?: number
  color?: string
}

export default function Spinner({ size = 18, color = '#fff' }: SpinnerProps) {
  return (
    <svg
      style={{ width: size, height: size, animation: 'spin .7s linear infinite', flexShrink: 0 }}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,.2)" strokeWidth="3" />
      <path d="M4 12a8 8 0 018-8" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
