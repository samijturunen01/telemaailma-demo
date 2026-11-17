import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { ScrollManager } from './ScrollManager'
import { RevealObserver } from './RevealObserver'

export function Layout() {
  return (
    <>
      <a
        href="#main"
        className="fixed left-3 top-3 z-[60] -translate-y-24 rounded-full bg-amber px-5 py-3 font-semibold text-ink no-underline focus:translate-y-0"
      >
        Siirry sisältöön
      </a>
      <ScrollManager />
      <RevealObserver />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
