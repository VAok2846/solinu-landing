const POS = {
  tl: { top: 0, left: 0, rotate: 0 },
  tr: { top: 0, right: 0, rotate: 90 },
  br: { bottom: 0, right: 0, rotate: 180 },
  bl: { bottom: 0, left: 0, rotate: 270 },
}

export function CornerBracket({
  pos = 'tl',
  size = 28,
  inset = 18,
  tone = 'gold',
  thickness = 1.25,
  className = '',
  style,
}) {
  const color = tone === 'gold' ? 'var(--s-gold-a60)' : tone === 'dim' ? 'var(--s-ink-28)' : 'var(--s-ink-90)'
  const p = POS[pos] ?? POS.tl
  return (
    <span
      role="presentation"
      aria-hidden
      className={className}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        top: p.top != null ? inset : undefined,
        right: p.right != null ? inset : undefined,
        bottom: p.bottom != null ? inset : undefined,
        left: p.left != null ? inset : undefined,
        transform: `rotate(${p.rotate}deg)`,
        pointerEvents: 'none',
        ...style,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: size,
          height: thickness,
          background: color,
        }}
      />
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: thickness,
          height: size,
          background: color,
        }}
      />
    </span>
  )
}

export default CornerBracket
