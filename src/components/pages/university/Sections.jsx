/** University index sections (specs/pages-c.md §7.1): hero card + testimonial marquee, divider titles, course cards, resources, programs, "Watch intro" badge. */
import { useEffect, useRef } from 'react'
import { PageSection } from '../../shared/index.js'
import InlineSvg from '../../InlineSvg.jsx'
import arrow from '../../../../reference/svg/pages/university-card-arrow.svg?raw'
import linkArrow from '../../../../reference/svg/pages/university-resource-link-arrow.svg?raw'
import { DOT, DOT_ICONS, testimonials } from './data.js'

export function DividerTitle({ children }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-[22px]">
      <span className="h-px bg-tint-lilac-edge" />
      <h2 className="font-serif text-[22px] font-bold leading-[30.8px] tracking-[-0.22px]">{children}</h2>
      <span className="h-px bg-tint-lilac-edge" />
    </div>
  )
}

function Marquee() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // duration = one copy's width / 54.2 px/s (specs §7.1)
    const w = el.firstElementChild?.getBoundingClientRect().width
    if (w) el.style.setProperty('--uni-marquee-duration', `${w / 54.2}s`)
  }, [])
  const copy = (k) => (
    <div key={k} className="flex h-[53px] shrink-0 border-y border-tint-lilac-edge bg-purple-5" aria-hidden={k ? 'true' : undefined}>
      {testimonials.map((t) => (
        <div key={t.text} className="flex items-center whitespace-nowrap">
          <span className="p-[11px] font-sans text-[22px] font-semibold">{t.emoji}</span>
          <span className="font-sans text-[16px] font-semibold">{t.text}</span>
        </div>
      ))}
    </div>
  )
  return (
    <div className="overflow-hidden rounded-b-[12px]">
      <div ref={ref} className="uni-marquee-track flex w-max">{copy(0)}{copy(1)}</div>
    </div>
  )
}

export function UniversityHero() {
  return (
    <section className="mx-auto max-w-page px-page">
      <div className="pc-grid-paper relative rounded-[12px] border border-tint-lilac-edge">
        <div className="flex justify-center max-sm:mt-[32px] max-sm:h-[88px] sm:h-[46px]">
          <img src="/assets/pages/university/university-hero-icon.svg" alt="" width="168" height="104" className="h-[88px] w-[142px] max-w-none sm:-mt-[58px] sm:h-[104px] sm:w-[168px]" />
        </div>
        <div className="px-4 pb-10 pt-10 text-center 2xl:pb-[60px] 2xl:pt-[60px]">
          <h1 className="mb-8 font-serif text-[clamp(38px,5.265vw,64px)] font-normal leading-[1] tracking-[-0.03em]">Tines Stories University</h1>
          <p className="mx-auto max-w-[700px] px-[10px] font-sans text-[16px] font-medium leading-[22.4px]">
            Build your Tines Stories skills through learning paths designed for every experience level. Earn professional badges you can share on LinkedIn and across your network.
          </p>
        </div>
        <Marquee />
      </div>
    </section>
  )
}

function Dots({ course }) {
  const many = course.modules > 4
  const n = many ? 3 : course.modules
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: n }, (_, i) => (
        <img key={i} src={DOT_ICONS[i % 3]} alt="" className={`h-7 w-7 rounded-full border p-[3px] ${DOT[course.dots[i] || 'purple']}`} />
      ))}
      {many && <span className="flex h-7 w-7 items-center justify-center rounded-full border border-tint-lilac-line bg-purple-10 font-sans text-[14px] font-semibold leading-[19.6px] text-purple-50">+{course.modules - 3}</span>}
    </div>
  )
}

export function CourseCard({ course, featured = false }) {
  return (
    <a href={course.href} className={`block rounded-[12px] bg-lightest transition-[filter] duration-100 hover:brightness-[1.03] ${course.text}`}>
      <div className={`grid rounded-[12px] border ${course.border}`}>
        <div className="flex h-12 items-center justify-center px-6">
          <div className="relative z-[1] flex h-[104px] w-[168px] shrink-0 items-center justify-center">
            <img src={course.icon} alt="" width="168" height="104" className="h-[104px] w-[168px] max-w-none -translate-y-[21.84px]" />
          </div>
        </div>
        <div className={`pc-grid-paper -m-[1.5px] flex flex-col rounded-[12px] border px-6 pb-4 pt-9 ${course.border}`}>
          <h3 className="mb-[14px] text-center font-serif text-[29px] font-normal leading-[34.8px] tracking-[-0.58px]">{course.name}</h3>
          <p className={`mx-auto mb-[14px] max-w-[400px] text-center font-sans text-[16px] font-medium leading-[22.4px] ${featured ? 'sm:mx-auto' : ''}`}>{course.excerpt}</p>
          <div className="mb-[14px] text-center font-mono text-[12px] font-bold uppercase leading-[16.8px] tracking-[0.6px]">
            <span>{course.modules} modules</span> <span aria-hidden="true">•</span> <span>{course.hours} hours</span>
          </div>
          <div className="mb-[14px] mt-8 flex items-end justify-between gap-[10px]">
            <Dots course={course} />
            {featured && (
              <span className={`flex h-[58px] w-[58px] items-center justify-center rounded-full border text-purple-60 ${course.arrow}`}>
                <InlineSvg svg={arrow} className="h-[18px] w-[22px]" />
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  )
}

export function Resources({ items }) {
  return (
    <div>
      {items.map((r) => (
        <a key={r.title} href={r.href} className="group relative grid grid-cols-[86px_1fr] items-center gap-[30px] border-b border-[color-mix(in_srgb,currentColor_15%,transparent)] py-[10px]">
          <img src={r.img} alt="" width="86" height="86" className="h-[86px] w-[86px]" />
          <div>
            <h3 className="font-serif text-[22px] font-bold leading-[30.8px] tracking-[-0.44px]">{r.title}</h3>
            <p className="font-sans text-[16px] font-medium leading-[22.4px]">{r.text}</p>
          </div>
          <InlineSvg svg={linkArrow} className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 transition-transform duration-150 group-hover:translate-x-[2px] group-hover:-translate-y-[calc(50%+2px)]" />
        </a>
      ))}
    </div>
  )
}

const PROGRAM_TONE = {
  green: { strip: 'bg-green-10 border-green-30', body: 'bg-green-5 border-green-30', text: 'text-purple-60' },
  purple: { strip: 'bg-purple-10 border-tint-lilac-edge', body: 'bg-purple-5 border-tint-lilac-edge', text: 'text-tint-green-ink' },
}

export function ProgramCard({ p }) {
  const t = PROGRAM_TONE[p.tone]
  return (
    <a href={p.href} className={`relative block pt-3 ${t.text}`}>
      <div className={`h-[26px] rounded-t-[12px] border ${t.strip}`} />
      <img src={p.img} alt="" className="absolute -top-[34.4px] left-1/2 h-[86px] -translate-x-1/2" />
      <div className={`pc-grid-paper -mt-3 flex flex-col items-center rounded-[12px] border px-6 py-[78px] text-center ${t.body}`}>
        <span className="-mt-[6px] font-mono text-[12px] font-bold uppercase leading-[16.8px] tracking-[0.6px]">{p.eyebrow}</span>
        <h3 className="mt-[18px] font-serif text-[38px] font-normal leading-[38px] tracking-[-0.76px]">{p.title}</h3>
        <p className="mx-[27px] mt-[18px] max-w-[448px] font-sans text-[16px] font-semibold leading-[22.4px]">{p.text}</p>
      </div>
    </a>
  )
}

// "Watch intro" badge: fixed 175px circle bottom-left (live: left 32 / bottom 32); the video itself is third-party, so a placeholder disc.
export function WatchIntro() {
  return (
    <button type="button" aria-label="Watch intro" className="group fixed bottom-4 left-4 z-[150] h-[100px] w-[100px] overflow-hidden rounded-full border-2 border-tint-lilac-edge bg-purple-80 sm:bottom-8 sm:left-8 sm:h-[175px] sm:w-[175px]">
      <span className="absolute inset-0 rounded-full bg-purple-60/70 transition-colors duration-150 group-hover:bg-purple-60/60" />
      <svg viewBox="0 0 158 158" className="uni-watch-ring absolute inset-[4.8%] h-[90.4%] w-[90.4%] text-lightest" aria-hidden="true">
        <defs><path id="uni-ring" d="M79 79m-62 0a62 62 0 1 1 124 0a62 62 0 1 1-124 0" /></defs>
        <text fill="currentColor" className="font-mono text-[13px] font-bold uppercase" letterSpacing="3.1">
          <textPath href="#uni-ring">Watch intro • Watch intro • Watch intro •</textPath>
        </text>
      </svg>
      <svg viewBox="0 0 39 36" className="absolute left-[calc(50%-10%)] top-1/2 h-[20%] w-[22%] -translate-y-1/2 text-lightest" aria-hidden="true"><path d="M5 2.6C5 1.4 6.3.7 7.3 1.3l27 15.4c1 .6 1 2 0 2.6l-27 15.4c-1 .6-2.3-.1-2.3-1.3V2.6Z" fill="currentColor" /></svg>
    </button>
  )
}
