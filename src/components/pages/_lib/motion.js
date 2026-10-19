// Page-level motion hooks for the legacy pages (book-a-demo, enterprise, soar, careers). specs/pages-a.md §14.
// Easing for scroll motion is not known from the live site; linear mapping of scroll progress is used.
import { useEffect } from 'react'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Continuous leftward drift for every marquee track inside `ref` (period/40 s = 40px/s). */
export function useMarqueeDrift(ref) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const tracks = [...root.querySelectorAll('[data-motion~="logo-marquee-track"],[data-motion~="legacy-marquee-track"]')]
    const measure = () => {
      tracks.forEach((t) => {
        const half = t.children.length / 2
        const period = t.children[half]?.offsetLeft ?? 0
        if (period > 0) {
          t.style.setProperty('--marqueePeriod', `${period}px`)
          t.style.setProperty('--marqueeDuration', `${period / 40}s`)
          if (!reduced()) t.classList.add('is-animating')
        }
      })
    }
    measure()
    const t = setTimeout(measure, 400)
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', measure)
    }
  }, [ref])
}

/**
 * Scroll parallax: any element in `ref` with data-parallax="<from>,<to>" (px) gets translateY interpolated by how far its
 * parent has travelled through the viewport (0 = entering at the bottom, 1 = leaving at the top). Optional data-parallax-axis="x".
 */
export function useScrollParallax(ref, deps = []) {
  useEffect(() => {
    const root = ref.current
    if (!root || reduced()) return
    const els = [...root.querySelectorAll('[data-parallax]')].map((el) => {
      const [a, b] = el.dataset.parallax.split(',').map(Number)
      return { el, a, b, host: el.parentElement }
    })
    let raf = 0
    const run = () => {
      raf = 0
      const vh = window.innerHeight
      els.forEach(({ el, a, b, host }) => {
        const r = host.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)))
        el.style.transform = `translate3d(0, ${(a + (b - a) * p).toFixed(2)}px, 0)`
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [ref, ...deps])
}
