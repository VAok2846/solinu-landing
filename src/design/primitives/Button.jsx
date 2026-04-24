import { forwardRef } from 'react'

const SIZES = {
  xs: { h: 26, px: 10, fs: 11, ls: '0.04em' },
  sm: { h: 32, px: 14, fs: 12, ls: '0.04em' },
  md: { h: 40, px: 18, fs: 13, ls: '0.06em' },
  lg: { h: 48, px: 22, fs: 14, ls: '0.08em' },
  xl: { h: 56, px: 28, fs: 15, ls: '0.10em' },
}

const VARIANT_STYLES = {
  primary: {
    background: 'var(--s-gold-gradient-soft)',
    color: '#0a0700',
    border: '1px solid var(--s-gold-400)',
    boxShadow:
      '0 0 0 1px var(--s-gold-a24), 0 8px 24px rgba(255, 215, 0, 0.22), 0 1px 0 rgba(255, 255, 255, 0.18) inset',
  },
  secondary: {
    background: 'var(--s-ink-panel)',
    color: 'var(--s-gold-300)',
    border: '1px solid var(--s-gold-a40)',
    boxShadow: '0 1px 0 rgba(255, 215, 0, 0.06) inset',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--s-ink-90)',
    border: '1px solid var(--s-ink-border)',
  },
  subtle: {
    background: 'var(--s-ink-06)',
    color: 'var(--s-ink-90)',
    border: '1px solid transparent',
  },
  danger: {
    background: 'rgba(246, 70, 93, 0.12)',
    color: 'var(--s-pnl-down)',
    border: '1px solid rgba(246, 70, 93, 0.4)',
  },
  bare: {
    background: 'transparent',
    color: 'var(--s-ink-70)',
    border: '1px solid transparent',
  },
}

const Button = forwardRef(function Button(
  {
    as: Tag = 'button',
    variant = 'primary',
    size = 'md',
    block = false,
    loading = false,
    disabled = false,
    iconLeft,
    iconRight,
    className = '',
    style,
    children,
    type = 'button',
    ...rest
  },
  ref
) {
  const s = SIZES[size] ?? SIZES.md
  const v = VARIANT_STYLES[variant] ?? VARIANT_STYLES.primary
  const isButton = Tag === 'button'
  const isDisabled = disabled || loading

  return (
    <Tag
      ref={ref}
      type={isButton ? type : undefined}
      disabled={isButton ? isDisabled : undefined}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      className={`s-btn s-btn-${variant} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: s.h,
        minWidth: s.h,
        padding: `0 ${s.px}px`,
        width: block ? '100%' : undefined,
        fontFamily: 'var(--s-font-display)',
        fontSize: s.fs,
        fontWeight: 600,
        letterSpacing: s.ls,
        textTransform: 'uppercase',
        borderRadius: 'var(--s-radius-sm)',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.5 : 1,
        transition:
          'transform var(--s-dur-fast) var(--s-ease-out), background var(--s-dur-fast) var(--s-ease-out), box-shadow var(--s-dur-fast) var(--s-ease-out), border-color var(--s-dur-fast) var(--s-ease-out)',
        ...v,
        ...style,
      }}
      {...rest}
    >
      {iconLeft && <span aria-hidden style={{ display: 'inline-flex' }}>{iconLeft}</span>}
      {loading ? <span className="s-mono" aria-hidden>···</span> : children}
      {iconRight && <span aria-hidden style={{ display: 'inline-flex' }}>{iconRight}</span>}
    </Tag>
  )
})

export default Button
