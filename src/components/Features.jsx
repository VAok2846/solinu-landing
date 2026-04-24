import { motion, useReducedMotion } from 'framer-motion'
import { LineChart, Users, Lock, Zap } from 'lucide-react'
import { features } from '../design/copy'

const EASE = [0.22, 1, 0.36, 1]
const ICONS = [LineChart, Users, Lock, Zap]

export default function Features() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-label="Features"
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
            {features.eyebrow}
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
            {features.title}
          </h2>
          <p
            style={{
              margin: 0,
              maxWidth: '60ch',
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px, 1.1vw, 18px)',
              lineHeight: 1.55,
              color: 'var(--ink-55)',
            }}
          >
            {features.sub}
          </p>
        </motion.header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(14px, 1.4vw, 22px)',
          }}
        >
          {features.items.map((f, i) => {
            const Icon = ICONS[i] ?? LineChart
            return (
              <motion.article
                key={f.tag}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                className="feature-card"
                style={{
                  position: 'relative',
                  padding: 'clamp(22px, 2.4vw, 32px)',
                  background:
                    'linear-gradient(180deg, rgba(255, 255, 255, 0.015) 0%, rgba(255, 255, 255, 0.008) 100%), var(--bg-card)',
                  border: 'var(--border)',
                  borderRadius: 'var(--r-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(24px, 2.4vw, 40px)',
                  minHeight: 280,
                  overflow: 'hidden',
                  transitionProperty: 'border-color, transform, background',
                  transitionDuration: '220ms',
                  transitionTimingFunction: 'var(--ease-out)',
                }}
              >
                {/* Corner gold glow on hover */}
                <span
                  aria-hidden
                  className="feature-card-glow"
                  style={{
                    position: 'absolute',
                    top: -80,
                    right: -80,
                    width: 200,
                    height: 200,
                    background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.12) 0%, transparent 60%)',
                    opacity: 0,
                    transitionProperty: 'opacity',
                    transitionDuration: '260ms',
                    transitionTimingFunction: 'var(--ease-out)',
                    pointerEvents: 'none',
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: '0.02em',
                      color: 'var(--gold-500)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {f.tag}
                  </span>
                  <span
                    aria-hidden
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                      borderRadius: 'var(--r-sm)',
                      background: 'rgba(255, 215, 0, 0.06)',
                      border: '1px solid rgba(255, 215, 0, 0.18)',
                      color: 'var(--gold-400)',
                    }}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, position: 'relative' }}>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(22px, 2vw, 28px)',
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.15,
                      color: 'var(--ink-100)',
                      textWrap: 'balance',
                    }}
                  >
                    {f.head}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: 'var(--ink-55)',
                    }}
                  >
                    {f.body}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>

      <style>{`
        .feature-card:hover { border-color: var(--gold-a24); transform: translateY(-2px); background: linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%), var(--bg-card); }
        .feature-card:hover .feature-card-glow { opacity: 1; }
      `}</style>
    </section>
  )
}
