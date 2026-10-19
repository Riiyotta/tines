/**
 * UseCaseKaleidoscope (specs/pages-b.md 4.6): full-bleed wrap, 3 centered lines (Reckless 38/43.7 -0.38 >=920, 28 >=640, 24/27.6), gap .66em,
 * edge fades `--page` wide (page-bg -> transparent). Each line repeats its phrase set 3x ("dot + phrase", dot .25em acc10, mx .75em).
 * Motion: while the wrap intersects the viewport a rAF loop advances translateX at 80px/s, lines 1 and 3 left, line 2 right, wrapped
 * modulo one phrase-set width (measured; the live wrap point was not observed). Reduced motion: static.
 */
import { useEffect, useRef } from 'react'

export function Kaleidoscope({ lines }) {
  const root = useRef(null)
  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const inners = [...el.querySelectorAll('[data-kaleido-line]')]
    const offsets = inners.map(() => 0)
    let raf = 0
    let last = 0
    let visible = false
    const frame = (t) => {
      const dt = last ? Math.min(0.1, (t - last) / 1000) : 0
      last = t
      inners.forEach((ln, i) => {
        const period = ln.scrollWidth / 3
        offsets[i] = (offsets[i] + 80 * dt) % (period || 1)
        ln.style.transform = `translateX(${i % 2 === 1 ? '' : '-'}${offsets[i]}px)`
      })
      raf = requestAnimationFrame(frame)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      last = 0
      if (visible) raf = requestAnimationFrame(frame)
    }, { threshold: 0 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [])
  return (
    <div ref={root} className="relative w-full overflow-hidden">
      <div className="relative flex flex-col items-center gap-[10.56px] text-[24px] leading-[1.15] sm:text-[28px] lg:text-[38px] lg:tracking-[-0.38px]">
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-page bg-gradient-to-r from-page-bg to-transparent" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-page bg-gradient-to-l from-page-bg to-transparent" />
        {lines.map((phrases, li) => (
          <div key={li} className="flex w-full justify-center font-serif font-normal">
            <div data-kaleido-line className="inline-grid grid-flow-col will-change-transform">
              {[0, 1, 2].map((rep) =>
                phrases.map((p) => (
                  <span key={`${rep}-${p}`} aria-hidden={rep > 0 || undefined} className="flex items-center whitespace-nowrap">
                    <span aria-hidden="true" className="mx-[.75em] inline-block h-[.25em] w-[.25em] rounded-full bg-purple-10" />
                    {p}
                  </span>
                )),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
