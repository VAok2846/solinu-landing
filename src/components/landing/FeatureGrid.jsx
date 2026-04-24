import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { features } from '../../design/voice'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Simple functional SVG — one line-weight, single-color. Not decorative.
function Glyph({ kind }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: '0 0 28 28',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.25,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }
  switch (kind) {
    case 'perp':
      return (
        <svg {...common}>
          <path d="M3 22h22" />
          <path d="M7 22V14m0 0V11m0 3l0 5" />
          <rect x="5" y="11" width="4" height="6" />
          <path d="M13 22V9m0 0V6m0 3v10" />
          <rect x="11" y="6" width="4" height="9" />
          <path d="M19 22v-5m0 0v-2m0 2v7" />
          <rect x="17" y="15" width="4" height="4" />
        </svg>
      )
    case 'copy':
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="4" />
          <circle cx="18" cy="10" r="4" />
          <path d="M5 22c0-3 2-5 5-5s5 2 5 5" />
          <path d="M13 22c0-3 2-5 5-5s5 2 5 5" />
        </svg>
      )
    case 'custody':
      return (
        <svg {...common}>
          <rect x="4" y="11" width="20" height="12" rx="2" />
          <path d="M8 11V8a6 6 0 0 1 12 0v3" />
          <circle cx="14" cy="17" r="1.6" fill="currentColor" />
        </svg>
      )
    case 'solana':
      return (
        <svg {...common}>
          <path d="M7 8h14l-3 3H4l3-3Z" />
          <path d="M7 14h14l-3 3H4l3-3Z" />
          <path d="M7 20h14l-3-3H4l3 3Z" />
        </svg>
      )
    default:
      return <svg {...common}><circle cx="14" cy="14" r="6" /></svg>
  }
}

const KINDS = ['perp', 'copy', 'custody', 'solana']

export default function FeatureGrid() {
  const scope = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.fg-card', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: scope.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope },
  )

  return (
    <section
      ref={scope}
      aria-label="Features"
      style={{
        position: 'relative',
        padding: 'clamp(100px, 12vw, 160px) clamp(24px, 5vw, 80px)',
        background: 'var(--s-ink-stage)',
        borderTop: '1px solid var(--s-ink-hairline)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <header style={{ maxWidth: 820, marginBottom: 'clamp(48px, 5vw, 72px)' }}>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--s-font-display)',
              fontSize: 'clamp(32px, 4.2vw, 64px)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.04,
              color: 'var(--s-ink-100)',
              textWrap: 'balance',
            }}
          >
            Built for self-custodial perp trading.
          </h2>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(16px, 1.5vw, 24px)',
          }}
        >
          {features.map((f, i) => (
            <article
              key={f.label}
              className="fg-card"
              style={{
                position: 'relative',
                padding: 'clamp(22px, 2.4vw, 32px)',
                background: 'linear-gradient(180deg, var(--s-ink-panel), var(--s-ink-stage))',
                border: '1px solid var(--s-ink-border)',
                borderRadius: 'var(--s-radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(20px, 2vw, 32px)',
                minHeight: 260,
                transitionProperty: 'border-color, transform',
                transitionDuration: '220ms',
                transitionTimingFunction: 'var(--s-ease-out)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontFamily: 'var(--s-font-display)',
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: '-0.005em',
                    color: 'var(--s-gold-500)',
                  }}
                >
                  {f.label}
                </span>
                <span style={{ color: 'var(--s-ink-28)' }}>
                  <Glyph kind={KINDS[i] ?? 'perp'} />
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: 'var(--s-font-display)',
                    fontSize: 'clamp(22px, 2vw, 30px)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    color: 'var(--s-ink-100)',
                    textWrap: 'balance',
                  }}
                >
                  {f.head}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--s-font-body)',
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: 'var(--s-ink-55)',
                  }}
                >
                  {f.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .fg-card:hover { border-color: var(--s-gold-a24); transform: translateY(-2px); }
      `}</style>
    </section>
  )
}
