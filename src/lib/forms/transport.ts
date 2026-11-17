import type { InquiryPayload, InquiryTransport, SubmitResult } from './types'

/**
 * Demo transport: validates the round-trip UX but never sends, stores or logs
 * personal data. This is the ONLY transport active in the GitHub Pages demo.
 */
export function createDemoTransport(): InquiryTransport {
  return {
    mode: 'demo',
    async submit(): Promise<SubmitResult> {
      await new Promise((r) => setTimeout(r, 700))
      return { status: 'demo' }
    },
  }
}

/**
 * Production transport (prepared, NOT active). Posts to a Google Apps Script
 * web app. The reCAPTCHA token is verified server-side inside Apps Script with
 * the secret key, which must never be shipped in frontend code.
 */
export function createAppsScriptTransport(
  endpoint: string,
  getRecaptchaToken: () => Promise<string>,
): InquiryTransport {
  return {
    mode: 'apps-script',
    async submit(payload: InquiryPayload): Promise<SubmitResult> {
      try {
        const token = await getRecaptchaToken()
        const res = await fetch(endpoint, {
          method: 'POST',
          // text/plain avoids a CORS preflight, which Apps Script cannot answer.
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ ...payload, recaptchaToken: token }),
        })
        if (!res.ok) throw new Error(String(res.status))
        return { status: 'sent' }
      } catch {
        return {
          status: 'error',
          message: 'Viestin lähetys epäonnistui. Soita meille tai lähetä sähköpostia.',
        }
      }
    },
  }
}

/** Resolve the transport from build-time configuration. Defaults to demo. */
export function getTransport(): InquiryTransport {
  const mode = import.meta.env.VITE_FORM_MODE
  const endpoint = import.meta.env.VITE_APPS_SCRIPT_URL
  if (mode === 'apps-script' && endpoint) {
    // reCAPTCHA loader intentionally omitted until production integration.
    return createAppsScriptTransport(endpoint, async () => '')
  }
  return createDemoTransport()
}
