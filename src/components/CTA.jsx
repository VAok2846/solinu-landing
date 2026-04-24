import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Fingerprint, Shield, Zap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const VALUE_PROPS = [
  { icon: Fingerprint, label: 'Sign Every Order', value: 'Self-Custody' },
  { icon: Shield, label: 'No Account Required', value: 'Connect & Trade' },
  { icon: Zap, label: 'Settlement Time', value: '<400ms' },
]

export default function CTA() {
  const container = useRef(null)

  useGSAP(() => {
    gsap.from('.cta-content', {
      scrollTrigger: { trigger: '.cta-content', start: 'top 85%', toggleActions: 'play none none reverse' },
      y: 50, opacity: 0, scale: 0.97, duration: 1, ease: 'power3.out',
    })
  }, { scope: container })

  return (
    <section ref={container} className="relative py-20 sm:py-28 3xl:py-36 4xl:py-44 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0814] to-[#06060a]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] 3xl:w-[900px] 3xl:h-[600px] 4xl:w-[1200px] 4xl:h-[800px] rounded-full filter blur-[180px] 3xl:blur-[260px] 4xl:blur-[340px] opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #FFD700, #9945FF, transparent 70%)' }} />
      </div>

      <div className="cta-content relative z-10 max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16 text-center">
        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <span className="text-[10px] text-gold/50 font-mono uppercase tracking-[0.2em]">Start Trading</span>
          <div className="w-8 h-px bg-gradient-to-l from-transparent via-gold/30 to-transparent" />
        </div>

        <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl 3xl:text-6xl 4xl:text-7xl text-white tracking-tight leading-[1.1] mb-6 3xl:mb-10 4xl:mb-14">
          Trade perpetuals with
          <br />
          <span className="text-gradient-gold">full control</span>
        </h2>

        <p className="text-white/45 text-base sm:text-lg 3xl:text-xl 4xl:text-2xl max-w-xl 3xl:max-w-2xl 4xl:max-w-3xl mx-auto mb-8 3xl:mb-12 4xl:mb-16 leading-relaxed">
          Connect any Solana wallet. No account creation. No KYC.
          Your keys authorize every trade.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 3xl:gap-5 mb-12 3xl:mb-16 4xl:mb-20">
          <Link to="/trade" className="btn-primary !py-3.5 !px-8 !text-[12px] group">
            Launch App
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <div className="flex items-center gap-2">
            <a 
              href="https://x.com/SolinuExchange" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary !py-3.5 !px-5"
              aria-label="Follow on X"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a 
              href="https://t.me/SolinuExchange" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary !py-3.5 !px-5"
              aria-label="Join Telegram"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
          </div>
        </div>

        {/* Value props */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.04] max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl mx-auto">
          {VALUE_PROPS.map((item, i) => (
            <div key={i} className="bg-[#0a0a14] py-5 px-4 flex items-center gap-3 justify-center">
              <item.icon size={16} strokeWidth={1.5} className="text-gold/50 flex-shrink-0" />
              <div className="text-left">
                <div className="text-white/70 text-[12px] font-medium">{item.value}</div>
                <div className="text-white/30 text-[9px]">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
