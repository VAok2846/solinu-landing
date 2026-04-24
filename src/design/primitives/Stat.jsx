import Num from './Num'

export function Stat({
  label,
  value,
  unit,
  hint,
  tone = 'default',
  signTone = false,
  signPrefix = false,
  decimals,
  compact,
  size = 'md',
  align = 'left',
  className = '',
  style,
  children,
}) {
  const valueFont =
    size === 'xs' ? { fs: 14, track: 'var(--s-track-tight)', w: 600 }
      : size === 'sm' ? { fs: 18, track: 'var(--s-track-tight)', w: 600 }
      : size === 'md' ? { fs: 24, track: 'var(--s-track-tight)', w: 700 }
      : size === 'lg' ? { fs: 32, track: 'var(--s-track-tight)', w: 700 }
      : size === 'xl' ? { fs: 44, track: 'var(--s-track-tight)', w: 700 }
      : size === '2xl' ? { fs: 64, track: 'var(--s-track-tight)', w: 700 }
      : { fs: 24, track: 'var(--s-track-tight)', w: 700 }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start',
        gap: 6,
        textAlign: align,
        ...style,
      }}
    >
      {label && (
        <span
          className="s-eyebrow"
          style={{ color: 'var(--s-ink-28)' }}
        >
          {label}
        </span>
      )}

      {children ?? (
        <span
          className="s-mono"
          style={{
            fontSize: valueFont.fs,
            fontWeight: valueFont.w,
            letterSpacing: valueFont.track,
            lineHeight: 1,
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: 6,
          }}
        >
          <Num
            value={value}
            decimals={decimals}
            compact={compact}
            tone={tone}
            signTone={signTone}
            signPrefix={signPrefix}
            size="1em"
          />
          {unit && (
            <span
              style={{
                fontSize: '0.5em',
                color: 'var(--s-ink-40)',
                letterSpacing: 'var(--s-track-wide)',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              {unit}
            </span>
          )}
        </span>
      )}

      {hint && (
        <span
          style={{
            fontSize: 'var(--s-text-xs)',
            color: 'var(--s-ink-40)',
            letterSpacing: 'var(--s-track-normal)',
          }}
        >
          {hint}
        </span>
      )}
    </div>
  )
}

export default Stat
