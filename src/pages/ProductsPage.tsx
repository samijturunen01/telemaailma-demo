import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Phone, Truck } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { SectionLabel } from '../components/ui/Section'
import { CtaBand } from '../components/ui/CtaBand'
import { Picture } from '../components/ui/Picture'
import { company } from '../data/company'

const phoneGroups = [
  { t: 'Älypuhelimet', brands: ['Samsung', 'Apple*', 'Sony', 'Lenovo / Motorola', 'CAT'] },
  { t: 'Kovaan käyttöön', brands: ['Oukitel', 'Ulefone'], note: 'IP68-puhelimia isoilla akuilla.' },
  { t: 'Näppäinpuhelimet', brands: ['Beafon'] },
]

const accessories = [
  'Näytönsuojalasit',
  'Suojakotelot',
  'Bluetooth-kuulokkeet',
  'Laturit (USB / USB-C, tietokoneet, tabletit)',
  'Lataus- ja datajohdot',
  'Asennustelineet autoihin, veneisiin ja polkupyöriin',
  'Akut ja powerbankit',
  'Akkulaturit (AA / AAA, 18650, Li-Ion)',
  'Otsalamput',
  'Muistikortit',
  'USB-muistitikut ja SSD-asemat',
  'Lompakot ja korttikotelot',
  'Knog-tuotteet (AirTag-varashälytin, pyörän valot)',
]

const brands = [
  'Poly / Plantronics',
  'RAM',
  'Otterbox',
  'Deltaco',
  'Insmat',
  'Enjoy',
  'Kingston',
  'SanDisk',
  'XTAR',
  'Ledlenser',
  'Armytek',
  'Panasonic Eneloop',
  'Energizer',
  'Knog',
  'ISOTunes',
  'Yamaha',
  'Stanley',
  'Ögön',
  'Secrid',
]

const sections = [
  { id: 'puhelimet', label: 'Puhelimet' },
  { id: 'tietokoneet', label: 'Tietokoneet' },
  { id: 'tarvikkeet', label: 'Tarvikkeet' },
  { id: 'erikoistilaukset', label: 'Erikoistilaukset' },
  { id: 'huolto', label: 'Huolto' },
]

export function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Myymälä ja tuotteet"
        title={
          <>
            Laitteet arkeen ja <span className="text-amber">kovaan käyttöön.</span>
          </>
        }
        lead={
          <p>
            Kannettavat tietokoneet, kännykät, tabletit, navigointi- ja paikannuslaitteet, antennit kotiin,
            taloyhtiöihin ja ajoneuvoihin sekä tietoliikennevälineet kuten 4G-modeemit – ja laaja valikoima
            vempeleitä metsästäjille ja luonnossa liikkujille.
          </p>
        }
        crumbs={[{ label: 'Tuotteet' }]}
        aside={
          <div className="on-dark rounded-[1.75rem] border border-line bg-ink-2 p-7 sm:p-9">
            <Truck size={28} className="text-amber" aria-hidden="true" />
            <p className="display display-s mt-6">Seuraavaksi arkipäiväksi.</p>
            <p className="mt-4 text-fog">
              Jos tuotetta ei löydy varastostamme, saamme seuraavalle arkipäivälle lähes minkä tahansa IT-laitteen
              tai kodin elektroniikkalaitteen. Tavarantoimittajinamme ovat Suomen suurimmat tukkurit.
            </p>
          </div>
        }
      />

      <nav
        aria-label="Tuoteryhmät"
        className="sticky z-30 border-b border-rule bg-paper/95 backdrop-blur"
        style={{ top: 'var(--header-h)' }}
      >
        <ul className="wrap flex gap-1 overflow-x-auto py-3 [scrollbar-width:none]">
          {sections.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                className="block rounded-full px-4 py-2 text-sm font-semibold no-underline transition-colors hover:bg-bone"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="puhelimet" className="py-20 sm:py-28" aria-labelledby="phones-title">
        <div className="wrap">
          <SectionLabel index="01">Puhelimet</SectionLabel>
          <h2 id="phones-title" className="display display-m mt-6 max-w-3xl" data-reveal>
            Tutuista merkeistä kestäviin IP68-malleihin.
          </h2>
          <div className="mt-14 grid border-t border-ink lg:grid-cols-3">
            {phoneGroups.map((g, i) => (
              <div
                key={g.t}
                className="border-b border-rule py-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"
                data-reveal
                style={{ ['--d' as string]: `${i * 0.07}s` }}
              >
                <p className="readout-s text-amber-ink">{g.t}</p>
                <ul className="mt-5 space-y-1">
                  {g.brands.map((b) => (
                    <li key={b} className="display display-s">
                      {b}
                    </li>
                  ))}
                </ul>
                {g.note && <p className="mt-4 text-slate">{g.note}</p>}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate">* Apple- ja Microsoft Surface -laitteita myymme vain yrityskäyttäjille.</p>
        </div>
      </section>

      <section id="tietokoneet" className="pb-20 sm:pb-28" aria-labelledby="pc-title">
        <div className="wrap grid gap-10 rounded-[2rem] bg-bone p-8 sm:p-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <SectionLabel index="02">Tietokoneet ja tabletit</SectionLabel>
            <h2 id="pc-title" className="display display-m mt-6" data-reveal>
              Kannettavat ja tabletit.
            </h2>
            <p className="mt-6 text-slate">
              Tietokonemerkkejämme ovat mm. HP, Lenovo, Apple ja Microsoft. Microsoft Surface- ja Apple-tuotteet
              kauttamme vain yritysasiakkaille.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-rule bg-rule lg:col-span-6">
            {['HP', 'Lenovo', 'Apple*', 'Microsoft*'].map((b) => (
              <li key={b} className="display display-s bg-paper px-6 py-8" data-reveal>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="tarvikkeet" className="on-dark bg-ink py-24 text-snow sm:py-32" aria-labelledby="acc-title">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionLabel index="03" tone="amber">
                Tarvikkeet ja muut vempaimet
              </SectionLabel>
              <h2 id="acc-title" className="display display-m mt-6" data-reveal>
                Suosituimmat merkit ja mallit.
              </h2>
              <p className="mt-6 text-fog" data-reveal>
                Tilauksesta toimitamme myös harvinaisempiin ja vanhempiin puhelimiin sopivat suojakotelot ja
                -lasit.
              </p>
            </div>
            <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-7">
              {accessories.map((a, i) => (
                <li
                  key={a}
                  className="flex items-baseline gap-4 border-b border-line py-3.5"
                  data-reveal
                  style={{ ['--d' as string]: `${(i % 6) * 0.04}s` }}
                >
                  <span className="readout-s w-6 shrink-0 text-steel">{String(i + 1).padStart(2, '0')}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-20 border-t border-line pt-10">
            <p className="readout text-steel">Myymiämme tuotemerkkejä mm.</p>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {brands.map((b) => (
                <li key={b} className="display text-[clamp(1.2rem,2.2vw,1.9rem)] text-snow/85">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="erikoistilaukset" className="py-24 sm:py-32" aria-labelledby="order-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel index="04">Erikoistilaukset</SectionLabel>
            <h2 id="order-title" className="display display-m mt-6" data-reveal>
              Laite ulkomailta? Hoidamme maksutkin.
            </h2>
          </div>
          <div className="prose-tm text-slate lg:col-span-5 lg:col-start-8 lg:self-end" data-reveal>
            <p>
              Maksamme maahantuomiemme laitteiden kierrätysmaksut. Voimme siis tarvittaessa tilata tarvitsemasi
              laitteen ulkomailta ja huolehtia sitä koskevista lakisääteisistä kierrätysmaksuista.
            </p>
            <p>Kysy lisää erikoistilauksista myynnistämme.</p>
            <p>
              <a href={`mailto:${company.emails[1].address}`} className="link-arrow text-ink">
                <Mail size={16} aria-hidden="true" /> {company.emails[1].address}
              </a>
            </p>
          </div>
        </div>
      </section>

      <section id="huolto" className="pb-8" aria-labelledby="repair-title">
        <div className="wrap">
          <div className="on-dark relative isolate overflow-hidden rounded-[2rem] bg-ink text-snow">
            <Picture
              name="piirilevy"
              alt="Lähikuva elektroniikan piirilevystä, jossa näkyy kameramoduuli ja suojakuoret."
              sizes="(min-width: 1472px) 1360px, 94vw"
              className="absolute inset-0 -z-10 block h-full w-full"
              imgClassName="h-full w-full object-cover opacity-45"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/20" aria-hidden="true" />
            <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-12 lg:p-16">
              <div className="lg:col-span-7">
                <SectionLabel index="05" tone="amber">
                  Huolto
                </SectionLabel>
                <h2 id="repair-title" className="display display-m mt-6">
                  Elektroniikan huoltoa vuodesta 1977.
                </h2>
                <p className="mt-6 max-w-xl text-fog">
                  Olemme myyneet, asentaneet ja huoltaneet elektroniikkalaitteita yli 40 vuotta. Kysy laitteesi
                  huollosta huoltopalvelustamme.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={`mailto:${company.emails[0].address}`} className="btn btn-amber">
                    <Mail size={17} aria-hidden="true" /> {company.emails[0].address}
                  </a>
                  <a href={company.phoneHref} className="btn btn-line text-snow">
                    <Phone size={17} aria-hidden="true" /> {company.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p className="readout-s mt-4 text-slate">Kuva: Telemaailman nykyiseltä verkkosivustolta</p>
        </div>
      </section>

      <CtaBand
        title="Etsitkö tiettyä laitetta?"
        text="Kerro mitä tarvitset – lähes minkä tahansa IT-laitteen saamme seuraavaksi arkipäiväksi."
        topic="myymala"
        cta="Kysy saatavuutta"
      />

      <section className="wrap pb-20 text-center">
        <Link to="/tuotteet/metsastys-ja-maasto" className="link-arrow">
          Katso myös metsästys- ja maastolaitteet <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </>
  )
}
