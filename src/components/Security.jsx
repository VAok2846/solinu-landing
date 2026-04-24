import { useRef } from 'react'
import { ExternalLink, Shield } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const AUDITORS = [
  { name: 'Zellic', scope: 'Smart Contract Audit', detail: 'Vault logic, cross-chain messaging, settlement flows', url: 'https://zellic.io', img: '/logos/zellic.png' },
  { name: 'Quantstamp', scope: 'Security Assessment', detail: 'Access controls, reentrancy, oracle manipulation, economic attacks', url: 'https://quantstamp.com', img: '/logos/quantstamp.png' },
]

const PROTECTIONS = [
  'Private keys never leave your device',
  'On-chain settlement — every trade verifiable on Solana',
  '24/7 anomaly detection and circuit breakers',
  'Active bug bounty via Orderly Network',
  'Insurance fund covers liquidation shortfalls',
]

export default function Security() {
  const container = useRef(null)

  useGSAP(() => {
    gsap.from('.sec-title', {
      scrollTrigger: { trigger: '.sec-title', start: 'top 85%', toggleActions: 'play none none reverse' },
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
    })
    gsap.from('.sec-left', {
      scrollTrigger: { trigger: '.sec-grid', start: 'top 82%', toggleActions: 'play none none reverse' },
      x: -40, opacity: 0, duration: 0.9, ease: 'power3.out',
    })
    gsap.from('.sec-right', {
      scrollTrigger: { trigger: '.sec-grid', start: 'top 82%', toggleActions: 'play none none reverse' },
      x: 40, opacity: 0, duration: 0.9, delay: 0.12, ease: 'power3.out',
    })
  }, { scope: container })

  return (
    <section id="security" ref={container} className="relative py-20 sm:py-28 3xl:py-36 4xl:py-44 overflow-hidden">
      {/* Title */}
      <div className="sec-title max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16 mb-12 3xl:mb-16 4xl:mb-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-gradient-to-r from-[#14F195]/40 to-transparent" />
          <span className="text-[10px] 3xl:text-[12px] 4xl:text-[14px] text-[#14F195]/80 font-mono uppercase tracking-[0.25em]">Security</span>
        </div>
        <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl 3xl:text-6xl 4xl:text-7xl text-white tracking-tight mb-3 3xl:mb-5">
          Your keys. <span className="text-[#14F195]">Your funds.</span>
        </h2>
        <p className="text-white/50 text-sm 3xl:text-base 4xl:text-lg max-w-lg 3xl:max-w-xl leading-relaxed">
          Solinu never touches your assets. All funds sit in audited on-chain vaults
          controlled by Orderly Network smart contracts.
        </p>
      </div>

      {/* Two-column grid */}
      <div className="sec-grid max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16 grid lg:grid-cols-5 gap-4 3xl:gap-6 4xl:gap-8">
        {/* Left — stats + protections */}
        <div className="sec-left lg:col-span-3 bg-[#0a0a14] border border-white/[0.06] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#14F195] animate-pulse rounded-full" />
            <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider">All systems operational</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$0', label: 'Funds lost' },
              { value: '2', label: 'Independent audits' },
              { value: '30+', label: 'DEXes on Orderly' },
              { value: '24/7', label: 'Monitoring' },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-heading font-bold text-2xl text-white">{s.value}</div>
                <div className="text-white/35 text-[9px] mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/[0.06] pt-6">
            <div className="text-white/30 text-[9px] font-mono uppercase tracking-wider mb-4">How your funds are protected</div>
            <ul className="space-y-3">
              {PROTECTIONS.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#14F195]/60 flex-shrink-0" />
                  <span className="text-white/55 text-[12px] leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right — audit reports */}
        <div className="sec-right lg:col-span-2 bg-[#0a0a14] border border-white/[0.06] overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-white/[0.06]">
            <span className="text-white/35 text-[9px] font-mono uppercase tracking-[0.15em]">Audit Reports</span>
          </div>
          {AUDITORS.map((a) => (
            <a key={a.name} href={a.url} target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-4 px-5 py-5 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors flex-1">
              <img src={a.img} alt={a.name} className="w-10 h-10 object-cover flex-shrink-0" onError={e => { e.target.style.display = 'none' }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white/90 text-[13px] font-heading font-bold group-hover:text-white transition-colors">{a.name}</span>
                  <ExternalLink size={10} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </div>
                <div className="text-[#14F195]/50 text-[9px] uppercase tracking-wider mb-1">{a.scope}</div>
                <div className="text-white/40 text-[11px] leading-snug">{a.detail}</div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-7 h-7 bg-[#14F195]/[0.06] border border-[#14F195]/15 flex items-center justify-center">
                  <Shield size={12} strokeWidth={1.5} className="text-[#14F195]/60" />
                </div>
              </div>
            </a>
          ))}
          <div className="mt-auto px-5 py-4 bg-white/[0.01] border-t border-white/[0.04]">
            <p className="text-white/30 text-[10px] leading-relaxed">
              Orderly Network infrastructure has processed over $5B in volume with zero security incidents.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
