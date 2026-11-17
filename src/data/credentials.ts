/**
 * Authorisations and memberships as stated by the company's own websites.
 * `verify` = listed in a source that may be outdated; confirm before production.
 */
export interface Credential {
  code: string
  name: string
  area: 'Antennit ja tietoverkot' | 'Aurinkosähkö'
  verify?: string
}

export const credentials: Credential[] = [
  { code: 'SETI A', name: 'A-antenniurakoitsija', area: 'Antennit ja tietoverkot' },
  { code: 'SETI T', name: 'T-tietoverkkourakoitsija', area: 'Antennit ja tietoverkot' },
  { code: 'SETI AT', name: 'AT-antenni- ja tietoverkkourakoitsija', area: 'Antennit ja tietoverkot' },
  { code: 'SANT', name: 'Satelliitti- ja antenniliitto SANT ry:n jäsen', area: 'Antennit ja tietoverkot' },
  { code: 'DIGITA', name: 'DigitaPRO-asennusliike', area: 'Antennit ja tietoverkot' },
  { code: 'DNA', name: 'VHF PRO DNA -antenniasennusliike', area: 'Antennit ja tietoverkot' },
  {
    code: 'FRONIUS',
    name: 'Fronius System Partner',
    area: 'Aurinkosähkö',
  },
  {
    code: 'MOTIVA',
    name: 'Motivan sertifioima aurinkosähköasentaja',
    area: 'Aurinkosähkö',
    verify: 'Lähteet 2020–2021: Pohjois-Karjalan ensimmäinen sertifikaatti. Voimassaolo vahvistettava.',
  },
]

/** Listed on the antenna page but the brands have since been merged (Allente). */
export const legacyAntennaAuthorisations = ['Canal Digital -asentaja', 'ViaSat-asennusliike']
