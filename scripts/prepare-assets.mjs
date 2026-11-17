/**
 * Builds optimised, responsive image variants from the authorised originals in
 * source-assets/ into public/images/. Run with `npm run assets`.
 * Every source and its provenance is documented in docs/ASSET_PROVENANCE.md.
 */
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const OUT = 'public/images'
await fs.mkdir(OUT, { recursive: true })

const jobs = [
  {
    src: 'source-assets/nosturi-kattokuva-original.jpg',
    name: 'nosturi-katto',
    widths: [640, 960, 1440, 2048, 2800],
    formats: ['avif', 'webp', 'jpg'],
  },
  {
    src: 'source-assets/piirilevy-taustakuva-original.jpg',
    name: 'piirilevy',
    widths: [640, 1024, 1600, 1920],
    formats: ['avif', 'webp', 'jpg'],
  },
  {
    src: 'source-assets/iv-kayra-mittausraportti-original.jpg',
    name: 'iv-kayra',
    widths: [730],
    formats: ['webp', 'png'],
  },
]

const manifest = {}
for (const job of jobs) {
  const meta = await sharp(job.src).metadata()
  manifest[job.name] = { width: meta.width, height: meta.height, widths: [] }
  for (const w of job.widths) {
    if (w > meta.width) continue
    manifest[job.name].widths.push(w)
    for (const f of job.formats) {
      const file = path.join(OUT, `${job.name}-${w}.${f}`)
      let p = sharp(job.src).rotate().resize({ width: w, withoutEnlargement: true })
      if (f === 'avif') p = p.avif({ quality: 58, effort: 5 })
      if (f === 'webp') p = p.webp({ quality: job.name === 'iv-kayra' ? 92 : 80 })
      if (f === 'jpg') p = p.jpeg({ quality: 80, mozjpeg: true, progressive: true })
      if (f === 'png') p = p.png({ compressionLevel: 9, palette: true, quality: 95 })
      await p.toFile(file)
    }
  }
  console.log(`${job.name}: ${manifest[job.name].widths.join(', ')}`)
}

// Open Graph image: crop of the authentic rooftop installation photo.
await sharp('source-assets/nosturi-kattokuva-original.jpg')
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(OUT, 'og-telemaailma.jpg'))

// Favicon set: amber arc (from the SolarWorks logo) over a "tuning" needle.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0c1312"/>
  <path d="M10 40 A22 22 0 0 1 54 40" fill="none" stroke="#fcb415" stroke-width="5" stroke-linecap="round"/>
  <path d="M32 50 L41 25" stroke="#eef0eb" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="32" cy="50" r="4" fill="#eef0eb"/>
</svg>`
await fs.writeFile('public/favicon.svg', favicon)
await sharp(Buffer.from(favicon)).resize(180, 180).png().toFile('public/apple-touch-icon.png')
await sharp(Buffer.from(favicon)).resize(32, 32).png().toFile('public/favicon-32.png')

await fs.writeFile('src/data/imageManifest.json', JSON.stringify(manifest, null, 2) + '\n')
console.log('Assets ready.')
