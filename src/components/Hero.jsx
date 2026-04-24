import { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import HeroBg from './HeroBg'

gsap.registerPlugin(useGSAP)

// Platform is live — no countdown needed

const COINS = [
  { binance: 'BTCUSDT', display: 'BTC-PERP', icon: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png', fallbackPrice: 97241.2, fallbackChange: 2.41 },
  { binance: 'ETHUSDT', display: 'ETH-PERP', icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png', fallbackPrice: 3412.8, fallbackChange: 1.87 },
  { binance: 'SOLUSDT', display: 'SOL-PERP', icon: 'https://assets.coingecko.com/coins/images/4128/small/solana.png', fallbackPrice: 178.45, fallbackChange: 5.32 },
  { binance: 'DOGEUSDT', display: 'DOGE-PERP', icon: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png', fallbackPrice: 0.4123, fallbackChange: -0.92 },
  { binance: 'ARBUSDT', display: 'ARB-PERP', icon: 'https://assets.coingecko.com/coins/images/16547/small/arb.jpg', fallbackPrice: 1.234, fallbackChange: 3.15 },
  { binance: 'AVAXUSDT', display: 'AVAX-PERP', icon: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png', fallbackPrice: 42.18, fallbackChange: -1.23 },
  { binance: 'LINKUSDT', display: 'LINK-PERP', icon: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png', fallbackPrice: 18.92, fallbackChange: 2.76 },
  { binance: 'OPUSDT', display: 'OP-PERP', icon: 'https://assets.coingecko.com/coins/images/25244/small/Optimism.png', fallbackPrice: 2.845, fallbackChange: 4.01 },
]

function formatPrice(p) {
  if (p >= 1000) return p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  if (p >= 1) return p.toFixed(2)
  return p.toFixed(4)
}

function useLivePrices() {
  const [prices, setPrices] = useState(() =>
    COINS.map(c => ({ ...c, price: c.fallbackPrice, change: c.fallbackChange, live: false }))
  )

  const fetchPrices = useCallback(async () => {
    try {
      const symbols = COINS.map(c => `"${c.binance}"`).join(',')
      const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=[${symbols}]`)
      if (!res.ok) return
      const data = await res.json()
      const map = {}
      data.forEach(d => { map[d.symbol] = d })
      setPrices(COINS.map(c => {
        const d = map[c.binance]
        if (d) {
          const price = parseFloat(d.lastPrice)
          const change = parseFloat(d.priceChangePercent)
          if (!isNaN(price) && !isNaN(change)) return { ...c, price, change, live: true }
        }
        return { ...c, price: c.fallbackPrice, change: c.fallbackChange, live: false }
      }))
    } catch { /* fallback prices remain */ }
  }, [])

  useEffect(() => {
    fetchPrices()
    const id = setInterval(fetchPrices, 30000)
    return () => clearInterval(id)
  }, [fetchPrices])

  return prices
}

export default function Hero() {
  const container = useRef(null)
  const prices = useLivePrices()

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo('.hero-badge',
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
    0.15)

    tl.fromTo('.hero-title-line',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power4.out' },
    0.25)

    tl.fromTo('.hero-sub',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
    0.6)

    tl.fromTo('.hero-cta',
      { y: 16, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08 },
    0.75)

    tl.fromTo('.hero-stat',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.06 },
    0.9)

    tl.fromTo('.hero-ticker',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
    1.05)
  }, { scope: container })

  return (
    <section ref={container} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Animated Background */}
      <HeroBg />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#06060a] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#06060a] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[2200px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16 w-full pt-32 3xl:pt-40 4xl:pt-48 pb-12 3xl:pb-16 4xl:pb-20">
        <div className="relative text-center max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl mx-auto">
          {/* Badge row */}
          <div className="flex items-center justify-center gap-2.5 3xl:gap-4 flex-wrap mb-8 3xl:mb-12 4xl:mb-14">
            <span className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 3xl:px-6 3xl:py-2.5 border border-[#14F195]/20 bg-[#14F195]/[0.06] text-[11px] 3xl:text-[13px] 4xl:text-[15px] font-medium rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse" />
              <span className="text-[#14F195] font-semibold tracking-wide uppercase">Platform is Live</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading font-bold mb-6 3xl:mb-10 4xl:mb-14">
            <span className="hero-title-line block text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl 3xl:text-9xl 4xl:text-[10rem] tracking-tight leading-[0.95]">
              Trading is
            </span>
            <span className="hero-title-line block text-gradient-gold text-5xl sm:text-6xl md:text-7xl lg:text-8xl 3xl:text-9xl 4xl:text-[10rem] tracking-tight leading-[0.95] glow-text-gold">
              Live
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub text-white/55 text-base sm:text-lg 3xl:text-xl 4xl:text-2xl font-light max-w-lg 3xl:max-w-2xl 4xl:max-w-3xl mx-auto mb-10 3xl:mb-14 4xl:mb-16 leading-relaxed">
            90+ perpetual markets &middot; 100x leverage &middot; Powered by Orderly Network
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 3xl:gap-5 mb-14 3xl:mb-20 4xl:mb-24">
            <Link to="/trade" className="hero-cta btn-primary">
              Explore Platform
            </Link>
            <a
              href="https://x.com/SolinuExchange"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta btn-secondary"
            >
              Follow Updates
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 sm:gap-14 3xl:gap-20 4xl:gap-28 flex-wrap px-2">
            {[
              { label: 'Markets', value: '90+' },
              { label: 'Max Leverage', value: '100\u00d7' },
              { label: 'Chains', value: '17+' },
              { label: 'KYC Required', value: 'None' },
            ].map((stat, i) => (
              <div key={i} className="hero-stat text-center">
                <div className="font-heading font-bold text-3xl sm:text-4xl 3xl:text-5xl 4xl:text-6xl text-white">{stat.value}</div>
                <div className="text-white/40 text-[11px] 3xl:text-sm 4xl:text-base font-medium mt-1 3xl:mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live ticker tape */}
      <div className="hero-ticker relative z-10 border-y border-white/[0.04] overflow-hidden mt-auto">
        <div className="flex animate-ticker">
          {[...prices, ...prices].map((pair, i) => (
            <div key={i} className="flex items-center gap-2.5 px-5 sm:px-6 py-3 whitespace-nowrap border-r border-white/[0.03]">
              <img src={pair.icon} alt="" className="w-4 h-4" loading="lazy" onError={e => { e.target.style.display = 'none' }} />
              <span className="text-white/50 text-[12px] font-mono font-semibold">{pair.display}</span>
              <span className="text-white/70 text-[12px] font-mono">${formatPrice(pair.price)}</span>
              <span className={`text-[11px] font-mono font-semibold ${pair.change >= 0 ? 'text-[#14F195]' : 'text-[#FF4D4D]'}`}>
                {pair.change >= 0 ? '+' : ''}{pair.change.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
