export function Eyebrow({
  children,
  tone = 'gold',
  size = 'sm',
  dot = false,
  className = '',
  style,
  ...rest
}) {
  const fs = size === 'xs' ? 10 : size === 'sm' ? 11 : size === 'md' ? 12 : 13
  const color =
    tone === 'gold' ? 'var(--s-gold-500)'
      : tone === 'dim' ? 'var(--s-ink-28)'
      : tone === 'muted' ? 'var(--s-ink-55)'
      : 'var(--s-ink-90)'

  return (
    <span
      className={`s-eyebrow ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        color,
        fontSize: fs,
        letterSpacing: 'var(--s-track-widest)',
        fontFamily: 'var(--s-font-mono)',
        textTransform: 'uppercase',
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span
          aria-hidden
          style={{
            width: 5,
            height: 5,
            borderRadius: 9999,
            background: color,
            boxShadow: tone === 'gold' ? '0 0 10px var(--s-gold-a60)' : 'none',
          }}
        />
      )}
      {children}
    </span>
  )
}

export default Eyebrow
