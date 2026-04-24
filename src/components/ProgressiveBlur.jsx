// LanX / Linear-style progressive blur: 8 stacked layers with decreasing
// blur radii and offset mask gradients produce a tiered glass edge that
// doesn't look cheap. Used at the base of the hero + above the footer.
const LAYERS = 8

export default function ProgressiveBlur({
  direction = 'bottom', // 'top' | 'bottom'
  blur = 8,              // max blur at the outer edge
  height = 200,          // total vertical coverage
  className,
  style,
}) {
  const maskAngle = direction === 'top' ? 0 : 180

  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        height,
        top: direction === 'top' ? 0 : 'auto',
        bottom: direction === 'bottom' ? 0 : 'auto',
        pointerEvents: 'none',
        zIndex: 2,
        ...style,
      }}
    >
      {Array.from({ length: LAYERS }).map((_, i) => {
        // Exponentially-decreasing blur (LanX pattern)
        const b = blur / Math.pow(2, LAYERS - 1 - i)
        // Mask band: each layer covers a slice of the fade
        const start = (i / LAYERS) * 100
        const mid = ((i + 1) / LAYERS) * 100
        const end = ((i + 2) / LAYERS) * 100
        const mask = `linear-gradient(${maskAngle}deg, rgba(0,0,0,0) ${start}%, rgba(0,0,0,1) ${Math.min(mid, 100)}%, rgba(0,0,0,1) ${Math.min(end, 100)}%, rgba(0,0,0,0) 100%)`
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              backdropFilter: `blur(${b}px)`,
              WebkitBackdropFilter: `blur(${b}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        )
      })}
    </div>
  )
}
