import { Link } from 'react-router-dom'
import { footer, brand } from '../design/copy'

export default function Footer() {
  return (
    <footer
      style={{
        paddingInline: 'clamp(24px, 5vw, 80px)',
        paddingBlock: 'clamp(48px, 6vw, 80px) clamp(28px, 3vw, 44px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        color: 'var(--ink-55)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.5fr) repeat(3, minmax(0, 1fr))',
            gap: 'clamp(32px, 4vw, 64px)',
            paddingBottom: 'clamp(40px, 4vw, 64px)',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}
          className="footer-grid"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link
              to="/"
              aria-label={brand.full}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                width: 'fit-content',
              }}
            >
              <img src="/solinu-logo.jpg" alt="" width={24} height={24} style={{ borderRadius: 5, objectFit: 'cover' }} />
              <span
                translate="no"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: 'var(--ink-100)',
                }}
              >
                {brand.name}
              </span>
            </Link>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: 'var(--ink-40)',
                maxWidth: '36ch',
              }}
            >
              {footer.tagline}
            </span>
          </div>

          {footer.columns.map((col) => (
            <nav
              key={col.head}
              aria-label={col.head}
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
            >
              <h3
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-40)',
                  marginBottom: 4,
                }}
              >
                {col.head}
              </h3>
              {col.links.map((l) => {
                const common = {
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 400,
                  color: 'var(--ink-55)',
                  transition: 'color 160ms var(--ease-out)',
                  width: 'fit-content',
                }
                if (l.external) {
                  return (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link"
                      style={common}
                    >
                      {l.label}
                    </a>
                  )
                }
                return (
                  <Link key={l.label} to={l.href} className="footer-link" style={common}>
                    {l.label}
                  </Link>
                )
              })}
            </nav>
          ))}
        </div>

        <div
          style={{
            paddingTop: 24,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            justifyContent: 'space-between',
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            color: 'var(--ink-28)',
          }}
        >
          <span>{footer.copyright}</span>
          <span>{footer.disclaimer}</span>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: var(--ink-100) !important; }
        .footer-link:focus-visible { outline: 2px solid var(--gold-500); outline-offset: 2px; border-radius: 2px; }

        @media (max-width: 720px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
