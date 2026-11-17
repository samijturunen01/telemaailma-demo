import { company } from './company'

export interface RouteMeta {
  path: string
  title: string
  description: string
  /** Breadcrumb label */
  label: string
}

const suffix = ' | Joensuun Telemaailma'

export const routes: RouteMeta[] = [
  {
    path: '/',
    label: 'Etusivu',
    title: 'Joensuun Telemaailma – antennit, ajoneuvoasennukset ja aurinkosähkö',
    description:
      'Joensuun Telemaailma Oy on myynyt, asentanut ja huoltanut elektroniikkaa vuodesta 1977. Antenni- ja tietoverkkoasennukset, ajoneuvoasennukset, paikannuslaitteet ja SolarWorks-aurinkosähkö Joensuusta.',
  },
  {
    path: '/aurinkosahko',
    label: 'Aurinkosähkö',
    title: 'Aurinkosähköjärjestelmät avaimet käteen – SolarWorks' + suffix,
    description:
      'SolarWorks suunnittelee, myy ja asentaa aurinkosähköjärjestelmiä Fronius-inverttereillä. Myös komponentit, tarkastukset ja testimittaukset. Aspitie 4, Joensuu.',
  },
  {
    path: '/palvelut',
    label: 'Palvelut',
    title: 'Palvelut – asennukset ja huolto' + suffix,
    description:
      'Antenni- ja tietoverkkoasennukset, ajoneuvo- ja työkoneasennukset, paikannuslaitteiden huolto ja aurinkosähköjärjestelmät Joensuun Telemaailmalta.',
  },
  {
    path: '/palvelut/antenniasennukset',
    label: 'Antenniasennukset',
    title: 'Antenniasennukset Joensuu – TV, satelliitti, 4G ja kuitu' + suffix,
    description:
      'Suunnittelemme, asennamme, huollamme ja korjaamme tv-antennijärjestelmät Joensuun lähialueilla ja koko Itä-Suomessa. Myös satelliitti-, LTE- ja kuituasennukset sekä lähiverkot.',
  },
  {
    path: '/palvelut/ajoneuvoasennukset',
    label: 'Ajoneuvoasennukset',
    title: 'Ajoneuvo- ja työkoneasennukset – VHF, LA ja paikannus' + suffix,
    description:
      'Asennamme paikannuslaitteet, VHF- ja LA-puhelimet ja ajoneuvotietokoneet autoihin, kuorma-autoihin, työkoneisiin, metsäkoneisiin ja veneisiin. Piha sopii myös täysperävaunulliselle ajoneuvolle.',
  },
  {
    path: '/tuotteet',
    label: 'Myymälä',
    title: 'Myymälä – puhelimet, tietokoneet ja tarvikkeet' + suffix,
    description:
      'Älypuhelimet, kestävät IP68-puhelimet, kannettavat, tabletit ja tarvikkeet Joensuun Salpakankaalta. Erikoistilaukset seuraavaksi arkipäiväksi.',
  },
  {
    path: '/tuotteet/metsastys-ja-maasto',
    label: 'Metsästys ja maasto',
    title: 'Koiratutkat, paikannuslaitteet ja riistakamerat' + suffix,
    description:
      'Ultracom-, Tracker- ja Garmin-paikannuslaitteet, Burrel- ja Reolink-kamerat käyttövalmiiksi asennettuina sekä akut, lisenssit ja vuosihuollot Joensuusta.',
  },
  {
    path: '/tietoa-meista',
    label: 'Tietoa meistä',
    title: 'Tietoa meistä – vuodesta 1977' + suffix,
    description:
      'Joensuun Telemaailma Oy on toiminut yhtäjaksoisesti vuodesta 1977. TV-korjaamosta mobiilitekniikkaan, antenneihin ja SolarWorks-aurinkosähköön.',
  },
  {
    path: '/yhteystiedot',
    label: 'Yhteystiedot',
    title: 'Yhteystiedot ja tarjouspyyntö' + suffix,
    description: `Joensuun Telemaailma Oy, Aspitie 4, 80100 Joensuu. Puh. ${company.phone}. Myymälä avoinna ma–pe 9–17. Lähetä tarjouspyyntö tai kysy lisää.`,
  },
  {
    path: '/404',
    label: 'Sivua ei löytynyt',
    title: 'Kanavaa ei löytynyt' + suffix,
    description: 'Hakemaasi sivua ei löytynyt. Palaa etusivulle tai valitse palvelu valikosta.',
  },
]

export function metaFor(path: string): RouteMeta {
  const clean = path.replace(/\/+$/, '') || '/'
  return routes.find((r) => r.path === clean) ?? routes.find((r) => r.path === '/404')!
}
