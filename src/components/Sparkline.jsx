import { useMemo } from 'react'

function seeded(seed) {
  let s = seed | 0
  return () => { s = (s * 1664525 + 1013904223) | 0; return ((s >>> 0) / 0xffffffff) }
}

function synthetic(seed, trend, n = 36) {
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

function toPath(series, width, height, pad = 2) {
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

export default function Sparkline({
  seed = 1,
  trend = 0,
  width = 120,
  height = 32,
  strokeWidth = 1.5,
}) {
  const data = useMemo(() => synthetic(seed, trend), [seed, trend])
  const resolved = data[data.length - 1] > data[0] ? 'up' : 'down'
  const stroke = resolved === 'up' ? 'var(--pnl-up)' : 'var(--pnl-down)'
  const fillColor = resolved === 'up' ? 'rgba(14, 203, 129, 0.18)' : 'rgba(246, 70, 93, 0.18)'
  const d = toPath(data, width, height)
  const area = `${d} L${(width - 2).toFixed(2)} ${(height - 2).toFixed(2)} L2 ${(height - 2).toFixed(2)} Z`
  const gid = `sg-${seed}-${resolved}`

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="presentation"
      aria-hidden
      focusable="false"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillColor} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
