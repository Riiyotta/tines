/** Course (learning path) detail (specs/pages-c.md §7.2): hero card with grid paper + overlapping modules card + CTA pill. */
import InlineSvg from '../../InlineSvg.jsx'
import exam from '../../../../reference/svg/pages/university-exam-icon.svg?raw'
import { MODULE_TINT } from './data.js'

const TINTS = ['green', 'purple', 'purple', 'purple', 'purple', 'green', 'orange']

function ModuleTile({ m, i }) {
  const tint = MODULE_TINT[m.exam ? 'orange' : TINTS[i % TINTS.length]]
  return (
    <a href={m.href} className="group block rounded-[8px] p-3 max-lg:px-[22px] max-lg:py-0">
      <div className="grid grid-cols-[64px_1fr] items-center rounded-[8px] sm:grid-cols-[88px_1fr]">
        {m.exam ? (
          <span className={`mr-4 flex h-12 w-12 sm:h-[72px] sm:w-[72px] items-center justify-center overflow-hidden rounded-full border ${tint}`}><InlineSvg svg={exam} className="h-[72px] w-[72px]" /></span>
        ) : (
          <img src={m.icon} alt="" className={`mr-4 h-12 w-12 rounded-full border sm:h-[72px] sm:w-[72px] ${tint}`} />
        )}
        <div className="text-purple-60 transition-colors duration-150 group-hover:text-purple-50 max-lg:flex max-lg:h-[72px] max-lg:flex-col max-lg:justify-center max-lg:border-b max-lg:border-[color-mix(in_srgb,currentColor_15%,transparent)] max-lg:group-last:border-b-0">
          <h2 className="font-sans text-[16px] font-semibold tracking-[-0.16px]">{m.name}</h2>
          {m.duration && <time className="font-sans text-[16px] font-medium leading-[14.72px] tracking-[-0.16px]">{m.duration}</time>}
        </div>
      </div>
    </a>
  )
}

export default function CourseDetail({ course }) {
  const tiles = course.modules.map((m, i) => <ModuleTile key={m.slug} m={m} i={i} />)
  return (
    <section className="relative mx-auto max-w-page px-page">
      <div className="relative rounded-[12px] border border-tint-lilac-edge bg-lightest">
        <div className="pc-grid-paper absolute inset-px rounded-[12px]" />
        <img src={course.scene} alt="" width="378" height="125" className="absolute left-1/2 top-[40px] h-[96px] w-[290px] max-w-none -translate-x-1/2 object-contain sm:top-[-74px] sm:h-[125px] sm:w-[378px]" />
        <div className={`relative px-0 pb-6 pt-[50px] text-center lg:pb-[160px] sm:px-[96px] ${course.text}`}>
          <div className="mt-9 font-mono text-[12px] font-bold uppercase leading-[16.8px] tracking-[0.6px] max-sm:mt-[86px]">Learning path</div>
          <h1 className="mx-auto mt-9 max-w-[496px] px-[10px] font-serif text-[50px] font-normal leading-[45px] tracking-[-1px] sm:text-[68px] sm:leading-[61.2px] sm:tracking-[-1.36px]">{course.name}</h1>
          <div className="mt-5 grid grid-cols-[1fr_auto_1fr] sm:mt-9 items-center gap-4">
            <span className="h-px bg-tint-lilac-edge" />
            <div className="font-sans text-[16px] font-bold leading-[19.2px]">{course.modules.length - 1} modules • {course.hours} hours</div>
            <span className="h-px bg-tint-lilac-edge" />
          </div>
          <p className="mx-auto mt-9 max-w-[850px] px-[18px] font-sans sm:px-[10px] text-[16px] font-medium leading-[22.4px]">{course.blurb}</p>
          <p className="mt-9 font-sans text-[14px] font-medium leading-[19.6px]">
            <a href="https://login.tines.com/" className="font-bold">Sign in to your tenant<sup className="text-[10.5px] leading-none">↗</sup></a> to remember your learning progress.
          </p>
          <div className="relative z-[2] mt-[30px] flex justify-center lg:absolute lg:inset-x-0 lg:bottom-[48.4px] lg:mt-0">
            <a href={course.modules[0]?.href} className={`inline-flex h-[52px] items-center justify-center rounded-[39px] border px-7 font-sans text-[14px] font-semibold leading-[18px] text-purple-70 transition-[filter] duration-100 hover:brightness-[1.04] sm:h-[63.2px] sm:px-9 sm:text-[18px] ${course.cta}`}>
              Start learning <span className="ml-[10px]">→</span>
            </a>
          </div>
          <div className="mx-auto mt-[30px] grid max-w-[640px] grid-cols-1 text-left sm:grid-cols-2 lg:hidden">{tiles}</div>
        </div>
      </div>
      {/* >=1024: overlaps the hero's bottom edge by 80px; out of flow so the page height matches the live hero card */}
      <div className="absolute inset-x-page top-full z-[1] -mt-20 hidden lg:block">
        <div className="mx-auto grid max-w-[1128px] grid-cols-4 gap-6 rounded-[12px] border border-tint-lilac-edge bg-lightest px-8 pb-9 pt-[62px]">{tiles}</div>
      </div>
    </section>
  )
}
