import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { mainNav } from '../data/navigation'

const bars = ['#eef0eb', '#fcb415', '#b9c3bf', '#8d9c98', '#4c5955', '#25322f', '#182321']

/** Branded 404: a "no signal" test card – a nod to the TV-repair origins. */
export function NotFoundPage() {
  return (
    <section className="on-dark relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink pb-16 pt-[calc(var(--header-h)+3rem)] text-snow">
      <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.07]" aria-hidden="true">
        <filter id="nf-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#nf-noise)" />
      </svg>
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <p className="readout hero-in text-amber">Virhe 404 · kanavaa ei löytynyt</p>
          <h1 className="display display-l hero-in mt-6" style={{ ['--d' as string]: '0.08s' }}>
            Ei signaalia.
          </h1>
          <p className="lead hero-in mt-8 max-w-lg text-fog" style={{ ['--d' as string]: '0.16s' }}>
            Hakemaasi sivua ei löytynyt. Se on voinut siirtyä tai osoitteessa on kirjoitusvirhe. Viritä uudelleen:
          </p>
          <Link to="/" className="btn btn-amber hero-in mt-9" style={{ ['--d' as string]: '0.22s' }}>
            Etusivulle <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="lg:col-span-6">
          <div className="scanlines relative overflow-hidden rounded-[1.6rem] ring-1 ring-line" aria-hidden="true">
            <div className="flex h-56 sm:h-72">
              {bars.map((c) => (
                <span key={c} className="h-full flex-1" style={{ background: c }} />
              ))}
            </div>
            <div className="flex h-12 bg-ink-3">
              {bars
                .slice()
                .reverse()
                .map((c, i) => (
                  <span key={i} className="h-full flex-1" style={{ background: i % 2 ? c : '#0c1312' }} />
                ))}
            </div>
            <span className="readout absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink px-5 py-2 text-amber">
              Ei signaalia
            </span>
          </div>
          <nav aria-label="Sivuston osiot" className="mt-8">
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {mainNav.map((n, i) => (
                <li key={n.to}>
                  <Link to={n.to} className="flex h-full flex-col bg-ink px-4 py-4 no-underline hover:bg-ink-3">
                    <span className="readout-s text-steel">CH {String(i + 1).padStart(2, '0')}</span>
                    <span className="mt-1 font-semibold">{n.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  )
}
