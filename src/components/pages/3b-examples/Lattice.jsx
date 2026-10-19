/**
 * Icon lattice behind the featured example cards (specs/pages-a.md §3.2): 6 strips of 1344x40 icons, offset 84px apart,
 * alternate strips drifting in opposite directions. The strip artwork is defined once as an SVG <symbol> and re-used with <use>
 * (CSS custom properties --flatSpotFill / --flatSpotStroke inherit into the use shadow tree).
 * Drift only runs while the card is at least partly on screen (IntersectionObserver, like the live thresholds 0.4 / 0).
 */
import { useEffect, useRef } from 'react'
import row from '../../../../reference/svg/pages/3b-examples-qnftca-row.svg?raw'

const inner = row.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
export const LATTICE_DEFS = `<symbol id="ex-lattice-row" viewBox="0 0 1344 40">${inner}</symbol>`

export function Lattice() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const io = new IntersectionObserver(([e]) => el.setAttribute('data-run', e.isIntersecting ? '1' : '0'), { threshold: [0, 0.4] })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="lattice pointer-events-none absolute inset-0 overflow-hidden"
      style={{ '--flatSpotFill': 'color-mix(in srgb, var(--lightest) 9%, transparent)', '--flatSpotStroke': 'color-mix(in srgb, var(--lightest) 18%, transparent)' }}
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 1344 40" className="lattice-row absolute left-0 block h-10 w-[1344px] max-w-none" data-dir={i % 2 ? 'r' : 'l'} style={{ top: -62 + 84 * i, '--x0': i % 2 ? '-602px' : '-28px' }}>
          <use href="#ex-lattice-row" />
        </svg>
      ))}
    </span>
  )
}
