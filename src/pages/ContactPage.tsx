import { ArrowUpRight, Clock, Mail, MapPin, Phone, Truck } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { SectionLabel } from '../components/ui/Section'
import { OpenBadge } from '../components/ui/OpenBadge'
import { InquiryForm } from '../components/forms/InquiryForm'
import { LocationCard } from '../components/home/HomeSections'
import { addressLine, company } from '../data/company'

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Yhteystiedot"
        title={
          <>
            Soita, tule käymään <span className="text-amber">tai kirjoita.</span>
          </>
        }
        lead={<p>Älä epäröi ottaa yhteyttä. Myymälämme on Joensuun Salpakankaalla, ja palvelemme arkisin.</p>}
        crumbs={[{ label: 'Yhteystiedot' }]}
        aside={
          <div className="flex flex-col gap-5 lg:items-end lg:text-right">
            <a href={company.phoneHref} className="display display-m block no-underline hover:text-amber">
              {company.phone}
            </a>
            <OpenBadge className="text-fog" />
          </div>
        }
      />

      <section className="py-16 sm:py-24" aria-labelledby="form-title">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="01">Yhteystiedot</SectionLabel>
            <h2 className="sr-only">Yhteystiedot</h2>
            <ul className="mt-8 border-t border-ink">
              <li className="grid grid-cols-[2rem_1fr] gap-3 border-b border-rule py-5">
                <Phone size={19} className="mt-0.5" aria-hidden="true" />
                <div>
                  <p className="readout-s text-slate">Puhelin</p>
                  <a href={company.phoneHref} className="mt-1 block text-xl font-semibold hover:underline">
                    {company.phone}
                  </a>
                </div>
              </li>
              <li className="grid grid-cols-[2rem_1fr] gap-3 border-b border-rule py-5">
                <Mail size={19} className="mt-0.5" aria-hidden="true" />
                <div>
                  <p className="readout-s text-slate">Sähköposti</p>
                  <dl className="mt-2 space-y-1.5">
                    {company.emails.map((e) => (
                      <div key={e.address} className="flex flex-wrap gap-x-3">
                        <dt className="w-20 text-slate">{e.label}</dt>
                        <dd>
                          <a href={`mailto:${e.address}`} className="break-all font-medium hover:underline">
                            {e.address}
                          </a>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
              <li className="grid grid-cols-[2rem_1fr] gap-3 border-b border-rule py-5">
                <MapPin size={19} className="mt-0.5" aria-hidden="true" />
                <div>
                  <p className="readout-s text-slate">Käyntiosoite</p>
                  <p className="mt-1 text-lg font-semibold">{addressLine}</p>
                  <p className="text-slate">{company.address.district}</p>
                  <a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className="link-arrow mt-2">
                    Avaa kartta <ArrowUpRight size={15} aria-hidden="true" />
                    <span className="sr-only">(avautuu uuteen ikkunaan)</span>
                  </a>
                </div>
              </li>
              <li className="grid grid-cols-[2rem_1fr] gap-3 border-b border-rule py-5">
                <Clock size={19} className="mt-0.5" aria-hidden="true" />
                <div>
                  <p className="readout-s text-slate">Myymälä avoinna</p>
                  <p className="mt-1 text-lg font-semibold">{company.hours.label}</p>
                </div>
              </li>
              <li className="grid grid-cols-[2rem_1fr] gap-3 border-b border-rule py-5">
                <Truck size={19} className="mt-0.5" aria-hidden="true" />
                <div>
                  <p className="readout-s text-slate">Raskas kalusto</p>
                  <p className="mt-1 text-slate">Pihaan pääsee myös täysperävaunullisella ajoneuvolla.</p>
                </div>
              </li>
            </ul>
            <p className="readout-s mt-6 text-slate">
              {company.legalName} · Y-tunnus {company.businessId}
            </p>
            <div className="mt-10 hidden lg:block">
              <LocationCard />
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionLabel index="02">Tarjouspyyntö ja kysymykset</SectionLabel>
            <h2 id="form-title" className="display display-m mb-8 mt-6">
              Kerro, miten voimme auttaa.
            </h2>
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  )
}
