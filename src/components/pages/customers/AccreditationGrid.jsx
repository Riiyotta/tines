/**
 * Accreditation masonry (specs/pages-a.md §4.5): three independent columns of case-study cards, G2 badge tiles, G2 review cards,
 * a Gartner card and a G2 call-to-action. >=768 the columns drift with a scroll-driven translateY (rAF handler, piecewise-linear through
 * the measured samples; off under prefers-reduced-motion). <768 the stacks concatenate into one column without motion.
 */
import { useEffect, useRef } from 'react'
import InlineSvg from '../../InlineSvg.jsx'
import { CaseStudyBookCard } from '../../shared/CaseStudyBookCard.jsx'
import { COLUMNS, REVIEW_TONES, PARALLAX } from './data.jsx'
import quote from '../../../../reference/svg/pages/customers-p3agja-decorations.svg?raw'
import star from '../../../../reference/svg/pages/customers-1uhxvg-stars.svg?raw'
import arrow from '../../../../reference/svg/pages/customers-cardfooter-logo-1.svg?raw'
import ctaIcon from '../../../../reference/svg/pages/customers-l7ky0w-ctablock.svg?raw'

function G2ReviewCard({ r }) {
  const t = REVIEW_TONES[r.tone]
  return (
    <blockquote className={`m-0 flex flex-col rounded-[14px] md:h-[500px] md:rounded-[24px] ${t.bg} ${t.ink}`}>
      <div className="flex-1 p-8 pb-0">
        <div className="flex items-center justify-between">
          <InlineSvg svg={quote} className="h-4 w-[19px]" />
          <span className="flex" aria-label="5 stars">
            {[0, 1, 2, 3, 4].map((i) => <InlineSvg key={i} svg={star} className="h-4 w-[17px]" />)}
          </span>
        </div>
        <h3 className="m-0 mt-8 mb-3 font-serif text-[24px] font-normal leading-[30.6px]">{r.title}</h3>
        <p className="m-0 font-sans text-[16px] font-normal leading-[22.4px]">{r.body}</p>
      </div>
      <footer className="rounded-b-[14px] p-8 md:rounded-b-[24px]">
        <cite className="block font-sans text-[16px] not-italic leading-[19.2px]">
          <strong className="block font-semibold">{r.name}</strong>
          <span className="block font-medium">{r.role}</span>
        </cite>
        <a href="https://www.g2.com/products/tines/reviews" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-between font-sans text-[16px] font-semibold leading-[18.4px] transition-[filter] duration-100 hover:brightness-90">
          <span>Read <span className="max-lg:hidden">full </span>review on G2.com</span>
          <InlineSvg svg={arrow} className="h-[10px] w-[11px]" />
        </a>
      </footer>
    </blockquote>
  )
}

const Badge = ({ b }) => (
  <a href="https://www.g2.com/products/tines/reviews" target="_blank" rel="noopener noreferrer" className={`flex aspect-square items-center justify-center rounded-[14px] p-4 transition-[filter] duration-100 hover:brightness-[1.01] md:rounded-[24px] ${b.tint}`}>
    <img src={b.src} alt={b.alt} className="block h-auto w-[164px] max-w-full" loading="lazy" />
  </a>
)

const Gartner = () => (
  <div className="flex flex-col items-center justify-center gap-4 rounded-[14px] bg-light-200 p-6 md:h-[376px] md:rounded-[24px]">
    <img src="/assets/pages/customers/gartner-cool-vendor-2021.png" alt="Gartner Cool Vendor 2021" className="block h-auto w-full max-w-[296px] rounded-[8px]" loading="lazy" />
    <a href="/gartner-cool-vendor/" className="font-sans text-[14px] font-semibold leading-[16.1px] underline">Learn more</a>
  </div>
)

const CtaBlock = () => (
  <a href="https://www.g2.com/products/tines/reviews" target="_blank" rel="noopener noreferrer" className="flex aspect-square flex-col items-center justify-center gap-4 rounded-[14px] bg-tint-green-book p-8 text-center text-green-5 transition-[filter] duration-100 hover:brightness-[1.05] md:rounded-[24px]">
    <InlineSvg svg={ctaIcon} className="h-[99px] w-24" />
    <span className="font-serif text-[28px] leading-[30px]">Read more raving reviews on G2</span>
    <span className="rounded-pill bg-green-5 px-4 py-2 font-sans text-[13px] font-semibold leading-[14px] text-tint-green-ink-dk">Go to G2.com ↗</span>
  </a>
)

function Item({ it }) {
  switch (it.kind) {
    case 'badge': return <Badge b={it} />
    case 'review': return <G2ReviewCard r={it} />
    case 'gartner': return <Gartner />
    case 'cta': return <CtaBlock />
    default: return <CaseStudyBookCard href={it.href} palette={it.palette} logo={it.logo} logoSrc={it.logoSrc} logoAlt="" quote={it.quote} stat={it.stat} />
  }
}

// <768: one column, columns concatenated A, C, B; only G2 review cards and the G2 call-to-action remain
const MOBILE_ORDER = ['max-md:order-1', 'max-md:order-3', 'max-md:order-2']

const interp = (pts, x) => {
  if (x <= pts[0][0]) return pts[0][1]
  for (let i = 1; i < pts.length; i++) {
    if (x <= pts[i][0]) { const [x0, y0] = pts[i - 1]; const [x1, y1] = pts[i]; return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0) }
  }
  return pts[pts.length - 1][1]
}

export function AccreditationGrid() {
  const root = useRef(null)
  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const cols = [...el.querySelectorAll('[data-col]')]
    let raf = 0
    const run = () => {
      raf = 0
      if (window.innerWidth < 768) { cols.forEach((c) => (c.style.transform = '')); return }
      const top = el.getBoundingClientRect().top + window.scrollY
      cols.forEach((c, i) => { c.style.transform = `translate3d(0, ${interp(PARALLAX[i], window.scrollY - top).toFixed(2)}px, 0)` })
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); if (raf) cancelAnimationFrame(raf) }
  }, [])
  return (
    <div id="accreditation" ref={root} className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
      {COLUMNS.map((col, i) => (
        <div key={i} data-col className="flex flex-col gap-4 will-change-transform max-md:contents md:gap-6">
          {col.map((it, j) => (
            <div key={j} className={`${MOBILE_ORDER[i]} ${it.kind === 'review' || it.kind === 'cta' ? '' : 'max-md:hidden'}`}>
              <Item it={it} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
