import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { company } from '../../data/company'
import type { InquiryTopic } from '../../lib/forms/types'

interface Props {
  title: string
  text: string
  topic?: InquiryTopic
  cta?: string
}

/** Closing call-to-action panel with topic preselection for the inquiry form. */
export function CtaBand({ title, text, topic, cta = 'Lähetä tarjouspyyntö' }: Props) {
  return (
    <section className="wrap py-20 sm:py-28">
      <div className="relative overflow-hidden rounded-[2rem] bg-amber px-6 py-12 text-ink sm:px-12 sm:py-16 lg:px-16" data-reveal>
        <svg
          viewBox="0 0 600 300"
          className="pointer-events-none absolute -right-24 -top-10 h-[130%] w-auto opacity-25"
          aria-hidden="true"
        >
          {[90, 140, 190, 240, 290].map((r) => (
            <circle key={r} cx="520" cy="300" r={r} fill="none" stroke="#0c1312" strokeWidth="1.5" />
          ))}
        </svg>
        <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="display display-m">{title}</h2>
            <p className="lead mt-5 max-w-2xl">{text}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Link to={topic ? `/yhteystiedot?aihe=${topic}` : '/yhteystiedot'} className="btn btn-ink">
              {cta} <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href={company.phoneHref} className="btn btn-line">
              <Phone size={17} aria-hidden="true" /> {company.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
