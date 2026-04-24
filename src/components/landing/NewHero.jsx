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

// Variational-style decorative plus-marker at fixed offsets from hero corners.
function PlusMark({ pos = 'tl' }) {
  const POS = {
    tl: { top:  'clamp(92px, 11vw, 140px)', left:  'clamp(20px, 3vw, 48px)' },
    tr: { top:  'clamp(92px, 11vw, 140px)', right: 'clamp(20px, 3vw, 48px)' },
    bl: { bottom: 'clamp(72px, 8vw, 110px)', left: 'clamp(20px, 3vw, 48px)' },
    br: { bottom: 'clamp(72px, 8vw, 110px)', right: 'clamp(20px, 3vw, 48px)' },
  }
  return (
    <span
      aria-hidden
      style={{
        position: 'absolute',
        ...POS[pos],
        width: 12,
        height: 12,
        pointerEvents: 'none',
        opacity: 0.5,
      }}
    >
      <span style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: 'var(--s-gold-a40)', transform: 'translateY(-50%)' }} />
      <span style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: 'var(--s-gold-a40)', transform: 'translateX(-50%)' }} />
    </span>
  )
}

export default function NewHero() {
  const scope = useRef(null)
  const { markets, vol24h, oi } = useSnapshot()

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.h-eye', { opacity: 0, y: 8, duration: 0.5 }, 0)
        .from('.h-headline', { opacity: 0, y: 24, duration: 0.9, ease: 'power4.out' }, 0.15)
        .from('.h-sub',   { opacity: 0, y: 14, duration: 0.7 }, 0.45)
        .from('.h-cta > *', { opacity: 0, y: 12, duration: 0.6, stagger: 0.08 }, 0.62)
        .from('.h-proof-cell', { opacity: 0, y: 14, duration: 0.6, stagger: 0.06 }, 0.85)
        .from('.h-scroll', { opacity: 0, duration: 0.6 }, 1.15)
        .from('.h-plus',   { opacity: 0, scale: 0.6, duration: 0.6, stagger: 0.08 }, 0.1)

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

  const proof = [
    { label: 'Markets',       value: String(markets) },
    { label: '24h volume',    value: `$${formatCompact(vol24h)}` },
    { label: 'Open interest', value: `$${formatCompact(oi)}` },
    { label: 'Chain',         value: 'Solana' },
  ]

  return (
    <section
      ref={scope}
      aria-label="Hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--s-ink-stage)',
        color: 'var(--s-ink-100)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingInline: 'clamp(20px, 5vw, 64px)',
        paddingBlock: 'clamp(120px, 14vw, 180px) clamp(60px, 8vw, 100px)',
      }}
    >
      <div
        aria-hidden
        className="h-grid"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--s-ink-06) 1px, transparent 1px), linear-gradient(90deg, var(--s-ink-06) 1px, transparent 1px)',
          backgroundSize: '64px 64px, 64px 64px',
          maskImage:
            'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 80%)',
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      />

      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '-5%',
          width: 'min(1400px, 120vw)',
          height: '70vh',
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(255, 210, 80, 0.10) 0%, rgba(255, 180, 40, 0.04) 38%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(4px)',
        }}
      />

      <span className="h-plus"><PlusMark pos="tl" /></span>
      <span className="h-plus"><PlusMark pos="tr" /></span>
      <span className="h-plus"><PlusMark pos="bl" /></span>
      <span className="h-plus"><PlusMark pos="br" /></span>

      <div
        style={{
          position: 'relative',
          maxWidth: 1120,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'clamp(20px, 2.6vw, 36px)',
        }}
      >
        <span
          className="h-eye"
          style={{
            fontFamily: 'var(--s-font-display)',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '-0.005em',
            color: 'var(--s-gold-500)',
          }}
        >
          {hero.eyebrow}
        </span>

        <h1
          className="h-headline"
          style={{
            margin: 0,
            fontFamily: 'var(--s-font-display)',
            fontSize: 'clamp(40px, 6.2vw, 104px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.02,
            color: 'var(--s-ink-100)',
            textWrap: 'balance',
            maxWidth: '18ch',
          }}
        >
          {hero.headline}
        </h1>

        <p
          className="h-sub"
          style={{
            margin: 0,
            maxWidth: '62ch',
            fontFamily: 'var(--s-font-body)',
            fontSize: 'clamp(15px, 1.15vw, 18px)',
            lineHeight: 1.55,
            color: 'var(--s-ink-55)',
            fontWeight: 400,
            textWrap: 'pretty',
          }}
        >
          {hero.sub}
        </p>

        <div
          className="h-cta"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginTop: 4,
          }}
        >
          <Link to="/trade" className="h-cta-primary">
            {hero.ctaPrimary}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to="/docs" className="h-cta-secondary">
            {hero.ctaSecondary}
          </Link>
        </div>

        <div
          style={{
            marginTop: 'clamp(28px, 3.5vw, 48px)',
            width: '100%',
            maxWidth: 980,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            borderTop: '1px solid var(--s-ink-hairline)',
            borderBottom: '1px solid var(--s-ink-hairline)',
            paddingBlock: 'clamp(18px, 2vw, 28px)',
          }}
        >
          {proof.map((p, i) => (
            <div
              key={p.label}
              className="h-proof-cell"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                borderLeft: i === 0 ? 'none' : '1px solid var(--s-ink-divider)',
                paddingInline: 'clamp(12px, 1.4vw, 20px)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--s-font-body)',
                  fontSize: 11,
                  fontWeight: 400,
                  color: 'var(--s-ink-40)',
                }}
              >
                {p.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--s-font-display)',
                  fontSize: 'clamp(18px, 1.8vw, 26px)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: 'var(--s-ink-100)',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1,
                }}
              >
                {p.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="h-scroll"
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 'clamp(20px, 2.5vw, 32px)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--s-font-body)',
            fontSize: 11,
            color: 'var(--s-ink-28)',
            letterSpacing: '0.02em',
          }}
        >
          Scroll
        </span>
        <div style={{ width: 1, height: 28, background: 'var(--s-ink-06)', position: 'relative', overflow: 'hidden' }}>
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
        .h-cta-primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          height: 50px; padding: 0 24px;
          background: var(--s-gold-500); color: #0a0700; text-decoration: none;
          font-family: var(--s-font-display); font-size: 14px; font-weight: 600; letter-spacing: -0.005em;
          border-radius: var(--s-radius-sm); border: none;
          transition-property: transform, background; transition-duration: 160ms;
          transition-timing-function: var(--s-ease-out); will-change: transform;
        }
        .h-cta-primary:hover  { background: var(--s-gold-400); transform: translateY(-1px); }
        .h-cta-primary:active { transform: translateY(0); }
        .h-cta-primary:focus-visible  { outline: 2px solid var(--s-gold-200); outline-offset: 3px; }

        .h-cta-secondary {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          height: 50px; padding: 0 22px;
          background: transparent; color: var(--s-ink-100); text-decoration: none;
          font-family: var(--s-font-display); font-size: 14px; font-weight: 500; letter-spacing: -0.005em;
          border-radius: var(--s-radius-sm); border: 1px solid var(--s-ink-18);
          transition-property: border-color, color, background; transition-duration: 160ms;
          transition-timing-function: var(--s-ease-out);
        }
        .h-cta-secondary:hover { border-color: var(--s-ink-40); background: var(--s-ink-06); }
        .h-cta-secondary:focus-visible { outline: 2px solid var(--s-gold-300); outline-offset: 3px; }
      `}</style>
    </section>
  )
}
