/**
 * CustomerLogosMarquee (pages-b section 3.3): bordered box, header (h2 + p), two rows of inline-SVG logos drifting left
 * (row 1 ~25px/s, row 2 ~30px/s; content duplicated, wraps at -50%), driven by requestAnimationFrame while on screen.
 * Reduced motion: static at the measured start offsets (-6.6% / -7.5%).
 * Logos: reference/svg/pages/solutions-security-ai-soc-customer-logo-*.svg (currentColor).
 */
import { useEffect, useRef } from 'react'

const files = import.meta.glob('../../../reference/svg/pages/solutions-security-ai-soc-customer-logo-*.svg', { query: '?raw', import: 'default', eager: true })
const logo = (name) => files[`../../../reference/svg/pages/solutions-security-ai-soc-customer-logo-${name}.svg`]

export const CUSTOMER_ROWS = [
  { speed: 25, start: 6.6, logos: ['beyon-cyber', 'canva', 'coinbase', 'databricks', 'dropbox', 'elastic', '1', '2'] },
  { speed: 30, start: 7.5, logos: ['kayak', 'mars', 'mckesson', 'myfitnesspal', 'reddit', 'snowflake', 'sophos', 'sprinklr'] },
]

function Row({ logos, speed, start }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    let pct = start
    const set = () => { el.style.transform = `translate3d(-${pct}%,0,0)` }
    set()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let raf = 0, last = 0, visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) { last = 0; raf = requestAnimationFrame(tick) } })
    io.observe(el)
    function tick(t) {
      raf = 0
      if (!visible) return
      if (last) {
        const half = el.scrollWidth / 2 // content is duplicated: one period = half the row
        pct = (pct + ((speed * (t - last)) / 1000 / (half * 2)) * 100) % 50
        set()
      }
      last = t
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [speed, start])
  return (
    <div ref={ref} className="inline-flex items-center will-change-transform" data-motion="customer-logos-row">
      {[0, 1].flatMap((copy) =>
        logos.map((n) => (
          <span key={`${copy}-${n}`} aria-hidden={copy ? true : undefined} className="mr-[2em] flex shrink-0 items-center [&>svg]:block" dangerouslySetInnerHTML={{ __html: logo(n) }} />
        )),
      )}
    </div>
  )
}

export function CustomerLogosMarquee({ title, description, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-card border border-[color-mix(in_srgb,currentColor_20%,transparent)] py-sp-xl ${className}`}>
      <header className="px-4 text-center sm:ml-[8.333%] sm:grid sm:max-w-[650px] sm:grid-cols-[auto_1fr] sm:items-center sm:text-left 2xl:grid-cols-[minmax(auto,265px)_minmax(265px,1fr)]">
        <h2 className="m-0 px-[1.25em] font-serif text-[28px] font-normal leading-[32.2px] tracking-[-0.56px] max-sm:pb-4 sm:mr-[1em] sm:border-r sm:border-[color-mix(in_srgb,currentColor_20%,transparent)] sm:px-0 sm:pr-[1em]">{title}</h2>
        <p className="m-0 font-sans text-solution-body-sm font-medium">{description}</p>
      </header>
      <div aria-hidden="true" className="h-sp-xl" />
      <div className="flex flex-col items-start gap-8 xl:gap-10">
        {CUSTOMER_ROWS.map((r) => (
          <Row key={r.logos[0]} {...r} />
        ))}
      </div>
    </div>
  )
}
