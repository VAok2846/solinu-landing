const LOCALE = 'en-US'

export function formatCompact(value, d = 2) {
  const n = Number(value)
  if (!Number.isFinite(n)) return '—'
  const abs = Math.abs(n)
  if (abs >= 1e9) return `${(n / 1e9).toFixed(d)}B`
  if (abs >= 1e6) return `${(n / 1e6).toFixed(d)}M`
  if (abs >= 1e3) return `${(n / 1e3).toFixed(d)}K`
  return n.toFixed(d)
}

export function formatPrice(value, { min = 2, max = 2 } = {}) {
  const n = Number(value)
  if (!Number.isFinite(n)) return '—'
  return n.toLocaleString(LOCALE, { minimumFractionDigits: min, maximumFractionDigits: max })
}

export function formatSigned(value, opts) {
  const n = Number(value)
  if (!Number.isFinite(n)) return '—'
  const s = n > 0 ? '+' : ''
  return s + formatPrice(n, opts)
}

export function formatPercent(value, d = 2) {
  const n = Number(value)
  if (!Number.isFinite(n)) return '—'
  const s = n > 0 ? '+' : ''
  return `${s}${n.toLocaleString(LOCALE, { minimumFractionDigits: d, maximumFractionDigits: d })}%`
}
