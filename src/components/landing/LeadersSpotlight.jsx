import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { formatSignedPrice } from '../../design/format'
import { leaders as copy } from '../../design/voice'
import { Sparkline } from '../../design/primitives'

// Standalone bundle — no backend here. Wire this back to your real
// /api/copy/traders/featured endpoint when you re-integrate with the app.
async function getFeaturedTraders() {
  return { traders: [
    { display_name: 'KEVALDO', avatar_url: 'https://i.ibb.co/8nHm3BmS/photo-2024-10-08-15-13-37.jpg', pnl_30d: 128400, trader_id: 1125 },
    { display_name: 'Coming soon', avatar_url: null, pnl_30d: null, trader_id: null },
    { display_name: 'Coming soon', avatar_url: null, pnl_30d: null, trader_id: null },
  ] }
}

gsap.registerPlugin(useGSAP, ScrollTrigger)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const FALLBACK = [
  { name: 'KEVALDO', avatar: 'https://i.ibb.co/8nHm3BmS/photo-2024-10-08-15-13-37.jpg', pnl30d: 0, traderId: 1125 },
  { name: '—', avatar: null, pnl30d: null, traderId: null },
  { name: '—', avatar: null, pnl30d: null, traderId: null },
]

function useFeatured() {
  const [rows, setRows] = useState(FALLBACK)

  useEffect(() => {
    let cancelled = false
    getFeaturedTraders()
      .then((data) => {
        if (cancelled) return
        const list = Array.isArray(data?.traders) ? data.traders : Array.isArray(data) ? data : []
        if (list.length === 0) return
        setRows(list.slice(0, 5).map((t) => ({
          name: t.display_name || t.name || '—',
          avatar: t.avatar_url || t.avatar || null,
          pnl30d: t.pnl_30d ?? t.stats?.pnl_30d ?? null,
          traderId: t.trader_id ?? t.id ?? null,
        })))
      })
      .catch(() => { /* fallback stays */ })
    return () => { cancelled = true }
  }, [])

  return rows
}

function hashSeed(s) {
  let h = 5381
  const str = String(s ?? '')
  for (let i = 0; i < str.length; i++) h = (h * 33) ^ str.charCodeAt(i)
  return (h >>> 0) || 1
}

function LeaderRow({ row }) {
  const hasMetrics = Number.isFinite(row.pnl30d) && row.pnl30d !== 0
  const pnlColor = !hasMetrics ? 'var(--s-ink-28)'
    : row.pnl30d > 0 ? 'var(--s-pnl-up)'
    : row.pnl30d < 0 ? 'var(--s-pnl-down)'
    : 'var(--s-ink-55)'
  const trend = row.pnl30d > 0 ? 20 : row.pnl30d < 0 ? -20 : 0
  const seed = hashSeed(row.traderId ?? row.name)

  return (
    <div
      className="lead-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '48px minmax(0, 1fr) 120px minmax(0, auto) 140px',
        gap: 'clamp(12px, 1.6vw, 28px)',
        alignItems: 'center',
        padding: 'clamp(20px, 2.2vw, 28px) 0',
        borderBottom: '1px solid var(--s-ink-divider)',
      }}
    >
      <div
        aria-hidden
        style={{
          width: 40,
          height: 40,
          borderRadius: 'var(--s-radius-full)',
          background: row.avatar
            ? `#0a0a10 center/cover no-repeat url(${row.avatar})`
            : 'var(--s-ink-sunken)',
          border: '1px solid var(--s-ink-border)',
        }}
      />

      <span
        style={{
          fontFamily: 'var(--s-font-display)',
          fontSize: 'clamp(18px, 1.6vw, 24px)',
          fontWeight: 500,
          letterSpacing: '-0.015em',
          color: 'var(--s-ink-100)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          minWidth: 0,
        }}
      >
        {row.name}
      </span>

      <div style={{ display: row.traderId ? 'flex' : 'none', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Sparkline seed={seed} trend={trend} width={120} height={28} />
      </div>

      <span
        style={{
          fontFamily: 'var(--s-font-display)',
          fontSize: 'clamp(14px, 1.2vw, 17px)',
          fontWeight: 500,
          fontVariantNumeric: 'tabular-nums',
          color: pnlColor,
          justifySelf: 'end',
        }}
      >
        {hasMetrics ? formatSignedPrice(row.pnl30d, { minDecimals: 0, maxDecimals: 0 }) : ''}
      </span>

      {row.traderId ? (
        <Link
          to={`/copytrade?trader=${row.traderId}`}
          className="lead-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            padding: '0 18px',
            fontFamily: 'var(--s-font-display)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--s-ink-100)',
            background: 'transparent',
            border: '1px solid var(--s-ink-18)',
            borderRadius: 'var(--s-radius-sm)',
            textDecoration: 'none',
            transitionProperty: 'border-color, background, color',
            transitionDuration: '160ms',
            transitionTimingFunction: 'var(--s-ease-out)',
          }}
        >
          {copy.cta}
        </Link>
      ) : (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: 40,
            fontFamily: 'var(--s-font-body)',
            fontSize: 13,
            color: 'var(--s-ink-28)',
          }}
        >
          Coming soon
        </span>
      )}
    </div>
  )
}

export default function LeadersSpotlight() {
  const scope = useRef(null)
  const rows = useFeatured()

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.lead-row', {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: scope.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope },
  )

  return (
    <section
      ref={scope}
      style={{
        position: 'relative',
        padding: 'clamp(100px, 12vw, 160px) clamp(24px, 5vw, 80px)',
        background: 'var(--s-ink-stage)',
        borderTop: '1px solid var(--s-ink-hairline)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <header
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) auto',
            alignItems: 'baseline',
            gap: 'clamp(16px, 2vw, 48px)',
            marginBottom: 'clamp(40px, 4vw, 64px)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--s-font-display)',
                fontSize: 'clamp(32px, 4.2vw, 64px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                lineHeight: 1.04,
                color: 'var(--s-ink-100)',
                maxWidth: 780,
                textWrap: 'balance',
              }}
            >
              {copy.title}
            </h2>
            {copy.sub ? (
              <p
                style={{
                  margin: 0,
                  maxWidth: '56ch',
                  fontFamily: 'var(--s-font-body)',
                  fontSize: 'clamp(14px, 1.1vw, 17px)',
                  lineHeight: 1.5,
                  color: 'var(--s-ink-55)',
                }}
              >
                {copy.sub}
              </p>
            ) : null}
          </div>

          <Link
            to="/copytrade"
            className="lead-all"
            style={{
              fontFamily: 'var(--s-font-display)',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--s-ink-55)',
              textDecoration: 'none',
              transitionProperty: 'color',
              transitionDuration: '160ms',
              transitionTimingFunction: 'var(--s-ease-out)',
              whiteSpace: 'nowrap',
            }}
          >
            {copy.allLink} →
          </Link>
        </header>

        <div style={{ borderTop: '1px solid var(--s-ink-hairline)' }}>
          {rows.map((row, idx) => (
            <LeaderRow key={row.traderId ?? `empty-${idx}`} row={row} />
          ))}
        </div>
      </div>

      <style>{`
        .lead-cta:hover { border-color: var(--s-gold-500); color: var(--s-gold-300); background: var(--s-gold-a08); }
        .lead-cta:focus-visible { outline: 2px solid var(--s-gold-500); outline-offset: 2px; }
        .lead-all:hover { color: var(--s-ink-100); }
        .lead-all:focus-visible { outline: 2px solid var(--s-gold-500); outline-offset: 2px; border-radius: 2px; }
      `}</style>
    </section>
  )
}
