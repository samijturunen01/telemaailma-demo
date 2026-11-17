import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface Crumb {
  to?: string
  label: string
}

interface Props {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  crumbs: Crumb[]
  aside?: ReactNode
  children?: ReactNode
  /** Background artwork rendered behind the content. */
  art?: ReactNode
}

/**
 * Inner-page hero: night-ink field whose lower edge is a rising horizon arc –
 * the page "dawns" into the paper-coloured content below.
 */
export function PageHero({ eyebrow, title, lead, crumbs, aside, children, art }: Props) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-snow">
      {art && <div className="pointer-events-none absolute inset-0 -z-10">{art}</div>}
      <div className="wrap relative pb-28 pt-[calc(var(--header-h)+3.5rem)] sm:pb-36 lg:pb-44 lg:pt-[calc(var(--header-h)+5.5rem)]">
        <nav aria-label="Murupolku" className="mb-10">
          <ol className="readout-s flex flex-wrap items-center gap-1.5 text-steel">
            <li>
              <Link to="/" className="hover:text-snow">
                Etusivu
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight size={12} aria-hidden="true" />
                {c.to ? (
                  <Link to={c.to} className="hover:text-snow">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-fog">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className={aside ? 'lg:col-span-7' : 'lg:col-span-10'}>
            <p className="readout hero-in text-amber">
              {eyebrow}
            </p>
            <h1 className="display display-l hero-in mt-6" style={{ ['--d' as string]: '0.08s' }}>
              {title}
            </h1>
            {lead && (
              <div className="lead hero-in mt-8 max-w-2xl text-fog" style={{ ['--d' as string]: '0.16s' }}>
                {lead}
              </div>
            )}
            {children && (
              <div className="hero-in mt-9" style={{ ['--d' as string]: '0.22s' }}>
                {children}
              </div>
            )}
          </div>
          {aside && (
            <div className="hero-in lg:col-span-5" style={{ ['--d' as string]: '0.2s' }}>
              {aside}
            </div>
          )}
        </div>
      </div>
      {/* horizon arc edge */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-[-1px] h-[56px] w-full sm:h-[90px] lg:h-[120px]"
        aria-hidden="true"
      >
        <path d="M0 120 L0 110 Q720 -50 1440 110 L1440 120 Z" fill="var(--color-paper)" />
        <path d="M0 110 Q720 -50 1440 110" fill="none" stroke="var(--color-amber)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
    </section>
  )
}
