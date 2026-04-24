import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Self-Custody', href: '#self-custody' },
  { label: 'Copy Trading', href: '#copy-trading' },
  { label: 'Infrastructure', href: '#partners' },
  { label: 'Markets', href: '#markets' },
  { label: 'Security', href: '#security' },
  { label: 'Docs', href: '/docs', isRoute: true },
]

function BrandLogo() {
  return (
    <img src="/solinu-logo.jpg" alt="SOLINU" className="flex-shrink-0 w-[22px] h-[22px] 3xl:w-7 3xl:h-7 4xl:w-8 4xl:h-8 rounded-[4px] object-cover" />
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#06060a]/80 backdrop-blur-xl border-b border-white/[0.04]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[2200px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16">
        <div className="flex items-center justify-between h-16 lg:h-20 3xl:h-24 4xl:h-28">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <BrandLogo />
            <div className="flex items-center gap-1">
              <span className="font-heading font-black text-xl 3xl:text-2xl 4xl:text-3xl tracking-tight text-white group-hover:text-white/90 transition-colors">
                SOL
              </span>
              <span className="font-heading font-black text-xl 3xl:text-2xl 4xl:text-3xl tracking-tight text-gradient-gold">
                INU
              </span>
            </div>
            <span className="font-heading font-medium text-[9px] 3xl:text-[11px] 4xl:text-[13px] text-white/35 tracking-[3px] uppercase hidden sm:block">
              Exchange
            </span>
          </Link>

          {/* Desktop nav */}
          {isLanding && (
            <div className="hidden lg:flex items-center gap-5">
              {NAV_LINKS.map(link => (
                link.isRoute ? (
                  <Link key={link.label} to={link.href}
                    className="text-[12px] 3xl:text-[14px] 4xl:text-[16px] font-medium text-white/50 hover:text-white transition-colors duration-300 font-heading tracking-wide">
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.label} href={link.href}
                    className="text-[12px] 3xl:text-[14px] 4xl:text-[16px] font-medium text-white/50 hover:text-white transition-colors duration-300 font-heading tracking-wide">
                    {link.label}
                  </a>
                )
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="flex items-center gap-2">
            <a
              href="https://x.com/SolinuExchange"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex w-8 h-8 items-center justify-center text-white/35 hover:text-white/60 hover:bg-white/[0.04] transition-all"
              aria-label="Follow on X"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a
              href="https://t.me/SolinuExchange"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex w-8 h-8 items-center justify-center text-white/35 hover:text-white/60 hover:bg-white/[0.04] transition-all"
              aria-label="Join Telegram"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>

            <Link to="/trade" className="btn-primary !py-2.5 !px-6 3xl:!py-3 3xl:!px-8 4xl:!py-4 4xl:!px-10 !text-[11px] 3xl:!text-[13px] 4xl:!text-[15px] !tracking-[0.5px]">
              Launch App
            </Link>

            {isLanding && (
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-9 h-9 flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all">
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && isLanding && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#06060a]/95 backdrop-blur-xl border-t border-white/[0.04] overflow-hidden">
            <div className="px-6 py-4 space-y-1">
              {NAV_LINKS.map(link => (
                link.isRoute ? (
                  <Link key={link.label} to={link.href} onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 text-sm text-white/40 hover:text-white/70 hover:bg-white/[0.03] transition-all font-heading">
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 text-sm text-white/40 hover:text-white/70 hover:bg-white/[0.03] transition-all font-heading">
                    {link.label}
                  </a>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
