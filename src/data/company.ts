/**
 * Verified company facts. Sources are listed in docs/CONTENT_SOURCES.md.
 * Anything marked `verify` must be confirmed by the customer before production.
 */
export const company = {
  legalName: 'Joensuun Telemaailma Oy',
  shortName: 'Telemaailma',
  solarUnit: 'SolarWorks',
  businessId: '0576499-0',
  founded: 1977,
  founder: 'Tenho Pykäläinen',
  entrepreneur: 'Samuli Pykäläinen',
  phone: '013 6100 700',
  phoneHref: 'tel:+358136100700',
  emails: [
    { label: 'Huolto', address: 'huolto@telemaailma.com' },
    { label: 'Myynti', address: 'myynti@telemaailma.com' },
    { label: 'Laskutus', address: 'laskutus@telemaailma.com' },
  ],
  address: {
    street: 'Aspitie 4',
    postalCode: '80100',
    city: 'Joensuu',
    district: 'Salpakankaan teollisuusalue',
  },
  // OpenStreetMap / Nominatim geocode for Aspitie 4, Joensuu.
  geo: { lat: 62.6291, lon: 29.7831 },
  hours: {
    label: 'Ma–Pe 9.00–17.00',
    days: [1, 2, 3, 4, 5],
    open: 9,
    close: 17,
  },
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=Joensuun+Telemaailma+Oy%2C+Aspitie+4%2C+80100+Joensuu',
  originalSite: 'https://www.telemaailma.com/',
  yieldCalculatorUrl: 'https://stromrechner.ibc-solar.de/?u=crazqdfv',
} as const

export const addressLine = `${company.address.street}, ${company.address.postalCode} ${company.address.city}`
