import { useMemo } from 'react'
import { closedSpline, mulberry32 } from '../../lib/random'

/*
 * Abstract, clearly non-photographic artworks for the "Kenttä" language.
 * They illustrate themes (signals, routes, terrain) – never real projects.
 */

interface ArtProps {
  className?: string
  /** When true, strokes draw in (CSS transition on stroke-dashoffset). */
  active?: boolean
  tone?: 'dark' | 'light'
}

const stroke = (tone: ArtProps['tone']) => (tone === 'light' ? '#0c1312' : '#eef0eb')

/** Contour lines around a few "hills" + a dotted GPS track. */
export function ContourArt({
  className,
  active = true,
  tone = 'dark',
  seed = 7,
  track: showTrack = true,
}: ArtProps & { seed?: number; track?: boolean }) {
  const { rings, track } = useMemo(() => {
    const rnd = mulberry32(seed)
    const hills = [
      { x: 120, y: 120, s: 1 },
      { x: 300, y: 215, s: 0.82 },
      { x: 330, y: 50, s: 0.55 },
    ]
    const rings: string[] = []
    for (const h of hills) {
      const harmonics = Array.from({ length: 4 }, (_, j) => ({
        a: (0.05 + rnd() * 0.12) / (j + 1),
        f: j + 2,
        p: rnd() * Math.PI * 2,
      }))
      const count = Math.round(9 * h.s)
      for (let k = 1; k <= count; k++) {
        const base = k * 15 * h.s + 6
        const pts: Array<[number, number]> = []
        for (let i = 0; i < 48; i++) {
          const th = (i / 48) * Math.PI * 2
          let m = 1
          for (const hm of harmonics) m += hm.a * Math.sin(hm.f * th + hm.p + k * 0.07)
          pts.push([h.x + Math.cos(th) * base * m * 1.25, h.y + Math.sin(th) * base * m])
        }
        rings.push(closedSpline(pts))
      }
    }
    const track =
      'M20 268 C 70 250, 90 200, 150 196 S 220 240, 250 190 S 230 110, 292 96 S 360 120, 372 70'
    return { rings, track }
  }, [seed])
  const c = stroke(tone)
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g fill="none" stroke={c} strokeWidth="0.8" opacity={tone === 'light' ? 0.32 : 0.28}>
        {rings.map((d, i) => (
          <path key={i} d={d} strokeOpacity={i % 5 === 4 ? 1 : 0.6} strokeWidth={i % 5 === 4 ? 1.2 : 0.8} />
        ))}
      </g>
      {showTrack && (
        <>
          <path
            d={track}
            fill="none"
            stroke="#fcb415"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1 7"
            pathLength={1000}
            style={{
              clipPath: active ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
              transition: 'clip-path 2.4s cubic-bezier(.19,.8,.12,1)',
            }}
          />
          <g transform="translate(372 70)">
            <circle r="16" fill="#fcb415" opacity="0.18" />
            <circle r="5" fill="#fcb415" />
          </g>
          <g transform="translate(20 268)" fill={c}>
            <rect x="-4" y="-4" width="8" height="8" opacity="0.8" />
          </g>
        </>
      )}
    </svg>
  )
}

/** A house with a rooftop antenna receiving waves from a distant mast. */
export function WavesArt({ className, active = true, tone = 'dark' }: ArtProps) {
  const c = stroke(tone)
  const waves = Array.from({ length: 7 }, (_, i) => 40 + i * 34)
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g opacity="0.16" fill={c}>
        {Array.from({ length: 13 * 10 }, (_, i) => (
          <circle key={i} cx={(i % 13) * 32 + 8} cy={Math.floor(i / 13) * 32 + 8} r="0.9" />
        ))}
      </g>
      <line x1="0" y1="252" x2="400" y2="252" stroke={c} strokeOpacity="0.35" />
      {/* distant mast */}
      <g stroke={c} strokeOpacity="0.55" fill="none">
        <path d="M352 252 L362 120 L372 252 M356 200 L368 200 M358 160 L366 160" />
      </g>
      {/* waves from the mast */}
      <g fill="none" stroke="#fcb415" strokeWidth="1.4">
        {waves.map((r, i) => (
          <path
            key={r}
            d={`M ${(362 - r * Math.sin(1.25)).toFixed(1)} ${(120 + r * Math.cos(1.25)).toFixed(1)} A ${r} ${r} 0 0 1 ${(362 - r * Math.sin(0.25)).toFixed(1)} ${(120 - r * Math.cos(0.25)).toFixed(1)}`}
            pathLength={1}
            strokeOpacity={1 - i * 0.12}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: active ? 0 : 1,
              transition: `stroke-dashoffset 1.2s cubic-bezier(.19,.8,.12,1) ${i * 0.09}s`,
            }}
          />
        ))}
      </g>
      {/* house + antenna */}
      <g stroke={c} strokeWidth="1.6" fill="none" strokeLinejoin="round">
        <path d="M52 252 L52 186 L104 146 L156 186 L156 252" />
        <path d="M90 252 L90 214 L118 214 L118 252" strokeOpacity="0.6" />
        <path d="M128 162 L128 96" />
        <path d="M112 104 L144 104 M115 116 L141 116 M118 128 L138 128 M108 96 L148 96" strokeWidth="1.3" />
      </g>
      <circle cx="128" cy="96" r="3.5" fill="#fcb415" />
    </svg>
  )
}

/** A forest-road route with waypoints – vehicle installations & positioning. */
export function RouteArt({ className, active = true, tone = 'dark' }: ArtProps) {
  const c = stroke(tone)
  const road = 'M-10 250 C 60 240, 80 170, 150 168 S 250 210, 280 150 S 300 60, 410 48'
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g stroke={c} strokeOpacity="0.1">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />
        ))}
      </g>
      <path d={road} fill="none" stroke={c} strokeOpacity="0.18" strokeWidth="14" strokeLinecap="round" />
      <path
        d={road}
        fill="none"
        stroke="#fcb415"
        strokeWidth="2"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: active ? 0 : 1,
          transition: 'stroke-dashoffset 2s cubic-bezier(.65,0,.25,1)',
        }}
      />
      {[
        [150, 168],
        [280, 150],
      ].map(([x, y]) => (
        <g key={x} transform={`translate(${x} ${y})`}>
          <circle r="9" fill="none" stroke={c} strokeOpacity="0.5" />
          <circle r="3" fill={c} />
        </g>
      ))}
      <g transform="translate(330 250)" stroke={c} strokeOpacity="0.6" fill="none">
        <circle r="22" />
        <path d="M0 -30 L0 30 M-30 0 L30 0" strokeOpacity="0.3" />
        <path d="M0 -18 L5 0 L0 18 L-5 0 Z" fill={c} fillOpacity="0.5" />
      </g>
    </svg>
  )
}
