import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Wordmark } from '../brand/Wordmark'
import { SolarWorksLogo } from '../brand/SolarWorksLogo'
import { addressLine, company } from '../../data/company'
import { mainNav } from '../../data/navigation'
import { OpenBadge } from '../ui/OpenBadge'

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-snow">
      <div className="wrap pb-10 pt-20 sm:pt-28">
        <div className="grid gap-12 border-b border-line pb-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="readout text-amber">Soita, tule käymään tai kirjoita</p>
            <a
              href={company.phoneHref}
              className="display display-l mt-5 block w-fit no-underline transition-colors duration-300 hover:text-amber"
            >
              {company.phone}
            </a>
            <p className="mt-6 max-w-xl text-fog">
              Myymälämme sijaitsee Salpakankaan teollisuusalueella, jonne pääsee myös täysperävaunullisella
              ajoneuvolla.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-4 lg:col-span-5 lg:items-end">
            <Link to="/yhteystiedot" className="btn btn-amber">
              Lähetä tarjouspyyntö <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <OpenBadge />
          </div>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block text-[1.9rem]">
              <Wordmark full />
              <span className="sr-only"> – etusivu</span>
            </Link>
            <div className="mt-8 flex items-center gap-4">
              <SolarWorksLogo className="h-9 w-auto" />
              <span className="text-sm text-steel">Aurinkosähköyksikkömme</span>
            </div>
          </div>
          <div className="lg:col-span-3">
            <h2 className="readout text-steel">Yhteystiedot</h2>
            <address className="mt-4 not-italic leading-relaxed text-fog">
              {company.legalName}
              <br />
              {addressLine}
              <br />
              <a href={company.phoneHref} className="hover:text-amber">
                {company.phone}
              </a>
            </address>
            <ul className="mt-4 space-y-1 text-sm">
              {company.emails.map((e) => (
                <li key={e.address}>
                  <span className="text-steel">{e.label}: </span>
                  <a href={`mailto:${e.address}`} className="text-fog hover:text-amber">
                    {e.address}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h2 className="readout text-steel">Myymälä</h2>
            <p className="mt-4 text-fog">
              {company.hours.label}
              <br />
              <a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className="link-arrow mt-2 text-snow">
                Reittiohjeet <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </p>
          </div>
          <nav aria-label="Alavalikko" className="lg:col-span-3">
            <h2 className="readout text-steel">Sivut</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5">
              {mainNav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-fog no-underline hover:text-amber">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/palvelut" className="text-fog no-underline hover:text-amber">
                  Kaikki palvelut
                </Link>
              </li>
              <li>
                <Link to="/yhteystiedot" className="text-fog no-underline hover:text-amber">
                  Yhteystiedot
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-8 text-sm text-steel md:flex-row md:items-center md:justify-between">
          <p>
            © {company.legalName} · Y-tunnus {company.businessId}
          </p>
          <p>
            Konseptidemo: Hades Design. Ei yrityksen virallinen sivusto –{' '}
            <a href={company.originalSite} target="_blank" rel="noopener noreferrer" className="underline hover:text-snow">
              nykyinen sivusto
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
