import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function shouldUseLenis() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.matchMedia('(max-width: 1023px)').matches) return false
  if (window.matchMedia('(pointer: coarse)').matches) return false
  return true
}

export default function SmoothScroll() {
  useEffect(() => {
    if (!shouldUseLenis()) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const tickerCb = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerCb)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
    }
  }, [])

  return null
}
