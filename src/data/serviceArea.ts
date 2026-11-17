/**
 * Antenna service area named on telemaailma.com/palvelut/antenniasennukset.
 * Coordinates: OpenStreetMap Nominatim (municipality / village centre points).
 * Used only for an indicative, stylised radar map – not a coverage guarantee.
 */
export interface Place {
  name: string
  lat: number
  lon: number
}

export const origin: Place = { name: 'Joensuu', lat: 62.6291, lon: 29.7831 }

export const servicePlaces: Place[] = [
  { name: 'Kontiolahti', lat: 62.7667, lon: 29.85 },
  { name: 'Lehmo', lat: 62.6594, lon: 29.81 },
  { name: 'Eno', lat: 62.7991, lon: 30.1556 },
  { name: 'Ilomantsi', lat: 62.6731, lon: 30.9323 },
  { name: 'Tohmajärvi', lat: 62.2385, lon: 30.4742 },
  { name: 'Rääkkylä', lat: 62.3143, lon: 29.6276 },
  { name: 'Liperi', lat: 62.5315, lon: 29.3872 },
]

const R = 6371
const rad = (d: number) => (d * Math.PI) / 180

/** Distance (km) and compass bearing (deg, 0 = north) from origin. */
export function polar(p: Place, from: Place = origin) {
  const dLat = rad(p.lat - from.lat)
  const dLon = rad(p.lon - from.lon)
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(from.lat)) * Math.cos(rad(p.lat)) * Math.sin(dLon / 2) ** 2
  const km = 2 * R * Math.asin(Math.sqrt(a))
  const y = Math.sin(dLon) * Math.cos(rad(p.lat))
  const x =
    Math.cos(rad(from.lat)) * Math.sin(rad(p.lat)) -
    Math.sin(rad(from.lat)) * Math.cos(rad(p.lat)) * Math.cos(dLon)
  const bearing = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360
  return { km, bearing }
}
