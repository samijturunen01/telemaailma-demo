import { Plus } from 'lucide-react'

export interface FaqItem {
  q: string
  a: string
}

/** Native <details> accordion – keyboard and screen-reader friendly without JS. */
export function Faq({ items, tone = 'light' }: { items: FaqItem[]; tone?: 'light' | 'dark' }) {
  const line = tone === 'dark' ? 'border-line' : 'border-rule'
  return (
    <div className={`border-t ${tone === 'dark' ? 'border-line' : 'border-ink'}`}>
      {items.map((it) => (
        <details key={it.q} className={`group border-b ${line}`}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {it.q}
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-transform duration-500 group-open:rotate-45 ${line}`}
              aria-hidden="true"
            >
              <Plus size={18} />
            </span>
          </summary>
          <p className={`max-w-3xl pb-7 ${tone === 'dark' ? 'text-fog' : 'text-slate'}`}>{it.a}</p>
        </details>
      ))}
    </div>
  )
}
