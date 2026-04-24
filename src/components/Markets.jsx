import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const MARKETS = [
  { binance: 'BTCUSDT', symbol: 'BTC', display: 'BTC-PERP', icon: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png', fp: 97241.2, fc: 2.41, fv: 28400000000, cat: 'l1', lev: '100x' },
  { binance: 'ETHUSDT', symbol: 'ETH', display: 'ETH-PERP', icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png', fp: 3412.8, fc: 1.87, fv: 12800000000, cat: 'l1', lev: '100x' },
  { binance: 'SOLUSDT', symbol: 'SOL', display: 'SOL-PERP', icon: 'https://assets.coingecko.com/coins/images/4128/small/solana.png', fp: 178.45, fc: 5.32, fv: 4200000000, cat: 'l1', lev: '100x' },
  { binance: 'BNBUSDT', symbol: 'BNB', display: 'BNB-PERP', icon: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png', fp: 612.3, fc: 1.2, fv: 1500000000, cat: 'l1', lev: '20x' },
  { binance: 'XRPUSDT', symbol: 'XRP', display: 'XRP-PERP', icon: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png', fp: 2.38, fc: 3.1, fv: 2100000000, cat: 'l1', lev: '20x' },
  { binance: 'DOGEUSDT', symbol: 'DOGE', display: 'DOGE-PERP', icon: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png', fp: 0.4123, fc: -0.92, fv: 3200000000, cat: 'meme', lev: '20x' },
  { binance: 'AVAXUSDT', symbol: 'AVAX', display: 'AVAX-PERP', icon: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png', fp: 42.18, fc: -1.23, fv: 580000000, cat: 'l1', lev: '20x' },
  { binance: 'LINKUSDT', symbol: 'LINK', display: 'LINK-PERP', icon: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png', fp: 18.92, fc: 2.76, fv: 890000000, cat: 'defi', lev: '20x' },
  { binance: 'ARBUSDT', symbol: 'ARB', display: 'ARB-PERP', icon: 'https://assets.coingecko.com/coins/images/16547/small/arb.jpg', fp: 1.234, fc: 3.15, fv: 420000000, cat: 'l2', lev: '20x' },
  { binance: 'OPUSDT', symbol: 'OP', display: 'OP-PERP', icon: 'https://assets.coingecko.com/coins/images/25244/small/Optimism.png', fp: 2.845, fc: 4.01, fv: 340000000, cat: 'l2', lev: '20x' },
  { binance: 'SUIUSDT', symbol: 'SUI', display: 'SUI-PERP', icon: 'https://assets.coingecko.com/coins/images/26375/small/sui-ocean-square.png', fp: 3.72, fc: 6.1, fv: 780000000, cat: 'l1', lev: '20x' },
  { binance: 'INJUSDT', symbol: 'INJ', display: 'INJ-PERP', icon: 'https://assets.coingecko.com/coins/images/12882/small/Secondary_Symbol.png', fp: 24.5, fc: 1.8, fv: 290000000, cat: 'defi', lev: '20x' },
  { binance: 'UNIUSDT', symbol: 'UNI', display: 'UNI-PERP', icon: 'https://assets.coingecko.com/coins/images/12504/small/uni.jpg', fp: 12.8, fc: 2.4, fv: 310000000, cat: 'defi', lev: '20x' },
  { binance: 'PEPEUSDT', symbol: 'PEPE', display: 'PEPE-PERP', icon: 'https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg', fp: 0.0000185, fc: 8.2, fv: 2800000000, cat: 'meme', lev: '10x' },
  { binance: 'WIFUSDT', symbol: 'WIF', display: 'WIF-PERP', icon: 'https://assets.coingecko.com/coins/images/33566/small/dogwifhat.jpg', fp: 2.4, fc: 5.3, fv: 920000000, cat: 'meme', lev: '10x' },
]

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'l1', label: 'Layer 1' },
  { id: 'l2', label: 'Layer 2' },
  { id: 'defi', label: 'DeFi' },
  { id: 'meme', label: 'Meme' },
]

function fmtPrice(p) {
  if (p >= 1000) return p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  if (p >= 1) return p.toFixed(2)
  if (p >= 0.001) return p.toFixed(4)
  if (p >= 0.0000001) return p.toFixed(8)
  return p.toExponential(2)
}

function fmtVol(v) {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`
  if (v >= 1e6) return `$${(v / 1e6).toFixed(0)}M`
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`
  return `$${v.toFixed(0)}`
}

function useMarketData() {
  const [data, setData] = useState(() =>
    MARKETS.map(c => ({ ...c, price: c.fp, change: c.fc, vol: c.fv }))
  )

  const fetchData = useCallback(async () => {
    try {
      const syms = MARKETS.map(c => `"${c.binance}"`).join(',')
      const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=[${syms}]`)
      if (!res.ok) return
      const json = await res.json()
      const map = {}
      json.forEach(d => { map[d.symbol] = d })
      setData(MARKETS.map(c => {
        const d = map[c.binance]
        if (d) {
          const price = parseFloat(d.lastPrice)
          const change = parseFloat(d.priceChangePercent)
          const vol = parseFloat(d.quoteVolume)
          if (!isNaN(price) && !isNaN(change)) {
            return { ...c, price, change, vol: isNaN(vol) ? c.fv : vol }
          }
        }
        return { ...c, price: c.fp, change: c.fc, vol: c.fv }
      }))
    } catch { /* fallback data remains */ }
  }, [])

  useEffect(() => {
    fetchData()
    const id = setInterval(fetchData, 30000)
    return () => clearInterval(id)
  }, [fetchData])

  return data
}

export default function Markets() {
  const container = useRef(null)
  const markets = useMarketData()
  const [tab, setTab] = useState('all')

  const filtered = useMemo(() =>
    tab === 'all' ? markets : markets.filter(m => m.cat === tab)
  , [markets, tab])

  useGSAP(() => {
    gsap.from('.mkts-title', {
      scrollTrigger: { trigger: '.mkts-title', start: 'top 85%', toggleActions: 'play none none reverse' },
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
    })
    gsap.from('.mkts-terminal', {
      scrollTrigger: { trigger: '.mkts-terminal', start: 'top 88%', toggleActions: 'play none none reverse' },
      y: 50, opacity: 0, scale: 0.98, duration: 1, ease: 'power3.out',
    })
    gsap.from('.mkts-cta', {
      scrollTrigger: { trigger: '.mkts-cta', start: 'top 90%', toggleActions: 'play none none reverse' },
      y: 15, opacity: 0, duration: 0.6, ease: 'power3.out',
    })
  }, { scope: container })

  return (
    <section id="markets" ref={container} className="relative py-20 sm:py-28 3xl:py-36 4xl:py-44 overflow-hidden">
      {/* Title */}
      <div className="mkts-title max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16 mb-10 3xl:mb-14 4xl:mb-18">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-gradient-to-r from-gold/40 to-transparent" />
          <span className="text-[10px] 3xl:text-[12px] 4xl:text-[14px] text-gold/70 font-mono uppercase tracking-[0.25em]">Markets</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl 3xl:text-6xl 4xl:text-7xl text-white tracking-tight mb-2 3xl:mb-4">
              90+ perpetual markets
            </h2>
            <p className="text-white/50 text-sm 3xl:text-base 4xl:text-lg max-w-md 3xl:max-w-lg">
              Shared liquidity from 30+ DEXes via Orderly Network. Live prices, tight spreads.
            </p>
          </div>
          <Link to="/trade" className="mkts-cta btn-primary !py-3 !px-7 !text-[12px] group flex-shrink-0">
            Start Trading <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Terminal */}
      <div className="mkts-terminal max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16">
        <div className="bg-[#0a0a14] border border-white/[0.06] overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 border-b border-white/[0.06] bg-[#0c0c16]">
            <div className="flex items-center gap-1">
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`px-2.5 py-1 text-[10px] font-medium transition-all cursor-pointer ${tab === t.id ? 'bg-white/[0.08] text-white/70' : 'text-white/25 hover:text-white/45 hover:bg-white/[0.03]'}`}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#14F195]/50 animate-pulse" />
              <span className="text-white/20 text-[9px] font-mono">Live</span>
            </div>
          </div>

          {/* Table header — desktop */}
          <div className="hidden lg:grid grid-cols-12 px-5 py-2 border-b border-white/[0.03] text-white/25 text-[9px] font-medium uppercase tracking-wider">
            <div className="col-span-3">Market</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">24h Change</div>
            <div className="col-span-3 text-right">24h Volume</div>
            <div className="col-span-2 text-right">Leverage</div>
          </div>

          {/* Table rows */}
          <div className="max-h-[420px] overflow-y-auto">
            {/* Desktop */}
            <div className="hidden lg:block">
              {filtered.map((m) => (
                <Link key={m.symbol} to={`/trade/PERP_${m.symbol}_USDC`}
                  className="grid grid-cols-12 items-center px-5 py-2.5 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors group">
                  <div className="col-span-3 flex items-center gap-2.5">
                    <img src={m.icon} alt="" className="w-5 h-5 flex-shrink-0" loading="lazy" onError={e => { e.target.style.display = 'none' }} />
                    <div>
                      <span className="text-white/80 text-[12px] font-heading font-semibold group-hover:text-white transition-colors">{m.display}</span>
                      <span className="text-white/20 text-[9px] ml-1.5">USDC</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-right"><span className="text-white/70 text-[12px] font-mono font-medium">${fmtPrice(m.price)}</span></div>
                  <div className="col-span-2 text-right">
                    <span className={`text-[11px] font-mono font-semibold ${m.change >= 0 ? 'text-[#14F195]' : 'text-[#FF4D4D]'}`}>{m.change >= 0 ? '+' : ''}{m.change.toFixed(2)}%</span>
                  </div>
                  <div className="col-span-3 text-right"><span className="text-white/45 text-[11px] font-mono">{fmtVol(m.vol)}</span></div>
                  <div className="col-span-2 text-right"><span className="text-white/30 text-[10px] font-mono">{m.lev}</span></div>
                </Link>
              ))}
            </div>
            {/* Mobile */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2">
              {filtered.map((m) => (
                <Link key={m.symbol} to={`/trade/PERP_${m.symbol}_USDC`}
                  className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-r border-white/[0.03] hover:bg-white/[0.02] transition-colors group">
                  <div className="flex items-center gap-2.5">
                    <img src={m.icon} alt="" className="w-5 h-5" loading="lazy" onError={e => { e.target.style.display = 'none' }} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/80 text-[12px] font-heading font-semibold group-hover:text-white transition-colors">{m.display}</span>
                        <span className="text-white/15 text-[8px] font-mono">{m.lev}</span>
                      </div>
                      <span className="text-white/25 text-[9px] font-mono">{fmtVol(m.vol)} vol</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/70 text-[12px] font-mono font-medium">${fmtPrice(m.price)}</div>
                    <div className={`text-[10px] font-mono font-semibold ${m.change >= 0 ? 'text-[#14F195]' : 'text-[#FF4D4D]'}`}>
                      {m.change >= 0 ? '+' : ''}{m.change.toFixed(2)}%
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
