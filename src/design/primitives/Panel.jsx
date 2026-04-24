import { forwardRef } from 'react'

const SURFACE = {
  stage:  'var(--s-ink-stage)',
  panel:  'var(--s-ink-panel)',
  raised: 'var(--s-ink-raised)',
  sunken: 'var(--s-ink-sunken)',
  none:   'transparent',
}

const BORDER = {
  none:     'none',
  hairline: '1px solid var(--s-ink-divider)',
  neutral:  '1px solid var(--s-ink-border)',
  gold:     '1px solid var(--s-gold-a24)',
}

const ELEV = {
  flat:   'var(--s-shadow-flat)',
  rest:   'var(--s-shadow-rest)',
  raised: 'var(--s-shadow-raised)',
  float:  'var(--s-shadow-float)',
  gold:   'var(--s-shadow-gold)',
}

const RADIUS = {
  xs: 'var(--s-radius-xs)',
  sm: 'var(--s-radius-sm)',
  md: 'var(--s-radius-md)',
  lg: 'var(--s-radius-lg)',
  xl: 'var(--s-radius-xl)',
  none: '0',
}

const Panel = forwardRef(function Panel(
  {
    as: Tag = 'div',
    surface = 'panel',
    border = 'hairline',
    elev = 'rest',
    radius = 'md',
    inset,
    style,
    className = '',
    children,
    ...rest
  },
  ref
) {
  const padding = typeof inset === 'number' ? `${inset}px` : inset
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        background: SURFACE[surface] ?? SURFACE.panel,
        border: BORDER[border] ?? BORDER.hairline,
        boxShadow: ELEV[elev] ?? ELEV.rest,
        borderRadius: RADIUS[radius] ?? RADIUS.md,
        padding,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
})

export default Panel
