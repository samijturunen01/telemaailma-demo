import { channels } from '../../data/channels'
import { Picture } from '../ui/Picture'
import { ContourArt, RouteArt, WavesArt } from '../art/Artworks'

/**
 * The tuner "screen" – a rounded CRT-like frame (a nod to the company's
 * TV-repair beginnings in 1977). Each channel has its own visual; switching
 * crossfades with a brief static flash.
 */
export function ChannelScreen({ active }: { active: number }) {
  const ch = channels[active]
  return (
    <figure className="relative">
      <div className="scanlines relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-ink-2 ring-1 ring-line lg:aspect-[16/10]">
        <div className="absolute inset-0" data-screen-inner>
          {channels.map((c, i) => {
            const on = i === active
            return (
              <div
                key={c.id}
                className="absolute inset-0 transition-[opacity,transform] duration-700"
                style={{
                  opacity: on ? 1 : 0,
                  transform: on ? 'scale(1)' : 'scale(1.035)',
                  transitionTimingFunction: 'cubic-bezier(.19,.8,.12,1)',
                }}
                aria-hidden={!on}
              >
                {c.visual === 'photo-solar' && (
                  <Picture
                    name="nosturi-katto"
                    alt="Aurinkopaneelilavoja nostetaan nosturilla luminen tasakatolle, jolla on jo asennettuja paneeleita."
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    priority
                    imgClassName="h-full w-full object-cover"
                    className="block h-full w-full"
                  />
                )}
                {c.visual === 'photo-board' && (
                  <Picture
                    name="piirilevy"
                    alt=""
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    imgClassName="h-full w-full object-cover saturate-[.8]"
                    className="block h-full w-full"
                  />
                )}
                {c.visual === 'waves' && <WavesArt active={on} className="h-full w-full" />}
                {c.visual === 'route' && <RouteArt active={on} className="h-full w-full" />}
                {c.visual === 'contours' && <ContourArt active={on} className="h-full w-full" />}
              </div>
            )
          })}
          {/* static flash on channel change */}
          <svg key={active} className="tm-static pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            <filter id={`static-${active}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={active * 7 + 3} />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#static-${active})`} />
          </svg>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 text-snow">
          <span className="readout-s rounded-full bg-ink/60 px-2.5 py-1 backdrop-blur-sm">CH {ch.number}</span>
          <span className="readout-s flex items-center gap-2 rounded-full bg-ink/60 px-2.5 py-1 backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
            {ch.label}
          </span>
        </div>
      </div>
      <figcaption className="sr-only">
        {ch.visual === 'photo-solar'
          ? 'Kuva SolarWorksin aiemmalta verkkosivustolta: paneelien nosto katolle.'
          : ch.visual === 'photo-board'
            ? 'Elektroniikkaa lähikuvassa.'
            : 'Abstrakti kuvitus.'}
      </figcaption>
    </figure>
  )
}
