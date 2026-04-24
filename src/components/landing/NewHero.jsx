import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { hero } from '../../design/voice'
import { formatCompact } from '../../design/format'

gsap.registerPlugin(useGSAP)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const ORDERLY_REST_BASE = 'https://api-evm.orderly.network'

async function fetchSnapshot(signal) {
  try {
    const res = await fetch(`${ORDERLY_REST_BASE}/v1/public/futures`, { signal })
    if (!res.ok) return null
    const stats = await res.json()
    const rows = Array.isArray(stats?.data?.rows) ? stats.data.rows : []
    if (rows.length === 0) return null
    const vol24h = rows.reduce((a, r) => a + Number(r?.['24h_amount'] || 0), 0)
    const oi = rows.reduce((a, r) => a + Number(r?.open_interest || 0) * Number(r?.mark_price || 0), 0)
    return { markets: rows.length, vol24h, oi }
  } catch { return null }
}

const BASELINE = { markets: 62, vol24h: 1.8e9, oi: 4.2e8 }

function useSnapshot() {
  const [snap, setSnap] = useState(BASELINE)
  useEffect(() => {
    const ac = new AbortController()
    fetchSnapshot(ac.signal).then((s) => { if (s) setSnap(s) })
    return () => ac.abort()
  }, [])
  return snap
}

// Signature SVG pattern: floating crosshairs that drift slowly
function SignaturePattern() {
  return (
    <svg
      aria-hidden
      className="h-pattern"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      <defs>
        <linearGradient id="gold-fade-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--s-gold-500)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--s-gold-500)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--s-gold-500)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gold-fade-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--s-gold-500)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--s-gold-500)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--s-gold-500)" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Top left crosshair */}
      <g className="h-cross h-cross-tl" style={{ transform: 'translate(8%, 15%)' }}>
        <line x1="-32" y1="0" x2="32" y2="0" stroke="url(#gold-fade-h)" strokeWidth="1" />
        <line x1="0" y1="-32" x2="0" y2="32" stroke="url(#gold-fade-v)" strokeWidth="1" />
        <circle cx="0" cy="0" r="3" fill="none" stroke="var(--s-gold-500)" strokeWidth="0.5" opacity="0.4" />
      </g>
      
      {/* Top right crosshair */}
      <g className="h-cross h-cross-tr" style={{ transform: 'translate(92%, 12%)' }}>
        <line x1="-24" y1="0" x2="24" y2="0" stroke="url(#gold-fade-h)" strokeWidth="1" />
        <line x1="0" y1="-24" x2="0" y2="24" stroke="url(#gold-fade-v)" strokeWidth="1" />
        <circle cx="0" cy="0" r="2" fill="none" stroke="var(--s-gold-500)" strokeWidth="0.5" opacity="0.35" />
      </g>
      
      {/* Bottom left */}
      <g className="h-cross h-cross-bl" style={{ transform: 'translate(5%, 78%)' }}>
        <line x1="-20" y1="0" x2="20" y2="0" stroke="url(#gold-fade-h)" strokeWidth="1" />
        <line x1="0" y1="-20" x2="0" y2="20" stroke="url(#gold-fade-v)" strokeWidth="1" />
      </g>
      
      {/* Bottom right */}
      <g className="h-cross h-cross-br" style={{ transform: 'translate(95%, 82%)' }}>
        <line x1="-28" y1="0" x2="28" y2="0" stroke="url(#gold-fade-h)" strokeWidth="1" />
        <line x1="0" y1="-28" x2="0" y2="28" stroke="url(#gold-fade-v)" strokeWidth="1" />
        <circle cx="0" cy="0" r="4" fill="none" stroke="var(--s-gold-500)" strokeWidth="0.5" opacity="0.3" />
      </g>

      {/* Center accent lines - extending from content */}
      <line 
        className="h-line-left"
        x1="0" y1="50%" x2="18%" y2="50%" 
        stroke="url(#gold-fade-h)" 
        strokeWidth="1" 
        opacity="0.5"
      />
      <line 
        className="h-line-right"
        x1="82%" y1="50%" x2="100%" y2="50%" 
        stroke="url(#gold-fade-h)" 
        strokeWidth="1" 
        opacity="0.5"
      />
    </svg>
  )
}

export default function NewHero() {
  const scope = useRef(null)
  const { markets, vol24h, oi } = useSnapshot()

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Staggered content reveal
      tl.from('.h-eye', { opacity: 0, y: 12, duration: 0.6 }, 0)
        .from('.h-headline-word', { 
          opacity: 0, 
          y: 40, 
          rotationX: -15,
          transformOrigin: 'center bottom',
          duration: 0.8, 
          ease: 'power4.out',
          stagger: 0.08 
        }, 0.1)
        .from('.h-sub', { opacity: 0, y: 16, duration: 0.7 }, 0.5)
        .from('.h-cta > *', { opacity: 0, y: 14, duration: 0.5, stagger: 0.06 }, 0.7)
        .from('.h-stat-card', { opacity: 0, y: 20, duration: 0.6, stagger: 0.05 }, 0.9)
        .from('.h-scroll', { opacity: 0, duration: 0.5 }, 1.2)

      // Pattern elements fade in
      tl.from('.h-cross', { 
        opacity: 0, 
        scale: 0.5, 
        duration: 0.8, 
        stagger: 0.1,
        ease: 'power2.out' 
      }, 0.2)
      tl.from('.h-line-left, .h-line-right', {
        opacity: 0,
        duration: 1,
      }, 0.6)

      // Subtle floating animation for crosshairs
      gsap.to('.h-cross-tl', {
        y: 8,
        x: 4,
        duration: 6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
      gsap.to('.h-cross-tr', {
        y: -6,
        x: -5,
        duration: 7,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
      gsap.to('.h-cross-bl', {
        y: -5,
        x: 6,
        duration: 5.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
      gsap.to('.h-cross-br', {
        y: 7,
        x: -4,
        duration: 6.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      // Scroll indicator pulse
      gsap.to('.h-scroll-line', {
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none',
        repeat: -1,
        duration: 2.0,
        yoyo: true,
      })
    },
    { scope },
  )

  const stats = [
    { label: 'Markets', value: String(markets) },
    { label: '24h Volume', value: `$${formatCompact(vol24h)}` },
    { label: 'Open Interest', value: `$${formatCompact(oi)}` },
    { label: 'Chain', value: 'Solana' },
  ]

  // Split headline into words for staggered animation
  const headlineWords = hero.headline.split(' ')

  return (
    <section
      ref={scope}
      aria-label="Hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        minHeight: '100dvh',
        background: 'var(--s-ink-stage)',
        color: 'var(--s-ink-100)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingInline: 'clamp(20px, 5vw, 64px)',
        paddingBlock: 'clamp(100px, 12vw, 160px) clamp(80px, 10vw, 120px)',
      }}
    >
      {/* Subtle radial glow at bottom */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '-10%',
          width: 'min(1600px, 140vw)',
          height: '60vh',
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(ellipse 55% 70% at 50% 100%, rgba(255, 215, 0, 0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Signature pattern */}
      <SignaturePattern />

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          maxWidth: 1200,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 0,
        }}
      >
        {/* Eyebrow */}
        <span
          className="h-eye"
          style={{
            fontFamily: 'var(--s-font-display)',
            fontSize: 'clamp(12px, 0.9vw, 14px)',
            fontWeight: 500,
            letterSpacing: '0.02em',
            color: 'var(--s-gold-500)',
            marginBottom: 'clamp(20px, 2.5vw, 32px)',
          }}
        >
          {hero.eyebrow}
        </span>

        {/* Headline - much larger, tighter tracking */}
        <h1
          className="h-headline"
          style={{
            margin: 0,
            fontFamily: 'var(--s-font-display)',
            fontSize: 'clamp(44px, 7.5vw, 120px)',
            fontWeight: 600,
            letterSpacing: '-0.035em',
            lineHeight: 0.95,
            color: 'var(--s-ink-100)',
            maxWidth: '15ch',
            marginBottom: 'clamp(24px, 3vw, 40px)',
          }}
        >
          {headlineWords.map((word, i) => (
            <span
              key={i}
              className="h-headline-word"
              style={{ 
                display: 'inline-block',
                marginRight: '0.28em',
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Sub - tighter, more technical feel */}
        <p
          className="h-sub"
          style={{
            margin: 0,
            maxWidth: '58ch',
            fontFamily: 'var(--s-font-body)',
            fontSize: 'clamp(15px, 1.1vw, 17px)',
            lineHeight: 1.6,
            color: 'var(--s-ink-55)',
            fontWeight: 400,
            marginBottom: 'clamp(32px, 3.5vw, 48px)',
          }}
        >
          {hero.sub}
        </p>

        {/* CTAs */}
        <div
          className="h-cta"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            marginBottom: 'clamp(48px, 5vw, 72px)',
          }}
        >
          <Link to="/trade" className="h-cta-primary">
            {hero.ctaPrimary}
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
              <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to="/docs" className="h-cta-secondary">
            {hero.ctaSecondary}
          </Link>
        </div>

        {/* Stats grid - more prominent, tile-like */}
        <div
          className="h-stats"
          style={{
            width: '100%',
            maxWidth: 900,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: 'var(--s-ink-border)',
            borderRadius: 'var(--s-radius-md)',
            overflow: 'hidden',
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="h-stat-card"
              style={{
                background: 'var(--s-ink-panel)',
                padding: 'clamp(20px, 2.5vw, 32px) clamp(16px, 2vw, 24px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--s-font-body)',
                  fontSize: 'clamp(10px, 0.75vw, 11px)',
                  fontWeight: 500,
                  color: 'var(--s-ink-40)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {stat.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--s-font-display)',
                  fontSize: 'clamp(20px, 2.2vw, 32px)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: 'var(--s-ink-100)',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="h-scroll"
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 'clamp(24px, 3vw, 40px)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--s-font-body)',
            fontSize: 10,
            fontWeight: 500,
            color: 'var(--s-ink-28)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <div style={{ width: 1, height: 24, background: 'var(--s-ink-10)', position: 'relative', overflow: 'hidden' }}>
          <span
            className="h-scroll-line"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--s-gold-500)',
              transform: 'scaleY(0)',
              transformOrigin: 'top center',
            }}
          />
        </div>
      </div>

      <style>{`
        /* Primary CTA */
        .h-cta-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          height: 52px;
          padding: 0 28px;
          background: var(--s-gold-500);
          color: #080700;
          text-decoration: none;
          font-family: var(--s-font-display);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
          border-radius: var(--s-radius-sm);
          border: none;
          transition: transform 160ms var(--s-ease-out), background 160ms var(--s-ease-out), box-shadow 160ms var(--s-ease-out);
          will-change: transform;
        }
        .h-cta-primary:hover {
          background: var(--s-gold-400);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 215, 0, 0.2);
        }
        .h-cta-primary:active {
          transform: translateY(0);
        }
        .h-cta-primary:focus-visible {
          outline: 2px solid var(--s-gold-200);
          outline-offset: 3px;
        }

        /* Secondary CTA */
        .h-cta-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          height: 52px;
          padding: 0 26px;
          background: transparent;
          color: var(--s-ink-90);
          text-decoration: none;
          font-family: var(--s-font-display);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.01em;
          border-radius: var(--s-radius-sm);
          border: 1px solid var(--s-ink-18);
          transition: border-color 160ms var(--s-ease-out), background 160ms var(--s-ease-out), color 160ms var(--s-ease-out);
        }
        .h-cta-secondary:hover {
          border-color: var(--s-ink-40);
          background: var(--s-ink-06);
          color: var(--s-ink-100);
        }
        .h-cta-secondary:focus-visible {
          outline: 2px solid var(--s-gold-300);
          outline-offset: 3px;
        }

        /* Stat card hover */
        .h-stat-card {
          transition: background 200ms var(--s-ease-out);
        }
        .h-stat-card:hover {
          background: var(--s-ink-raised);
        }

        /* Responsive stats grid */
        @media (max-width: 640px) {
          .h-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}
