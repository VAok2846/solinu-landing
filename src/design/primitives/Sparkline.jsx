import { useMemo } from 'react'

// Generate a deterministic synthetic path when real 30d data isn't yet
// available. Seeded on a numeric hash so each leader gets a stable shape.
function seeded(seed) {
  let s = seed | 0
  return () => { s = (s * 1664525 + 1013904223) | 0; return ((s >>> 0) / 0xffffffff) }
}

function syntheticSeries(seed, trend, n = 32) {
  const rand = seeded(seed || 1)
  const arr = []
  let v = 50 + rand() * 10
  for (let i = 0; i < n; i++) {
    const step = (rand() - 0.5) * 6 + (trend * (i / n) * 0.8)
    v += step
    arr.push(v)
  }
  return arr
}

function seriesToPath(series, width, height, pad = 2) {
  if (!series.length) return ''
  const min = Math.min(...series)
  const max = Math.max(...series)
  const range = Math.max(1e-6, max - min)
  const stepX = (width - pad * 2) / (series.length - 1)
  return series.map((v, i) => {
    const x = pad + i * stepX
    const y = height - pad - ((v - min) / range) * (height - pad * 2)
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`
  }).join(' ')
}

export function Sparkline({
  series,
  seed = 1,
  trend = 0,
  width = 96,
  height = 28,
  tone = 'auto',
  strokeWidth = 1.25,
  className = '',
  style,
}) {
  const data = useMemo(() => {
    if (Array.isArray(series) && series.length > 1) return series
    return syntheticSeries(seed, trend)
  }, [series, seed, trend])

  const resolvedTone = useMemo(() => {
    if (tone !== 'auto') return tone
    const first = data[0]
    const last = data[data.length - 1]
    if (!Number.isFinite(first) || !Number.isFinite(last)) return 'neutral'
    if (last > first) return 'up'
    if (last < first) return 'down'
    return 'neutral'
  }, [data, tone])

  const stroke =
    resolvedTone === 'up'   ? 'var(--s-pnl-up)' :
    resolvedTone === 'down' ? 'var(--s-pnl-down)' :
    resolvedTone === 'gold' ? 'var(--s-gold-500)' :
    'var(--s-ink-40)'
  const fillStroke =
    resolvedTone === 'up'   ? 'rgba(14, 203, 129, 0.18)' :
    resolvedTone === 'down' ? 'rgba(246, 70, 93, 0.18)' :
    resolvedTone === 'gold' ? 'rgba(255, 215, 0, 0.18)' :
    'rgba(255, 255, 255, 0.10)'

  const d = seriesToPath(data, width, height)
  const area = `${d} L${(width - 2).toFixed(2)} ${(height - 2).toFixed(2)} L2 ${(height - 2).toFixed(2)} Z`
  const gradId = `spark-${resolvedTone}-${seed}`

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
      role="presentation"
      focusable="false"
      className={className}
      style={{ display: 'block', overflow: 'visible', ...style }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={fillStroke} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} />
      <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default Sparkline
