// Central Intl-backed formatters. Everything that renders a number or date on
// SOLINU surfaces (landing, cockpit, copy-trade) should route through here so
// locale-aware formatting stays consistent (web-design-guidelines locale/i18n).

const LOCALE = 'en-US'

const pricePrecision = (abs) => {
  if (abs >= 1000) return 2
  if (abs >= 1) return 2
  if (abs >= 0.01) return 4
  return 6
}

export function formatPrice(value, opts = {}) {
  const n = Number(value)
  if (!Number.isFinite(n)) return opts.placeholder ?? '—'
  const abs = Math.abs(n)
  const min = opts.minDecimals ?? pricePrecision(abs)
  const max = opts.maxDecimals ?? min
  return n.toLocaleString(LOCALE, { minimumFractionDigits: min, maximumFractionDigits: max })
}

export function formatSignedPrice(value, opts = {}) {
  const n = Number(value)
  if (!Number.isFinite(n)) return opts.placeholder ?? '—'
  const sign = n > 0 ? '+' : ''
  return sign + formatPrice(n, opts)
}

export function formatPercent(value, opts = {}) {
  const n = Number(value)
  if (!Number.isFinite(n)) return opts.placeholder ?? '—'
  const min = opts.minDecimals ?? 2
  const max = opts.maxDecimals ?? min
  const sign = n > 0 ? '+' : ''
  return `${sign}${n.toLocaleString(LOCALE, { minimumFractionDigits: min, maximumFractionDigits: max })}%`
}

export function formatCompact(value, opts = {}) {
  const n = Number(value)
  if (!Number.isFinite(n)) return opts.placeholder ?? '—'
  const abs = Math.abs(n)
  if (abs >= 1e9) return `${(n / 1e9).toFixed(opts.decimals ?? 2)}B`
  if (abs >= 1e6) return `${(n / 1e6).toFixed(opts.decimals ?? 2)}M`
  if (abs >= 1e3) return `${(n / 1e3).toFixed(opts.decimals ?? 2)}K`
  return n.toFixed(opts.decimals ?? 2)
}

export function formatUsd(value, opts = {}) {
  const n = Number(value)
  if (!Number.isFinite(n)) return opts.placeholder ?? '—'
  return '$' + formatPrice(n, opts)
}

// Funding rate arrives as decimal (e.g. 0.0001 = 1bp = 0.01%).
export function formatFundingBp(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return '—'
  const bp = n * 10000
  const sign = bp > 0 ? '+' : ''
  return `${sign}${bp.toFixed(2)}bp`
}

const ABS_TIME = new Intl.DateTimeFormat(LOCALE, {
  year: 'numeric', month: 'short', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
  hour12: false,
})
export function formatAbsTime(ts) {
  const ms = typeof ts === 'number' ? ts : Date.parse(ts)
  if (!Number.isFinite(ms)) return '—'
  return ABS_TIME.format(new Date(ms))
}

const REL = new Intl.RelativeTimeFormat(LOCALE, { numeric: 'auto' })
export function formatRelTime(ts, now = Date.now()) {
  const ms = typeof ts === 'number' ? ts : Date.parse(ts)
  if (!Number.isFinite(ms)) return '—'
  const diffS = Math.round((ms - now) / 1000)
  const abs = Math.abs(diffS)
  if (abs < 60)        return REL.format(diffS, 'second')
  if (abs < 3600)      return REL.format(Math.round(diffS / 60), 'minute')
  if (abs < 86400)     return REL.format(Math.round(diffS / 3600), 'hour')
  if (abs < 86400 * 7) return REL.format(Math.round(diffS / 86400), 'day')
  if (abs < 86400 * 30) return REL.format(Math.round(diffS / (86400 * 7)), 'week')
  if (abs < 86400 * 365) return REL.format(Math.round(diffS / (86400 * 30)), 'month')
  return REL.format(Math.round(diffS / (86400 * 365)), 'year')
}

// Combined absolute + relative, the house style Phil uses for timestamps.
export function formatStamp(ts) {
  const abs = formatAbsTime(ts)
  const rel = formatRelTime(ts)
  if (abs === '—' || rel === '—') return abs
  return `${abs} · ${rel}`
}

// Symbol "PERP_BTC_USDC" → "BTC-PERP"
export function displaySymbol(raw) {
  if (!raw || typeof raw !== 'string') return ''
  const parts = raw.split('_')
  if (parts[0] === 'PERP' && parts[1]) return `${parts[1]}-PERP`
  return raw
}
