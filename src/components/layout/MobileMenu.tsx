import { useEffect, useRef, type RefObject } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { mainNav } from '../../data/navigation'
import { addressLine, company } from '../../data/company'

interface Props {
  open: boolean
  onClose: () => void
  returnFocus: RefObject<HTMLButtonElement | null>
}

export function MobileMenu({ open, onClose, returnFocus }: Props) {
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const body = document.body
    const prevOverflow = body.style.overflow
    body.style.overflow = 'hidden'
    const first = panel.current?.querySelector<HTMLElement>('a, button')
    first?.focus({ preventScroll: true })
    const btn = returnFocus.current

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel.current) return
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>('a, button'))
      const all = btn ? [btn, ...items] : items
      const i = all.indexOf(document.activeElement as HTMLElement)
      if (e.shiftKey && i <= 0) {
        e.preventDefault()
        all[all.length - 1].focus()
      } else if (!e.shiftKey && i === all.length - 1) {
        e.preventDefault()
        all[0].focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      btn?.focus({ preventScroll: true })
    }
  }, [open, onClose, returnFocus])

  return (
    <div
      id="mobile-menu"
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label="Valikko"
      hidden={!open}
      className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-ink text-snow xl:hidden"
      style={{ top: 'var(--header-h)' }}
    >
      <div className="wrap flex min-h-full flex-col pb-10 pt-6">
        <nav aria-label="Mobiilivalikko">
          <ul className="border-t border-line">
            {mainNav.map((item, i) => (
              <li key={item.to} className="border-b border-line">
                <NavLink
                  to={item.to}
                  end={item.to === '/tuotteet'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-baseline gap-4 py-4 no-underline ${isActive ? 'text-amber' : ''}`
                  }
                  style={{ animation: open ? `tm-menu-in .6s var(--ease-tune) ${0.04 * i}s both` : undefined }}
                >
                  <span className="readout-s w-6 text-steel">{String(i + 1).padStart(2, '0')}</span>
                  <span className="display text-[clamp(1.9rem,8vw,2.6rem)]">{item.label}</span>
                  <span className="readout-s ml-auto hidden text-steel sm:block">{item.hint}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto grid gap-3 pt-10">
          <Link to="/yhteystiedot" onClick={onClose} className="btn btn-amber justify-between">
            Ota yhteyttä tai pyydä tarjous <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <a href={company.phoneHref} className="btn btn-line justify-between text-snow">
            <span className="inline-flex items-center gap-3">
              <Phone size={18} aria-hidden="true" /> {company.phone}
            </span>
            <span className="readout-s text-steel">{company.hours.label}</span>
          </a>
          <p className="mt-3 flex items-start gap-3 text-sm text-fog">
            <MapPin size={16} className="mt-1 shrink-0" aria-hidden="true" /> {addressLine}
          </p>
          <p className="flex items-start gap-3 text-sm text-fog">
            <Mail size={16} className="mt-1 shrink-0" aria-hidden="true" /> {company.emails[1].address}
          </p>
        </div>
      </div>
      <style>{`@keyframes tm-menu-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}`}</style>
    </div>
  )
}
