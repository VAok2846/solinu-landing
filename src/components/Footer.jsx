import { Link } from 'react-router-dom'

const FOOTER_LINKS = {
  Product: [
    { label: 'Trade', href: '/trade/PERP_BTC_USDC', internal: true },
    { label: 'SOLINU Swap', href: '/swap', internal: true },
    { label: 'Markets', href: '/markets', internal: true },
    { label: 'Portfolio', href: '/portfolio', internal: true },
  ],
  '$SOLINU': [
    { label: 'SOLINU Swap', href: '/swap', internal: true },
    { label: 'What is $SOLINU?', href: '/docs/what-is-solinu', internal: true },
  ],
  Resources: [
    { label: 'Documentation', href: '/docs', internal: true },
    { label: 'API Reference', href: 'https://orderly.network/docs/build-on-omnichain/building-on-omnichain' },
    { label: 'Orderly Network', href: 'https://orderly.network' },
  ],
  Community: [
    { label: 'Twitter / X', href: 'https://x.com/SolinuExchange' },
    { label: 'Telegram', href: 'https://t.me/SolinuExchange' },
  ],
  Legal: [
    { label: 'Terms of Use', href: '/legal?tab=terms', internal: true },
    { label: 'Privacy Policy', href: '/legal?tab=privacy', internal: true },
    { label: 'Disclaimer', href: '/legal?tab=disclaimer', internal: true },
  ],
}

export default function Footer() {
  return (
    <footer className="relative">
      {/* Top gradient line */}
      <div className="glow-divider" />

      {/* Gradient background */}
      <div className="relative bg-gradient-to-b from-[#08080e] to-[#06060a]">
        <div className="max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16 py-16 3xl:py-20 4xl:py-24">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-8 sm:gap-10">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-2">
              <Link to="/" className="flex items-center gap-1.5 mb-5">
                <span className="font-heading font-black text-xl 3xl:text-2xl 4xl:text-3xl tracking-tight text-white">SOL</span>
                <span className="font-heading font-black text-xl 3xl:text-2xl 4xl:text-3xl tracking-tight text-gradient-gold">INU</span>
                <span className="font-heading text-[9px] text-white/35 tracking-[3px] uppercase ml-1.5 hidden sm:block">Exchange</span>
              </Link>
              <p className="text-white/50 text-[13px] leading-relaxed max-w-[260px] mb-6">
                Decentralized perpetual trading with deep liquidity, powered by Orderly Network infrastructure.
              </p>
              <div className="flex items-center gap-2.5 flex-wrap mb-5">
                <a
                  href="https://x.com/SolinuExchange"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] text-white/40 hover:text-white/70 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all group"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  <span className="text-[12px] font-medium">Twitter</span>
                </a>
                <a
                  href="https://t.me/SolinuExchange"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] text-white/40 hover:text-white/70 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all group"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  <span className="text-[12px] font-medium">Telegram</span>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#14F195] animate-pulse" />
                <span className="text-white/35 text-[12px]">All systems operational</span>
                <span className="text-white/15 text-[10px] font-mono ml-1">· Orderly Network</span>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="lg:col-span-2 xl:col-span-2">
                <h4 className="text-white/60 text-[11px] uppercase tracking-[2px] font-heading font-semibold mb-5">{title}</h4>
                <ul className="space-y-3">
                  {links.map(link => (
                    <li key={link.label}>
                      {link.internal ? (
                        <Link to={link.href} className="text-white/40 text-[13px] hover:text-white/70 transition-colors">{link.label}</Link>
                      ) : (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-white/40 text-[13px] hover:text-white/70 transition-colors inline-flex items-center gap-1.5">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-14 pt-6 border-t border-white/[0.04] flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-white/30 text-[11px]">
                &copy; {new Date().getFullYear()} SOLINU Exchange. All rights reserved.
              </div>
              <a
                href="https://orderly.network"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-medium hover:text-white/60 transition-colors"
              >
                <span className="text-white/30 text-[10px] font-mono uppercase tracking-[2px]">Powered by</span>
                <span className="text-white/40">Orderly Network</span>
              </a>
            </div>
            <div className="flex items-center justify-center sm:justify-start">
              <a
                href="mailto:info@solinu.exchange"
                className="text-white/40 text-[12px] font-medium hover:text-white/60 transition-colors"
              >
                info@solinu.exchange
              </a>
            </div>
            <p className="text-white/25 text-[10px] leading-relaxed max-w-2xl">
              SOLINU Exchange is a decentralized protocol and does not constitute financial advice. Trading perpetual contracts involves substantial risk.
              Use at your own discretion.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
