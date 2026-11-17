import { useEffect, useState } from 'react'
import { company } from '../data/company'

export type OpenStatus = { open: boolean; label: string } | null

/**
 * Computes whether the shop is open according to its regular hours in
 * Europe/Helsinki time. Client-only (returns null during prerender) so the
 * static HTML never contains a stale status.
 */
export function useOpenStatus(): OpenStatus {
  const [status, setStatus] = useState<OpenStatus>(null)
  useEffect(() => {
    const compute = () => {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Helsinki',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h23',
      }).formatToParts(new Date())
      const wd = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon'
      const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0)
      const m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0)
      const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(wd)
      const t = h + m / 60
      const isDay = (company.hours.days as readonly number[]).includes(day)
      const open = isDay && t >= company.hours.open && t < company.hours.close
      setStatus({
        open,
        label: open ? 'Myymälä avoinna nyt' : 'Myymälä suljettu nyt',
      })
    }
    compute()
    const id = window.setInterval(compute, 60_000)
    return () => window.clearInterval(id)
  }, [])
  return status
}
