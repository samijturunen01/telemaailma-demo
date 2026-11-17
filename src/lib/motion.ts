import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

/** Register GSAP plugins once, client-side only. */
export function getGsap() {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }
  return { gsap, ScrollTrigger }
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** True when the pre-paint boot script decided the intro may play. */
export function introRequested() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('intro')
}

export function markIntroPlayed() {
  try {
    sessionStorage.setItem('tm-intro', '1')
  } catch {
    /* storage unavailable – intro may replay, which is harmless */
  }
  document.documentElement.classList.remove('intro')
}

declare global {
  interface Window {
    __tmReady?: boolean
    __tmIntro?: boolean
  }
}
