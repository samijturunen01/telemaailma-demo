import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AlertCircle, ArrowRight, Info, Loader2, RotateCcw } from 'lucide-react'
import type { InquiryPayload, InquiryTopic } from '../../lib/forms/types'
import { validateInquiry, type FieldErrors } from '../../lib/forms/validation'
import { getTransport } from '../../lib/forms/transport'

const topics: Array<{ id: InquiryTopic; label: string }> = [
  { id: 'aurinkosahko', label: 'Aurinkosähkö' },
  { id: 'antennit', label: 'Antennit / kuitu' },
  { id: 'ajoneuvot', label: 'Ajoneuvoasennus' },
  { id: 'maasto', label: 'Paikannus / kamerat' },
  { id: 'myymala', label: 'Tuotteet / tilaus' },
  { id: 'huolto', label: 'Huolto' },
  { id: 'muu', label: 'Muu asia' },
]

/** Topic-specific optional details, derived from the services the company lists. */
const detailFields: Partial<Record<InquiryTopic, Array<{ key: string; label: string; options: string[] }>>> = {
  aurinkosahko: [
    { key: 'kohde', label: 'Kohde', options: ['Omakotitalo', 'Taloyhtiö', 'Yritys', 'Maatila', 'Mökki', 'Muu'] },
    { key: 'asennus', label: 'Asennuspaikka', options: ['Vinokatto', 'Tasakatto', 'Maa-asennus', 'En tiedä vielä'] },
    {
      key: 'tarve',
      label: 'Tarve',
      options: ['Uusi järjestelmä', 'Tarkastus / mittaus', 'Fronius-huolto', 'Komponentit', 'Akusto / varastointi'],
    },
  ],
  antennit: [
    { key: 'kohde', label: 'Kohde', options: ['Omakotitalo', 'Rivitalo', 'Taloyhtiö', 'Uudiskohde', 'Muu'] },
    {
      key: 'tarve',
      label: 'Tarve',
      options: ['Uusi asennus', 'Vika / kuva puuttuu', 'Antennin suuntaus', 'Satelliitti', 'Kuitu / lähiverkko', '4G / LTE'],
    },
  ],
  ajoneuvot: [
    { key: 'ajoneuvo', label: 'Ajoneuvo', options: ['Auto', 'Kuorma-auto', 'Työkone', 'Metsäkone', 'Vene'] },
    { key: 'paikka', label: 'Asennuspaikka', options: ['Telemaailman tiloissa', 'Asiakkaan luona / maastossa'] },
  ],
  maasto: [
    {
      key: 'aihe',
      label: 'Aihe',
      options: ['Koiratutka / paikannuslaite', 'Riista- tai valvontakamera', 'Akut ja tarvikkeet', 'Vuosihuolto / lisenssi'],
    },
  ],
}

const empty = (topic: InquiryTopic): InquiryPayload => ({
  topic,
  name: '',
  email: '',
  phone: '',
  company: '',
  location: '',
  message: '',
  details: {},
  website: '',
})

type Status = 'idle' | 'submitting' | 'demo' | 'sent' | 'error'

export function InquiryForm() {
  const id = useId()
  const [params] = useSearchParams()
  const [data, setData] = useState<InquiryPayload>(() => empty('muu'))
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const summary = useRef<HTMLDivElement>(null)
  const result = useRef<HTMLDivElement>(null)
  const transport = useRef(getTransport())

  // Preselect the topic from ?aihe= after hydration (keeps prerendered markup stable).
  useEffect(() => {
    const q = params.get('aihe') as InquiryTopic | null
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (q && topics.some((t) => t.id === q)) setData((d) => ({ ...d, topic: q, details: {} }))
  }, [params])

  const set = <K extends keyof InquiryPayload>(k: K, v: InquiryPayload[K]) => {
    setData((d) => ({ ...d, [k]: v }))
    if (errors[k as keyof FieldErrors] || (errors.contact && (k === 'email' || k === 'phone'))) {
      setErrors((e) => ({ ...e, [k]: undefined, ...(k === 'email' || k === 'phone' ? { contact: undefined } : {}) }))
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (data.website) return // honeypot
    const found = validateInquiry(data)
    setErrors(found)
    if (Object.keys(found).length) {
      requestAnimationFrame(() => summary.current?.focus())
      return
    }
    setStatus('submitting')
    const res = await transport.current.submit(data)
    if (res.status === 'error') {
      setErrorMsg(res.message)
      setStatus('error')
      return
    }
    setStatus(res.status)
    requestAnimationFrame(() => result.current?.focus())
  }

  const reset = () => {
    setData(empty(data.topic))
    setErrors({})
    setStatus('idle')
  }

  const errorList = Object.entries(errors).filter(([, v]) => v) as Array<[keyof FieldErrors, string]>
  const fieldTarget: Record<keyof FieldErrors, string> = {
    name: 'name',
    email: 'email',
    phone: 'phone',
    message: 'message',
    contact: 'email',
  }
  const describe = (k: keyof FieldErrors, extra?: string) =>
    [errors[k] ? `${id}-${k}-err` : '', extra ?? ''].filter(Boolean).join(' ') || undefined

  if (status === 'demo' || status === 'sent') {
    return (
      <div
        ref={result}
        tabIndex={-1}
        role="status"
        className="rounded-[1.75rem] border-2 border-ink bg-paper p-8 outline-none sm:p-12"
      >
        <p className="readout text-amber-ink">{status === 'demo' ? 'Demoversio' : 'Kiitos'}</p>
        <h3 className="display display-s mt-4">
          {status === 'demo' ? 'Demoversio – viestiä ei lähetetty.' : 'Viesti lähetetty.'}
        </h3>
        <p className="mt-4 max-w-lg text-slate">
          {status === 'demo'
            ? 'Tämä on konseptisivuston esittelyversio. Lomakkeen tietoja ei lähetetty eikä tallennettu minnekään. Ota yhteyttä puhelimitse 013 6100 700 tai sähköpostitse myynti@telemaailma.com.'
            : 'Palaamme asiaan mahdollisimman pian.'}
        </p>
        <button type="button" onClick={reset} className="btn btn-ink mt-8">
          <RotateCcw size={17} aria-hidden="true" /> Täytä uusi lomake
        </button>
      </div>
    )
  }

  const details = detailFields[data.topic]

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-[1.75rem] bg-bone p-6 sm:p-10" aria-describedby={`${id}-demo`}>
      <p id={`${id}-demo`} className="mb-8 flex items-start gap-3 rounded-xl bg-paper p-4 text-sm text-slate">
        <Info size={18} className="mt-0.5 shrink-0 text-amber-ink" aria-hidden="true" />
        Demoversio: lomake ei lähetä eikä tallenna tietoja. Tähdellä (*) merkityt kentät ovat pakollisia.
      </p>

      {errorList.length > 0 && (
        <div ref={summary} tabIndex={-1} role="alert" className="mb-8 rounded-xl border-2 border-signal-ink bg-paper p-5 outline-none">
          <p className="flex items-center gap-2 font-semibold">
            <AlertCircle size={18} className="text-signal-ink" aria-hidden="true" /> Tarkista seuraavat kohdat:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-sm">
            {errorList.map(([k, msg]) => (
              <li key={k}>
                <a href={`#${id}-${fieldTarget[k]}`} className="underline">
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset>
        <legend className="readout text-slate">Mitä asia koskee? *</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {topics.map((t) => (
            <label key={t.id} className="cursor-pointer">
              <input
                type="radio"
                name="topic"
                value={t.id}
                checked={data.topic === t.id}
                onChange={() => setData((d) => ({ ...d, topic: t.id, details: {} }))}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-11 items-center rounded-full border border-rule bg-paper px-4 text-sm font-semibold transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-amber peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                {t.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {details && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {details.map((f) => (
            <div key={`${data.topic}-${f.key}`}>
              <label htmlFor={`${id}-d-${f.key}`} className="block text-sm font-semibold">
                {f.label} <span className="font-normal text-slate">(valinnainen)</span>
              </label>
              <select
                id={`${id}-d-${f.key}`}
                value={data.details[f.key] ?? ''}
                onChange={(e) => setData((d) => ({ ...d, details: { ...d.details, [f.key]: e.target.value } }))}
                className="tm-input mt-2"
              >
                <option value="">Valitse…</option>
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-name`} label="Nimi" required error={errors.name} errId={`${id}-name-err`}>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            value={data.name}
            onChange={(e) => set('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={describe('name')}
            aria-required="true"
            className="tm-input"
          />
        </Field>
        <Field id={`${id}-company`} label="Yritys tai taloyhtiö" optional>
          <input
            id={`${id}-company`}
            name="company"
            autoComplete="organization"
            value={data.company}
            onChange={(e) => set('company', e.target.value)}
            className="tm-input"
          />
        </Field>
        <Field id={`${id}-email`} label="Sähköposti" hint="Sähköposti tai puhelin *" error={errors.email} errId={`${id}-email-err`}>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={data.email}
            onChange={(e) => set('email', e.target.value)}
            aria-invalid={!!(errors.email || errors.contact)}
            aria-describedby={describe('email', errors.contact ? `${id}-contact-err` : undefined)}
            className="tm-input"
          />
        </Field>
        <Field id={`${id}-phone`} label="Puhelin" hint="Sähköposti tai puhelin *" error={errors.phone} errId={`${id}-phone-err`}>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={(e) => set('phone', e.target.value)}
            aria-invalid={!!(errors.phone || errors.contact)}
            aria-describedby={describe('phone', errors.contact ? `${id}-contact-err` : undefined)}
            className="tm-input"
          />
        </Field>
        {errors.contact && (
          <p id={`${id}-contact-err`} className="flex items-center gap-2 text-sm font-medium text-signal-ink sm:col-span-2">
            <AlertCircle size={15} aria-hidden="true" /> {errors.contact}
          </p>
        )}
        <Field id={`${id}-location`} label="Paikkakunta / kohteen sijainti" optional className="sm:col-span-2">
          <input
            id={`${id}-location`}
            name="location"
            autoComplete="address-level2"
            value={data.location}
            onChange={(e) => set('location', e.target.value)}
            className="tm-input"
          />
        </Field>
        <Field id={`${id}-message`} label="Viesti" required error={errors.message} errId={`${id}-message-err`} className="sm:col-span-2">
          <textarea
            id={`${id}-message`}
            name="message"
            rows={5}
            value={data.message}
            onChange={(e) => set('message', e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={describe('message')}
            aria-required="true"
            className="tm-input resize-y"
            placeholder="Kerro lyhyesti tarpeestasi, esimerkiksi kohde, laite tai toivottu aikataulu."
          />
        </Field>
      </div>

      {/* Honeypot – hidden from people, tempting for bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Jätä tämä kenttä tyhjäksi</label>
        <input
          id={`${id}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={data.website}
          onChange={(e) => set('website', e.target.value)}
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-6 rounded-xl border-2 border-signal-ink bg-paper p-4 text-sm font-medium">
          {errorMsg}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-ink" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Käsitellään…
            </>
          ) : (
            <>
              Lähetä viesti <ArrowRight size={18} aria-hidden="true" />
            </>
          )}
        </button>
        <p className="text-sm text-slate">Kiireellisissä asioissa soita: 013 6100 700.</p>
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  required,
  optional,
  hint,
  error,
  errId,
  className = '',
  children,
}: {
  id: string
  label: string
  required?: boolean
  optional?: boolean
  hint?: string
  error?: string
  errId?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-sm font-semibold">
        <span>
          {label}
          {required && <span aria-hidden="true"> *</span>}
          {optional && <span className="font-normal text-slate"> (valinnainen)</span>}
        </span>
        {hint && <span className="text-xs font-normal text-slate">{hint}</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={errId} className="mt-2 flex items-center gap-2 text-sm font-medium text-signal-ink">
          <AlertCircle size={15} aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  )
}
