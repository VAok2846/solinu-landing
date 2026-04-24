import { useRef } from 'react'
import { Fingerprint, Wallet, Lock, CheckCircle2, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const FLOW_STEPS = [
  { step: '01', title: 'Connect Wallet', desc: 'Phantom, Solflare, or any Solana wallet', icon: Wallet },
  { step: '02', title: 'Sign Every Order', desc: 'Cryptographic proof you authorized each trade', icon: Fingerprint },
  { step: '03', title: 'On-Chain Settlement', desc: 'Final settlement happens on Solana L1', icon: CheckCircle2 },
]

const SECURITY_POINTS = [
  'Private keys never touch our servers',
  'No account abstraction or session keys',
  'Every order requires wallet signature',
  'Withdraw anytime without permission',
  'Open-source smart contracts',
  'Multiple independent audits',
]

export default function SelfCustody() {
  const container = useRef(null)

  useGSAP(() => {
    gsap.from('.custody-title', {
      scrollTrigger: { trigger: '.custody-title', start: 'top 85%', toggleActions: 'play none none reverse' },
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
    })
    gsap.from('.custody-flow', {
      scrollTrigger: { trigger: '.custody-flow', start: 'top 85%', toggleActions: 'play none none reverse' },
      y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
    })
    gsap.from('.custody-card', {
      scrollTrigger: { trigger: '.custody-grid', start: 'top 82%', toggleActions: 'play none none reverse' },
      y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
    })
    gsap.from('.custody-visual', {
      scrollTrigger: { trigger: '.custody-grid', start: 'top 82%', toggleActions: 'play none none reverse' },
      x: 40, opacity: 0, duration: 0.9, delay: 0.15, ease: 'power3.out',
    })
  }, { scope: container })

  return (
    <section id="self-custody" ref={container} className="relative py-20 sm:py-28 3xl:py-36 4xl:py-44 overflow-hidden">
      {/* Title */}
      <div className="custody-title max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16 mb-12 3xl:mb-16 4xl:mb-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-gradient-to-r from-gold/40 to-transparent" />
          <span className="text-[10px] 3xl:text-[12px] 4xl:text-[14px] text-gold/70 font-mono uppercase tracking-[0.25em]">Self-Custody</span>
        </div>
        <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl 3xl:text-6xl 4xl:text-7xl text-white tracking-tight mb-3 3xl:mb-5">
          Sign every order. <span className="text-gradient-gold">Own every trade.</span>
        </h2>
        <p className="text-white/50 text-sm sm:text-base 3xl:text-lg 4xl:text-xl max-w-2xl 3xl:max-w-3xl leading-relaxed">
          Unlike centralized exchanges or custodial DEXes, Solinu requires your explicit wallet signature for every action.
          No session keys. No account abstraction. Pure self-custody.
        </p>
      </div>

      {/* Flow Steps */}
      <div className="max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16 mb-8 3xl:mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.04]">
          {FLOW_STEPS.map((item, i) => (
            <div key={i} className="custody-flow bg-[#0a0a14] p-6 sm:p-8 relative group">
              {/* Connector line */}
              {i < FLOW_STEPS.length - 1 && (
                <div className="hidden sm:block absolute top-1/2 right-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-gold/20 translate-x-1/2 z-0" />
              )}
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-gold/15 bg-gold/[0.04]">
                    <item.icon size={18} strokeWidth={1.5} className="text-gold/70" />
                  </div>
                  <span className="text-gold/30 text-[10px] font-mono tracking-wider">{item.step}</span>
                </div>
                <h3 className="text-white text-[15px] font-semibold mb-2">{item.title}</h3>
                <p className="text-white/40 text-[12px] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column grid */}
      <div className="custody-grid max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16">
        <div className="grid lg:grid-cols-2 gap-4 3xl:gap-6 4xl:gap-8">
          {/* Security card */}
          <div className="custody-card bg-[#0a0a14] border border-white/[0.06] p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 flex items-center justify-center bg-[#14F195]/[0.06] border border-[#14F195]/15">
                <Lock size={16} strokeWidth={1.5} className="text-[#14F195]/70" />
              </div>
              <div>
                <h3 className="text-white text-[14px] font-semibold">True Self-Custody</h3>
                <p className="text-white/30 text-[10px]">Your keys never leave your device</p>
              </div>
            </div>

            <div className="space-y-3">
              {SECURITY_POINTS.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={14} strokeWidth={1.5} className="text-[#14F195]/50 mt-0.5 flex-shrink-0" />
                  <span className="text-white/55 text-[12px] leading-relaxed">{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <div className="flex items-center justify-between">
                <span className="text-white/25 text-[10px] font-mono uppercase tracking-wider">Verification</span>
                <a href="https://orderly.network" target="_blank" rel="noopener noreferrer" 
                   className="text-gold/50 text-[10px] font-medium hover:text-gold/70 transition-colors flex items-center gap-1">
                  View contracts
                  <ArrowRight size={10} />
                </a>
              </div>
            </div>
          </div>

          {/* Visual representation */}
          <div className="custody-visual bg-[#0a0a14] border border-white/[0.06] overflow-hidden">
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
              <span className="text-white/35 text-[9px] font-mono uppercase tracking-[0.15em]">Order Flow</span>
              <span className="text-white/20 text-[9px] font-mono">Wallet Signature Required</span>
            </div>

            <div className="p-6 sm:p-8">
              {/* Visual flow diagram */}
              <div className="space-y-4">
                {/* Your Wallet */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 flex items-center justify-center">
                    <Wallet size={20} className="text-gold/70" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white/80 text-[12px] font-medium">Your Wallet</div>
                    <div className="text-white/30 text-[10px] font-mono">Private key stored locally</div>
                  </div>
                  <div className="text-[#14F195] text-[9px] font-mono px-2 py-1 bg-[#14F195]/[0.06] border border-[#14F195]/15">SECURE</div>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-2 pl-5">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-gold/20 to-gold/5" />
                  <span className="text-[9px] text-white/20 font-mono">Signs order with private key</span>
                </div>

                {/* Signature */}
                <div className="flex items-center gap-4 bg-white/[0.02] p-3 border border-white/[0.04]">
                  <div className="w-10 h-10 rounded bg-gold/[0.06] border border-gold/15 flex items-center justify-center">
                    <Fingerprint size={18} className="text-gold/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white/70 text-[11px] font-medium">Cryptographic Signature</div>
                    <div className="text-white/25 text-[9px] font-mono truncate">0x7f8a...3c91</div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-2 pl-5">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-white/10 to-transparent" />
                  <span className="text-[9px] text-white/20 font-mono">Submitted to orderbook</span>
                </div>

                {/* Orderly */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple/[0.06] border border-purple/15 flex items-center justify-center">
                    <img src="/orderly.svg" alt="" className="w-6 h-6" onError={e => { e.target.style.display = 'none' }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-white/80 text-[12px] font-medium">Orderly CLOB</div>
                    <div className="text-white/30 text-[10px] font-mono">Verifies signature, matches order</div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-2 pl-5">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-[#14F195]/20 to-transparent" />
                  <span className="text-[9px] text-white/20 font-mono">Settles on-chain</span>
                </div>

                {/* Solana */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#14F195]/[0.06] border border-[#14F195]/15 flex items-center justify-center">
                    <img src="/logos/solana.png" alt="" className="w-6 h-6" onError={e => { e.target.style.display = 'none' }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-white/80 text-[12px] font-medium">Solana L1</div>
                    <div className="text-white/30 text-[10px] font-mono">Final settlement, 400ms finality</div>
                  </div>
                  <div className="text-[#14F195] text-[9px] font-mono px-2 py-1 bg-[#14F195]/[0.06] border border-[#14F195]/15">FINAL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
