const TONES = {
  gold:    'var(--s-gold-gradient-line)',
  goldSolid: `linear-gradient(90deg, transparent 0%, var(--s-gold-a40) 50%, transparent 100%)`,
  neutral: `linear-gradient(90deg, transparent 0%, var(--s-ink-18) 50%, transparent 100%)`,
  dim:     `linear-gradient(90deg, transparent 0%, var(--s-ink-10) 50%, transparent 100%)`,
  flat:    'var(--s-ink-border)',
}

const TONES_V = {
  gold:     'linear-gradient(180deg, transparent 0%, var(--s-gold-a24) 50%, transparent 100%)',
  goldSolid: 'linear-gradient(180deg, transparent 0%, var(--s-gold-a40) 50%, transparent 100%)',
  neutral:  'linear-gradient(180deg, transparent 0%, var(--s-ink-18) 50%, transparent 100%)',
  dim:      'linear-gradient(180deg, transparent 0%, var(--s-ink-10) 50%, transparent 100%)',
  flat:     'var(--s-ink-border)',
}

export function Hairline({
  orientation = 'horizontal',
  tone = 'gold',
  length = '100%',
  thickness = 1,
  className = '',
  style,
}) {
  const isH = orientation === 'horizontal'
  const bg = (isH ? TONES : TONES_V)[tone] ?? (isH ? TONES.gold : TONES_V.gold)
  return (
    <div
      role="presentation"
      aria-hidden
      className={className}
      style={{
        width:  isH ? length : thickness,
        height: isH ? thickness : length,
        background: bg,
        flexShrink: 0,
        ...style,
      }}
    />
  )
}

export default Hairline
