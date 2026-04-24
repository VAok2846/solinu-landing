import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

function shouldUseLenis() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  // Lenis + touch / narrow viewports is a common source of iOS Safari glitches;
  // native scrolling keeps the landing page stable on phones.
  if (window.matchMedia('(max-width: 1023px)').matches) return false
  if (window.matchMedia('(pointer: coarse)').matches) return false
  return true
}

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (!shouldUseLenis()) return undefined

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return children
}
