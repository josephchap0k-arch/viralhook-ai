import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ViralHook AI — Viral Hooks for TikTok, Reels & YouTube',
  description: 'Generate 5 scroll-stopping hooks for your short-form videos in seconds.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        background: '#05080f',
        color: '#f1f5f9',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}>
        {children}
        <style>{`
          *, *::before, *::after { box-sizing: border-box; }
          input::placeholder { color: #2d3748; }
          a { color: inherit; }
          button { cursor: pointer; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 3px; }
          @keyframes spin    { to { transform: rotate(360deg); } }
          @keyframes fadeUp  { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
          @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
          @keyframes shimmer { 0%,100%{opacity:.3} 50%{opacity:.75} }
          @keyframes glow    { 0%,100%{opacity:1} 50%{opacity:.35} }
          @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        `}</style>
      </body>
    </html>
  )
}
