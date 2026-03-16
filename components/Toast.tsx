'use client'

interface ToastProps {
  message: string
}

export default function Toast({ message }: ToastProps) {
  if (!message) return null
  return (
    <div style={{
      position: 'fixed',
      bottom: 28,
      right: 28,
      zIndex: 500,
      background: '#1e293b',
      border: '1px solid rgba(255,255,255,.1)',
      borderRadius: 12,
      padding: '12px 20px',
      fontSize: 14,
      fontWeight: 600,
      color: '#e2e8f0',
      boxShadow: '0 8px 32px rgba(0,0,0,.5)',
      animation: 'slideUp .3s ease both',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      maxWidth: 320,
    }}>
      {message}
    </div>
  )
}
