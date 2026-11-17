import { forwardRef } from 'react'
import {
  SOLARWORKS_AMBER,
  SOLARWORKS_ARC_PATH,
  SOLARWORKS_LETTERS_PATH,
  SOLARWORKS_VIEWBOX,
} from '../../data/solarworksLogo'

interface Props {
  className?: string
  title?: string
  color?: string
}

/** The authentic SolarWorks logo, vector-recreated from the original artwork. */
export const SolarWorksLogo = forwardRef<SVGSVGElement, Props>(function SolarWorksLogo(
  { className, title = 'SolarWorks', color = SOLARWORKS_AMBER },
  ref,
) {
  return (
    <svg ref={ref} viewBox={SOLARWORKS_VIEWBOX} className={className} role="img" aria-label={title}>
      <path d={SOLARWORKS_ARC_PATH} fill={color} data-sw="arc" />
      <path d={SOLARWORKS_LETTERS_PATH} fill={color} fillRule="evenodd" data-sw="letters" />
    </svg>
  )
})
