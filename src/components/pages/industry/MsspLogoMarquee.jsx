/**
 * MSSPLogoMarquee (specs/pages-b.md 4.1): heading "TRUSTED BY LEADING MSSPS" (kicker, centered, mb 40) over a masked viewport
 * (--fade 60px, margin-inline -20, cursor grab). Track = flex gap 45 (30 <=1023, 20 <=639), width max-content, two copies of the logo set;
 * CSS animation marqueeDrift translates 0 -> -period linearly (~40px/s: 38.95s for the measured 1558px period). The period is measured
 * from the second copy's offset so it follows the real logo widths; the duration is period / 40.
 * Reduced motion: no animation (motion.css).
 */
import { useLayoutEffect, useRef } from 'react'

export function MsspLogoMarquee({ title = 'Trusted by leading MSSPs', logos }) {
  const track = useRef(null)
  useLayoutEffect(() => {
    const el = track.current
    if (!el) return undefined
    const set = () => {
      const kids = el.children
      const period = kids[logos.length].offsetLeft - kids[0].offsetLeft
      el.style.setProperty('--marqueePeriod', `${period}px`)
      el.style.setProperty('--marqueeDuration', `${Math.round((period / 40) * 1000) / 1000}s`)
    }
    set()
    const ro = new ResizeObserver(set)
    ro.observe(el)
    return () => ro.disconnect()
  }, [logos.length])
  const item = (l, i, hidden) => (
    <span
      key={`${hidden ? 'b' : 'a'}${i}`}
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center max-xl:origin-center max-xl:scale-[.82]"
      dangerouslySetInnerHTML={{ __html: l }}
    />
  )
  return (
    <div>
      <p className="mb-10 text-center font-mono text-kicker-mono font-bold uppercase">{title}</p>
      <div className="mssp-marquee-mask mssp-marquee-viewport -mx-5 cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing" aria-label={title}>
        <div ref={track} className="mssp-marquee-track flex w-max items-center gap-5 sm:gap-[30px] xl:gap-[45px]">
          {logos.map((l, i) => item(l, i, false))}
          {logos.map((l, i) => item(l, i, true))}
        </div>
      </div>
    </div>
  )
}
