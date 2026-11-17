import { useEffect, useRef, useState } from 'react'
import { origin, polar, servicePlaces } from '../../data/serviceArea'

const SIZE = 440
const C = SIZE / 2
const MAX_KM = 60
const R = 190
const rings = [20, 40, 60]

// Label placement tweaks so nearby names never collide or clip.
const labelSide: Record<string, 'left' | 'right'> = { Kontiolahti: 'left', Ilomantsi: 'left', Lehmo: 'right' }

const plotted = servicePlaces
  .map((p) => {
    const { km, bearing } = polar(p)
    const r = (km / MAX_KM) * R
    const t = (bearing * Math.PI) / 180
    const x = C + r * Math.sin(t)
    const side = labelSide[p.name] ?? (x > C ? 'right' : 'left')
    return { ...p, km, bearing, x, y: C - r * Math.cos(t), side }
  })
  .sort((a, b) => a.km - b.km)

/**
 * Indicative radar map of the antenna service area: true straight-line
 * bearings and distances from the shop (OpenStreetMap coordinates).
 * A single sweep reveals the places when the map scrolls into view.
 */
export function CoverageRadar() {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  const [hover, setHover] = useState<string | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="relative mx-auto w-full max-w-[34rem] lg:col-span-7">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full" role="img" aria-labelledby="radar-title radar-desc">
          <title id="radar-title">Antenniasennusten palvelualue</title>
          <desc id="radar-desc">
            Suuntaa-antava kartta: Joensuun lähikunnat suunnan ja linnuntie-etäisyyden mukaan Telemaailman
            myymälästä.
          </desc>
          <defs>
            <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fcb415" stopOpacity="0" />
              <stop offset="1" stopColor="#fcb415" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          {rings.map((km) => (
            <g key={km}>
              <circle cx={C} cy={C} r={(km / MAX_KM) * R} fill="none" stroke="#eef0eb" strokeOpacity="0.16" />
              <text x={C + 4} y={C - (km / MAX_KM) * R - 5} className="fill-steel font-mono text-[10px]">
                {km} km
              </text>
            </g>
          ))}
          {Array.from({ length: 12 }, (_, i) => {
            const t = (i * 30 * Math.PI) / 180
            return (
              <line
                key={i}
                x1={(C + 18 * Math.sin(t)).toFixed(1)}
                y1={(C - 18 * Math.cos(t)).toFixed(1)}
                x2={(C + (R + 10) * Math.sin(t)).toFixed(1)}
                y2={(C - (R + 10) * Math.cos(t)).toFixed(1)}
                stroke="#eef0eb"
                strokeOpacity={i % 3 === 0 ? 0.18 : 0.07}
              />
            )
          })}
          {['P', 'I', 'E', 'L'].map((d, i) => {
            const t = (i * 90 * Math.PI) / 180
            return (
              <text
                key={d}
                x={(C + (R + 24) * Math.sin(t)).toFixed(1)}
                y={(C - (R + 24) * Math.cos(t) + 4).toFixed(1)}
                textAnchor="middle"
                className="fill-steel font-mono text-[11px]"
              >
                {d}
              </text>
            )
          })}

          {/* one-time sweep */}
          <g className={on ? 'radar-sweep is-on' : 'radar-sweep'} style={{ transformOrigin: `${C}px ${C}px` }}>
            <path d={`M${C} ${C} L${C} ${C - R} A${R} ${R} 0 0 1 ${(C + R * Math.sin(0.6)).toFixed(1)} ${(C - R * Math.cos(0.6)).toFixed(1)} Z`} fill="url(#sweepGrad)" transform={`rotate(-34 ${C} ${C})`} />
          </g>

          {plotted.map((p) => {
            const active = hover === p.name
            return (
              <g
                key={p.name}
                className={on ? 'radar-blip is-on' : 'radar-blip'}
                style={{ animationDelay: `${0.15 + (p.bearing / 360) * 1.8}s` }}
              >
                <circle cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r={active ? 14 : 9} fill="#fcb415" fillOpacity="0.16" style={{ transition: 'r .3s' }} />
                <circle cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="4" fill={active ? '#fff6dd' : '#fcb415'} />
                <text
                  x={(p.x + (p.side === 'right' ? 10 : -10)).toFixed(1)}
                  y={(p.y + (p.name === 'Ilomantsi' ? -12 : 4)).toFixed(1)}
                  textAnchor={p.side === 'right' ? 'start' : 'end'}
                  className={`font-sans text-[12.5px] font-semibold ${active ? 'fill-amber' : 'fill-snow'}`}
                >
                  {p.name}
                </text>
              </g>
            )
          })}
          <circle cx={C} cy={C} r="16" fill="#fcb415" fillOpacity="0.2" />
          <circle cx={C} cy={C} r="6" fill="#fcb415" />
          <text x={C} y={C + 30} textAnchor="middle" className="fill-snow font-mono text-[10px] tracking-[0.14em]">
            TELEMAAILMA
          </text>
        </svg>
      </div>
      <div className="lg:col-span-5">
        <ul className="border-t border-line">
          <li className="flex items-baseline justify-between border-b border-line py-3.5">
            <span className="font-semibold text-amber">{origin.name}</span>
            <span className="readout-s text-steel">Aspitie 4</span>
          </li>
          {plotted.map((p) => (
            <li
              key={p.name}
              className="flex items-baseline justify-between border-b border-line py-3.5"
              onMouseEnter={() => setHover(p.name)}
              onMouseLeave={() => setHover(null)}
            >
              <span className="font-semibold">{p.name}</span>
              <span className="readout-s tabular-nums text-steel">≈ {Math.round(p.km)} km</span>
            </li>
          ))}
          <li className="flex items-baseline justify-between py-3.5">
            <span className="font-semibold">…ja koko Itä-Suomi</span>
          </li>
        </ul>
        <p className="mt-5 text-sm text-steel">
          Etäisyydet linnuntietä myymälästä. Kartta on suuntaa-antava havainnekuva, ei kuuluvuuskartta.
        </p>
      </div>
    </div>
  )
}
