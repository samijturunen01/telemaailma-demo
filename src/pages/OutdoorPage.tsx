import { Link } from 'react-router-dom'
import { ArrowRight, BatteryCharging, Camera, Info, Phone, Radar } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { SectionLabel } from '../components/ui/Section'
import { CtaBand } from '../components/ui/CtaBand'
import { ContourArt } from '../components/art/Artworks'
import { company } from '../data/company'

const trackers = ['Ultracom', 'Tracker', 'Garmin']
const camUses = ['Mökille', 'Omakotitaloon', 'Työmaalle', 'Maatilalle', 'Metsään', 'Yritykseen', 'Melkein minne tahansa']
const camExtras = ['Akut', 'Muistikortit', 'Telineet', 'Suojakotelot']
const months = ['Tammi', 'Helmi', 'Maalis', 'Huhti', 'Touko', 'Kesä', 'Heinä', 'Elo', 'Syys', 'Loka', 'Marras', 'Joulu']

export function OutdoorPage() {
  return (
    <>
      <PageHero
        eyebrow="Metsästys ja maasto"
        title={
          <>
            Koira pysyy <span className="text-amber">tutkassa.</span>
          </>
        }
        lead={
          <p>
            Koiratutkat ja paikannuslaitteet suosituimmilta valmistajilta, riista- ja valvontakamerat
            käyttövalmiiksi asennettuina sekä akut, lisenssit, päivitykset ja vuosihuollot.
          </p>
        }
        crumbs={[{ to: '/tuotteet', label: 'Tuotteet' }, { label: 'Metsästys ja maasto' }]}
        art={<ContourArt className="absolute inset-y-0 right-0 h-full w-full opacity-70 lg:w-[62%]" seed={11} />}
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/yhteystiedot?aihe=maasto" className="btn btn-amber">
            Kysy laitteista <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <a href={company.phoneHref} className="btn btn-line text-snow">
            <Phone size={17} aria-hidden="true" /> {company.phone}
          </a>
        </div>
      </PageHero>

      {/* Trackers */}
      <section id="paikannuslaitteet" className="py-20 sm:py-28" aria-labelledby="trackers-title">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="01">Koiratutkat ja paikannuslaitteet</SectionLabel>
            <h2 id="trackers-title" className="display display-m mt-6" data-reveal>
              Suosituimmat valmistajat ja palvelut.
            </h2>
            <p className="mt-6 text-slate" data-reveal>
              Myymme suosituimpien paikannuslaitevalmistajien laitteita ja palveluita. Paikannuslaitteille sopivat
              akut ja muut tarvikkeet löydät myös meiltä, samoin uusimmat lisenssit ja päivitykset.
            </p>
            <div className="mt-8 flex items-center gap-3 text-slate" data-reveal>
              <Radar size={20} className="text-amber-ink" aria-hidden="true" />
              <span className="readout-s">Laitteet · palvelut · lisenssit · päivitykset</span>
            </div>
          </div>
          <ul className="self-end border-t border-ink lg:col-span-6 lg:col-start-7">
            {trackers.map((t, i) => (
              <li
                key={t}
                className="flex items-baseline justify-between border-b border-rule py-6"
                data-reveal
                style={{ ['--d' as string]: `${i * 0.07}s` }}
              >
                <span className="display display-m">{t}</span>
                <span className="readout-s text-slate">0{i + 1}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Annual service window */}
      <section className="pb-24 sm:pb-32" aria-labelledby="service-title">
        <div className="wrap">
          <div className="on-dark relative overflow-hidden rounded-[2rem] bg-ink p-8 text-snow sm:p-12 lg:p-16" data-reveal>
            <ContourArt className="pointer-events-none absolute inset-0 h-full w-full opacity-40" seed={5} track={false} />
            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="readout text-amber">Vuosihuolto</p>
                <h2 id="service-title" className="display display-m mt-5">
                  Huollata ennen kautta, vältä syksyn ruuhka.
                </h2>
                <p className="mt-6 max-w-xl text-fog">
                  Muista huollattaa ja tarkistaa paikannuslaitteesi vuosittain ennen metsästyskautta, niin vältät
                  ruuhkilta syksyllä ja koirasi pysyy tutkassa.
                </p>
              </div>
              <div className="lg:col-span-5">
                <ol className="grid grid-cols-12 gap-1" aria-label="Suositeltu huoltoaika ennen syksyä">
                  {months.map((m, i) => {
                    const window = i >= 4 && i <= 7
                    const season = i >= 8 && i <= 11
                    return (
                      <li key={m} className="flex flex-col items-center gap-2">
                        <span
                          className={`h-16 w-full rounded-full sm:h-24 ${
                            window ? 'bg-amber' : season ? 'bg-snow/25' : 'bg-snow/8'
                          }`}
                          aria-hidden="true"
                        />
                        <span className={`readout-s text-[0.55rem] sm:text-[0.62rem] ${window ? 'text-amber' : 'text-steel'}`}>
                          {m.slice(0, 1)}
                        </span>
                        <span className="sr-only">
                          {m}kuu{window ? ': hyvä huoltoaika' : season ? ': syksyn kiireinen aika' : ''}
                        </span>
                      </li>
                    )
                  })}
                </ol>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fog">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber" aria-hidden="true" /> Huolto ajoissa
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-snow/25" aria-hidden="true" /> Syksyn ruuhka
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 18650 expert note */}
      <section className="pb-24 sm:pb-32" aria-labelledby="battery-title">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="02">Asiantuntijan vinkki</SectionLabel>
            <BatteryCharging size={44} strokeWidth={1.4} className="mt-8 text-amber-ink" aria-hidden="true" />
          </div>
          <div className="lg:col-span-8">
            <h2 id="battery-title" className="display display-m" data-reveal>
              Kaikki 18650-akut eivät ole samanlaisia.
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2" data-reveal>
              <div className="rounded-2xl border border-rule p-6">
                <p className="readout-s text-amber-ink">Suojapiiri</p>
                <p className="mt-3 text-slate">Joissakin akuissa on suojapiiri, toisissa ei.</p>
              </div>
              <div className="rounded-2xl border border-rule p-6">
                <p className="readout-s text-amber-ink">Mitat</p>
                <p className="mt-3 text-slate">
                  Vaikka 18650 kuulostaa standardilta, akun ulkomitatkin voivat vaihdella.
                </p>
              </div>
            </div>
            <p className="mt-6 text-slate">
              Myymme mm. <strong className="font-semibold text-ink">XTAR</strong>-,{' '}
              <strong className="font-semibold text-ink">Armytek</strong>- ja{' '}
              <strong className="font-semibold text-ink">Ansman</strong>-merkkisiä 18650-akkuja ja latureita.
            </p>
          </div>
        </div>
      </section>

      {/* Trail & surveillance cameras */}
      <section id="riistakamerat" className="on-dark bg-ink py-24 text-snow sm:py-32" aria-labelledby="cam-title">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionLabel index="03" tone="amber">
                Riista- ja valvontakamerat
              </SectionLabel>
              <h2 id="cam-title" className="display display-m mt-6" data-reveal>
                Kuva puhelimeen, kun kamera havaitsee liikettä.
              </h2>
            </div>
            <div className="prose-tm text-fog lg:col-span-5 lg:col-start-8 lg:self-end" data-reveal>
              <p>
                Myymme ja asennamme käyttövalmiiksi Burrel-merkkiset riistakamerat. Lisäksi myymme Reolink-kameroita,
                joita on saatavana 4G-, WI-FI- ja PoE-verkkoyhteyksillä.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line lg:grid-cols-3">
            <article className="bg-ink p-8 sm:p-10" data-reveal>
              <Camera size={26} className="text-amber" aria-hidden="true" />
              <h3 className="mt-6 text-2xl font-semibold">Burrel</h3>
              <p className="mt-3 text-fog">
                Riistakamerat myydään ja asennetaan käyttövalmiiksi. Teemme asetukset puolestasi, jos et itse halua.
              </p>
            </article>
            <article className="bg-ink p-8 sm:p-10" data-reveal style={{ ['--d' as string]: '0.08s' }}>
              <p className="readout-s text-amber">4G · WI-FI · PoE</p>
              <h3 className="mt-6 text-2xl font-semibold">Reolink</h3>
              <p className="mt-3 text-fog">
                Lähettävän kameran voi asettaa niin, että saat kuvan sähköpostiin tai puhelimeen, kun kamera tunnistaa
                liikettä.
              </p>
            </article>
            <article className="bg-ink p-8 sm:p-10" data-reveal style={{ ['--d' as string]: '0.16s' }}>
              <p className="readout-s text-amber">Tarvikkeet</p>
              <h3 className="mt-6 text-2xl font-semibold">Kaikki tarvittava</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {camExtras.map((c) => (
                  <li key={c} className="rounded-full border border-line px-3 py-1.5 text-sm text-fog">
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-steel">Suojakotelo kannattaa – karhut tykkäävät murjoa riistakameroita.</p>
            </article>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="readout text-steel">Valikoimamme kamerat sopivat</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {camUses.map((u) => (
                  <li
                    key={u}
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      u.startsWith('Melkein') ? 'bg-amber text-ink' : 'border border-line text-snow'
                    }`}
                  >
                    {u}
                  </li>
                ))}
              </ul>
            </div>
            <p className="flex items-start gap-3 rounded-2xl border border-line p-5 text-sm text-fog lg:col-span-5">
              <Info size={18} className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
              Vain mielikuvitus asettaa rajat. Muista kuitenkin noudattaa lakia, kun asetat kameran kuvaamaan.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Tutka, kamera vai akut?"
        text="Kysy laitteista, lisensseistä tai varaa vuosihuolto ennen syksyn ruuhkaa."
        topic="maasto"
        cta="Kysy tai varaa huolto"
      />
    </>
  )
}
