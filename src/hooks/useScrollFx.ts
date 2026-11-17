import { useEffect, type RefObject } from 'react'
import { getGsap, prefersReducedMotion } from '../lib/motion'

type Setup = (gsap: ReturnType<typeof getGsap>['gsap'], root: HTMLElement) => void

/**
 * Run GSAP/ScrollTrigger effects scoped to `root`, skipped for reduced motion
 * and automatically reverted on unmount (prevents leaking triggers between
 * client-side page navigations).
 */
export function useScrollFx(root: RefObject<HTMLElement | null>, setup: Setup) {
  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const { gsap } = getGsap()
    const ctx = gsap.context(() => setup(gsap, el), el)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
