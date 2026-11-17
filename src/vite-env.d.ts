/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORM_MODE?: 'demo' | 'apps-script'
  readonly VITE_APPS_SCRIPT_URL?: string
  readonly VITE_RECAPTCHA_SITE_KEY?: string
  readonly VITE_ALLOW_INDEXING?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
