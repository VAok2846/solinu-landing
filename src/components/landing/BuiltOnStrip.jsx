import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { partners } from '../../design/voice'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function BuiltOnStrip() {
  const scope = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.built-cell', {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: scope.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope },
  )

  return (
    <section
      ref={scope}
      aria-label="Ecosystem partners"
      style={{
        position: 'relative',
        padding: 'clamp(32px, 4vw, 56px) clamp(24px, 5vw, 80px)',
        background: 'var(--s-ink-stage)',
        borderTop: '1px solid var(--s-ink-hairline)',
        borderBottom: '1px solid var(--s-ink-hairline)',
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
            fontFamily: 'var(--s-font-body)',
            fontSize: 11,
            color: 'var(--s-ink-40)',
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          {partners.eyebrow}
        </span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 'clamp(12px, 2vw, 32px)',
            alignItems: 'center',
            justifyItems: 'start',
          }}
        >
          {partners.items.map((p) => (
            <div
              key={p.name}
              className="built-cell"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <span
                translate="no"
                style={{
                  fontFamily: 'var(--s-font-display)',
                  fontSize: 'clamp(14px, 1.2vw, 18px)',
                  fontWeight: 500,
                  letterSpacing: '-0.012em',
                  color: 'var(--s-ink-90)',
                }}
              >
                {p.name}
              </span>
              <span
                style={{
                  fontFamily: 'var(--s-font-body)',
                  fontSize: 11,
                  color: 'var(--s-ink-28)',
                }}
              >
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
