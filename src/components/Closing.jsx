import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { closing } from '../design/copy'

const EASE = [0.22, 1, 0.36, 1]

export default function Closing() {
  const reduced = useReducedMotion()

  return (
    <section
      style={{
        position: 'relative',
        paddingInline: 'clamp(24px, 5vw, 80px)',
        paddingBlock: 'clamp(120px, 14vw, 180px)',
        overflow: 'hidden',
        background:
          'radial-gradient(ellipse 70% 60% at 50% 70%, rgba(255, 210, 80, 0.12) 0%, transparent 70%), var(--bg)',
      }}
    >
      {/* Subtle grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 55% 50% at 50% 50%, black 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 55% 50% at 50% 50%, black 0%, transparent 75%)',
          pointerEvents: 'none',
          opacity: 0.5,
        }}
      />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 30 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{
          position: 'relative',
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'clamp(24px, 3vw, 40px)',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 7.2vw, 128px)',
            fontWeight: 600,
            letterSpacing: '-0.035em',
            lineHeight: 0.98,
            color: 'var(--ink-100)',
            textWrap: 'balance',
          }}
        >
          {closing.title}
        </h2>

        <p
          style={{
            margin: 0,
            maxWidth: '52ch',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(15px, 1.15vw, 18px)',
            lineHeight: 1.55,
            color: 'var(--ink-55)',
          }}
        >
          {closing.sub}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <Link to="/trade" className="closing-primary">
            {closing.ctaPrimary}
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
          <Link to="/docs" className="closing-secondary">
            {closing.ctaSecondary}
          </Link>
        </div>
      </motion.div>

      <style>{`
        .closing-primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          height: 56px; padding: 0 30px;
          background: var(--gold-500); color: #0a0700;
          font-family: var(--font-body); font-size: 14px; font-weight: 600; letter-spacing: -0.005em;
          border-radius: var(--r-full);
          transition-property: transform, background, box-shadow;
          transition-duration: 200ms;
          transition-timing-function: var(--ease-out);
          will-change: transform;
        }
        .closing-primary:hover  { background: var(--gold-400); transform: translateY(-2px); box-shadow: var(--gold-glow); }
        .closing-primary:active { transform: translateY(0); }
        .closing-primary:focus-visible { outline: 2px solid var(--gold-200); outline-offset: 3px; }

        .closing-secondary {
          display: inline-flex; align-items: center; justify-content: center;
          height: 56px; padding: 0 24px;
          background: transparent; color: var(--ink-100);
          font-family: var(--font-body); font-size: 14px; font-weight: 500;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--r-full);
          transition: border-color 160ms var(--ease-out), background 160ms var(--ease-out);
        }
        .closing-secondary:hover { border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.04); }
        .closing-secondary:focus-visible { outline: 2px solid var(--gold-300); outline-offset: 3px; }
      `}</style>
    </section>
  )
}
