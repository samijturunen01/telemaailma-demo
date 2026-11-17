import { useRef } from 'react'
import { PageHero } from '../components/ui/PageHero'
import { SectionLabel } from '../components/ui/Section'
import { CtaBand } from '../components/ui/CtaBand'
import { Picture } from '../components/ui/Picture'
import { SolarWorksLogo } from '../components/brand/SolarWorksLogo'
import { addressLine, company } from '../data/company'
import { useScrollFx } from '../hooks/useScrollFx'

const timeline = [
  {
    year: '1977',
    title: 'TV-korjaamo Joensuussa',
    text: 'Tenho Pykäläinen perustaa yrityksen. Alussa myydään ja huolletaan elektroniikkaa ja asennetaan televisioantenneja.',
  },
  {
    year: '→',
    title: 'Mobiilitekniikka',
    text: 'Toiminnan painopiste siirtyy mobiilitekniikan pariin. Antennijärjestelmät, televisiot ja niihin liittyvät palvelut kuuluvat yhä valikoimaan.',
  },
  {
    year: '2016',
    title: 'Aurinkosähkö',
    text: 'Yritys hyödyntää aurinkosähköä omassa toiminnassaan ja toimittaa järjestelmiä asiakkaille. Toiminnasta kasvaa SolarWorks-yksikkö.',
  },
  {
    year: '2017',
    title: 'Fronius Service Partner',
    text: 'SolarWorksista tulee tammikuussa 2017 ensimmäisenä Suomessa Fronius Service Partner.',
  },
  {
    year: '✓',
    title: 'Sertifioitu asentaja',
    text: 'Pohjois-Karjalan ensimmäinen Motivan aurinkosähköasentajasertifikaatti.',
  },
  {
    year: 'Nyt',
    title: 'Neljä osaamisaluetta',
    text: 'Mobiilitekniikka ja myymälä, antenni- ja tietoverkkoasennukset, ajoneuvo- ja työkoneasennukset sekä SolarWorks-aurinkosähkö.',
  },
]

const facts = [
  { k: 'Virallinen nimi', v: company.legalName },
  { k: 'Y-tunnus', v: company.businessId },
  { k: 'Toiminut', v: `yhtäjaksoisesti vuodesta ${company.founded}` },
  { k: 'Osoite', v: addressLine },
  { k: 'Sijainti', v: company.address.district },
  { k: 'Myymälä', v: company.hours.label },
  { k: 'Aurinkosähköyksikkö', v: 'SolarWorks' },
]

export function AboutPage() {
  const tl = useRef<HTMLElement>(null)
  useScrollFx(tl, (gsap) => {
    gsap.fromTo(
      '[data-progress]',
      { scaleY: 0 },
      { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '[data-timeline]', start: 'top 70%', end: 'bottom 60%', scrub: 0.4 } },
    )
  })

  return (
    <>
      <PageHero
        eyebrow="Tietoa meistä"
        title={
          <>
            Vuodesta <span className="text-amber">1977.</span>
          </>
        }
        lead={
          <p>
            Joensuun Telemaailma Oy on toiminut yhtäjaksoisesti vuodesta 1977. Toiminta alkoi TV-korjaamosta, ja
            vuosien saatossa painopiste on siirtynyt mobiilitekniikan ja aurinkosähköjärjestelmien pariin.
            Aurinkosähköjärjestelmiä myymme SolarWorks-yksikkömme kautta.
          </p>
        }
        crumbs={[{ label: 'Tietoa meistä' }]}
      />

      <section ref={tl} className="py-20 sm:py-28" aria-labelledby="history-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionLabel index="01">Historia</SectionLabel>
              <h2 id="history-title" className="display display-m mt-6">
                Korjaamosta aurinkoon.
              </h2>
              <p className="mt-6 text-slate">
                Vuosikymmenten kokemus kiinteistöjen teknisistä asennustöistä pienistä ja suurista kohteista.
              </p>
            </div>
          </div>
          <ol data-timeline className="relative lg:col-span-7 lg:col-start-6">
            <span className="absolute bottom-0 left-[0.4rem] top-2 w-px bg-rule" aria-hidden="true" />
            <span
              data-progress
              className="absolute bottom-0 left-[0.4rem] top-2 w-px origin-top bg-amber"
              aria-hidden="true"
            />
            {timeline.map((t, i) => (
              <li key={t.title} className="relative pb-14 pl-12 last:pb-0" data-reveal style={{ ['--d' as string]: `${i * 0.04}s` }}>
                <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-amber bg-paper" aria-hidden="true" />
                <p className="display display-s text-amber-ink">{t.year}</p>
                <h3 className="mt-3 text-2xl font-semibold">{t.title}</h3>
                <p className="mt-2 max-w-xl text-slate">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="on-dark bg-ink py-24 text-snow sm:py-32" aria-labelledby="people-title">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="02" tone="amber">
              Ihmiset
            </SectionLabel>
            <h2 id="people-title" className="display display-m mt-6" data-reveal>
              Itä-Suomessa, tietoisesti.
            </h2>
            <p className="mt-6 text-fog" data-reveal>
              Toimimme Itä-Suomessa tietoisena valintana – paikallisuus on monelle asiakkaallemme tärkeää.
              Joensuusta käsin palvelemme kotitalouksia, taloyhtiöitä, yrityksiä ja metsäalaa.
            </p>
          </div>
          <ul className="grid gap-px self-start overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            <li className="bg-ink p-8" data-reveal>
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-amber font-display text-xl font-bold text-amber" aria-hidden="true">
                TP
              </span>
              <p className="mt-6 text-xl font-semibold">{company.founder}</p>
              <p className="readout-s mt-2 text-steel">Perustaja · 1977</p>
            </li>
            <li className="bg-ink p-8" data-reveal style={{ ['--d' as string]: '0.08s' }}>
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber font-display text-xl font-bold text-ink" aria-hidden="true">
                SP
              </span>
              <p className="mt-6 text-xl font-semibold">{company.entrepreneur}</p>
              <p className="readout-s mt-2 text-steel">Yrittäjä · SolarWorks</p>
              <p className="mt-4 text-sm text-fog">Motivan sertifioima aurinkosähköasentaja.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-24 sm:py-32" aria-labelledby="facts-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="03">Yritystiedot</SectionLabel>
            <h2 id="facts-title" className="display display-m mt-6">
              Telemaailma lyhyesti.
            </h2>
            <SolarWorksLogo className="mt-12 h-auto w-48" />
          </div>
          <dl className="border-t border-ink lg:col-span-7">
            {facts.map((f) => (
              <div key={f.k} className="grid gap-1 border-b border-rule py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt className="readout-s text-slate">{f.k}</dt>
                <dd className="text-lg font-medium">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap" aria-label="Elektroniikkaa">
        <figure data-reveal="mask" style={{ ['--r' as string]: '2rem' }}>
          <div className="mask-inner relative aspect-[16/7] overflow-hidden rounded-[2rem] bg-ink">
            <Picture
              name="piirilevy"
              alt="Lähikuva elektroniikan piirilevystä."
              sizes="(min-width: 1472px) 1360px, 94vw"
              className="block h-full w-full"
              imgClassName="h-full w-full object-cover"
            />
          </div>
          <figcaption className="readout-s mt-4 text-slate">Kuva: Telemaailman nykyiseltä verkkosivustolta</figcaption>
        </figure>
      </section>

      <CtaBand title="Tule käymään Salpakankaalla." text={`Myymälä avoinna ${company.hours.label}. ${addressLine}.`} cta="Ota yhteyttä" />
    </>
  )
}
