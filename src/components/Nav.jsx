import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { nav, brand } from '../design/copy'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        paddingInline: 'clamp(20px, 3vw, 40px)',
        paddingBlock: 'clamp(12px, 1.2vw, 18px)',
        paddingTop: 'max(clamp(12px, 1.2vw, 18px), env(safe-area-inset-top))',
        background: scrolled ? 'rgba(6, 6, 12, 0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transitionProperty: 'background, border-color, backdrop-filter',
        transitionDuration: '240ms',
        transitionTimingFunction: 'var(--ease-out)',
      }}
    >
      <Link
        to="/"
        aria-label={brand.full}
        className="nav-brand"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          flexShrink: 0,
        }}
      >
        <img
          src="/solinu-logo.jpg"
          alt=""
          width={26}
          height={26}
          style={{ borderRadius: 6, objectFit: 'cover' }}
        />
        <span
          translate="no"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--ink-100)',
          }}
        >
          {brand.name}
        </span>
      </Link>

      <nav
        aria-label="Primary"
        className="nav-links"
        style={{
          display: 'none',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {nav.links.map((l) => (
          <NavLink
            key={l.href}
            to={l.href}
            className="nav-link"
            style={({ isActive }) => ({
              position: 'relative',
              padding: '8px 14px',
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '-0.005em',
              color: isActive ? 'var(--ink-100)' : 'var(--ink-55)',
              borderRadius: 'var(--r-sm)',
              transitionProperty: 'color',
              transitionDuration: '160ms',
              transitionTimingFunction: 'var(--ease-out)',
            })}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>

      <Link to="/trade" className="nav-cta">
        {nav.cta}
      </Link>

      <style>{`
        .nav-link:hover { color: var(--ink-100) !important; }
        .nav-link:focus-visible { outline: 2px solid var(--gold-500); outline-offset: 3px; }
        .nav-brand:focus-visible { outline: 2px solid var(--gold-500); outline-offset: 3px; border-radius: var(--r-sm); }

        .nav-cta {
          display: inline-flex; align-items: center; gap: 8px;
          height: 38px; padding: 0 20px;
          background: var(--gold-500); color: #0a0700;
          font-family: var(--font-body); font-size: 13px; font-weight: 600;
          letter-spacing: -0.005em;
          border-radius: var(--r-full);
          transition-property: transform, background, box-shadow;
          transition-duration: 160ms;
          transition-timing-function: var(--ease-out);
          will-change: transform;
          flex-shrink: 0;
        }
        .nav-cta:hover  { background: var(--gold-400); transform: translateY(-1px); box-shadow: var(--gold-glow-soft); }
        .nav-cta:active { transform: translateY(0); }
        .nav-cta:focus-visible { outline: 2px solid var(--gold-200); outline-offset: 3px; }

        @media (min-width: 820px) {
          .nav-links { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
