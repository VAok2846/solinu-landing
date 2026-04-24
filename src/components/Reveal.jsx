import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  duration = 0.7,
  y = 20,
  amount = 0.25,
  once = true,
  children,
  style,
  ...rest
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[Tag] || motion.div
  return (
    <MotionTag
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
