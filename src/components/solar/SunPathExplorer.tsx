import { useId, useMemo, useState } from 'react'
import { JOENSUU_LAT, MONTHS, MONTH_DAYS, dayLength, elevationAt, formatHours, noonElevation } from '../../lib/sun'

const W = 720
const H = 300
const PAD = 28
const MAX_EL = 60
const x = (hour: number) => PAD + (hour / 24) * (W - PAD * 2)
const y = (el: number) => H - 50 - (el / MAX_EL) * (H - 90)

function pathFor(day: number) {
  const pts: string[] = []
  for (let m = 0; m <= 24 * 60; m += 15) {
    const hour = m / 60
    const el = Math.max(elevationAt(JOENSUU_LAT, day, (hour - 12) * 15), -6)
    pts.push(`${pts.length ? 'L' : 'M'}${x(hour).toFixed(1)} ${y(el).toFixed(1)}`)
  }
  return pts.join(' ')
}

/**
 * Interactive, physically computed sun path over Joensuu (62.6° N).
 * Explains seasonal solar production without inventing yield figures.
 */
export function SunPathExplorer() {
  const [month, setMonth] = useState(5)
  const id = useId()
  const day = MONTH_DAYS[month]
  const noon = noonElevation(JOENSUU_LAT, day)
  const len = dayLength(JOENSUU_LAT, day)
  const current = useMemo(() => pathFor(day), [day])
  const summer = useMemo(() => pathFor(172), [])
  const winter = useMemo(() => pathFor(355), [])

  return (
    <div className="on-dark rounded-[2rem] bg-ink p-5 text-snow sm:p-8 lg:p-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="readout-s text-amber">Aurinko Joensuun yllä · {JOENSUU_LAT.toFixed(1).replace('.', ',')}° N</p>
          <p className="display display-s mt-3" aria-live="polite">
            {MONTHS[month]}
          </p>
        </div>
        <dl className="grid w-full grid-cols-2 gap-x-6 gap-y-1 sm:w-auto sm:text-right">
          <dt className="readout-s text-steel">Korkeus keskipäivällä</dt>
          <dt className="readout-s text-steel">Päivän pituus</dt>
          <dd className="whitespace-nowrap font-mono text-xl tabular-nums sm:text-3xl">{noon.toFixed(1).replace('.', ',')}°</dd>
          <dd className="whitespace-nowrap font-mono text-xl tabular-nums sm:text-3xl">{formatHours(len)}</dd>
        </dl>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="sun-svg mt-8 w-full" role="img" aria-labelledby={`${id}-desc`}>
        <desc id={`${id}-desc`}>
          Auringon korkeus vuorokauden aikana kuukautena {MONTHS[month].toLowerCase()}: keskipäivällä noin{' '}
          {noon.toFixed(0)} astetta, aurinko näkyy noin {formatHours(len)}.
        </desc>
        {[0, 15, 30, 45, 60].map((e) => (
          <g key={e}>
            <line x1={PAD} x2={W - PAD} y1={y(e)} y2={y(e)} stroke="#eef0eb" strokeOpacity={e === 0 ? 0.5 : 0.08} />
            {e > 0 && (
              <text x={PAD} y={y(e) - 5} className="fill-steel font-mono text-[10px]">
                {e}°
              </text>
            )}
          </g>
        ))}
        {[0, 6, 12, 18, 24].map((h) => (
          <text key={h} x={x(h)} y={H - 22} textAnchor="middle" className="fill-steel font-mono text-[10px]">
            {String(h).padStart(2, '0')}:00
          </text>
        ))}
        <path d={summer} fill="none" stroke="#eef0eb" strokeOpacity="0.18" strokeDasharray="3 5" />
        <path d={winter} fill="none" stroke="#eef0eb" strokeOpacity="0.18" strokeDasharray="3 5" />
        <clipPath id={`${id}-sky`}>
          <rect x="0" y="0" width={W} height={y(0)} />
        </clipPath>
        <path d={`${current} L${x(24)} ${y(0)} L${x(0)} ${y(0)} Z`} fill="#fcb415" fillOpacity="0.1" clipPath={`url(#${id}-sky)`} />
        <path
          d={current}
          fill="none"
          stroke="#fcb415"
          strokeWidth="2.5"
          clipPath={`url(#${id}-sky)`}
          style={{ transition: 'd .6s cubic-bezier(.19,.8,.12,1)' }}
        />
        <circle cx={x(12)} cy={y(noon)} r="16" fill="#fcb415" fillOpacity="0.18" style={{ transition: 'cy .6s cubic-bezier(.19,.8,.12,1)' }} />
        <circle cx={x(12)} cy={y(noon)} r="6.5" fill="#fff6dd" style={{ transition: 'cy .6s cubic-bezier(.19,.8,.12,1)' }} />
        <text x={x(12) + 16} y={y(noon) - 12} className="fill-snow font-mono text-[11px]" style={{ transition: 'y .6s' }}>
          {noon.toFixed(0)}°
        </text>
        <text x={W - PAD} y={y(0) + 16} textAnchor="end" className="fill-steel font-mono text-[10px]">
          HORISONTTI
        </text>
      </svg>

      <div className="mt-6">
        <label htmlFor={`${id}-month`} className="readout-s text-steel">
          Valitse kuukausi
        </label>
        <input
          id={`${id}-month`}
          type="range"
          min={0}
          max={11}
          step={1}
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          aria-valuetext={MONTHS[month]}
          className="tm-range mt-3 w-full"
        />
        <div className="mt-2 grid grid-cols-12 text-center" aria-hidden="true">
          {MONTHS.map((m, i) => (
            <button
              key={m}
              type="button"
              tabIndex={-1}
              onClick={() => setMonth(i)}
              className={`readout-s py-1 transition-colors ${i === month ? 'text-amber' : 'text-steel hover:text-snow'}`}
            >
              {m.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-6 text-sm text-steel">
        Laskennallinen havainnekuva auringon radasta (aurinkoaika, kuukauden 21. päivä). Katkoviivat: kesä- ja
        joulukuu. Ei tuottoarvio – kohteesi tuoton arvioimme suunnittelun yhteydessä.
      </p>
    </div>
  )
}
