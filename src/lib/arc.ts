/**
 * Crescent arc geometry – the shared graphic language of the site, derived from
 * the arc in the authentic SolarWorks logo: two circular arcs that share their
 * end points, so the shape is thickest at the apex and tapers to points.
 */
export function crescentPath(x1: number, x2: number, baseY: number, apexY: number, thickness: number) {
  const a = (x2 - x1) / 2
  const so = baseY - apexY
  const si = Math.max(so - thickness, 0.001)
  const ro = (a * a + so * so) / (2 * so)
  const ri = (a * a + si * si) / (2 * si)
  const f = (n: number) => n.toFixed(2)
  return `M${f(x1)} ${f(baseY)} A${f(ro)} ${f(ro)} 0 0 1 ${f(x2)} ${f(baseY)} A${f(ri)} ${f(ri)} 0 0 0 ${f(x1)} ${f(baseY)} Z`
}

/** Point on a circle at `deg` measured clockwise from "up". */
export function onCircle(cx: number, cy: number, r: number, deg: number) {
  const t = (deg * Math.PI) / 180
  return { x: cx + r * Math.sin(t), y: cy - r * Math.cos(t) }
}
