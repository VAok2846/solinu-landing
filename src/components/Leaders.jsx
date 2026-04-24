import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { leaders } from '../design/copy'
import { formatSigned } from '../design/format'
import Sparkline from './Sparkline'

const EASE = [0.22, 1, 0.36, 1]

// Stub data — wire to /api/copy/traders/featured when re-integrated.
const ROWS = [
  { name: 'KEVALDO',  avatar: 'https://i.ibb.co/8nHm3BmS/photo-2024-10-08-15-13-37.jpg', pnl30d: 128400, traderId: 1125 },
  { name: 'WHALE0X',  avatar: null, pnl30d: 94200,  traderId: 'mock-1' },
  { name: 'CRYOCAST', avatar: null, pnl30d: -18450, traderId: 'mock-2' },
  { name: 'APEXDEV',  avatar: null, pnl30d: 71900,  traderId: 'mock-3' },
]

function hashSeed(s) {
  let h = 5381
  const str = String(s ?? '')
  for (let i = 0; i < str.length; i++) h = (h * 33) ^ str.charCodeAt(i)
  return (h >>> 0) || 1
}

function Row({ row, i, reduced }) {
  const pnlColor = row.pnl30d > 0 ? 'var(--pnl-up)' : row.pnl30d < 0 ? 'var(--pnl-down)' : 'var(--ink-55)'
  const trend = row.pnl30d > 0 ? 20 : row.pnl30d < 0 ? -20 : 0
  const seed = hashSeed(row.traderId ?? row.name)

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '44px minmax(0, 1fr) 120px minmax(0, auto) 120px',
        gap: 'clamp(14px, 1.8vw, 32px)',
        alignItems: 'center',
        padding: 'clamp(18px, 2vw, 24px) 0',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div
        aria-hidden
        style={{
          width: 36,
          height: 36,
          borderRadius: 'var(--r-full)',
          background: row.avatar
            ? `#0a0a10 center/cover no-repeat url(${row.avatar})`
            : 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      />

      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(18px, 1.6vw, 22px)',
          fontWeight: 600,
          letterSpacing: '-0.015em',
          color: 'var(--ink-100)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          minWidth: 0,
        }}
      >
        {row.name}
      </span>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Sparkline seed={seed} trend={trend} width={120} height={28} />
      </div>

      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(14px, 1.2vw, 16px)',
          fontWeight: 600,
          fontVariantNumeric: 'tabular-nums',
          color: pnlColor,
          justifySelf: 'end',
          whiteSpace: 'nowrap',
        }}
      >
        {formatSigned(row.pnl30d, { min: 0, max: 0 })}
      </span>

      <Link
        to={`/copytrade?trader=${row.traderId}`}
        className="leader-cta"
      >
        {leaders.cta}
        <ArrowUpRight size={12} strokeWidth={2} />
      </Link>
    </motion.div>
  )
}

export default function Leaders() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-label="Leaders"
      style={{
        position: 'relative',
        paddingInline: 'clamp(24px, 5vw, 80px)',
        paddingBlock: 'clamp(100px, 12vw, 160px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.header
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) auto',
            alignItems: 'baseline',
            gap: 'clamp(16px, 3vw, 56px)',
            marginBottom: 'clamp(40px, 4vw, 64px)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.02em',
                color: 'var(--gold-500)',
                textTransform: 'uppercase',
              }}
            >
              {leaders.eyebrow}
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 4.2vw, 64px)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                lineHeight: 1.04,
                color: 'var(--ink-100)',
                maxWidth: 780,
                textWrap: 'balance',
              }}
            >
              {leaders.title}
            </h2>
            <p
              style={{
                margin: 0,
                maxWidth: '56ch',
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14px, 1.05vw, 16px)',
                lineHeight: 1.55,
                color: 'var(--ink-55)',
              }}
            >
              {leaders.sub}
            </p>
          </div>

          <Link to="/copytrade" className="leaders-all">
            {leaders.allLink} →
          </Link>
        </motion.header>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {ROWS.map((row, i) => (
            <Row key={row.traderId} row={row} i={i} reduced={reduced} />
          ))}
        </div>
      </div>

      <style>{`
        .leader-cta {
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          height: 36px; padding: 0 16px;
          background: transparent; color: var(--ink-100);
          font-family: var(--font-body); font-size: 13px; font-weight: 500;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--r-full);
          transition-property: border-color, color, background, transform;
          transition-duration: 160ms;
          transition-timing-function: var(--ease-out);
        }
        .leader-cta:hover { border-color: var(--gold-500); color: var(--gold-300); background: var(--gold-a06); transform: translateY(-1px); }
        .leader-cta:focus-visible { outline: 2px solid var(--gold-500); outline-offset: 2px; }

        .leaders-all {
          font-family: var(--font-body); font-size: 14px; font-weight: 500;
          color: var(--ink-55); white-space: nowrap;
          transition: color 160ms var(--ease-out);
        }
        .leaders-all:hover { color: var(--ink-100); }
        .leaders-all:focus-visible { outline: 2px solid var(--gold-500); outline-offset: 2px; border-radius: 2px; }
      `}</style>
    </section>
  )
}
