import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, MapPin, Navigation, Phone } from 'lucide-react'
import { SectionLabel } from '../ui/Section'
import { Picture } from '../ui/Picture'
import { SolarWorksLogo } from '../brand/SolarWorksLogo'
import { ContourArt, RouteArt, WavesArt } from '../art/Artworks'
import { OpenBadge } from '../ui/OpenBadge'
import { channels } from '../../data/channels'
import { addressLine, company } from '../../data/company'
import { credentials } from '../../data/credentials'
import { useScrollFx } from '../../hooks/useScrollFx'

/* ---------------------------------------------------------------- Origin */
const milestones = [
  { year: '1977', title: 'TV-korjaamo', text: 'Toiminta alkaa Joensuussa TV-korjaamona. Antenniasennukset kuuluvat työhön alusta asti.' },
  { year: '2016', title: 'Aurinkosähkö', text: 'Aurinkosähköä omaan käyttöön ja asiakkaille. Toiminnasta kasvaa SolarWorks-yksikkö.' },
  { year: '2017', title: 'Fronius', text: 'Suomen ensimmäinen Fronius Service Partner tammikuusta 2017 alkaen.' },
  { year: 'Nyt', title: 'Neljä alaa', text: 'Mobiilitekniikka, antennit ja tietoverkot, ajoneuvoasennukset sekä aurinkosähkö.' },
]

export function OriginSection() {
  const root = useRef<HTMLElement>(null)
  useScrollFx(root, (gsap) => {
    // The year "tunes in": its width axis sweeps as it scrolls through view.
    gsap.fromTo(
      '[data-year]',
      { fontStretch: '56%' },
      {
        fontStretch: '125%',
        ease: 'none',
        scrollTrigger: { trigger: '[data-year]', start: 'top 92%', end: 'top 25%', scrub: 0.6 },
      },
    )
  })
  return (
    <section ref={root} className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="origin-title">
      <div className="wrap">
        <SectionLabel index="01">Vuodesta 1977</SectionLabel>
        <p
          aria-hidden="true"
          data-year
          className="mt-8 select-none whitespace-nowrap font-display text-[clamp(7.5rem,27vw,24rem)] font-[760] leading-[0.8] text-transparent"
          style={{ WebkitTextStroke: '1.5px var(--color-ink)', fontStretch: '125%' }}
        >
          1977
        </p>
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <h2 id="origin-title" className="display display-m lg:col-span-6" data-reveal>
            Myymme, asennamme ja huollamme.
          </h2>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="prose-tm max-w-xl text-slate" data-reveal style={{ ['--d' as string]: '0.1s' }}>
              <p>
                Joensuun Telemaailma Oy on myynyt, asentanut ja huoltanut elektroniikkalaitteita yli 40 vuotta.
                Toiminta alkoi TV-korjaamosta, ja vuosien saatossa painopiste on siirtynyt mobiilitekniikan ja
                aurinkosähköjärjestelmien pariin.
              </p>
              <p>Antennijärjestelmät ja televisioihin liittyvät palvelut kuuluvat yhä työhömme.</p>
            </div>
            <Link to="/tietoa-meista" className="link-arrow mt-7" data-reveal style={{ ['--d' as string]: '0.18s' }}>
              Lue tarinamme <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <ol className="mt-20 grid border-t border-rule sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m, i) => (
            <li
              key={m.year}
              className="border-b border-rule py-7 sm:pr-8 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0"
              data-reveal
              style={{ ['--d' as string]: `${i * 0.08}s` }}
            >
              <p className="readout-s flex items-center gap-2 text-amber-ink">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
                {m.year}
              </p>
              <h3 className="mt-4 text-xl font-semibold">{m.title}</h3>
              <p className="mt-2 text-[0.98rem] text-slate">{m.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- SolarWorks */
const solarPoints = [
  { k: '01', t: 'Suunnittelu ja asennus', d: 'Suunnittelu, toimitus ja asennus samasta paikasta.' },
  { k: '02', t: 'Fronius-invertterit', d: 'Itävaltalaiset invertterit ja Suomen sääoloihin sopivat paneelit.' },
  { k: '03', t: 'Komponentit', d: 'Myös yksittäiset paneelit, invertterit ja tarvikkeet.' },
  { k: '04', t: 'Tarkastukset', d: 'Järjestelmien tarkastukset ja testimittaukset.' },
]

export function SolarFeature() {
  const root = useRef<HTMLElement>(null)
  useScrollFx(root, (gsap) => {
    gsap.fromTo(
      '[data-parallax]',
      { yPercent: -7 },
      { yPercent: 7, ease: 'none', scrollTrigger: { trigger: '[data-parallax-frame]', scrub: true } },
    )
  })
  return (
    <section ref={root} className="on-dark relative overflow-hidden bg-ink py-24 text-snow sm:py-32" aria-labelledby="solar-title">
      <div className="wrap">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col lg:col-span-5">
            <SolarWorksLogo className="h-auto w-[min(17rem,70%)]" />
            <SectionLabel index="02" tone="amber" className="mt-12">
              Aurinkosähkö
            </SectionLabel>
            <h2 id="solar-title" className="display display-m mt-6" data-reveal>
              Aurinkosähkö avaimet käteen.
            </h2>
            <p className="mt-6 max-w-lg text-fog" data-reveal style={{ ['--d' as string]: '0.08s' }}>
              SolarWorks on Joensuun Telemaailma Oy:n yksikkö, joka suunnittelee, myy ja asentaa
              aurinkosähköjärjestelmiä sekä niihin liittyviä komponentteja. Teemme myös järjestelmien tarkastuksia
              ja testimittauksia.
            </p>
            <div className="mt-9 flex flex-wrap gap-3" data-reveal style={{ ['--d' as string]: '0.14s' }}>
              <Link to="/aurinkosahko" className="btn btn-amber">
                Tutustu aurinkosähköön <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a href={company.yieldCalculatorUrl} target="_blank" rel="noopener noreferrer" className="btn btn-line text-snow">
                Tuottoarviolaskuri <ArrowUpRight size={18} aria-hidden="true" />
                <span className="sr-only">(avautuu uuteen ikkunaan)</span>
              </a>
            </div>
          </div>
          <figure className="lg:col-span-7">
            <div data-parallax-frame data-reveal="mask" style={{ ['--r' as string]: '2rem' }}>
              <div className="mask-inner relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-ink-3">
                <div data-parallax className="absolute inset-[-8%_0]">
                  <Picture
                    name="nosturi-katto"
                    alt="Aurinkopaneelilavoja nostetaan nosturilla lumiselle tasakatolle. Katolla on jo asennettuja paneelirivejä, taustalla mäntymetsää."
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    className="block h-full w-full"
                    imgClassName="h-full w-full object-cover"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
              </div>
            </div>
            <figcaption className="readout-s mt-4 flex items-center justify-between gap-4 text-steel">
              <span>Paneelien nosto katolle</span>
              <span>Kuva: SolarWorks</span>
            </figcaption>
          </figure>
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {solarPoints.map((p, i) => (
            <li key={p.k} className="bg-ink p-7" data-reveal style={{ ['--d' as string]: `${i * 0.07}s` }}>
              <p className="readout-s text-amber">{p.k}</p>
              <h3 className="mt-6 text-lg font-semibold">{p.t}</h3>
              <p className="mt-2 text-[0.96rem] text-fog">{p.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* -------------------------------------------------------- Service index */
const extra: Record<string, { tags: string[]; art: 'solar' | 'waves' | 'route' | 'contours' | 'board' }> = {
  aurinko: { tags: ['Avaimet käteen', 'Fronius', 'Komponentit', 'Mittaukset'], art: 'solar' },
  antennit: { tags: ['TV & satelliitti', 'LTE / 4G', 'Kuitu', 'Lähiverkot'], art: 'waves' },
  ajoneuvot: { tags: ['VHF & LA', 'Paikannus', 'Ajoneuvotietokoneet', 'Veneet'], art: 'route' },
  maasto: { tags: ['Koiratutkat', 'Riistakamerat', 'Akut', 'Vuosihuolto'], art: 'contours' },
  myymala: { tags: ['Älypuhelimet', 'IP68', 'Kannettavat', 'Tarvikkeet'], art: 'board' },
}

export function ServiceIndex({
  all = false,
  index = '03',
  label = 'Muut kanavat',
  title = 'Kuuluvuutta kotiin, autoon ja metsään.',
}: {
  all?: boolean
  index?: string
  label?: string
  title?: string
}) {
  const rows = all ? channels : channels.filter((c) => c.id !== 'aurinko')
  return (
    <section className="py-24 sm:py-32" aria-labelledby="services-title">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index={index}>{label}</SectionLabel>
            <h2 id="services-title" className="display display-m mt-6" data-reveal>
              {title}
            </h2>
          </div>
          <p className="text-slate lg:col-span-5" data-reveal style={{ ['--d' as string]: '0.08s' }}>
            Asennukset tehdään uusiin ja vanhoihin kohteisiin, ajoneuvoihin ja työkoneisiin – tarvittaessa
            asiakkaan luona tai maastossa.
          </p>
        </div>

        <ul className="mt-14 border-t border-ink">
          {rows.map((c, i) => {
            const x = extra[c.id]
            return (
              <li key={c.id} className="border-b border-rule" data-reveal style={{ ['--d' as string]: `${i * 0.06}s` }}>
                <Link
                  to={c.to}
                  className="group relative grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 py-8 no-underline sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] md:grid-cols-[4rem_minmax(0,5fr)_minmax(0,5fr)_auto] md:py-10"
                >
                  <span className="readout-s self-start pt-2 text-slate">{c.number}</span>
                  <span className="display display-s transition-transform duration-500 ease-[var(--ease-tune)] group-hover:translate-x-2">
                    {c.title}
                  </span>
                  <span className="col-span-2 col-start-2 row-start-2 text-[0.98rem] text-slate md:col-span-1 md:col-start-3 md:row-start-1">
                    {c.text}
                    <span className="mt-4 flex flex-wrap gap-1.5">
                      {x.tags.map((t) => (
                        <span key={t} className="readout-s rounded-full border border-rule px-2.5 py-1 text-slate">
                          {t}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="relative col-start-3 row-start-1 flex h-12 w-12 items-center justify-center rounded-full border border-rule transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-amber md:col-start-4 md:h-14 md:w-14">
                    <ArrowRight size={20} aria-hidden="true" />
                  </span>
                  {/* hover preview */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-24 top-1/2 hidden h-40 w-56 -translate-y-1/2 scale-90 overflow-hidden rounded-2xl bg-ink opacity-0 shadow-2xl transition-all duration-500 ease-[var(--ease-tune)] group-hover:scale-100 group-hover:opacity-100 xl:block"
                    style={{ clipPath: 'inset(0 round 1rem)' }}
                  >
                    {x.art === 'waves' && <WavesArt className="h-full w-full" />}
                    {x.art === 'route' && <RouteArt className="h-full w-full" />}
                    {x.art === 'contours' && <ContourArt className="h-full w-full" />}
                    {x.art === 'board' && (
                      <Picture name="piirilevy" alt="" sizes="224px" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
                    )}
                    {x.art === 'solar' && (
                      <Picture name="nosturi-katto" alt="" sizes="224px" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
                    )}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- Field band */
const forestry = ['Harvestia', 'Metsä Group', 'Stora Enso', 'UPM']

export function FieldBand() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink-2 py-24 text-snow sm:py-32" aria-labelledby="field-title">
      <ContourArt className="pointer-events-none absolute inset-0 h-full w-full opacity-60" seed={21} />
      <div className="wrap relative">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel index="04" tone="amber">
              Kentällä
            </SectionLabel>
            <h2 id="field-title" className="display display-m mt-6" data-reveal>
              Asennukset työkoneisiin – tarvittaessa maastossa.
            </h2>
            <p className="mt-6 max-w-xl text-fog" data-reveal style={{ ['--d' as string]: '0.08s' }}>
              Asennamme paikannuslaitteet, VHF- ja LA-puhelimet, ajoneuvotietokoneet ja muut lisävarusteet autoihin,
              kuorma-autoihin, työkoneisiin, metsäkoneisiin ja veneisiin. Saat meiltä myös ohjelmistojen asennukset
              ja ongelmien selvityksen.
            </p>
            <Link to="/palvelut/ajoneuvoasennukset" className="link-arrow mt-8 text-amber" data-reveal style={{ ['--d' as string]: '0.14s' }}>
              Ajoneuvo- ja työkoneasennukset <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-6">
            <p className="readout text-steel">Metsäalan asennusyhteistyökumppani</p>
            <ul className="mt-5 border-t border-line">
              {forestry.map((f, i) => (
                <li
                  key={f}
                  className="display display-s flex items-center justify-between border-b border-line py-5"
                  data-reveal
                  style={{ ['--d' as string]: `${i * 0.07}s` }}
                >
                  {f}
                  <span className="readout-s text-steel">0{i + 1}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dimension line: the yard fits a full-trailer combination */}
        <div className="mt-20" data-reveal>
          <div className="flex items-center gap-3 text-amber">
            <span className="h-4 w-px bg-current" />
            <span className="relative h-px flex-1 bg-current">
              <span className="absolute -left-px -top-[4px] h-0 w-0 border-y-[4.5px] border-r-[8px] border-y-transparent border-r-current" />
              <span className="absolute -right-px -top-[4px] h-0 w-0 border-y-[4.5px] border-l-[8px] border-y-transparent border-l-current" />
            </span>
            <span className="h-4 w-px bg-current" />
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="display text-[clamp(1.25rem,2.4vw,2rem)]">Mahtuu pihaan – myös täysperävaunulla.</p>
            <p className="readout-s text-steel">Salpakankaan teollisuusalue · Aspitie 4</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- Credentials */
export function CredentialsSection() {
  const groups = ['Antennit ja tietoverkot', 'Aurinkosähkö'] as const
  return (
    <section className="py-24 sm:py-32" aria-labelledby="cred-title">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel index="05">Valtuutukset</SectionLabel>
          <h2 id="cred-title" className="display display-m mt-6" data-reveal>
            Pätevyys, joka näkyy paperilla.
          </h2>
          <p className="mt-6 text-slate" data-reveal style={{ ['--d' as string]: '0.08s' }}>
            Antenni- ja tietoverkkourakoinnin SETI-pätevyydet, alan liiton jäsenyys sekä aurinkosähkön
            valmistaja- ja asentajasertifioinnit.
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
          {groups.map((g) => (
            <div key={g}>
              <h3 className="readout text-slate">{g}</h3>
              <ul className="mt-4 border-t border-ink">
                {credentials
                  .filter((c) => c.area === g)
                  .map((c, i) => (
                    <li
                      key={c.code}
                      className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-rule py-4"
                      data-reveal
                      style={{ ['--d' as string]: `${i * 0.05}s` }}
                    >
                      <span className="readout-s text-amber-ink">{c.code}</span>
                      <span className="font-medium">{c.name}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- Visit */
export function VisitSection() {
  return (
    <section className="bg-bone py-24 sm:py-32" aria-labelledby="visit-title">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <SectionLabel index="06">Myymälä</SectionLabel>
          <h2 id="visit-title" className="display display-l mt-6" data-reveal>
            Tule käymään tai soita.
          </h2>
          <OpenBadge className="mt-8 text-slate" />
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="readout-s text-slate">Osoite</dt>
              <dd className="mt-2 text-lg font-medium">{addressLine}</dd>
            </div>
            <div>
              <dt className="readout-s text-slate">Aukioloajat</dt>
              <dd className="mt-2 text-lg font-medium">{company.hours.label}</dd>
            </div>
            <div>
              <dt className="readout-s text-slate">Puhelin</dt>
              <dd className="mt-2 text-lg font-medium">
                <a href={company.phoneHref} className="hover:underline">
                  {company.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="readout-s text-slate">Myynti</dt>
              <dd className="mt-2 text-lg font-medium">
                <a href={`mailto:${company.emails[1].address}`} className="break-all hover:underline">
                  {company.emails[1].address}
                </a>
              </dd>
            </div>
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
              <Navigation size={17} aria-hidden="true" /> Reittiohjeet
              <span className="sr-only">(avautuu uuteen ikkunaan)</span>
            </a>
            <a href={company.phoneHref} className="btn btn-line">
              <Phone size={17} aria-hidden="true" /> Soita
            </a>
          </div>
        </div>
        <div className="lg:col-span-6" data-reveal>
          <LocationCard />
        </div>
      </div>
    </section>
  )
}

export function LocationCard() {
  return (
    <div className="on-dark relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-ink text-snow">
      <ContourArt className="absolute inset-0 h-full w-full" seed={3} active track={false} />
      <svg viewBox="0 0 500 400" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <g stroke="#eef0eb" strokeOpacity="0.35">
          <line x1="250" y1="0" x2="250" y2="400" strokeDasharray="2 6" />
          <line x1="0" y1="200" x2="500" y2="200" strokeDasharray="2 6" />
        </g>
        {[34, 70, 110].map((r) => (
          <circle key={r} cx="250" cy="200" r={r} fill="none" stroke="#fcb415" strokeOpacity={0.5 - r / 300} />
        ))}
        <circle cx="250" cy="200" r="7" fill="#fcb415" />
      </svg>
      <div className="absolute inset-x-0 top-0 flex justify-between p-5">
        <span className="readout-s">{company.geo.lat.toFixed(3)}° N</span>
        <span className="readout-s">{company.geo.lon.toFixed(3)}° E</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
        <div>
          <p className="readout-s text-amber">Salpakangas</p>
          <p className="mt-2 flex items-center gap-2 text-lg font-semibold">
            <MapPin size={18} aria-hidden="true" /> {company.address.street}, {company.address.city}
          </p>
        </div>
        <span className="readout-s hidden text-steel sm:block">Kuvitus, ei mittakaavassa</span>
      </div>
    </div>
  )
}
