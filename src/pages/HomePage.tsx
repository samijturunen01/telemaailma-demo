import { HeroTuner } from '../components/home/HeroTuner'
import {
  CredentialsSection,
  FieldBand,
  OriginSection,
  ServiceIndex,
  SolarFeature,
  VisitSection,
} from '../components/home/HomeSections'

export function HomePage() {
  return (
    <>
      <HeroTuner />
      <OriginSection />
      <SolarFeature />
      <ServiceIndex />
      <FieldBand />
      <CredentialsSection />
      <VisitSection />
    </>
  )
}
