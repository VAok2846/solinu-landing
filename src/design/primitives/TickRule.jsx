export function TickRule({
  orientation = 'horizontal',
  length = '100%',
  thickness = 1,
  tickEvery = 8,
  tickHeight = 4,
  tone = 'gold',
  opacity = 0.55,
  className = '',
  style,
}) {
  const isH = orientation === 'horizontal'
  const hair = tone === 'gold' ? 'var(--s-gold-a24)' : 'var(--s-ink-18)'
  const tickC = tone === 'gold' ? 'var(--s-gold-a40)' : 'var(--s-ink-28)'

  if (isH) {
    return (
      <div
        role="presentation"
        aria-hidden
        className={className}
        style={{
          position: 'relative',
          width: length,
          height: Math.max(thickness, tickHeight),
          opacity,
          ...style,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: thickness,
            transform: 'translateY(-50%)',
            background: `linear-gradient(90deg, transparent 0%, ${hair} 12%, ${hair} 88%, transparent 100%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(90deg, ${tickC} 1px, transparent 1px)`,
            backgroundSize: `${tickEvery}px 100%`,
            backgroundPosition: '0 100%',
            backgroundRepeat: 'repeat-x',
            maskImage:
              'linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
          }}
        />
      </div>
    )
  }
  return (
    <div
      role="presentation"
      aria-hidden
      className={className}
      style={{
        position: 'relative',
        width: Math.max(thickness, tickHeight),
        height: length,
        opacity,
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: thickness,
          transform: 'translateX(-50%)',
          background: `linear-gradient(180deg, transparent 0%, ${hair} 12%, ${hair} 88%, transparent 100%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(180deg, ${tickC} 1px, transparent 1px)`,
          backgroundSize: `100% ${tickEvery}px`,
          maskImage:
            'linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
        }}
      />
    </div>
  )
}

export default TickRule
