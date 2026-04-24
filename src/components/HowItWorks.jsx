import { motion, useReducedMotion } from 'framer-motion'
import { howItWorks } from '../design/copy'

const EASE = [0.22, 1, 0.36, 1]

export default function HowItWorks() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-label="How it works"
      style={{
        position: 'relative',
        paddingInline: 'clamp(24px, 5vw, 80px)',
        paddingBlock: 'clamp(100px, 12vw, 160px)',
        background: 'linear-gradient(180deg, transparent 0%, rgba(255, 215, 0, 0.02) 50%, transparent 100%)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.header
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            maxWidth: 820,
            marginBottom: 'clamp(48px, 5vw, 80px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
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
            {howItWorks.eyebrow}
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
              textWrap: 'balance',
            }}
          >
            {howItWorks.title}
          </h2>
        </motion.header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 0,
          }}
        >
          {howItWorks.steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                padding: 'clamp(20px, 2vw, 32px) clamp(16px, 2vw, 32px) clamp(20px, 2vw, 32px) 0',
                borderRight: i < howItWorks.steps.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                paddingLeft: i === 0 ? 0 : 'clamp(16px, 2vw, 32px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 14,
                    fontWeight: 500,
                    fontVariantNumeric: 'tabular-nums',
                    color: 'var(--gold-500)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {s.n}
                </span>
                <span
                  aria-hidden
                  style={{
                    flex: 1,
                    height: 1,
                    background: 'linear-gradient(90deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0) 100%)',
                  }}
                />
              </div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px, 2.4vw, 34px)',
                  fontWeight: 600,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.1,
                  color: 'var(--ink-100)',
                }}
              >
                {s.head}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: 'var(--ink-55)',
                }}
              >
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
