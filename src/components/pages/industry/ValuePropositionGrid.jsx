/**
 * ValuePropositionGrid (mssps "Tines transforms the way MSSPs operate"). Implements specs/pages-b.md 4.13.
 * Section max 1400, px page-wide, pt section-pad (0 <920); >=920 backdrop = bordered (green-20) panel inset `--page` with a 120px grid of
 * green-100 lines (SVG pattern; fades in on intersect via lineEnter .5s). Inner pb section-pad (>=768). h2 centered (max 690), 55 gap,
 * 3 cols gap 24 (>=768) / 1 col gap 40. Column: spot icon h 90, h3 Roobert 600 22/25.3, p/li 16/20.8, > * + * mt 24, ul mt .75em pl 1.5em (a box <768).
 */
import { useEffect, useRef, useState } from 'react'
import { SectionHeading } from '../../shared/SectionHeading.jsx'

export function ValuePropositionGrid({ title, columns }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setSeen(true); return undefined }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <section ref={ref} data-in-view={seen} className="relative mx-auto w-full max-w-[1400px] px-page-wide pt-0 lg:pt-section-pad">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-page right-page hidden overflow-hidden rounded-card border border-green-20 lg:block">
        <svg className="grid-canvas-line absolute inset-0 h-full w-full" width="100%" height="100%">
          <defs>
            <pattern id="msspGrid" width="120" height="120" x="59" y="61" patternUnits="userSpaceOnUse">
              <path d="M.5 0V120M0 .5H120" fill="none" className="stroke-green-100" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#msspGrid)" />
        </svg>
      </div>
      <div className="relative md:pb-section-pad">
        <SectionHeading solution max="w-full max-w-[690px] [text-wrap:balance]" mb={false}>{title}</SectionHeading>
        <div className="h-sp-xl" />
        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:gap-6 md:text-left">
          {columns.map((c) => (
            <div key={c.title} className="[&>*+*]:mt-6 [&>:not(img)]:pr-[1em]">
              <img src={c.icon} alt="" className="h-[90px] w-auto max-md:mx-auto" />
              <h3 className="font-sans text-[20px] font-semibold leading-[23px] xl:text-[22px] xl:leading-[25.3px]">{c.title}</h3>
              <p className="font-sans text-[16px] font-medium leading-[20.8px]">{c.intro}</p>
              <ul className="!mt-[.75em] mb-4 list-disc pl-6 text-left font-sans text-[16px] font-medium leading-[20.8px] max-md:rounded-[12px] max-md:border max-md:border-purple-10 max-md:bg-purple-5 max-md:py-3 max-md:pl-8 max-md:pr-4 max-md:pb-4 [&>li+li]:mt-[.33em]">
                {c.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
