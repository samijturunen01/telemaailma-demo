import { crescentPath } from '../../lib/arc'

interface Props {
  className?: string
  /** Show the "Joensuun" line and founding year. */
  full?: boolean
}

/**
 * Typographic Telemaailma wordmark. The company has no graphic logo (its site
 * header is plain text), so this pairs the name with the crescent from the
 * authentic SolarWorks logo, uniting the two brands under one arc.
 * Proposal – to be approved by the customer.
 */
export function Wordmark({ className = '', full = false }: Props) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`} data-wordmark>
      <svg viewBox="0 0 200 18" preserveAspectRatio="none" className="h-[0.42em] w-full" aria-hidden="true">
        <path d={crescentPath(6, 194, 17, 1.5, 4)} fill="var(--color-amber)" data-wordmark-arc />
      </svg>
      {full && (
        <span className="readout-s mt-[0.35em] text-[0.32em] tracking-[0.42em] text-fog">
          Joensuun<span className="sr-only"> </span>
        </span>
      )}
      <span
        className="font-display font-[820] uppercase tracking-[0.045em]"
        style={{ fontStretch: '128%' }}
        data-wordmark-text
      >
        Telemaailma
      </span>
    </span>
  )
}
