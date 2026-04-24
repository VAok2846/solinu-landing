import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { closing as copy } from '../../design/voice'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function ClosingSection() {
  const scope = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.cls-el', {
        opacity: 0, y: 24, duration: 0.9, ease: 'power4.out', stagger: 0.08,
        scrollTrigger: { trigger: scope.current, start: 'top 75%', toggleActions: 'play none none none' },
      })
    },
    { scope },
  )

  return (
    <section
      ref={scope}
      style={{
        position: 'relative',
        minHeight: '70vh',
        padding: 'clamp(100px, 12vw, 160px) clamp(24px, 5vw, 80px)',
        background:
          'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255, 210, 80, 0.08) 0%, transparent 60%), var(--s-ink-stage)',
        borderTop: '1px solid var(--s-ink-hairline)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1100, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(24px, 3vw, 40px)' }}>
        <h2
          className="cls-el"
          style={{
            margin: 0,
            fontFamily: 'var(--s-font-display)',
            fontSize: 'clamp(48px, 7vw, 120px)',
            fontWeight: 600,
            letterSpacing: '-0.035em',
            lineHeight: 0.98,
            color: 'var(--s-ink-100)',
            textWrap: 'balance',
          }}
        >
          {copy.title}
        </h2>

        <p
          className="cls-el"
          style={{
            margin: 0,
            maxWidth: '46ch',
            fontFamily: 'var(--s-font-body)',
            fontSize: 'clamp(15px, 1.15vw, 18px)',
            lineHeight: 1.55,
            color: 'var(--s-ink-55)',
          }}
        >
          {copy.sub}
        </p>

        <Link to="/trade" className="cls-el cls-cta">
          {copy.cta}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      <style>{`
        .cls-cta {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          height: 56px; padding: 0 30px;
          background: var(--s-gold-500); color: #0a0700; text-decoration: none;
          font-family: var(--s-font-display); font-size: 14px; font-weight: 600; letter-spacing: -0.005em;
          border-radius: var(--s-radius-sm); border: none;
          transition-property: transform, background; transition-duration: 160ms;
          transition-timing-function: var(--s-ease-out); will-change: transform;
        }
        .cls-cta:hover  { background: var(--s-gold-400); transform: translateY(-1px); }
        .cls-cta:active { transform: translateY(0); }
        .cls-cta:focus-visible { outline: 2px solid var(--s-gold-200); outline-offset: 3px; }
      `}</style>
    </section>
  )
}
