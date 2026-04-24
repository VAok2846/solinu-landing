export function RulerTop({
  edge = 'top',
  tone = 'gold',
  tickEvery = 8,
  height = 6,
  opacity = 0.55,
  className = '',
  style,
}) {
  const major = tone === 'gold' ? 'var(--s-gold-a24)' : 'var(--s-ink-18)'
  const minor = tone === 'gold' ? 'var(--s-gold-a08)' : 'var(--s-ink-06)'
  const isTop = edge === 'top'
  const isBottom = edge === 'bottom'

  return (
    <div
      role="presentation"
      aria-hidden
      className={className}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: isTop ? 0 : undefined,
        bottom: isBottom ? 0 : undefined,
        height,
        opacity,
        pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(90deg, ${major} 1px, transparent 1px),
          linear-gradient(90deg, transparent 0 ${tickEvery - 1}px, ${minor} ${tickEvery - 1}px ${tickEvery}px)
        `,
        backgroundSize: `${tickEvery}px 100%, ${tickEvery}px 100%`,
        backgroundPosition: '0 0, 0 0',
        maskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
        ...style,
      }}
    />
  )
}

export default RulerTop
