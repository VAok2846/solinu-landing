import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { brand } from '../../design/voice'

const LINKS = [
  { to: '/trade',     label: 'Trade' },
  { to: '/copytrade', label: 'Copy' },
  { to: '/markets',   label: 'Markets' },
  { to: '/docs',      label: 'Docs' },
]

export default function InstrumentNav() {
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
        zIndex: 50,
        paddingInline: 'clamp(20px, 3vw, 48px)',
        paddingBlock: 'clamp(12px, 1.2vw, 18px)',
        paddingTop: 'max(clamp(12px, 1.2vw, 18px), env(safe-area-inset-top))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        background: scrolled ? 'rgba(6, 6, 12, 0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--s-ink-hairline)' : '1px solid transparent',
        transitionProperty: 'background, border-color, backdrop-filter',
        transitionDuration: '220ms',
        transitionTimingFunction: 'var(--s-ease-out)',
      }}
    >
      <Link
        to="/"
        aria-label={brand.full}
        className="inav-brand"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          textDecoration: 'none',
          flexShrink: 0,
        }}
      >
        <img
          src="/solinu-logo.jpg"
          alt=""
          width={24}
          height={24}
          style={{ borderRadius: 5, objectFit: 'cover' }}
        />
        <span
          translate="no"
          style={{
            fontFamily: 'var(--s-font-display)',
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: 'var(--s-ink-100)',
          }}
        >
          {brand.name}
        </span>
      </Link>

      <nav
        aria-label="Primary"
        className="inav-links"
        style={{
          display: 'none',
          alignItems: 'center',
          gap: 'clamp(8px, 1vw, 20px)',
        }}
      >
        {LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} className="inav-link">
            {({ isActive }) => (
              <>
                <span className="inav-link-text" data-active={isActive}>
                  {l.label}
                </span>
                <span className="inav-link-underline" data-active={isActive} />
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <Link to="/trade" className="inav-cta">
        Launch
      </Link>

      <style>{`
        .inav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 8px 2px;
          color: var(--s-ink-55);
          text-decoration: none;
        }
        .inav-link-text {
          font-family: var(--s-font-display);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.005em;
          color: var(--s-ink-55);
          transition-property: color;
          transition-duration: 160ms;
          transition-timing-function: var(--s-ease-out);
        }
        .inav-link-text[data-active="true"] {
          color: var(--s-ink-100);
        }
        .inav-link-underline {
          position: absolute;
          left: 50%;
          right: 50%;
          bottom: 4px;
          height: 1px;
          background: currentColor;
          color: var(--s-ink-100);
          transition-property: left, right, opacity;
          transition-duration: 260ms;
          transition-timing-function: var(--s-ease-out);
          opacity: 0.5;
        }
        .inav-link-underline[data-active="true"] {
          left: 2px;
          right: 2px;
          opacity: 1;
        }
        .inav-link:hover .inav-link-text          { color: var(--s-ink-100); }
        .inav-link:hover .inav-link-underline     { left: 2px; right: 2px; opacity: 1; }
        .inav-link:focus-visible                  { outline: 2px solid var(--s-gold-500); outline-offset: 4px; border-radius: 2px; }

        .inav-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 36px;
          padding: 0 18px;
          background: var(--s-gold-500);
          color: #0a0700;
          text-decoration: none;
          font-family: var(--s-font-display);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.005em;
          border-radius: var(--s-radius-sm);
          border: none;
          transition-property: transform, background;
          transition-duration: 160ms;
          transition-timing-function: var(--s-ease-out);
          will-change: transform;
          flex-shrink: 0;
        }
        .inav-cta:hover      { background: var(--s-gold-400); transform: translateY(-1px); }
        .inav-cta:active     { transform: translateY(0); }
        .inav-cta:focus-visible  { outline: 2px solid var(--s-gold-200); outline-offset: 3px; }

        .inav-brand:focus-visible { outline: 2px solid var(--s-gold-500); outline-offset: 3px; border-radius: 4px; }

        @media (min-width: 820px) {
          .inav-links { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
