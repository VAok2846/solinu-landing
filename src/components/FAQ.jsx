import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faq } from '../design/copy'

const EASE = [0.22, 1, 0.36, 1]

function Item({ item, open, onToggle, reduced }) {
  return (
    <div
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          width: '100%',
          padding: 'clamp(20px, 2vw, 28px) 0',
          textAlign: 'left',
          color: 'var(--ink-100)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(16px, 1.4vw, 20px)',
          fontWeight: 500,
          letterSpacing: '-0.015em',
          cursor: 'pointer',
        }}
      >
        <span style={{ flex: 1 }}>{item.q}</span>
        <span
          aria-hidden
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            borderRadius: 'var(--r-full)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--ink-70)',
            flexShrink: 0,
            transform: open ? 'rotate(45deg)' : 'rotate(0)',
            transition: 'transform 260ms var(--ease-out)',
          }}
        >
          <Plus size={14} strokeWidth={2} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                margin: 0,
                paddingBottom: 24,
                maxWidth: '68ch',
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14px, 1.05vw, 16px)',
                lineHeight: 1.6,
                color: 'var(--ink-55)',
              }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const reduced = useReducedMotion()
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section
      aria-label="FAQ"
      style={{
        position: 'relative',
        paddingInline: 'clamp(24px, 5vw, 80px)',
        paddingBlock: 'clamp(100px, 12vw, 160px)',
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
          gap: 'clamp(40px, 6vw, 96px)',
          alignItems: 'start',
        }}
      >
        <motion.header
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
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
            {faq.eyebrow}
          </span>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.04,
              color: 'var(--ink-100)',
              textWrap: 'balance',
            }}
          >
            {faq.title}
          </h2>
        </motion.header>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {faq.items.map((item, i) => (
            <Item
              key={item.q}
              item={item}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
              reduced={reduced}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          section[aria-label="FAQ"] > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
