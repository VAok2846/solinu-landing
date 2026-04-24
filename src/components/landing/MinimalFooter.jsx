import { Link } from 'react-router-dom'
import { footer as copy, brand } from '../../design/voice'

export default function MinimalFooter() {
  return (
    <footer
      style={{
        padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 80px) clamp(28px, 3vw, 44px)',
        background: 'var(--s-ink-stage)',
        borderTop: '1px solid var(--s-ink-hairline)',
        color: 'var(--s-ink-55)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) auto',
            gap: 'clamp(24px, 3vw, 48px)',
            alignItems: 'start',
            paddingBottom: 'clamp(28px, 3vw, 48px)',
            borderBottom: '1px solid var(--s-ink-divider)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
            <Link
              to="/"
              aria-label={brand.full}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                textDecoration: 'none',
                width: 'fit-content',
              }}
            >
              <img
                src="/solinu-logo.jpg"
                alt=""
                width={22}
                height={22}
                style={{ borderRadius: 4, objectFit: 'cover' }}
              />
              <span
                translate="no"
                style={{
                  fontFamily: 'var(--s-font-display)',
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: 'var(--s-ink-100)',
                }}
              >
                {brand.name}
              </span>
            </Link>
            <span
              style={{
                fontFamily: 'var(--s-font-body)',
                fontSize: 13,
                color: 'var(--s-ink-40)',
              }}
            >
              {copy.tagline}
            </span>
          </div>

          <nav
            aria-label="Footer"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              alignItems: 'flex-end',
            }}
          >
            {copy.links.map((l) => {
              const common = {
                fontFamily: 'var(--s-font-display)',
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--s-ink-55)',
                textDecoration: 'none',
                transitionProperty: 'color',
                transitionDuration: '160ms',
                transitionTimingFunction: 'var(--s-ease-out)',
              }
              if (l.external) {
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mf-link"
                    style={common}
                  >
                    {l.label}
                  </a>
                )
              }
              return (
                <Link key={l.label} to={l.href} className="mf-link" style={common}>
                  {l.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div
          style={{
            paddingTop: 20,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'space-between',
            fontFamily: 'var(--s-font-body)',
            fontSize: 12,
            color: 'var(--s-ink-28)',
          }}
        >
          <span>{copy.copyright}</span>
          <span>Perpetual futures carry risk. This is not investment advice.</span>
        </div>
      </div>

      <style>{`
        .mf-link:hover           { color: var(--s-ink-100); }
        .mf-link:focus-visible   { outline: 2px solid var(--s-gold-500); outline-offset: 2px; border-radius: 2px; }
      `}</style>
    </footer>
  )
}
