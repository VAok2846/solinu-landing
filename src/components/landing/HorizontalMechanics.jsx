import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { instrument as CARDS } from '../../design/voice'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function Card({ card, idx, total }) {
  return (
    <article
      className={`hmech-card hmech-card-${idx}`}
      style={{
        flex: '0 0 100vw',
        width: '100vw',
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto 1fr auto',
        padding: 'clamp(80px, 7vw, 120px) clamp(36px, 6vw, 96px) clamp(48px, 5vw, 80px)',
        position: 'relative',
        background: 'var(--s-ink-stage)',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--s-font-display)',
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: '-0.005em',
            color: 'var(--s-gold-500)',
          }}
        >
          {card.label}
        </span>
        <span
          style={{
            fontFamily: 'var(--s-font-display)',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '-0.005em',
            color: 'var(--s-ink-28)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {idx + 1} / {total}
        </span>
      </header>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: 1280,
          width: '100%',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontFamily: 'var(--s-font-display)',
            fontSize: 'clamp(48px, 8vw, 144px)',
            fontWeight: 600,
            letterSpacing: '-0.045em',
            lineHeight: 0.96,
            color: 'var(--s-ink-100)',
            textWrap: 'balance',
            maxWidth: '16ch',
          }}
        >
          {card.head}
        </h3>

        <p
          style={{
            marginTop: 'clamp(32px, 3.5vw, 56px)',
            marginBottom: 0,
            maxWidth: '48ch',
            fontFamily: 'var(--s-font-body)',
            fontSize: 'clamp(15px, 1.1vw, 18px)',
            lineHeight: 1.55,
            color: 'var(--s-ink-55)',
            textWrap: 'pretty',
          }}
        >
          {card.body}
        </p>
      </div>

      <footer
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 'clamp(16px, 2vw, 32px)',
          borderTop: '1px solid var(--s-ink-hairline)',
          paddingTop: 24,
          maxWidth: 1400,
          width: '100%',
          margin: '0 auto',
        }}
      >
        {card.meta.map(([k, v]) => (
          <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span
              style={{
                fontFamily: 'var(--s-font-body)',
                fontSize: 12,
                fontWeight: 400,
                color: 'var(--s-ink-40)',
              }}
            >
              {k}
            </span>
            <span
              style={{
                fontFamily: 'var(--s-font-display)',
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: '-0.008em',
                color: 'var(--s-ink-100)',
              }}
            >
              {v}
            </span>
          </div>
        ))}
      </footer>

      {idx < total - 1 && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: 0,
            top: 'clamp(60px, 6vw, 100px)',
            bottom: 'clamp(48px, 5vw, 80px)',
            width: 1,
            background: 'var(--s-ink-hairline)',
          }}
        />
      )}
    </article>
  )
}

export default function HorizontalMechanics() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const section = sectionRef.current
      const track = trackRef.current
      if (!section || !track) return

      const total = CARDS.length

      const ctx = gsap.context(() => {
        gsap.to(track, {
          xPercent: -100 * (total - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${(total - 1) * 100}%`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        gsap.to('.hmech-progress-fill', {
          scaleX: 1,
          ease: 'none',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${(total - 1) * 100}%`,
            scrub: true,
          },
        })
      }, section)

      return () => ctx.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="hmech"
      style={{
        position: 'relative',
        background: 'var(--s-ink-stage)',
        color: 'var(--s-ink-90)',
        overflow: 'hidden',
      }}
    >
      <div
        ref={trackRef}
        className="hmech-track"
        style={{
          display: 'flex',
          width: `${CARDS.length * 100}vw`,
          willChange: 'transform',
        }}
      >
        {CARDS.map((c, i) => (
          <Card key={c.label} card={c} idx={i} total={CARDS.length} />
        ))}
      </div>

      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          background: 'var(--s-ink-divider)',
          zIndex: 3,
        }}
      >
        <div
          className="hmech-progress-fill"
          style={{
            width: '100%',
            height: '100%',
            background: 'var(--s-gold-500)',
            transform: 'scaleX(0)',
            transformOrigin: 'left center',
          }}
        />
      </div>
    </section>
  )
}
