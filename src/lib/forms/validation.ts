import type { InquiryPayload } from './types'

export type FieldErrors = Partial<Record<'name' | 'email' | 'phone' | 'message' | 'contact', string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^\+?[0-9\s-]{6,20}$/

export function validateInquiry(p: InquiryPayload): FieldErrors {
  const e: FieldErrors = {}
  if (p.name.trim().length < 2) e.name = 'Kirjoita nimesi.'
  const email = p.email.trim()
  const phone = p.phone.trim()
  if (!email && !phone) e.contact = 'Anna sähköpostiosoite tai puhelinnumero, jotta voimme vastata.'
  if (email && !EMAIL.test(email)) e.email = 'Tarkista sähköpostiosoite, esim. nimi@esimerkki.fi.'
  if (phone && !PHONE.test(phone)) e.phone = 'Tarkista puhelinnumero, esim. 040 123 4567.'
  if (p.message.trim().length < 10) e.message = 'Kerro lyhyesti, miten voimme auttaa (vähintään 10 merkkiä).'
  if (p.message.length > 3000) e.message = 'Viesti on liian pitkä (enintään 3000 merkkiä).'
  return e
}
