import { motion, useReducedMotion } from 'framer-motion'
import { integrations } from '../design/copy'

const EASE = [0.22, 1, 0.36, 1]

export default function Integrations() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-label="Ecosystem partners"
      style={{
        position: 'relative',
        paddingInline: 'clamp(24px, 5vw, 80px)',
        paddingBlock: 'clamp(48px, 6vw, 80px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          alignItems: 'center',
          gap: 'clamp(24px, 3vw, 56px)',
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
            whiteSpace: 'nowrap',
          }}
        >
          {integrations.eyebrow}
        </span>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 'clamp(12px, 2vw, 40px)',
            alignItems: 'center',
          }}
        >
          {integrations.items.map((p, i) => (
            <motion.div
              key={p.name}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <span
                translate="no"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(14px, 1.2vw, 17px)',
                  fontWeight: 600,
                  letterSpacing: '-0.015em',
                  color: 'var(--ink-90)',
                }}
              >
                {p.name}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  color: 'var(--ink-28)',
                }}
              >
                {p.role}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
