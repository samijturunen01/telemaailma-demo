import manifest from '../../data/imageManifest.json'
import { asset } from '../../lib/asset'

type ImageName = keyof typeof manifest

interface Props {
  name: ImageName
  alt: string
  sizes: string
  className?: string
  imgClassName?: string
  priority?: boolean
  formats?: Array<'avif' | 'webp'>
  fallback?: 'jpg' | 'png'
}

/** Responsive <picture> with AVIF/WebP sources and intrinsic size to avoid CLS. */
export function Picture({
  name,
  alt,
  sizes,
  className,
  imgClassName,
  priority = false,
  formats = ['avif', 'webp'],
  fallback = 'jpg',
}: Props) {
  const m = manifest[name]
  const set = (ext: string) => m.widths.map((w) => `${asset(`images/${name}-${w}.${ext}`)} ${w}w`).join(', ')
  const largest = m.widths[m.widths.length - 1]
  const height = Math.round((m.height / m.width) * largest)
  return (
    <picture className={className}>
      {formats.map((f) => (
        <source key={f} type={`image/${f}`} srcSet={set(f)} sizes={sizes} />
      ))}
      <img
        src={asset(`images/${name}-${m.widths[Math.min(1, m.widths.length - 1)]}.${fallback}`)}
        srcSet={set(fallback)}
        sizes={sizes}
        width={largest}
        height={height}
        alt={alt}
        className={imgClassName}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
      />
    </picture>
  )
}
