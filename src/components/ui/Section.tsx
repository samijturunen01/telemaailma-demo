import type { ReactNode } from 'react'

interface LabelProps {
  index?: string
  children: ReactNode
  className?: string
  tone?: 'amber' | 'muted'
}

/** "— 02 / Palvelut" style instrument label. */
export function SectionLabel({ index, children, className = '', tone = 'muted' }: LabelProps) {
  return (
    <p className={`readout flex items-center gap-3 ${tone === 'amber' ? 'text-amber' : ''} ${className}`}>
      {index && <span>{index}</span>}
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
      <span>{children}</span>
    </p>
  )
}

/** Small arc ornament used as a section divider. */
export function ArcRule({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 14" className={`h-3.5 w-[120px] ${className}`} aria-hidden="true">
      <path d="M2 13 A 60 26 0 0 1 118 13" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="60" cy="1.6" r="1.6" fill="var(--color-amber)" />
    </svg>
  )
}
