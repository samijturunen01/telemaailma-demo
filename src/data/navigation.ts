export interface NavItem {
  to: string
  label: string
  hint: string
}

export const mainNav: NavItem[] = [
  { to: '/aurinkosahko', label: 'Aurinkosähkö', hint: 'SolarWorks' },
  { to: '/palvelut/antenniasennukset', label: 'Antennit', hint: 'TV · SAT · kuitu' },
  { to: '/palvelut/ajoneuvoasennukset', label: 'Ajoneuvot', hint: 'VHF · paikannus' },
  { to: '/tuotteet/metsastys-ja-maasto', label: 'Maasto', hint: 'Koiratutkat · kamerat' },
  { to: '/tuotteet', label: 'Myymälä', hint: 'Puhelimet · IT' },
  { to: '/tietoa-meista', label: 'Yritys', hint: 'Vuodesta 1977' },
]
