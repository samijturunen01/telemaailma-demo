export type InquiryTopic =
  | 'aurinkosahko'
  | 'antennit'
  | 'ajoneuvot'
  | 'maasto'
  | 'myymala'
  | 'huolto'
  | 'muu'

export interface InquiryPayload {
  topic: InquiryTopic
  name: string
  email: string
  phone: string
  company: string
  location: string
  message: string
  /** Topic-specific details, e.g. roof type for solar or vehicle type. */
  details: Record<string, string>
  /** Honeypot – must stay empty. */
  website: string
}

export type SubmitResult =
  | { status: 'demo' }
  | { status: 'sent' }
  | { status: 'error'; message: string }

export interface InquiryTransport {
  readonly mode: 'demo' | 'apps-script'
  submit(payload: InquiryPayload): Promise<SubmitResult>
}
