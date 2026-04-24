import { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SOLINU_MINT as TOKEN_CA } from '../lib/solinuToken.js'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function useTokenData() {
  const [data, setData] = useState(null)
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`https://api.dexscreener.com/token-pairs/v1/solana/${TOKEN_CA}`)
      if (!res.ok) return
      const pairs = await res.json()
      if (!Array.isArray(pairs) || pairs.length === 0) return
      const main = pairs.reduce((a, b) => (b.liquidity?.usd || 0) > (a.liquidity?.usd || 0) ? b : a, pairs[0])
      const totalVolume24h = pairs.reduce((s, p) => s + (p.volume?.h24 || 0), 0)
      const totalLiquidity = pairs.reduce((s, p) => s + (p.liquidity?.usd || 0), 0)
      const totalBuys24h = pairs.reduce((s, p) => s + (p.txns?.h24?.buys || 0), 0)
      const totalSells24h = pairs.reduce((s, p) => s + (p.txns?.h24?.sells || 0), 0)
      setData({
        price: parseFloat(main.priceUsd) || 0, priceNative: main.priceNative || '0',
        change1h: typeof main.priceChange?.h1 === 'number' ? main.priceChange.h1 : null,
        change24h: typeof main.priceChange?.h24 === 'number' ? main.priceChange.h24 : 0,
        mcap: main.marketCap || main.fdv || 0, fdv: main.fdv || 0,
        volume24h: totalVolume24h, liquidity: totalLiquidity,
        buys24h: totalBuys24h, sells24h: totalSells24h, txns24h: totalBuys24h + totalSells24h,
        imageUrl: main.info?.imageUrl || null,
        pairCount: pairs.length,
      })
    } catch { /* fallback */ }
  }, [])
  useEffect(() => { fetchData(); const id = setInterval(fetchData, 30000); return () => clearInterval(id) }, [fetchData])
  return data
}

function formatUsd(n) {
  if (!n || n === 0) return '$0'
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`
  if (n >= 1) return `$${n.toFixed(2)}`
  if (n >= 0.001) return `$${n.toFixed(4)}`
  return `$${n.toFixed(8)}`
}

export default function TokenEarn() {
  const container = useRef(null)
  const [copied, setCopied] = useState(false)
  const token = useTokenData()

  const copyCA = () => {
    if (!navigator.clipboard) return
    navigator.clipboard.writeText(TOKEN_CA).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }).catch(() => {})
  }

  useGSAP(() => {
    gsap.from('.te-title', {
      scrollTrigger: { trigger: '.te-title', start: 'top 85%', toggleActions: 'play none none reverse' },
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
    })
    gsap.from('.te-token', {
      scrollTrigger: { trigger: '.te-grid', start: 'top 82%', toggleActions: 'play none none reverse' },
      x: -40, opacity: 0, duration: 0.9, ease: 'power3.out',
    })
    gsap.from('.te-earn', {
      scrollTrigger: { trigger: '.te-grid', start: 'top 82%', toggleActions: 'play none none reverse' },
      x: 40, opacity: 0, duration: 0.9, delay: 0.12, ease: 'power3.out',
    })
    gsap.from('.te-ref', {
      scrollTrigger: { trigger: '.te-ref', start: 'top 88%', toggleActions: 'play none none reverse' },
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
    })
  }, { scope: container })

  return (
    <section id="token" ref={container} className="relative py-20 sm:py-28 3xl:py-36 4xl:py-44 overflow-hidden">
      {/* Title */}
      <div className="te-title max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16 mb-12 3xl:mb-16 4xl:mb-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-gradient-to-r from-gold/40 to-transparent" />
          <span className="text-[10px] 3xl:text-[12px] 4xl:text-[14px] text-gold/80 font-mono uppercase tracking-[0.25em]">Token</span>
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl 3xl:text-6xl 4xl:text-7xl text-white tracking-tight mb-3 3xl:mb-5">
          The <span className="text-gradient-gold glow-text-gold">$SOLINU</span> token
        </h2>
        <p className="text-white/50 text-sm 3xl:text-base 4xl:text-lg max-w-xl 3xl:max-w-2xl leading-relaxed">
          Community fair launch on Solana. 20% airdropped to 10,000 wallets.
          90% of exchange revenue reinvested into the ecosystem.
        </p>
      </div>

      {/* Main grid: Token left + Revenue/Airdrop right */}
      <div className="te-grid max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16 grid lg:grid-cols-5 gap-4 3xl:gap-6 4xl:gap-8 mb-4 3xl:mb-6">
        {/* Token card — left */}
        <div className="te-token lg:col-span-2 bg-[#0a0a14] border border-white/[0.06] p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex-shrink-0">
              <img src={token?.imageUrl || '/solinu-logo.jpg'} alt="SOLINU" className="w-11 h-11 object-cover" onError={e => { if (!e.target.dataset.fallback) { e.target.dataset.fallback = '1'; e.target.src = '/solinu-logo.jpg' } }} />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#08080e] border border-[#08080e] flex items-center justify-center">
                <img src="https://assets.coingecko.com/coins/images/4128/small/solana.png" alt="" className="w-3 h-3" />
              </div>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">SOLINU</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-white/40 text-[10px]">Solana</span>
                <span className="w-1 h-1 rounded-full bg-white/10" />
                <span className="text-[9px] text-[#14F195] font-semibold uppercase tracking-wider">Live</span>
              </div>
            </div>
          </div>

          {token && (
            <div className="border border-white/[0.05] bg-white/[0.02] p-3 mb-3">
              <div className="flex items-end justify-between mb-3">
                <div>
                  <div className="text-white/30 text-[8px] uppercase tracking-[2px] mb-0.5">Price</div>
                  <div className="text-white font-heading font-bold text-xl">{formatUsd(token.price)}</div>
                  <div className="text-white/25 text-[9px] font-mono mt-0.5">{token.priceNative} SOL</div>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 text-[11px] font-mono font-semibold ${token.change24h >= 0 ? 'text-[#14F195] bg-[#14F195]/[0.08]' : 'text-[#FF4D4D] bg-[#FF4D4D]/[0.08]'}`}>
                  {token.change24h >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: 'Market Cap', value: formatUsd(token.mcap) },
                  { label: '24h Volume', value: formatUsd(token.volume24h) },
                  { label: 'Liquidity', value: formatUsd(token.liquidity) },
                ].map((s, i) => (
                  <div key={i} className="text-center py-1.5 bg-white/[0.02]">
                    <div className="text-white/60 text-[11px] font-heading font-bold">{s.value}</div>
                    <div className="text-white/30 text-[8px] uppercase tracking-wider mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={copyCA} className="w-full border border-white/[0.05] bg-white/[0.02] p-3 mb-3 text-left hover:bg-white/[0.04] transition-colors group cursor-pointer">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white/30 text-[8px] uppercase tracking-[2px]">Contract Address</span>
              <span className="text-[9px] text-gold/50 opacity-0 group-hover:opacity-100 transition-opacity">{copied ? 'Copied!' : 'Click to copy'}</span>
            </div>
            <div className="text-white/45 text-[9px] font-mono break-all">{TOKEN_CA}</div>
          </button>

          <div className="flex flex-col gap-2">
            <Link to="/swap" className="btn-primary !py-2.5 w-full text-center group text-[12px] inline-flex items-center justify-center gap-2">
              SOLINU Swap
              <ArrowRight size={10} className="opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/docs/what-is-solinu"
              className="flex items-center justify-center gap-1.5 py-2 text-white/35 text-[10px] border border-white/[0.05] hover:border-white/[0.1] hover:text-white/50 transition-colors"
            >
              About $SOLINU
            </Link>
          </div>
        </div>

        {/* Right column — revenue + airdrop */}
        <div className="te-earn lg:col-span-3 flex flex-col gap-4">
          {/* Revenue */}
          <div className="bg-[#0a0a14] border border-white/[0.06] p-5 sm:p-6 flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-purple to-purple/30" />
              <h3 className="font-heading font-bold text-[15px] text-white">Revenue Reinvestment</h3>
            </div>
            <p className="text-white/50 text-[12px] leading-relaxed mb-4">
              90% of perpetual exchange revenue goes back to the community — platform development,
              token buybacks, and airdrop pool. 10% covers operations.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Development', accent: '#9945FF' },
                { label: 'Buybacks', accent: '#FFD700' },
                { label: 'Airdrops', accent: '#14F195' },
              ].map((tag, i) => (
                <div key={i} className="border border-white/[0.05] bg-white/[0.02] p-2.5 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${tag.accent}40, transparent)` }} />
                  <span className="text-white/50 text-[10px] font-medium">{tag.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Airdrop */}
          <div className="bg-[#0a0a14] border border-white/[0.06] p-5 sm:p-6 flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-gold to-gold/30" />
                <div>
                  <h3 className="font-heading font-bold text-[15px] text-white">Community Airdrop</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#14F195] animate-pulse" />
                    <span className="text-[8px] uppercase tracking-[2px] text-[#14F195]/70 font-semibold">Claimable</span>
                  </div>
                </div>
              </div>
              <span className="font-heading font-bold text-lg text-white/70">10K wallets</span>
            </div>
            <p className="text-white/50 text-[12px] leading-relaxed mb-3">
              20% of total supply airdropped to 10,000 wallets. Claim compressed tokens via Helius.
            </p>
            <a href="https://airship.helius.dev/decompress" target="_blank" rel="noopener noreferrer" className="btn-secondary !py-2.5 w-full text-center group text-[12px]">
              Claim Airdrop <ExternalLink size={10} className="opacity-50 group-hover:opacity-100" />
            </a>
          </div>
        </div>
      </div>

      {/* Referral section */}
      <div className="te-ref max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-8 3xl:px-12 4xl:px-16">
        {/* Referral heading */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-px bg-gradient-to-r from-gold/40 to-transparent" />
          <span className="text-[10px] text-gold/80 font-mono uppercase tracking-[0.25em]">Referral Program</span>
        </div>
        <h3 className="font-heading font-bold text-2xl sm:text-3xl 3xl:text-4xl 4xl:text-5xl text-white tracking-tight mb-2 3xl:mb-4">
          Refer traders, <span className="text-gradient-gold">earn USDC</span>
        </h3>
        <p className="text-white/50 text-[13px] 3xl:text-[15px] 4xl:text-[17px] max-w-lg 3xl:max-w-xl leading-relaxed mb-6 3xl:mb-8">
          Powered by Orderly Network's on-chain referral system.
          Share your code, earn a percentage of every trade your referrals make — forever.
        </p>

        {/* How it works — 3 steps */}
        <div className="grid sm:grid-cols-3 gap-px bg-white/[0.04] mb-4">
          {[
            { step: '01', title: 'Generate your code', desc: 'Create a unique referral code linked to your wallet via the trading dashboard.' },
            { step: '02', title: 'Share your link', desc: 'Send your referral link to friends. When they connect, the code binds permanently to their account.' },
            { step: '03', title: 'Earn daily', desc: 'Receive USDC rebates every 24 hours, settled on-chain through Orderly Network.' },
          ].map((s, i) => (
            <div key={i} className="bg-[#0a0a14] p-5">
              <div className="text-gold/40 text-[10px] font-mono font-bold mb-2">{s.step}</div>
              <div className="text-white/90 text-[13px] font-heading font-semibold mb-1.5">{s.title}</div>
              <div className="text-white/40 text-[11px] leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Rebate breakdown + earnings */}
        <div className="grid lg:grid-cols-5 gap-4 mb-4">
          {/* Left — fee split + features */}
          <div className="lg:col-span-3 bg-[#0a0a14] border border-white/[0.06] p-5 sm:p-6">
            <div className="text-white/30 text-[9px] font-mono uppercase tracking-wider mb-4">Fee distribution per trade</div>

            {/* 3-party breakdown */}
            <div className="flex items-stretch gap-1 mb-4 h-11">
              <div className="flex items-center justify-center rounded-sm flex-[20]" style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,215,0,0.08))' }}>
                <span className="text-gold font-heading font-bold text-[13px]">20%</span>
              </div>
              <div className="flex items-center justify-center rounded-sm flex-[20]" style={{ background: 'linear-gradient(135deg, rgba(20,241,149,0.12), rgba(20,241,149,0.05))' }}>
                <span className="text-[#14F195] font-heading font-bold text-[13px]">20%</span>
              </div>
              <div className="flex items-center justify-center rounded-sm flex-[60] bg-white/[0.03]">
                <span className="text-white/25 font-heading font-bold text-[13px]">60%</span>
              </div>
            </div>
            <div className="flex gap-1 mb-6">
              <div className="flex-[20] text-gold/60 text-[9px]">Referrer (you)</div>
              <div className="flex-[20] text-[#14F195]/60 text-[9px]">Referee (friend)</div>
              <div className="flex-[60] text-white/20 text-[9px]">Protocol</div>
            </div>

            {/* Feature list */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {[
                { label: 'Payout frequency', value: 'Daily' },
                { label: 'Payout currency', value: 'USDC' },
                { label: 'Binding type', value: 'Permanent' },
                { label: 'Max invites', value: 'Unlimited' },
                { label: 'Custom codes', value: 'Supported' },
                { label: 'Settlement', value: 'On-chain' },
              ].map((f, i) => (
                <div key={i} className="flex items-center justify-between py-1 border-b border-white/[0.03]">
                  <span className="text-white/35 text-[10px]">{f.label}</span>
                  <span className="text-white/65 text-[10px] font-mono font-medium">{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — earnings calculator */}
          <div className="lg:col-span-2 bg-[#0a0a14] border border-white/[0.06] overflow-hidden flex flex-col">
            <div className="px-5 py-3 border-b border-white/[0.06]">
              <span className="text-white/35 text-[9px] font-mono uppercase tracking-[0.15em]">Earnings examples</span>
            </div>

            <div className="p-5 flex-1">
              <div className="space-y-4 mb-5">
                {[
                  { vol: '$10,000', fee: '$6', you: '+$1.20', friend: '-$1.20', label: 'Casual trader' },
                  { vol: '$100,000', fee: '$60', you: '+$12', friend: '-$12', label: 'Active trader' },
                  { vol: '$1,000,000', fee: '$600', you: '+$120', friend: '-$120', label: 'Power trader' },
                ].map((tier, i) => (
                  <div key={i} className="border border-white/[0.04] p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/50 text-[10px]">{tier.label}</span>
                      <span className="text-white/70 text-[11px] font-mono font-semibold">{tier.vol}/mo</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gold text-[12px] font-mono font-bold">{tier.you}</span>
                      <span className="text-[#14F195] text-[10px] font-mono">Friend saves {tier.friend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link to="/trade" className="btn-primary !py-2.5 w-full text-center group text-[12px]">
                Start Earning <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        <p className="text-white/25 text-[10px] leading-relaxed max-w-2xl">
          Referral rebates are calculated from both maker (0.03%) and taker (0.06%) fees on each trade.
          All rebates are distributed daily by Orderly Network smart contracts.
          Referral binding is permanent — once a user signs up with your code, you earn from their activity indefinitely.
        </p>
      </div>
    </section>
  )
}
