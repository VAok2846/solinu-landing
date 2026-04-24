import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] 3xl:w-[900px] 3xl:h-[600px] 4xl:w-[1200px] 4xl:h-[800px] rounded-full filter blur-[180px] 3xl:blur-[260px] 4xl:blur-[340px] opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #FFD700, #9945FF, transparent 70%)' }} />
      </div>

      <div className="cta-content relative z-10 max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16 text-center">
        <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-7xl 3xl:text-8xl 4xl:text-9xl text-white tracking-tight leading-[1.05] mb-6 3xl:mb-10 4xl:mb-14">
          Start trading
          <br />
          <span className="text-gradient-gold glow-text-gold">perpetuals</span>
        </h2>

        <p className="text-white/55 text-base sm:text-lg 3xl:text-xl 4xl:text-2xl max-w-md 3xl:max-w-lg 4xl:max-w-xl mx-auto mb-8 3xl:mb-12 4xl:mb-16 leading-relaxed">
          90+ markets. Up to 100× leverage. Non-custodial.
          Connect any Solana wallet.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 3xl:gap-5 mb-10 3xl:mb-14 4xl:mb-18">
          <Link to="/trade" className="btn-primary !py-3.5 !px-8 !text-[13px] group">
            Launch App
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a href="https://x.com/SolinuExchange" target="_blank" rel="noopener noreferrer" className="btn-secondary !py-3.5 !px-6">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            @SolinuExchange
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.04] max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl mx-auto">
          {[
            { label: 'Custody', value: 'Self' },
            { label: 'KYC', value: 'None' },
            { label: 'Markets', value: '90+' },
            { label: 'Settlement', value: 'On-chain' },
          ].map((item, i) => (
            <div key={i} className="bg-[#0a0a14] text-center py-3.5 px-3">
              <div className="text-white/80 text-[13px] font-heading font-bold mb-0.5">{item.value}</div>
              <div className="text-white/45 text-[9px] uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
