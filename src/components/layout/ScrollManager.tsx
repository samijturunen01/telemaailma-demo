import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { getGsap } from '../../lib/motion'
import { metaFor } from '../../data/seo'

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect
const KEY = 'tm-scroll'

function readPositions(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

function writePosition(key: string, y: number) {
  try {
    const all = readPositions()
    all[key] = y
    sessionStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    /* storage unavailable – restoration simply falls back to the top */
  }
}

/**
 * Scroll behaviour on navigation:
 *  - PUSH/REPLACE to a page → open instantly at the very top (no animation)
 *  - links with a #hash → jump to that section
 *  - browser back/forward (POP) → restore the previous position
 * Also keeps the document title/description in sync and refreshes ScrollTrigger.
 *
 * Positions are written under `keyRef`, which is switched synchronously in the
 * layout phase. React Router runs navigations as transitions, so a listener
 * bound per location would still receive the new page's scroll-to-top event
 * and overwrite the position of the page being left.
 */
export function ScrollManager() {
  const location = useLocation()
  const navType = useNavigationType()
  const keyRef = useRef(location.key)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => writePosition(keyRef.current, window.scrollY))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  useIso(() => {
    keyRef.current = location.key
    const root = document.documentElement
    const prev = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    if (navType === 'POP') {
      const y = readPositions()[location.key]
      if (typeof y === 'number') window.scrollTo(0, y)
    } else if (location.hash) {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (el) el.scrollIntoView({ block: 'start' })
      else window.scrollTo(0, 0)
    } else {
      window.scrollTo(0, 0)
    }
    root.style.scrollBehavior = prev

    const meta = metaFor(location.pathname)
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)

    const { ScrollTrigger } = getGsap()
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [location.key])

  return null
}
