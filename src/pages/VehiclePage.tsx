import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { SectionLabel } from '../components/ui/Section'
import { CtaBand } from '../components/ui/CtaBand'
import { RouteArt } from '../components/art/Artworks'
import { company } from '../data/company'

const devices = [
  { t: 'Paikannuslaitteet', d: 'Paikannuslaitteiden asennukset ajoneuvoihin ja työkoneisiin.' },
  { t: 'VHF- ja LA-puhelimet', d: 'Radiopuhelinten asennukset ja kytkennät.' },
  { t: 'Ajoneuvotietokoneet', d: 'Ajoneuvotietokoneiden asennukset, myös ohjelmistot.' },
  { t: 'Antennit', d: 'Antennit autoihin, työkoneisiin ja veneisiin.' },
  { t: 'Viihdejärjestelmät', d: 'Viihdejärjestelmien asennukset ajoneuvoihin.' },
  { t: 'Kiinnitystarvikkeet', d: 'Asennus- ja kiinnitystarvikkeet tietokoneille ja puhelimille.' },
]

const vehicles = ['Autot', 'Kuorma-autot', 'Työkoneet', 'Metsäkoneet', 'Veneet']
const forestry = ['Harvestia', 'Metsä Group', 'Stora Enso', 'UPM']

export function VehiclePage() {
  return (
    <>
      <PageHero
        eyebrow="Ajoneuvo- ja työkoneasennukset"
        title={
          <>
            Autoon, koneeseen <span className="text-amber">ja veneeseen.</span>
          </>
        }
        lead={
          <p>
            Asennamme paikannuslaitteet, VHF- ja LA-puhelimet, ajoneuvotietokoneet ja muut lisävarusteet kuten
            antennit ja viihdejärjestelmät autoihin, kuorma-autoihin, työkoneisiin, metsäkoneisiin ja veneisiin –
            tarvittaessa myös asiakkaan luona tai maastossa.
          </p>
        }
        crumbs={[{ to: '/palvelut', label: 'Palvelut' }, { label: 'Ajoneuvoasennukset' }]}
        art={<RouteArt className="absolute inset-y-0 right-0 h-full w-full opacity-30 lg:w-[65%]" />}
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/yhteystiedot?aihe=ajoneuvot" className="btn btn-amber">
            Varaa asennus <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <a href={company.phoneHref} className="btn btn-line text-snow">
            <Phone size={17} aria-hidden="true" /> {company.phone}
          </a>
        </div>
      </PageHero>

      <section className="py-20 sm:py-28" aria-labelledby="devices-title">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionLabel index="01">Mitä asennamme</SectionLabel>
              <h2 id="devices-title" className="display display-m mt-6" data-reveal>
                Laitteet, joiden pitää toimia joka päivä.
              </h2>
            </div>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <ol className="grid gap-px self-start overflow-hidden rounded-[1.5rem] border border-rule bg-rule sm:grid-cols-2 lg:col-span-8">
              {devices.map((d, i) => (
                <li key={d.t} className="bg-paper p-7" data-reveal style={{ ['--d' as string]: `${i * 0.05}s` }}>
                  <p className="readout-s text-amber-ink">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-4 text-xl font-semibold">{d.t}</h3>
                  <p className="mt-2 text-slate">{d.d}</p>
                </li>
              ))}
            </ol>
            <div className="lg:col-span-4">
              <p className="readout text-slate">Mihin asennamme</p>
              <ul className="mt-4 border-t border-ink">
                {vehicles.map((v, i) => (
                  <li
                    key={v}
                    className="display display-s flex items-center justify-between border-b border-rule py-4"
                    data-reveal
                    style={{ ['--d' as string]: `${i * 0.06}s` }}
                  >
                    {v}
                    <span className="readout-s text-slate">{String(i + 1).padStart(2, '0')}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-slate">
                Saat meiltä myös ohjelmistojen asennukset sekä ongelmien selvityksen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="on-dark relative overflow-hidden bg-ink py-24 text-snow sm:py-32" aria-labelledby="yard-title">
        <RouteArt className="pointer-events-none absolute inset-0 h-full w-full opacity-25" />
        <div className="wrap relative">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionLabel index="02" tone="amber">
                Salpakangas
              </SectionLabel>
              <h2 id="yard-title" className="display display-m mt-6" data-reveal>
                Tilaa raskaalle kalustolle.
              </h2>
              <p className="mt-6 max-w-xl text-fog" data-reveal>
                Sijaintimme Salpakankaan teollisuusalueella mahdollistaa saapumisen myös täysperävaunullisella
                ajoneuvolla. Kun kone ei pääse tulemaan meille, tulemme asentamaan asiakkaan luo tai maastoon.
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="readout text-steel">Metsäalan asennusyhteistyökumppani</p>
              <ul className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                {forestry.map((f) => (
                  <li key={f} className="bg-ink px-5 py-6 text-lg font-semibold" data-reveal>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-steel">
                Olemme Harvestian, Metsä Groupin, Stora Enson ja UPM:n asennusyhteistyökumppani metsäalalla.
              </p>
            </div>
          </div>

          <div className="mt-20" data-reveal="line">
            <div className="flex items-center gap-3 text-amber">
              <span className="h-5 w-px bg-current" />
              <span className="relative h-px flex-1 bg-current" />
              <span className="h-5 w-px bg-current" />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="display text-[clamp(1.25rem,2.4vw,2rem)]">Täysperävaunullinen ajoneuvo mahtuu pihaan.</p>
            <p className="readout-s text-steel">Aspitie 4 · Joensuu</p>
          </div>
        </div>
      </section>

      <section className="wrap py-24 sm:py-28" aria-labelledby="hunt-title">
        <div className="grid items-center gap-10 rounded-[2rem] border border-rule p-8 sm:p-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="readout text-amber-ink">Metsästäjälle</p>
            <h2 id="hunt-title" className="display display-s mt-4">
              Koiratutka, VHF tai riistakamera?
            </h2>
            <p className="mt-4 max-w-2xl text-slate">
              Paikannuslaitteet, lisenssit, akut ja vuosihuollot sekä riista- ja valvontakamerat käyttövalmiiksi
              asennettuina.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link to="/tuotteet/metsastys-ja-maasto" className="btn btn-ink">
              Metsästys ja maasto <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Asennus autoon, koneeseen tai veneeseen?"
        text="Kerro ajoneuvo ja asennettavat laitteet, niin sovitaan aika – meillä tai maastossa."
        topic="ajoneuvot"
        cta="Varaa asennusaika"
      />
    </>
  )
}
