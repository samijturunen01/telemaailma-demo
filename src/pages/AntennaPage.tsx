import { Link } from 'react-router-dom'
import { ArrowRight, Phone, TvMinimal } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { SectionLabel } from '../components/ui/Section'
import { CtaBand } from '../components/ui/CtaBand'
import { WavesArt } from '../components/art/Artworks'
import { CoverageRadar } from '../components/antenna/CoverageRadar'
import { company } from '../data/company'
import { credentials, legacyAntennaAuthorisations } from '../data/credentials'

const groups = [
  {
    k: '01',
    title: 'TV ja satelliitti',
    items: ['TV-antenniasennus', 'Antennin suuntaus', 'Satelliittiantenniasennus', 'Antennien korjaus ja huolto', 'Antenniurakointi'],
  },
  { k: '02', title: 'Mobiilidata', items: ['LTE-antennit', '4G-antennit'] },
  {
    k: '03',
    title: 'Tietoverkot',
    items: ['Kuituasennus', 'Kuituhitsaus', 'Cat-kaapelit', 'Lähiverkkojen asennus'],
  },
  {
    k: '04',
    title: 'Tuotteet ja tarvikkeet',
    items: ['Antennit (mm. Triax)', 'Antennivahvistimet', 'Antennikaapelit', 'Kaikki antennitarvikkeet'],
  },
]

const properties = ['Omakotitalo', 'Rivitalo', 'Taloyhtiö', 'Uudiskohde', 'Vanhempi kiinteistö', 'Muu kiinteistö']

export function AntennaPage() {
  return (
    <>
      <PageHero
        eyebrow="Antenni- ja talojärjestelmät"
        title={
          <>
            Kaikki kanavat <span className="text-amber">näkyviin.</span>
          </>
        }
        lead={
          <p>
            Hyvin suunnitellulla ja asennetulla tv-antennijärjestelmällä kaikki kanavat löytyvät ja näkyvät hyvin.
            Suunnittelemme, asennamme, huollamme ja korjaamme tv-antennijärjestelmät Joensuun lähialueilla ja koko
            Itä-Suomessa.
          </p>
        }
        crumbs={[{ to: '/palvelut', label: 'Palvelut' }, { label: 'Antenniasennukset' }]}
        art={<WavesArt className="absolute right-[-10%] top-0 h-full w-[80%] opacity-40 lg:w-[60%]" />}
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/yhteystiedot?aihe=antennit" className="btn btn-amber">
            Pyydä tarjous <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <a href={company.phoneHref} className="btn btn-line text-snow">
            <Phone size={17} aria-hidden="true" /> {company.phone}
          </a>
        </div>
      </PageHero>

      <section className="py-20 sm:py-28" aria-labelledby="property-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel index="01">Kohteet</SectionLabel>
            <h2 id="property-title" className="display display-m mt-6" data-reveal>
              Uudiskohteesta vanhaan taloyhtiöön.
            </h2>
            <p className="mt-6 max-w-xl text-slate" data-reveal>
              Osaamme auttaa, oli kyseessä uudiskohde tai vanhempi kiinteistö. Oli kohteesi rivi- tai omakotitalo,
              taloyhtiö tai mikä tahansa muu kiinteistö, meiltä saat asiantuntevan asentajan. Antenniverkkojen kunnostus
              ja korjaustyöt ovat tärkeä osa palveluitamme, ja käytämme laadukkaita, tunnettujen merkkien tuotteita ja
              komponentteja.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2" data-reveal>
              {properties.map((p) => (
                <li key={p} className="rounded-full border border-rule px-4 py-2 text-sm font-medium">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-5 lg:col-start-8" data-reveal>
            <div className="on-dark relative overflow-hidden rounded-[1.75rem] bg-ink p-8 text-snow sm:p-10">
              <div className="scanlines absolute inset-0 opacity-60" aria-hidden="true" />
              <TvMinimal size={32} className="relative text-amber" aria-hidden="true" />
              <h3 className="display display-s relative mt-6">Kuva poikki tai pätkii?</h3>
              <p className="relative mt-4 text-fog">
                Jos television kuvassa on vikaa tai kuva puuttuu kokonaan, ota yhteyttä – käymme laittamassa kuvat
                kuntoon.
              </p>
              <div className="relative mt-8 flex flex-wrap gap-3">
                <a href={company.phoneHref} className="btn btn-amber">
                  <Phone size={17} aria-hidden="true" /> Soita {company.phone}
                </a>
                <Link to="/yhteystiedot?aihe=antennit" className="btn btn-line text-snow">
                  Kirjoita viesti
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="pb-24 sm:pb-32" aria-labelledby="services-title">
        <div className="wrap">
          <SectionLabel index="02">Asennuspalvelut ja tuotteet</SectionLabel>
          <h2 id="services-title" className="display display-m mt-6 max-w-3xl" data-reveal>
            Antennista kuituun ja lähiverkkoon.
          </h2>
          <div className="mt-14 grid border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((g, i) => (
              <div
                key={g.k}
                className="border-b border-rule py-8 sm:pr-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"
                data-reveal
                style={{ ['--d' as string]: `${i * 0.07}s` }}
              >
                <p className="readout-s text-amber-ink">{g.k}</p>
                <h3 className="mt-4 text-xl font-semibold">{g.title}</h3>
                <ul className="mt-5 space-y-2.5">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-baseline gap-3 text-slate">
                      <span className="mt-2 h-px w-3 shrink-0 bg-ink" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="on-dark bg-ink py-24 text-snow sm:py-32" aria-labelledby="area-title">
        <div className="wrap">
          <div className="mb-14 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionLabel index="03" tone="amber">
                Palvelualue
              </SectionLabel>
              <h2 id="area-title" className="display display-m mt-6" data-reveal>
                Joensuun lähialueilla ja koko Itä-Suomessa.
              </h2>
            </div>
            <p className="text-fog lg:col-span-4 lg:col-start-9 lg:self-end" data-reveal>
              Kontiolahti, Lehmo, Eno, Ilomantsi, Tohmajärvi, Rääkkylä, Liperi – ja niin edelleen.
            </p>
          </div>
          <CoverageRadar />
        </div>
      </section>

      <section className="py-24 sm:py-32" aria-labelledby="auth-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="04">Yrityksemme on</SectionLabel>
            <h2 id="auth-title" className="display display-m mt-6" data-reveal>
              Valtuudet kunnossa.
            </h2>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-[1.5rem] border border-rule bg-rule sm:grid-cols-2 lg:col-span-8">
            {credentials
              .filter((c) => c.area === 'Antennit ja tietoverkot')
              .map((c) => (
                <li key={c.code} className="bg-paper p-6" data-reveal>
                  <p className="readout-s text-amber-ink">{c.code}</p>
                  <p className="mt-2 font-semibold">{c.name}</p>
                </li>
              ))}
            {legacyAntennaAuthorisations.map((a) => (
              <li key={a} className="bg-paper p-6" data-reveal>
                <p className="readout-s text-slate">Asennusliike</p>
                <p className="mt-2 font-semibold">{a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Uusi antenni, suuntaus tai kuituasennus?"
        text="Kerro kohteesta ja tarpeesta, niin suunnittelemme ratkaisun. Myös taloyhtiöiden antenniverkkojen kunnostukset."
        topic="antennit"
      />
    </>
  )
}
