import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { channels } from '../../data/channels'
import { company } from '../../data/company'
import { crescentPath, onCircle } from '../../lib/arc'
import { getGsap, introRequested, markIntroPlayed, prefersReducedMotion } from '../../lib/motion'
import { ChannelScreen } from './ChannelScreen'
import { OpenBadge } from '../ui/OpenBadge'

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect

interface Geo {
  w: number
  h: number
  cx: number
  cy: number
  r: number
  t: number
  apexY: number
  ex1: number
  ex2: number
  ey: number
  maxA: number
  endA: number
  angles: number[]
  mobile: boolean
}

/** Fit the dial arc so it passes just above the content's top-left corner. */
function computeGeo(w: number, h: number, anchorX: number, anchorY: number): Geo {
  const mobile = w < 768
  const header = mobile ? 64 : 76
  const apexY = header + (mobile ? 20 : Math.min(48, Math.max(24, h * 0.04)))
  const dx = Math.max(w / 2 - anchorX, 60)
  const d = Math.max(anchorY - apexY, 36)
  const r = (dx * dx + d * d) / (2 * d)
  const cx = w / 2
  const cy = apexY + r
  const t = mobile ? 5 : Math.min(13, Math.max(7, w * 0.0075))
  const half = Math.min(w * 0.62, r * 0.985)
  const ey = cy - Math.sqrt(r * r - half * half)
  const span = Math.min(w * (mobile ? 0.3 : 0.28), r * 0.75)
  const maxA = (Math.asin(span / r) * 180) / Math.PI
  const endA = (Math.asin(half / r) * 180) / Math.PI
  const angles = channels.map((_, i) => -maxA + (2 * maxA * i) / (channels.length - 1))
  return { w, h, cx, cy, r, t, apexY, ex1: cx - half, ex2: cx + half, ey, maxA, endA, angles, mobile }
}

const DEFAULT = computeGeo(1440, 900, 56, 300)

export function HeroTuner() {
  const section = useRef<HTMLElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const dot = useRef<SVGGElement>(null)
  const maskPath = useRef<SVGPathElement>(null)
  const labelEls = useRef<Array<SVGTextElement | null>>([])
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const angleRef = useRef(DEFAULT.angles[0])
  const dragging = useRef(false)
  const introRunning = useRef(false)
  const tween = useRef<{ kill: () => void } | null>(null)

  const [geo, setGeo] = useState<Geo>(DEFAULT)
  const [measured, setMeasured] = useState(false)
  const [active, setActiveState] = useState(0)
  const activeRef = useRef(0)
  const setActive = useCallback((n: number) => {
    activeRef.current = n
    setActiveState(n)
  }, [])

  const placeDot = useCallback(
    (deg: number, g: Geo = geo) => {
      angleRef.current = deg
      dot.current?.setAttribute('transform', `rotate(${deg.toFixed(3)} ${g.cx.toFixed(2)} ${g.cy.toFixed(2)})`)
      let nearest = 0
      g.angles.forEach((a, i) => {
        if (Math.abs(a - deg) < Math.abs(g.angles[nearest] - deg)) nearest = i
      })
      labelEls.current.forEach((el, i) => el?.classList.toggle('is-lit', i === nearest))
      return nearest
    },
    [geo],
  )

  // Measure hero + content to fit the arc (runs before paint).
  useIso(() => {
    const el = section.current
    const c = content.current
    if (!el || !c) return
    const measure = () => {
      const sr = el.getBoundingClientRect()
      const cr = c.getBoundingClientRect()
      const g = computeGeo(sr.width, sr.height, cr.left - sr.left + 8, cr.top - sr.top - (sr.width < 768 ? 26 : 44))
      setGeo(g)
      setMeasured(true)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Keep the dot in place after re-layout.
  useIso(() => {
    if (!measured || introRunning.current) return
    placeDot(geo.angles[activeRef.current], geo)
  }, [geo, measured, placeDot])

  // Signature intro (first homepage visit per session).
  useIso(() => {
    if (!measured) return
    if (!introRequested() || prefersReducedMotion()) {
      if (introRequested()) markIntroPlayed()
      return
    }
    window.__tmIntro = true
    introRunning.current = true
    const { gsap } = getGsap()
    const root = section.current!
    const q = gsap.utils.selector(root)
    const head = document.querySelector('[data-intro="wordmark"]')
    const sweep = { a: -(geo.endA * 0.92) }
    const ctx = gsap.context(() => {
      // Make intro elements visible *before* recording from() end-states.
      gsap.set([...root.querySelectorAll('[data-intro]'), head].filter(Boolean), { opacity: 1 })
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          introRunning.current = false
          markIntroPlayed()
          gsap.set(q('[data-h1-line]'), { clearProps: 'fontStretch,transform' })
        },
      })
      if (head) {
        tl.from(head.querySelector('[data-wordmark-text]'), { fontStretch: '55%', letterSpacing: '0.5em', opacity: 0, duration: 1.2, ease: 'expo.out' }, 0)
        tl.from(head.querySelector('[data-wordmark-arc]'), { scaleX: 0, transformOrigin: '50% 100%', duration: 0.9 }, 0.2)
      }
      tl.fromTo(maskPath.current, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut' }, 0.05)
      tl.from(q('[data-tick]'), { opacity: 0, duration: 0.3, stagger: { each: 0.006 } }, 0.4)
      tl.from(q('[data-dial-label]'), { opacity: 0, duration: 0.5, stagger: 0.07 }, 0.7)
      tl.fromTo(dot.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.7)
      tl.to(sweep, { a: geo.maxA + 4, duration: 0.9, ease: 'power1.inOut', onUpdate: () => void placeDot(sweep.a) }, 0.7)
      tl.to(sweep, { a: geo.angles[0], duration: 0.75, ease: 'expo.out', onUpdate: () => void placeDot(sweep.a) }, '>')
      tl.from(q('[data-h1-line]'), { yPercent: 108, fontStretch: '64%', duration: 1.25, ease: 'expo.out', stagger: 0.12 }, 0.2)
      tl.from(q('[data-intro-fade]'), { opacity: 0, y: 18, duration: 0.9, stagger: 0.08 }, 0.55)
      tl.from(q('[data-screen]'), { scaleY: 0.006, scaleX: 0.55, duration: 0.42, ease: 'power4.out', transformOrigin: '50% 50%' }, 1.85)
      tl.from(q('[data-screen-inner]'), { opacity: 0, duration: 0.6 }, 2.15)
      tl.from(q('[data-panel-fade]'), { opacity: 0, y: 12, duration: 0.6, stagger: 0.06 }, 2.0)
    }, root)
    return () => {
      ctx.revert()
      introRunning.current = false
    }
  }, [measured])

  // Animate the dot when the channel changes (not while dragging).
  useEffect(() => {
    if (!measured || dragging.current || introRunning.current) return
    const target = geo.angles[active]
    tween.current?.kill()
    if (prefersReducedMotion()) {
      placeDot(target)
      return
    }
    const { gsap } = getGsap()
    const o = { a: angleRef.current }
    tween.current = gsap.to(o, { a: target, duration: 0.7, ease: 'power3.inOut', onUpdate: () => void placeDot(o.a) })
  }, [active, geo, measured, placeDot])

  const pointerAngle = (e: PointerEvent) => {
    const rect = svg.current!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const deg = (Math.atan2(x - geo.cx, geo.cy - y) * 180) / Math.PI
    return Math.max(-geo.maxA - 5, Math.min(geo.maxA + 5, deg))
  }
  const onDown = (e: PointerEvent<SVGElement>) => {
    if (introRunning.current) return
    dragging.current = true
    tween.current?.kill()
    e.currentTarget.setPointerCapture(e.pointerId)
    const n = placeDot(pointerAngle(e))
    if (n !== activeRef.current) setActive(n)
  }
  const onMove = (e: PointerEvent<SVGElement>) => {
    if (!dragging.current) return
    const n = placeDot(pointerAngle(e))
    if (n !== activeRef.current) setActive(n)
  }
  const onUp = () => {
    if (!dragging.current) return
    dragging.current = false
    const { gsap } = getGsap()
    const o = { a: angleRef.current }
    tween.current = gsap.to(o, {
      a: geo.angles[activeRef.current],
      duration: prefersReducedMotion() ? 0 : 0.45,
      ease: 'back.out(1.6)',
      onUpdate: () => void placeDot(o.a),
    })
  }

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const count = channels.length
    const map: Record<string, number> = {
      ArrowRight: (i + 1) % count,
      ArrowDown: (i + 1) % count,
      ArrowLeft: (i - 1 + count) % count,
      ArrowUp: (i - 1 + count) % count,
      Home: 0,
      End: count - 1,
    }
    const n = map[e.key]
    if (n === undefined) return
    e.preventDefault()
    setActive(n)
    tabRefs.current[n]?.focus()
  }

  const g = geo
  const inner = g.r - g.t
  const ticks: Array<{ a: number; major: boolean; mid: boolean }> = []
  const tickStep = g.mobile ? 2 : 1
  for (let a = Math.ceil(-g.maxA - 9); a <= g.maxA + 9; a += tickStep) {
    ticks.push({ a, major: false, mid: a % 5 === 0 })
  }
  g.angles.forEach((a) => ticks.push({ a, major: true, mid: false }))
  const ch = channels[active]

  return (
    <section
      ref={section}
      className="on-dark relative isolate overflow-hidden bg-ink text-snow"
      aria-labelledby="hero-title"
    >
      {/* Dawn glow behind the dial – light from the "sun" on the arc */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh]"
        style={{
          background:
            'radial-gradient(60% 55% at 50% 0%, rgba(252,180,21,0.10) 0%, rgba(252,180,21,0.03) 45%, transparent 70%)',
        }}
      />

      <svg
        ref={svg}
        className="absolute inset-0 -z-0 h-full w-full transition-opacity duration-500"
        style={{ opacity: measured ? 1 : 0 }}
        viewBox={`0 0 ${g.w.toFixed(0)} ${g.h.toFixed(0)}`}
        preserveAspectRatio="xMidYMin slice"
        aria-hidden="true"
        data-intro="dial"
      >
        <defs>
          <radialGradient id="sunGlow">
            <stop offset="0" stopColor="#fcb415" stopOpacity="0.55" />
            <stop offset="0.35" stopColor="#fcb415" stopOpacity="0.16" />
            <stop offset="1" stopColor="#fcb415" stopOpacity="0" />
          </radialGradient>
          <mask id="arcReveal" maskUnits="userSpaceOnUse">
            <path
              ref={maskPath}
              d={`M ${onCircle(g.cx, g.cy, g.r - g.t / 2, -g.endA).x.toFixed(1)} ${onCircle(g.cx, g.cy, g.r - g.t / 2, -g.endA).y.toFixed(1)} A ${(g.r - g.t / 2).toFixed(1)} ${(g.r - g.t / 2).toFixed(1)} 0 0 1 ${onCircle(g.cx, g.cy, g.r - g.t / 2, g.endA).x.toFixed(1)} ${onCircle(g.cx, g.cy, g.r - g.t / 2, g.endA).y.toFixed(1)}`}
              fill="none"
              stroke="#fff"
              strokeWidth={g.t * 4}
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="0"
            />
          </mask>
        </defs>

        {/* faint concentric "signal" echoes */}
        {[1.06, 1.13].map((k, i) => (
          <circle
            key={k}
            cx={g.cx.toFixed(1)}
            cy={g.cy.toFixed(1)}
            r={(g.r * k).toFixed(1)}
            fill="none"
            stroke="#eef0eb"
            strokeOpacity={0.06 - i * 0.025}
          />
        ))}

        <path d={crescentPath(g.ex1, g.ex2, g.ey, g.apexY, g.t)} fill="#fcb415" mask="url(#arcReveal)" />

        <g stroke="#eef0eb">
          {ticks.map(({ a, major, mid }, i) => {
            const len = major ? (g.mobile ? 10 : 16) : mid ? 9 : 5
            const p1 = onCircle(g.cx, g.cy, inner - 8, a)
            const p2 = onCircle(g.cx, g.cy, inner - 8 - len, a)
            return (
              <line
                key={i}
                data-tick
                x1={p1.x.toFixed(1)}
                y1={p1.y.toFixed(1)}
                x2={p2.x.toFixed(1)}
                y2={p2.y.toFixed(1)}
                strokeOpacity={major ? 0.85 : mid ? 0.4 : 0.22}
                strokeWidth={major ? 1.5 : 1}
              />
            )
          })}
        </g>

        {!g.mobile &&
          channels.map((c, i) => {
            const rr = inner - 46
            return (
              <g key={c.id} transform={`rotate(${g.angles[i].toFixed(3)} ${g.cx.toFixed(1)} ${g.cy.toFixed(1)})`}>
                <text
                  ref={(el) => {
                    labelEls.current[i] = el
                  }}
                  data-dial-label
                  x={g.cx.toFixed(1)}
                  y={(g.cy - rr).toFixed(1)}
                  textAnchor="middle"
                  className={`dial-label ${i === active ? 'is-lit' : ''}`}
                  onClick={() => setActive(i)}
                >
                  {c.number} {c.label.toUpperCase()}
                </text>
              </g>
            )
          })}

        {/* hit area for dragging along the arc (mouse/pen) */}
        <path
          d={`M ${onCircle(g.cx, g.cy, g.r, -g.maxA - 6).x.toFixed(1)} ${onCircle(g.cx, g.cy, g.r, -g.maxA - 6).y.toFixed(1)} A ${g.r.toFixed(1)} ${g.r.toFixed(1)} 0 0 1 ${onCircle(g.cx, g.cy, g.r, g.maxA + 6).x.toFixed(1)} ${onCircle(g.cx, g.cy, g.r, g.maxA + 6).y.toFixed(1)}`}
          fill="none"
          stroke="transparent"
          strokeWidth={40}
          style={{ cursor: 'grab', pointerEvents: 'stroke' }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        />

        <g
          ref={dot}
          transform={`rotate(${g.angles[0].toFixed(3)} ${g.cx.toFixed(2)} ${g.cy.toFixed(2)})`}
          style={{ cursor: 'grab', touchAction: 'none' }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <circle cx={g.cx.toFixed(1)} cy={(g.apexY + g.t / 2).toFixed(1)} r={g.mobile ? 30 : 56} fill="url(#sunGlow)" />
          <circle cx={g.cx.toFixed(1)} cy={(g.apexY + g.t / 2).toFixed(1)} r={g.mobile ? 11 : 15} fill="none" stroke="#fcb415" strokeOpacity="0.55" />
          <circle cx={g.cx.toFixed(1)} cy={(g.apexY + g.t / 2).toFixed(1)} r={g.mobile ? 5.5 : 7} fill="#fff6dd" />
          <line
            x1={g.cx.toFixed(1)}
            y1={(g.apexY + g.t + 6).toFixed(1)}
            x2={g.cx.toFixed(1)}
            y2={(g.apexY + g.t + (g.mobile ? 22 : 34)).toFixed(1)}
            stroke="#fcb415"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>

      <div
        ref={content}
        className="wrap pointer-events-none relative grid gap-y-12 pb-10 pt-[13.5rem] sm:pt-[15rem] lg:min-h-[100svh] lg:grid-cols-12 lg:gap-x-10 lg:pb-8 lg:pt-[max(16.5rem,30svh)] [&>*]:pointer-events-auto"
      >
        <div className="flex flex-col lg:col-span-7">
          <p className="readout text-amber" data-intro data-intro-fade>
            Joensuu · Salpakangas · vuodesta {company.founded}
          </p>
          <h1
            id="hero-title"
            className="display mt-6 text-[clamp(3rem,1.4rem+7.4vw,5.6rem)] lg:text-[min(8.1vw,8.1rem)]"
            data-intro
          >
            <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
              <span className="block" data-h1-line>
                Taivaalta
              </span>
            </span>
            <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
              <span className="block text-amber" data-h1-line>
                talteen.
              </span>
            </span>
          </h1>
          <p className="lead mt-8 max-w-[36rem] text-fog" data-intro data-intro-fade>
            TV-kuva, kenttä metsäkoneessa, koiran sijainti maastossa ja sähkö auringosta. Joensuun Telemaailma
            myy, asentaa ja huoltaa laitteet, jotka ottavat signaalin ja säteilyn talteen.
          </p>
          <div className="mt-9 flex flex-wrap gap-3" data-intro data-intro-fade>
            <Link to="/yhteystiedot" className="btn btn-amber">
              Pyydä tarjous <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href={company.phoneHref} className="btn btn-line text-snow">
              <Phone size={17} aria-hidden="true" /> {company.phone}
            </a>
          </div>
          <div className="mt-auto hidden pt-12 lg:block" data-intro data-intro-fade>
            <OpenBadge className="text-fog" />
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-2">
          <div data-intro>
            <div data-screen>
              <ChannelScreen active={active} />
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Viritä palveluun"
            className="-mx-4 mt-5 flex snap-x gap-1.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0"
            data-intro
            data-panel-fade
          >
            {channels.map((c, i) => (
              <button
                key={c.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={i === active}
                aria-controls="tuner-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`group flex min-h-12 min-w-[6.4rem] shrink-0 snap-start flex-col items-start justify-center rounded-xl border px-3 py-2 text-left transition-colors duration-300 sm:min-w-0 ${
                  i === active
                    ? 'border-amber bg-amber/10 text-snow'
                    : 'border-line text-fog hover:border-steel hover:text-snow'
                }`}
              >
                <span className={`readout-s ${i === active ? 'text-amber' : 'text-steel'}`}>{c.number}</span>
                <span className="mt-0.5 truncate text-[0.8rem] font-semibold sm:text-sm">{c.label}</span>
              </button>
            ))}
          </div>

          <div
            id="tuner-panel"
            role="tabpanel"
            aria-labelledby={`tab-${ch.id}`}
            className="mt-6 border-t border-line pt-6"
            data-intro
            data-panel-fade
          >
            <p className="readout-s text-steel">
              Kanava {ch.number}/05 · {ch.readout}
            </p>
            <h2 className="display display-s mt-3">{ch.title}</h2>
            <p className="mt-3 max-w-md text-fog">{ch.text}</p>
            <Link to={ch.to} className="link-arrow mt-5 text-amber">
              Siirry: {ch.label.toLowerCase()} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
