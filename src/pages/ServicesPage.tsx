import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { CtaBand } from '../components/ui/CtaBand'
import { CredentialsSection, ServiceIndex } from '../components/home/HomeSections'

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Palvelut"
        title={
          <>
            Suunnittelemme, asennamme <span className="text-amber">ja huollamme.</span>
          </>
        }
        lead={
          <p>
            Antenni- ja tietoverkkoasennukset, ajoneuvo- ja työkoneasennukset, paikannuslaitteiden huollot sekä
            SolarWorks-aurinkosähköjärjestelmät – suunnittelusta asennukseen ja huoltoon.
          </p>
        }
        crumbs={[{ label: 'Palvelut' }]}
      >
        <Link to="/yhteystiedot" className="btn btn-amber">
          Pyydä tarjous <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </PageHero>
      <ServiceIndex all index="01" label="Kaikki palvelut" title="Valitse kanava." />
      <CredentialsSection />
      <CtaBand
        title="Et löytänyt etsimääsi?"
        text="Kysy rohkeasti – myymme, asennamme ja huollamme elektroniikkaa laajasti."
        cta="Ota yhteyttä"
      />
    </>
  )
}
