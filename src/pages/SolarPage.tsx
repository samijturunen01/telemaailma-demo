import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { SectionLabel } from '../components/ui/Section'
import { Picture } from '../components/ui/Picture'
import { CtaBand } from '../components/ui/CtaBand'
import { Faq } from '../components/ui/Faq'
import { SolarWorksLogo } from '../components/brand/SolarWorksLogo'
import { SunPathExplorer } from '../components/solar/SunPathExplorer'
import { company } from '../data/company'
import { useScrollFx } from '../hooks/useScrollFx'
import { asset } from '../lib/asset'

const steps = [
  { n: '01', t: 'Alkukartoitus', d: 'Selvitämme kohteen, käyttötarpeen ja mahdolliset varjostukset.' },
  { n: '02', t: 'Laskenta ja tuottoarvio', d: 'Mitoitus ja tuottoarviolaskelmat ennen päätöstä.' },
  { n: '03', t: 'Suunnittelu', d: 'Ratkaisu vinokatolle, tasakatolle tai maa-asennuksena Suomen olosuhteisiin.' },
  { n: '04', t: 'Asennus', d: 'Suomen sääoloihin sopivat paneelit ja itävaltalaiset Fronius-invertterit.' },
  { n: '05', t: 'Käyttöönotto', d: 'Piirustukset, mittaukset ja käyttöönottopöytäkirjat ST 55.36 ja ST 51.21.06.' },
  { n: '06', t: 'Seuranta', d: 'Määräaikaistarkastukset, mittaukset, raportit ja tuotannon seuranta.' },
]

const findings = [
  'Vialliset paneelit',
  'Kaapeli- ja liitosviat',
  'Yhteensopimattomat liittimet',
  'PID- ja LID-ilmiöt',
]

const components = [
  'Aurinkopaneelit',
  'Invertterit',
  'Lataussäätimet mökkikäyttöön',
  'Liittimet ja kaapelit',
  'Asennustarvikkeet',
]

const faq = [
  {
    q: 'Voitteko tarkastaa toisen asentajan tekemän järjestelmän?',
    a: 'Kyllä. Jos haluat varmistaa, että vaaditut mittaukset ja pöytäkirjat on tehty, tai selvittää järjestelmän toiminnan vuosien käytön jälkeen, teemme tarkastukset ja testimittaukset myös muiden toimittamiin järjestelmiin.',
  },
  {
    q: 'Huollatteko Fronius-inverttereitä?',
    a: 'Kyllä. Voit tukeutua meihin sekä takuuasioissa että takuun ulkopuolisissa Fronius-invertterien ja lisävarusteiden asioissa.',
  },
  {
    q: 'Myyttekö myös pelkkiä komponentteja?',
    a: 'Kyllä. Avaimet käteen -toimitusten lisäksi myymme yksittäisiä komponentteja, kuten paneeleita, inverttereitä, lataussäätimiä mökkikäyttöön sekä liittimiä, kaapeleita ja muita tarvikkeita.',
  },
  {
    q: 'Miten saan arvion oman kohteeni tuotosta?',
    a: 'Suuntaa-antavan arvion saat tuottoarviolaskurilla (avautuu yhteistyökumppanimme sivulle; laskuriin jätetyt yhteystiedot välittyvät kumppanin kautta meille). Tarkemmat laskelmat teemme alkukartoituksen yhteydessä.',
  },
]

export function SolarPage() {
  const band = useRef<HTMLElement>(null)
  useScrollFx(band, (gsap) => {
    gsap.fromTo('[data-band-img]', { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '[data-band-img]', scrub: true } })
  })

  return (
    <>
      <PageHero
        eyebrow="SolarWorks · Joensuun Telemaailma Oy"
        title={
          <>
            Aurinkosähkö <span className="text-amber">avaimet käteen.</span>
          </>
        }
        lead={
          <p>
            SolarWorks on Joensuun Telemaailma Oy:n yksikkö, joka suunnittelee, myy ja asentaa
            aurinkosähköjärjestelmiä sekä niihin liittyviä komponentteja. Teemme myös järjestelmien tarkastuksia ja
            testimittauksia.
          </p>
        }
        crumbs={[{ label: 'Aurinkosähkö' }]}
        aside={
          <div className="flex h-full flex-col justify-between gap-10 lg:pl-8">
            <SolarWorksLogo className="sw-reveal h-auto w-full max-w-[26rem]" />
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
              <li className="flex items-center justify-between gap-4 bg-ink-2 px-5 py-4">
                <span className="font-semibold">Fronius System Partner</span>
                <span className="readout-s text-amber">Invertterit</span>
              </li>
              <li className="flex items-center justify-between gap-4 bg-ink-2 px-5 py-4">
                <span className="font-semibold">Motivan sertifioima asentaja</span>
                <span className="readout-s text-amber">Pätevyys</span>
              </li>
            </ul>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/yhteystiedot?aihe=aurinkosahko" className="btn btn-amber">
            Pyydä tarjous <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <a href={company.yieldCalculatorUrl} target="_blank" rel="noopener noreferrer" className="btn btn-line text-snow">
            Tuottoarviolaskuri <ArrowUpRight size={18} aria-hidden="true" />
            <span className="sr-only">(avautuu uuteen ikkunaan)</span>
          </a>
        </div>
      </PageHero>

      {/* Full-bleed authentic project photograph */}
      <section ref={band} className="wrap pt-6 sm:pt-10" aria-label="Kuva asennustyömaalta">
        <figure data-reveal="mask" style={{ ['--r' as string]: '2rem' }}>
          <div className="mask-inner relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-ink sm:aspect-[21/9]">
            <div data-band-img className="absolute inset-0">
              <Picture
                name="nosturi-katto"
                alt="Nosturi laskee aurinkopaneelilavan lumiselle tasakatolle, jossa turvavaljaisiin kiinnittynyt asentaja ohjaa nostoa. Katolla on jo kymmeniä paneelirivejä."
                sizes="(min-width: 1472px) 1360px, 94vw"
                className="block h-full w-full"
                imgClassName="h-full w-full object-cover"
              />
            </div>
          </div>
          <figcaption className="readout-s mt-4 flex flex-wrap justify-between gap-2 text-slate">
            <span>Paneelien nosto katolle talviolosuhteissa</span>
            <span>Kuva: SolarWorks</span>
          </figcaption>
        </figure>
      </section>

      {/* Delivery process along an arc */}
      <section className="py-24 sm:py-32" aria-labelledby="process-title">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionLabel index="01">Toimitus</SectionLabel>
              <h2 id="process-title" className="display display-m mt-6" data-reveal>
                Kartoituksesta käyttöönottoon.
              </h2>
            </div>
            <p className="text-slate lg:col-span-5 lg:col-start-8 lg:self-end" data-reveal>
              Teemme kaiken alkukartoituksesta, laskennasta ja tuottoarvioista asennukseen ja tuotantovalmiiseen
              ratkaisuun saakka. Toimitukseen sisältyvät aina piirustukset, mittaukset ja käyttöönottopöytäkirjat.
            </p>
          </div>

          <div className="relative mt-16">
            <svg viewBox="0 0 1200 90" preserveAspectRatio="none" className="absolute inset-x-0 top-0 hidden h-[90px] w-full lg:block" aria-hidden="true">
              <path d="M10 88 Q600 -60 1190 88" fill="none" stroke="var(--color-amber)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
            <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6 lg:pt-4">
              {steps.map((s, i) => {
                const lift = [64, 22, 2, 2, 22, 64][i]
                return (
                  <li
                    key={s.n}
                    className="relative border-l border-rule pl-5 lg:border-l-0 lg:pl-0"
                    style={{ ['--lift' as string]: `${lift}px`, ['--d' as string]: `${i * 0.08}s` }}
                    data-reveal
                  >
                    <span className="lg:block lg:pt-[var(--lift)]">
                      <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-amber lg:static lg:mb-5 lg:block lg:h-3.5 lg:w-3.5 lg:ring-4 lg:ring-paper" />
                      <span className="readout-s text-amber-ink">{s.n}</span>
                      <span className="mt-2 block text-lg font-semibold">{s.t}</span>
                      <span className="mt-2 block text-[0.96rem] text-slate">{s.d}</span>
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Sun path */}
      <section className="bg-bone py-24 sm:py-32" aria-labelledby="sun-title">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <SectionLabel index="02">Aurinko pohjoisessa</SectionLabel>
            <h2 id="sun-title" className="display display-m mt-6" data-reveal>
              Valoisa kesä tekee työn.
            </h2>
            <div className="prose-tm mt-6 text-slate" data-reveal>
              <p>
                Joensuussa aurinko kiertää kesällä lähes koko vuorokauden, talvella vain matalalla. Siksi
                suuntaus, kallistus ja varjostusten hallinta ratkaisevat, kuinka paljon järjestelmä tuottaa.
              </p>
              <p>
                Osaamme optimoida ja eliminoida varjostavien tekijöiden vaikutuksia ja mitoittaa järjestelmän niin,
                että oman käytön hyöty on mahdollisimman suuri.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8" data-reveal>
            <SunPathExplorer />
          </div>
        </div>
      </section>

      {/* Measurements – authentic report */}
      <section className="py-24 sm:py-32" aria-labelledby="measure-title">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="03">Tarkastukset ja mittaukset</SectionLabel>
            <h2 id="measure-title" className="display display-m mt-6" data-reveal>
              Mittaus kertoo, mitä katolla oikeasti tapahtuu.
            </h2>
            <p className="mt-6 text-slate" data-reveal>
              Mittalaitteillamme selvitetään paneelien todellinen teho suhteutettuna auringon säteilyyn ja paneelin
              lämpötilaan. Näin viat tulevat esiin ja tarvittaviin toimenpiteisiin voidaan ryhtyä.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2" data-reveal>
              {findings.map((f) => (
                <li key={f} className="flex items-center gap-3 rounded-xl border border-rule px-4 py-3">
                  <Check size={16} className="text-amber-ink" aria-hidden="true" />
                  <span className="font-medium">{f}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-slate" data-reveal>
              Tarjoamme myös määräaikaistarkastuksia sekä teemme raportteja, analyyseja ja seurantoja.
            </p>
          </div>
          <figure className="lg:col-span-7" data-reveal>
            <div className="rounded-[1.75rem] bg-bone p-3 sm:p-5">
              <div className="flex items-center justify-between px-2 pb-3">
                <span className="readout-s text-slate">Mittausraportti · IV-käyrä</span>
                <span className="readout-s text-slate">SolarWorks</span>
              </div>
              <picture>
                <source type="image/webp" srcSet={asset('images/iv-kayra-730.webp')} />
                <img
                  src={asset('images/iv-kayra-730.png')}
                  width={730}
                  height={528}
                  loading="lazy"
                  decoding="async"
                  alt="IV-käyrä, jossa mitattu virta ja teho jäävät nimellisarvoista. Raportin mukaan ero odotettuun on noin −24 %, ja käyrän muoto viittaa vanhenemiseen (esim. PID) sekä kasvaneeseen sarjaresistanssiin."
                  className="w-full rounded-xl bg-white"
                />
              </picture>
            </div>
            <figcaption className="mt-4 text-sm text-slate">
              Mittauksissa havaittu viallinen paneeli 12 paneelin järjestelmässä. Ero odotettuun noin −24 %.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Fronius, storage & components */}
      <section className="on-dark bg-ink py-24 text-snow sm:py-32" aria-labelledby="fronius-title">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionLabel index="04" tone="amber">
                Fronius ja älykkäät ratkaisut
              </SectionLabel>
              <h2 id="fronius-title" className="display display-m mt-6" data-reveal>
                Invertterit, varastointi ja seuranta.
              </h2>
            </div>
            <div className="prose-tm text-fog lg:col-span-5 lg:col-start-8" data-reveal>
              <p>
                SolarWorks toimi Suomen ensimmäisenä Fronius Service Partnerina jo tammikuusta 2017. Voit tukeutua
                meihin niin takuuasioissa kuin takuun ulkopuolisissa Fronius-invertterien ja lisävarusteiden asioissa.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line lg:grid-cols-3">
            <article className="bg-ink p-8 sm:p-10" data-reveal>
              <p className="readout-s text-amber">Varastointi</p>
              <h3 className="mt-5 text-2xl font-semibold">Akut ja varavoima</h3>
              <p className="mt-3 text-fog">
                Hybridi-invertteriin voi liittää akuston, jolloin järjestelmä toimii myös varavoimana. Ylijäämäsähkön voi
                varastoida myös lämminvesivaraajaan.
              </p>
            </article>
            <article className="bg-ink p-8 sm:p-10" data-reveal style={{ ['--d' as string]: '0.08s' }}>
              <p className="readout-s text-amber">Seuranta</p>
              <h3 className="mt-5 text-2xl font-semibold">Suomenkielinen näkymä</h3>
              <p className="mt-3 text-fog">
                Toteutamme asiakaskohtaisia tuotannon ja kulutuksen seurantajärjestelmiä, jotka ovat visuaalisia ja
                helppokäyttöisiä.
              </p>
            </article>
            <article className="bg-ink p-8 sm:p-10" data-reveal style={{ ['--d' as string]: '0.16s' }}>
              <p className="readout-s text-amber">Komponentit</p>
              <h3 className="mt-5 text-2xl font-semibold">Myös erikseen</h3>
              <ul className="mt-3 space-y-1.5 text-fog">
                {components.map((c) => (
                  <li key={c} className="flex items-center gap-2.5">
                    <span className="h-1 w-3 rounded-full bg-amber" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <dl className="mt-16 grid gap-10 border-t border-line pt-10 sm:grid-cols-3">
            <div data-reveal>
              <dt className="readout-s text-steel">Asennettua aurinkosähköä</dt>
              <dd className="display display-m mt-3">
                1,5<span className="text-amber">+</span> MWp
              </dd>
              <dd className="mt-2 text-sm text-steel">vuoteen 2021 mennessä</dd>
            </div>
            <div data-reveal style={{ ['--d' as string]: '0.08s' }}>
              <dt className="readout-s text-steel">Aurinkosähköä</dt>
              <dd className="display display-m mt-3">2016–</dd>
              <dd className="mt-2 text-sm text-steel">järjestelmätoimitukset vuodesta 2016</dd>
            </div>
            <div data-reveal style={{ ['--d' as string]: '0.16s' }}>
              <dt className="readout-s text-steel">Käyttöönotto</dt>
              <dd className="display display-m mt-3">ST 55.36</dd>
              <dd className="mt-2 text-sm text-steel">ja ST 51.21.06 -pöytäkirjat jokaiseen toimitukseen</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="py-24 sm:py-32" aria-labelledby="faq-title">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="05">Usein kysyttyä</SectionLabel>
            <h2 id="faq-title" className="display display-m mt-6">
              Hyvä tietää.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Faq items={faq} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Kiinnostaako aurinkosähkö?"
        text="Kerro kohteestasi, niin palaamme asiaan. Teemme myös tarkastuksia ja mittauksia valmiisiin järjestelmiin."
        topic="aurinkosahko"
      />
    </>
  )
}
