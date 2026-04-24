import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ORDERLY = {
  name: 'Orderly Network', url: 'https://orderly.network', img: '/orderly.svg',
  role: 'Execution Layer',
  desc: 'Shared CLOB with institutional market makers. Sub-200ms matching across 30+ connected DEXes. 90+ perpetual futures markets.',
  stats: [
    { val: '<200ms', label: 'Order matching' },
    { val: '$5B+', label: 'Total volume' },
    { val: '30+', label: 'Connected DEXes' },
    { val: '90+', label: 'Perp markets' },
  ],
}

const STACK = [
  { name: 'Solana', url: 'https://solana.com', img: '/logos/solana.png', role: 'Settlement', accent: '#14F195', stat: '400ms finality' },
  { name: 'LayerZero', url: 'https://layerzero.network', img: '/logos/layerzero.png', role: 'Cross-chain', accent: '#FFD700', stat: '17+ chains' },
  { name: 'Phantom', url: 'https://phantom.app', img: '/logos/phantom.png', role: 'Wallet', accent: '#AB9FF2', stat: '3M+ users' },
  { name: 'Helius', url: 'https://helius.dev', img: '/logos/helius.png', role: 'RPC', accent: '#FF6B35', stat: '50ms latency' },
  { name: '$SOLINU', url: '/swap', internal: true, img: '/solinu-logo.jpg', role: 'On-exchange', accent: '#FFD700', stat: 'SOLINU Swap' },
]

const SPECS = [
  { label: 'Order type', value: 'Limit / Market / Stop' },
  { label: 'Max leverage', value: '100×' },
  { label: 'Settlement', value: 'On-chain (Solana)' },
  { label: 'Matching', value: 'Off-chain CLOB' },
  { label: 'Custody', value: 'Non-custodial' },
  { label: 'Cross-chain', value: '17+ via LayerZero' },
]

export default function Infrastructure() {
  const container = useRef(null)

  useGSAP(() => {
    gsap.from('.infra-title', {
      scrollTrigger: { trigger: '.infra-title', start: 'top 85%', toggleActions: 'play none none reverse' },
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
    })
    gsap.from('.infra-orderly', {
      scrollTrigger: { trigger: '.infra-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
      x: -50, opacity: 0, duration: 0.9, ease: 'power3.out',
    })
    gsap.from('.infra-arch', {
      scrollTrigger: { trigger: '.infra-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
      x: 50, opacity: 0, duration: 0.9, delay: 0.15, ease: 'power3.out',
    })
    gsap.from('.infra-tv', {
      scrollTrigger: { trigger: '.infra-tv', start: 'top 85%', toggleActions: 'play none none reverse' },
      y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
    })
    gsap.from('.infra-stack-item', {
      scrollTrigger: { trigger: '.infra-stack', start: 'top 85%', toggleActions: 'play none none reverse' },
      y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
    })
    gsap.from('.infra-stats', {
      scrollTrigger: { trigger: '.infra-stats', start: 'top 90%', toggleActions: 'play none none reverse' },
      y: 20, opacity: 0, duration: 0.7, ease: 'power3.out',
    })
  }, { scope: container })

  return (
    <section id="partners" ref={container} className="relative py-20 sm:py-28 3xl:py-36 4xl:py-44 overflow-hidden">
      {/* Title */}
      <div className="infra-title max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16 mb-12 sm:mb-16 3xl:mb-20 4xl:mb-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-gradient-to-r from-purple/40 to-transparent" />
          <span className="text-[10px] 3xl:text-[12px] 4xl:text-[14px] text-purple/70 font-mono uppercase tracking-[0.25em]">Infrastructure</span>
        </div>
        <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl 3xl:text-6xl 4xl:text-7xl text-white tracking-tight mb-3 3xl:mb-5">
          Built on proven protocols
        </h2>
        <p className="text-white/50 text-sm sm:text-base 3xl:text-lg 4xl:text-xl max-w-xl 3xl:max-w-2xl leading-relaxed">
          No custom smart contracts. Every trade settles through the same orderbook
          and infrastructure used by 30+ production DEXes.
        </p>
      </div>

      {/* Main grid: Orderly card + Architecture specs */}
      <div className="infra-grid max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16 grid lg:grid-cols-2 gap-4 3xl:gap-6 4xl:gap-8 mb-8 3xl:mb-12">
        {/* Orderly — left */}
        <a
          href={ORDERLY.url} target="_blank" rel="noopener noreferrer"
          className="infra-orderly group block relative bg-[#0a0a14] border border-white/[0.06] p-6 sm:p-8 hover:border-purple/15 transition-all duration-500"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-11 h-11 bg-purple/[0.08] border border-purple/[0.12] flex items-center justify-center">
              <img src={ORDERLY.img} alt="" className="w-6 h-6" onError={e => { e.target.style.display = 'none' }} />
            </div>
            <div>
              <div className="text-white text-[15px] font-heading font-bold">{ORDERLY.name}</div>
              <div className="text-purple/40 text-[9px] font-semibold uppercase tracking-[0.15em]">{ORDERLY.role}</div>
            </div>
            <ArrowUpRight size={14} className="text-white/0 group-hover:text-white/30 transition-colors ml-auto" />
          </div>

          <p className="text-white/50 text-[13px] leading-relaxed mb-6">{ORDERLY.desc}</p>

          <div className="grid grid-cols-2 gap-4">
            {ORDERLY.stats.map((s, i) => (
              <div key={i}>
                <div className="font-heading font-bold text-xl text-white leading-none">{s.val}</div>
                <div className="text-white/35 text-[9px] mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </a>

        {/* Architecture — right */}
        <div className="infra-arch bg-[#0a0a14] border border-white/[0.06] overflow-hidden">
          <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <span className="text-white/35 text-[9px] font-mono uppercase tracking-[0.2em]">Architecture</span>
            <span className="text-white/25 text-[9px] font-mono">Orderly CLOB → Solana L1</span>
          </div>

          {/* Flow diagram */}
          <div className="px-5 py-5">
            <div className="flex items-center gap-3 mb-5">
              {['Your Wallet', 'Orderly CLOB', 'Solana L1'].map((step, i) => (
                <div key={i} className="flex items-center gap-3 flex-1">
                  <div className="flex-1 text-center py-2 border border-white/[0.06] bg-white/[0.02]">
                    <span className="text-white/60 text-[10px] font-heading font-semibold">{step}</span>
                  </div>
                  {i < 2 && (
                    <svg width="16" height="8" className="flex-shrink-0 text-white/15" viewBox="0 0 16 8">
                      <path d="M0 4h12M10 1l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  )}
                </div>
              ))}
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-px bg-white/[0.03]">
              {SPECS.map((spec, i) => (
                <div key={i} className="bg-[#0a0a14] px-3 py-2.5">
                  <div className="text-white/35 text-[8px] uppercase tracking-wider mb-0.5">{spec.label}</div>
                  <div className="text-white/70 text-[11px] font-heading font-semibold">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TradingView — featured partner */}
      <div className="infra-tv max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16 mb-8 3xl:mb-12">
        <a
          href="https://www.tradingview.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative bg-[#0a0a14] border border-white/[0.06] hover:border-[#2962FF]/20 transition-all duration-500 overflow-hidden"
        >
          {/* Subtle blue accent glow */}
          <div className="absolute top-0 right-0 w-[300px] h-[200px] rounded-full filter blur-[120px] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700" style={{ background: '#2962FF' }} />

          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 p-6 sm:p-8 3xl:p-10 4xl:p-12">
            {/* Logo + badge */}
            <div className="flex items-center gap-5 flex-shrink-0">
              <div className="w-14 h-14 3xl:w-16 3xl:h-16 4xl:w-20 4xl:h-20 bg-[#2962FF]/[0.06] border border-[#2962FF]/[0.12] flex items-center justify-center">
                <img src="/logos/logo-tradingview.png" alt="TradingView" className="w-9 h-9 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12 object-contain" onError={e => { e.target.style.display = 'none' }} />
              </div>
              <div>
                <div className="text-white text-[16px] 3xl:text-[18px] 4xl:text-[20px] font-heading font-bold flex items-center gap-2">
                  TradingView
                  <span className="text-[8px] 3xl:text-[9px] 4xl:text-[10px] text-[#2962FF]/80 font-semibold uppercase tracking-[0.2em] px-2 py-0.5 bg-[#2962FF]/[0.06] border border-[#2962FF]/[0.12]">Charting Partner</span>
                </div>
                <div className="text-[#2962FF]/50 text-[9px] 3xl:text-[10px] 4xl:text-[11px] font-semibold uppercase tracking-[0.15em] mt-0.5">Advanced Charts & Real-Time Data</div>
              </div>
            </div>

            {/* Description */}
            <div className="flex-1 min-w-0">
              <p className="text-white/50 text-[13px] 3xl:text-[14px] 4xl:text-[16px] leading-relaxed mb-4">
                SOLINU Exchange uses <span className="text-white/70 font-medium">TradingView</span> technology to deliver professional-grade charting. TradingView serves a worldwide community of traders and investors with robust support across browsers, desktops, and mobile applications — offering real-time market data, 100+ built-in indicators, advanced drawing tools, and multi-timeframe analysis.
              </p>
              <div className="flex flex-wrap gap-3 3xl:gap-4">
                {[
                  'Real-time charts',
                  '100+ indicators',
                  'Drawing tools',
                  'Multi-timeframe',
                  'Cross-platform',
                ].map((feat, i) => (
                  <span key={i} className="text-[10px] 3xl:text-[11px] 4xl:text-[12px] text-white/40 font-medium px-2.5 py-1 bg-white/[0.03] border border-white/[0.06]">{feat}</span>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <ArrowUpRight size={16} className="hidden lg:block text-white/0 group-hover:text-white/30 transition-colors flex-shrink-0" />
          </div>
        </a>
      </div>

      {/* Stack — partner row */}
      <div className="infra-stack max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16 mb-8 3xl:mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-white/[0.04]">
          {STACK.map((p) => {
            const cls = 'infra-stack-item group bg-[#0a0a14] p-4 hover:bg-[#0e0e1a] transition-colors duration-300'
            const body = (
              <>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 flex items-center justify-center border border-white/[0.06]"
                    style={{ background: `${p.accent}08` }}>
                    <img src={p.img} alt="" className="w-4 h-4" onError={e => { e.target.style.display = 'none' }} />
                  </div>
                  <div>
                    <div className="text-white/80 text-[12px] font-heading font-bold group-hover:text-white transition-colors">{p.name}</div>
                    <div className="text-[8px] uppercase tracking-wider" style={{ color: `${p.accent}60` }}>{p.role}</div>
                  </div>
                </div>
                <div className="text-white/40 text-[11px] font-mono">{p.stat}</div>
              </>
            )
            return p.internal ? (
              <Link key={p.name} to={p.url} className={cls}>{body}</Link>
            ) : (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>
            )
          })}
        </div>
      </div>

      {/* Stats bar */}
      <div className="infra-stats max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 py-4 border-t border-white/[0.06]">
          {[
            { val: '$5B+', label: 'Orderbook volume' },
            { val: '17+', label: 'Chains supported' },
            { val: '3M+', label: 'Wallet users' },
            { val: '<200ms', label: 'Execution' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-heading font-bold text-[14px] text-white/70">{s.val}</span>
              <span className="text-white/35 text-[10px] uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
