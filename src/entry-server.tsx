import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { App } from './App'

/** Render a route to static HTML for prerendering (see scripts/prerender.mjs). */
export function render(route: string, base: string) {
  const basename = base.replace(/\/$/, '') || '/'
  const location = (basename === '/' ? '' : basename) + route
  return renderToString(
    <StrictMode>
      <StaticRouter location={location} basename={basename}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}

export { routes, metaFor } from './data/seo'
export { company } from './data/company'
