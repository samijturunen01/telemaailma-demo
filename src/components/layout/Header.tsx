import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { Wordmark } from '../brand/Wordmark'
import { mainNav } from '../../data/navigation'
import { company } from '../../data/company'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu whenever the route changes.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-snow transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? 'border-b border-line bg-ink/95 backdrop-blur-md'
            : 'border-b border-transparent bg-gradient-to-b from-ink/80 to-ink/0'
        }`}
        style={{ height: 'var(--header-h)' }}
      >
        <div className="wrap flex h-full items-center justify-between gap-3 sm:gap-6">
          <Link
            to="/"
            className="relative z-10 text-[0.98rem] min-[400px]:text-[1.1rem] sm:text-[1.3rem]"
            aria-label="Joensuun Telemaailma – etusivu"
            data-intro="wordmark"
          >
            <Wordmark />
          </Link>

          <nav aria-label="Päävalikko" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/tuotteet'}
                    className={({ isActive }) =>
                      `group relative block rounded-full px-3.5 py-2 text-[0.95rem] font-medium no-underline transition-colors duration-300 ${
                        isActive ? 'text-amber' : 'text-snow/85 hover:text-snow'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          aria-hidden="true"
                          className={`absolute left-1/2 top-0.5 h-[3px] w-6 -translate-x-1/2 rounded-t-full border-t-2 border-amber transition-all duration-500 ${
                            isActive ? 'opacity-100' : 'scale-x-50 opacity-0 group-hover:scale-x-100 group-hover:opacity-60'
                          }`}
                          style={{ borderRadius: '50% 50% 0 0 / 100% 100% 0 0' }}
                        />
                        {item.label}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={company.phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2 font-mono text-sm tracking-wide text-snow/90 no-underline hover:text-amber lg:inline-flex"
            >
              <Phone size={15} aria-hidden="true" />
              {company.phone}
            </a>
            <a
              href={company.phoneHref}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-snow lg:hidden"
              aria-label={`Soita ${company.phone}`}
            >
              <Phone size={18} aria-hidden="true" />
            </a>
            <Link to="/yhteystiedot" className="btn btn-amber hidden min-h-11 py-2 text-[0.95rem] sm:inline-flex">
              Ota yhteyttä
            </Link>
            <button
              ref={menuButton}
              type="button"
              className="inline-flex h-11 items-center gap-2.5 rounded-full border border-line px-3.5 text-sm font-semibold text-snow xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <span
                  className={`absolute left-0 h-0.5 w-5 bg-current transition-transform duration-300 ${
                    open ? 'top-[5px] rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 bg-current transition-all duration-300 ${
                    open ? 'top-[5px] w-5 -rotate-45' : 'top-[10px] w-3.5'
                  }`}
                />
              </span>
              {open ? 'Sulje' : 'Valikko'}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} returnFocus={menuButton} />
    </>
  )
}
