import { useOpenStatus } from '../../hooks/useOpenStatus'
import { company } from '../../data/company'

/** Live open/closed indicator based on regular opening hours (client-only). */
export function OpenBadge({ className = '' }: { className?: string }) {
  const status = useOpenStatus()
  return (
    <p className={`readout inline-flex items-center gap-2.5 ${className}`} aria-live="polite">
      <span
        aria-hidden="true"
        className={`inline-block h-2 w-2 rounded-full ${
          status === null ? 'bg-steel' : status.open ? 'live-dot bg-[#58c98b]' : 'bg-signal'
        }`}
      />
      <span>{status ? status.label : 'Myymälä avoinna'}</span>
      <span>· {company.hours.label}</span>
    </p>
  )
}
