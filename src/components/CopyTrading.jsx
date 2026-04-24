import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Copy, TrendingUp, Shield, Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const TOP_TRADERS = [
  { rank: 1, name: 'whale.sol', pnl: '+$847,291', roi: '+312.4%', winRate: '78%', copiers: 1247, trades: 892 },
  { rank: 2, name: 'alpha_degen', pnl: '+$523,108', roi: '+198.7%', winRate: '71%', copiers: 983, trades: 1456 },
  { rank: 3, name: 'solana_maxi', pnl: '+$391,847', roi: '+156.2%', winRate: '69%', copiers: 756, trades: 2103 },
]

const FEATURES = [
  {
    icon: TrendingUp,
    title: 'Real Performance',
    desc: 'All P&L data is pulled directly from on-chain settlement. No simulations or backtests.',
  },
  {
    icon: Copy,
    title: 'One-Click Copy',
    desc: 'Mirror positions automatically. Set your risk parameters and allocation limits.',
  },
  {
    icon: Shield,
    title: 'Full Control',
    desc: 'Close copied positions anytime. Your wallet, your keys, your decision.',
  },
  {
    icon: Users,
    title: 'Become a Leader',
    desc: 'Share your strategy and earn fees from copiers. Transparent profit sharing.',
  },
]

export default function CopyTrading() {
  const container = useRef(null)

  useGSAP(() => {
    gsap.from('.copy-title', {
      scrollTrigger: { trigger: '.copy-title', start: 'top 85%', toggleActions: 'play none none reverse' },
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
    })
    gsap.from('.copy-card', {
      scrollTrigger: { trigger: '.copy-grid', start: 'top 82%', toggleActions: 'play none none reverse' },
      y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
    })
    gsap.from('.copy-feature', {
      scrollTrigger: { trigger: '.copy-features', start: 'top 85%', toggleActions: 'play none none reverse' },
      y: 20, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
    })
    gsap.from('.copy-leaderboard', {
      scrollTrigger: { trigger: '.copy-leaderboard', start: 'top 85%', toggleActions: 'play none none reverse' },
      x: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
    })
  }, { scope: container })

  return (
    <section id="copy-trading" ref={container} className="relative py-20 sm:py-28 3xl:py-36 4xl:py-44 overflow-hidden">
      {/* Title */}
      <div className="copy-title max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16 mb-12 3xl:mb-16 4xl:mb-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-gradient-to-r from-gold/40 to-transparent" />
          <span className="text-[10px] 3xl:text-[12px] 4xl:text-[14px] text-gold/70 font-mono uppercase tracking-[0.25em]">Copy Trading</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl 3xl:text-6xl 4xl:text-7xl text-white tracking-tight mb-3 3xl:mb-5">
              Follow the <span className="text-gradient-gold">top performers</span>
            </h2>
            <p className="text-white/50 text-sm sm:text-base 3xl:text-lg 4xl:text-xl max-w-xl 3xl:max-w-2xl leading-relaxed">
              Copy-trade verified perpetual leaders with transparent on-chain track records.
              Mirror their positions while maintaining full custody of your funds.
            </p>
          </div>
          <Link to="/copy-trading" className="btn-primary !py-3 !px-7 !text-[12px] group flex-shrink-0">
            View Leaderboard <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16">
        <div className="grid lg:grid-cols-5 gap-4 3xl:gap-6 4xl:gap-8">
          {/* Features Grid */}
          <div className="copy-features lg:col-span-2 grid grid-cols-2 gap-px bg-white/[0.04]">
            {FEATURES.map((f, i) => (
              <div key={i} className="copy-feature bg-[#0a0a14] p-5 sm:p-6">
                <div className="w-9 h-9 flex items-center justify-center border border-gold/10 bg-gold/[0.04] mb-4">
                  <f.icon size={16} strokeWidth={1.5} className="text-gold/60" />
                </div>
                <h3 className="text-white/90 text-[13px] font-semibold mb-2">{f.title}</h3>
                <p className="text-white/40 text-[11px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Leaderboard Preview */}
          <div className="copy-leaderboard lg:col-span-3 bg-[#0a0a14] border border-white/[0.06] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="text-white/35 text-[9px] font-mono uppercase tracking-[0.15em]">Top Traders</span>
                <span className="text-[8px] text-gold/50 font-medium px-1.5 py-0.5 bg-gold/[0.06] border border-gold/10">30D</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#14F195]/50 animate-pulse" />
                <span className="text-white/20 text-[9px] font-mono">Live</span>
              </div>
            </div>

            {/* Table header */}
            <div className="hidden sm:grid grid-cols-12 px-5 py-2 border-b border-white/[0.03] text-white/25 text-[9px] font-medium uppercase tracking-wider">
              <div className="col-span-1">#</div>
              <div className="col-span-3">Trader</div>
              <div className="col-span-2 text-right">30D PnL</div>
              <div className="col-span-2 text-right">ROI</div>
              <div className="col-span-2 text-right">Win Rate</div>
              <div className="col-span-2 text-right">Copiers</div>
            </div>

            {/* Rows */}
            {TOP_TRADERS.map((trader) => (
              <div key={trader.rank} className="copy-card grid grid-cols-12 items-center px-5 py-4 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group cursor-pointer">
                <div className="col-span-1">
                  <span className={`text-[11px] font-mono font-bold ${
                    trader.rank === 1 ? 'text-gold' : trader.rank === 2 ? 'text-white/50' : 'text-white/30'
                  }`}>
                    {trader.rank}
                  </span>
                </div>
                <div className="col-span-3 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold/20 to-purple/20 flex items-center justify-center">
                    <span className="text-[10px] font-semibold text-white/70">{trader.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="text-white/80 text-[12px] font-medium group-hover:text-white transition-colors">{trader.name}</span>
                    <div className="text-white/25 text-[9px] font-mono">{trader.trades} trades</div>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-[#14F195] text-[12px] font-mono font-semibold">{trader.pnl}</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-[#14F195] text-[11px] font-mono">{trader.roi}</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-white/60 text-[11px] font-mono">{trader.winRate}</span>
                </div>
                <div className="col-span-2 text-right flex items-center justify-end gap-1.5">
                  <Users size={10} className="text-white/30" />
                  <span className="text-white/50 text-[11px] font-mono">{trader.copiers.toLocaleString()}</span>
                </div>
              </div>
            ))}

            {/* Footer */}
            <div className="px-5 py-4 flex items-center justify-between">
              <p className="text-white/25 text-[10px]">
                All performance data verified on-chain via Orderly Network
              </p>
              <Link to="/copy-trading" className="text-gold/60 text-[10px] font-medium hover:text-gold/80 transition-colors flex items-center gap-1">
                View all traders
                <ArrowRight size={10} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
