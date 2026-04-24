import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { hero } from '../design/copy'
import { formatCompact } from '../design/format'

const ORDERLY_REST = 'https://api-evm.orderly.network'
const BASELINE = { markets: 62, vol24h: 1.8e9, oi: 4.2e8 }

async function fetchSnapshot(signal) {
  try {
    const res = await fetch(`${ORDERLY_REST}/v1/public/futures`, { signal })
    if (!res.ok) return null
    const stats = await res.json()
    const rows = Array.isArray(stats?.data?.rows) ? stats.data.rows : []
    if (rows.length === 0) return null
    const vol24h = rows.reduce((a, r) => a + Number(r?.['24h_amount'] || 0), 0)
    const oi = rows.reduce((a, r) => a + Number(r?.open_interest || 0) * Number(r?.mark_price || 0), 0)
    return { markets: rows.length, vol24h, oi }
  } catch { return null }
}

function useSnapshot() {
  const [snap, setSnap] = useState(BASELINE)
  useEffect(() => {
    const ac = new AbortController()
    fetchSnapshot(ac.signal).then((s) => { if (s) setSnap(s) })
    return () => ac.abort()
  }, [])
  return snap
}

const EASE = [0.22, 1, 0.36, 1]

export default function Hero() {
  const { markets, vol24h, oi } = useSnapshot()
  const reduced = useReducedMotion()

  const proof = [
    { label: 'Markets',       value: String(markets) },
    { label: '24h volume',    value: `$${formatCompact(vol24h)}` },
    { label: 'Open interest', value: `$${formatCompact(oi)}` },
    { label: 'Chain',         value: 'Solana' },
  ]

  return (
    <section
      aria-label="Hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--bg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingInline: 'clamp(20px, 5vw, 64px)',
        paddingBlock: 'clamp(140px, 14vw, 180px) clamp(60px, 8vw, 100px)',
      }}
    >
      {/* Bottom gold radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '-15%',
          width: 'min(1600px, 140vw)',
          height: '90vh',
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(255, 210, 80, 0.14) 0%, rgba(255, 180, 40, 0.06) 35%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(2px)',
        }}
      />

      {/* Grid pattern — subtle tech texture */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 65% 55% at 50% 45%, black 0%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 45%, black 0%, transparent 78%)',
          pointerEvents: 'none',
          opacity: 0.65,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1120,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'clamp(24px, 2.8vw, 40px)',
        }}
      >
        {/* Eyebrow pill */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            paddingInline: 14,
            paddingBlock: 6,
            background: 'var(--gold-a06)',
            border: '1px solid var(--gold-a24)',
            borderRadius: 'var(--r-full)',
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: 0,
            color: 'var(--gold-300)',
          }}
        >
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--gold-500)',
              boxShadow: '0 0 8px var(--gold-a60)',
            }}
          />
          {hero.eyebrow}
        </motion.div>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 7.2vw, 120px)',
            fontWeight: 600,
            letterSpacing: '-0.035em',
            lineHeight: 1.02,
            color: 'var(--ink-100)',
            textWrap: 'balance',
            maxWidth: '18ch',
          }}
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          style={{
            margin: 0,
            maxWidth: '62ch',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(15px, 1.15vw, 18px)',
            lineHeight: 1.55,
            color: 'var(--ink-55)',
            fontWeight: 400,
            textWrap: 'pretty',
          }}
        >
          {hero.sub}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginTop: 4,
          }}
        >
          <Link to="/trade" className="hero-cta-primary">
            {hero.ctaPrimary}
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
          <Link to="/docs" className="hero-cta-secondary">
            {hero.ctaSecondary}
          </Link>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
          style={{
            marginTop: 'clamp(24px, 3vw, 40px)',
            width: '100%',
            maxWidth: 960,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            paddingBlock: 'clamp(20px, 2vw, 28px)',
          }}
        >
          {proof.map((p, i) => (
            <div
              key={p.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.04)',
                paddingInline: 'clamp(12px, 1.4vw, 24px)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  color: 'var(--ink-40)',
                  textTransform: 'uppercase',
                }}
              >
                {p.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(20px, 2vw, 28px)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: 'var(--ink-100)',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1,
                }}
              >
                {p.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .hero-cta-primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          height: 52px; padding: 0 26px;
          background: var(--gold-500); color: #0a0700;
          font-family: var(--font-body); font-size: 14px; font-weight: 600; letter-spacing: -0.005em;
          border-radius: var(--r-full);
          transition-property: transform, background, box-shadow;
          transition-duration: 180ms;
          transition-timing-function: var(--ease-out);
          will-change: transform;
        }
        .hero-cta-primary:hover  { background: var(--gold-400); transform: translateY(-1px); box-shadow: var(--gold-glow); }
        .hero-cta-primary:active { transform: translateY(0); }
        .hero-cta-primary:focus-visible { outline: 2px solid var(--gold-200); outline-offset: 3px; }

        .hero-cta-secondary {
          display: inline-flex; align-items: center; justify-content: center;
          height: 52px; padding: 0 22px;
          color: var(--ink-100); background: transparent;
          font-family: var(--font-body); font-size: 14px; font-weight: 500;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--r-full);
          transition-property: border-color, background;
          transition-duration: 160ms;
          transition-timing-function: var(--ease-out);
        }
        .hero-cta-secondary:hover { border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.04); }
        .hero-cta-secondary:focus-visible { outline: 2px solid var(--gold-300); outline-offset: 3px; }
      `}</style>
    </section>
  )
}
