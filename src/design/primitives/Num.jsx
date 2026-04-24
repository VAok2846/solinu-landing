import { useEffect, useRef, useState, memo } from 'react'

const TONE = {
  default: 'inherit',
  muted:   'var(--s-ink-55)',
  dim:     'var(--s-ink-28)',
  gold:    'var(--s-gold-500)',
  up:      'var(--s-pnl-up)',
  down:    'var(--s-pnl-down)',
}

function fmt(value, { decimals, compact, prefix = '', suffix = '', placeholder = '—' }) {
  if (value == null || value === '' || Number.isNaN(Number(value))) return placeholder
  const n = Number(value)
  if (compact) {
    const abs = Math.abs(n)
    if (abs >= 1e9) return `${prefix}${(n / 1e9).toFixed(2)}B${suffix}`
    if (abs >= 1e6) return `${prefix}${(n / 1e6).toFixed(2)}M${suffix}`
    if (abs >= 1e3) return `${prefix}${(n / 1e3).toFixed(2)}K${suffix}`
  }
  const d = typeof decimals === 'number' ? decimals : Math.abs(n) >= 1 ? 2 : 4
  return `${prefix}${n.toLocaleString('en-US', {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  })}${suffix}`
}

function Num({
  value,
  decimals,
  compact,
  prefix,
  suffix,
  placeholder,
  tone = 'default',
  signTone = false,
  signPrefix = false,
  tick = true,
  mono = true,
  size,
  weight,
  className = '',
  style,
  ...rest
}) {
  const prev = useRef(value)
  const [flash, setFlash] = useState(null)

  useEffect(() => {
    if (!tick) return
    const p = Number(prev.current)
    const n = Number(value)
    if (Number.isFinite(p) && Number.isFinite(n) && p !== n) {
      setFlash(n > p ? 'up' : 'down')
      const t = setTimeout(() => setFlash(null), 600)
      prev.current = value
      return () => clearTimeout(t)
    }
    prev.current = value
  }, [value, tick])

  const num = Number(value)
  let resolvedTone = tone
  if (signTone && Number.isFinite(num)) {
    if (num > 0) resolvedTone = 'up'
    else if (num < 0) resolvedTone = 'down'
    else resolvedTone = 'muted'
  }

  const display = fmt(value, { decimals, compact, prefix, suffix, placeholder })
  const finalDisplay =
    signPrefix && Number.isFinite(num) && num > 0 ? `+${display}` : display

  return (
    <span
      className={[
        mono ? 's-mono' : 's-tabular',
        flash === 'up' ? 's-tick-up' : flash === 'down' ? 's-tick-down' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={{
        color: TONE[resolvedTone] ?? resolvedTone,
        fontSize: size,
        fontWeight: weight,
        letterSpacing: 'var(--s-track-normal)',
        ...style,
      }}
      {...rest}
    >
      {finalDisplay}
    </span>
  )
}

export default memo(Num)
