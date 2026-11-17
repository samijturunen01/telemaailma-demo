/**
 * Simple solar geometry (Cooper's declination, sunrise equation with standard
 * refraction correction). Accurate to roughly ±0.5° / ±10 min – fine for an
 * explanatory visual, not for engineering calculations.
 */
const rad = (d: number) => (d * Math.PI) / 180
const deg = (r: number) => (r * 180) / Math.PI

export const JOENSUU_LAT = 62.6

/** Day-of-year for the 21st of each month (mid-month representative). */
export const MONTH_DAYS = [21, 52, 80, 111, 141, 172, 202, 233, 264, 294, 325, 355]
export const MONTHS = [
  'Tammikuu',
  'Helmikuu',
  'Maaliskuu',
  'Huhtikuu',
  'Toukokuu',
  'Kesäkuu',
  'Heinäkuu',
  'Elokuu',
  'Syyskuu',
  'Lokakuu',
  'Marraskuu',
  'Joulukuu',
]

export function declination(dayOfYear: number) {
  return 23.44 * Math.sin(rad((360 / 365) * (284 + dayOfYear)))
}

/** Noon elevation in degrees. */
export function noonElevation(lat: number, dayOfYear: number) {
  return 90 - lat + declination(dayOfYear)
}

/** Day length in hours (sun centre at −0.833° accounts for refraction + disc). */
export function dayLength(lat: number, dayOfYear: number) {
  const d = rad(declination(dayOfYear))
  const cosH = (Math.sin(rad(-0.833)) - Math.sin(rad(lat)) * Math.sin(d)) / (Math.cos(rad(lat)) * Math.cos(d))
  if (cosH <= -1) return 24
  if (cosH >= 1) return 0
  return (2 * deg(Math.acos(cosH))) / 15
}

/** Elevation (deg) at a given solar hour angle (deg from noon). */
export function elevationAt(lat: number, dayOfYear: number, hourAngle: number) {
  const d = rad(declination(dayOfYear))
  const s = Math.sin(rad(lat)) * Math.sin(d) + Math.cos(rad(lat)) * Math.cos(d) * Math.cos(rad(hourAngle))
  return deg(Math.asin(s))
}

export function formatHours(h: number) {
  const hh = Math.floor(h)
  const mm = Math.round((h - hh) * 60)
  return mm === 60 ? `${hh + 1} h 00 min` : `${hh} h ${String(mm).padStart(2, '0')} min`
}
