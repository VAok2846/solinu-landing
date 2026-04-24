import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const QUESTIONS = [
  { q: 'What is SOLINU Exchange?', a: 'A decentralized perpetual futures exchange on Orderly Network. 90+ markets, up to 100x leverage, sub-second execution, full self-custody.' },
  { q: 'What wallets are supported?', a: 'All major Solana wallets (Phantom, Solflare, Backpack) plus EVM wallets (MetaMask) for cross-chain deposits from 17+ networks.' },
  { q: 'How does self-custody work?', a: 'SOLINU never holds your funds. Deposits and withdrawals go through audited on-chain contracts. Private keys stay on your device.' },
  { q: 'What are the trading fees?', a: 'Maker 0.03%, taker 0.06% (RWA taker 0.05%). Volume-based tiers unlock lower rates. No hidden charges or withdrawal fees.' },
  { q: 'How do I claim the $SOLINU airdrop?', a: '20% of supply airdropped to 10,000 wallets via compressed tokens. Claim at airship.helius.dev/decompress.' },
  { q: 'Is the platform audited?', a: 'Built on Orderly Network, audited by Zellic and Quantstamp. 24/7 monitoring with professional-grade security.' },
  { q: 'What is Orderly Network?', a: 'Omnichain orderbook infrastructure with shared institutional liquidity, sub-200ms matching, and on-chain settlement across 17+ chains.' },
  { q: 'Do I need KYC to trade?', a: 'No. Fully permissionless — no KYC, no sign-ups, no personal data. Connect wallet and trade.' },
]

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/[0.04] last:border-b-0">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-4 text-left group cursor-pointer">
        <span className={`text-[13px] font-heading font-semibold pr-8 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/50 group-hover:text-white/70'}`}>{item.q}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="flex-shrink-0">
          <ChevronDown size={14} className={`transition-colors duration-300 ${isOpen ? 'text-gold' : 'text-white/20 group-hover:text-white/40'}`} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
            <p className="text-white/55 text-[12px] leading-relaxed pb-4 pr-10">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const container = useRef(null)
  const [openIndex, setOpenIndex] = useState(null)

  useGSAP(() => {
    gsap.from('.faq-title', {
      scrollTrigger: { trigger: '.faq-title', start: 'top 85%', toggleActions: 'play none none reverse' },
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
    })
    gsap.from('.faq-list', {
      scrollTrigger: { trigger: '.faq-list', start: 'top 88%', toggleActions: 'play none none reverse' },
      y: 25, opacity: 0, duration: 0.8, ease: 'power3.out',
    })
  }, { scope: container })

  return (
    <section id="faq" ref={container} className="relative py-16 sm:py-20 3xl:py-28 4xl:py-36 overflow-hidden">
      <div className="max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16">
        {/* Title */}
        <div className="faq-title mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-white/20 to-transparent" />
            <span className="text-[10px] 3xl:text-[12px] 4xl:text-[14px] text-white/50 font-mono uppercase tracking-[0.25em]">FAQ</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl 3xl:text-5xl 4xl:text-6xl text-white tracking-tight mb-2 3xl:mb-4">
            Common questions
          </h2>
          <p className="text-white/50 text-sm 3xl:text-base 4xl:text-lg">
            Exchange, token, and infrastructure.
          </p>
        </div>

        {/* Accordion */}
        <div className="faq-list bg-[#0a0a14] border border-white/[0.06] px-5 sm:px-6">
          {QUESTIONS.map((item, i) => (
            <AccordionItem key={i} item={item} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  )
}
