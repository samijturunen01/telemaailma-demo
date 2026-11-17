import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Adds `.is-in` to [data-reveal] elements as they enter the viewport. The CSS
 * only hides them while <html> has `.motion`, so without JS or with reduced
 * motion everything is visible immediately.
 */
export function RevealObserver() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.__tmReady = true
    const root = document.documentElement
    if (!root.classList.contains('motion')) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    const scan = (scope: ParentNode) =>
      scope.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el))
    scan(document)
    const mo = new MutationObserver((muts) => {
      for (const m of muts)
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.matches('[data-reveal]:not(.is-in)')) io.observe(n)
            scan(n)
          }
        })
    })
    mo.observe(document.getElementById('root') ?? document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])

  return null
}
