/** Lesson template (specs/pages-c.md §7.3): bordered card with a sticky 288px path/module/lesson nav and a 660px prose column. */
import { Prose, Callout } from '../../shared/index.js'
import InlineSvg from '../../InlineSvg.jsx'
import { LESSON_BODY } from './data.js'

const check = `<svg viewBox="0 0 18 18" fill="none"><path d="m5.3 9.3 2.5 2.5 4.9-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const thumb = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11v9H4v-9h3Zm0 0 3.5-7c1.4 0 2.3 1.1 2.1 2.5L12 10h6.3c1.2 0 2 1.1 1.7 2.2l-1.6 6.2c-.2.9-1 1.6-2 1.6H7"/></svg>`
const arrowL = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m6-6-6 6 6 6"/></svg>`
const arrowR = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>`

function Sidebar({ ctx, lessonSlug }) {
  const { course, module: m, index, lessons } = ctx
  return (
    <nav aria-label="Lessons" className="text-[16px]">
      <div className={`pc-grid-paper rounded-[6px] border border-green-20 bg-lightest p-4 ${course.text}`}>
        <div className="font-mono text-[11.5px] font-bold uppercase leading-[14px] tracking-[0.575px]">Learning Path</div>
        <p className="font-serif text-[24px] font-normal leading-[33.6px] tracking-[-0.24px]">{course.name}</p>
        <p className="font-sans text-[14px] font-semibold leading-[19.6px]">Module {index + 1} / {course.modules.length - 1}</p>
        <div className="mt-[3px] h-[60px] overflow-hidden"><img src={course.sidebarScene} alt="" className="h-[104px] w-[378px] max-w-none -translate-x-[62px]" /></div>
      </div>
      <header className="mt-8 px-3">
        <a href={m.href} className="grid grid-cols-[64px_1fr] items-center rounded-[8px]">
          {m.icon && <img src={m.icon} alt="" className="h-12 w-12 rounded-full border border-purple-20 bg-purple-5" />}
          <div className="text-purple-60">
            <span className="block font-mono text-[12px] font-black uppercase leading-[16.8px] tracking-[0.6px]">Module</span>
            <h2 className="font-sans text-[16px] font-semibold tracking-[-0.16px]">{m.name}</h2>
          </div>
        </a>
      </header>
      <div className="py-6">
        {lessons.map((l) => {
          const on = l.slug === lessonSlug
          return (
            <a key={l.slug} href={l.href} className={`flex min-h-[34.5px] items-center justify-between rounded-[7px] px-[12.6px] py-[5.25px] font-sans text-[14px] transition-colors hover:bg-[color-mix(in_srgb,currentColor_8%,transparent)] ${on ? 'font-semibold text-tint-green-book' : 'font-medium text-purple-60'}`}>
              <span className="flex items-center">
                <span className="mr-[11.2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-green-20 bg-green-10 text-green-5"><InlineSvg svg={check} className="h-[18px] w-[18px]" /></span>
                {l.name}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}

function Body() {
  return (
    <Prose lesson className="[&_p]:!mt-4 [&_p]:!max-w-none [&_h2]:!mt-7 [&_ul]:!my-4 [&_ul]:!max-w-none [&_ul]:!pl-10 [&_li+li]:!mt-2 [&_p:first-child]:!mt-0">
      {LESSON_BODY.map((b, i) => {
        if (b.t === 'h2') return <h2 key={i}>{b.c}</h2>
        if (b.t === 'ul') return <ul key={i}>{b.c.map((li, j) => <li key={j} dangerouslySetInnerHTML={{ __html: li }} />)}</ul>
        if (b.t === 'callout') return (
          <aside key={i} className="mt-4 rounded-usp bg-[rgb(141_117_230_/_0.125)] pb-4 pl-5 pr-5 pt-[10.56px]">
            <h4 className="flex items-center gap-[7.2px] font-sans text-[16px] font-semibold leading-[26px] text-accent"><span aria-hidden="true">💡</span>{b.title}</h4>
            <p className="!mt-0" dangerouslySetInnerHTML={{ __html: b.c }} />
          </aside>
        )
        return <p key={i}>{b.c}</p>
      })}
    </Prose>
  )
}

export default function Lesson({ ctx, lessonSlug }) {
  const { course, module: m, lessons } = ctx
  const i = Math.max(0, lessons.findIndex((l) => l.slug === lessonSlug))
  const lesson = lessons[i]
  const prev = lessons[i - 1] ? { name: lessons[i - 1].name, href: lessons[i - 1].href } : { name: m.name, href: m.href }
  const next = lessons[i + 1]
  return (
    <section className="mx-auto max-w-page px-page">
      <div className="grid rounded-[12px] border border-purple-10 pb-0 pl-5 pt-[30px] max-xl:pl-0 xl:grid-cols-[288px_minmax(0,978px)] xl:gap-[72px]">
        <aside className="max-xl:hidden xl:sticky xl:top-[100px] xl:self-start"><Sidebar ctx={ctx} lessonSlug={lessonSlug} /></aside>
        <div className="px-4 pb-10 xl:px-0">
          <header className="pt-3"><h1 className="pb-10 pr-5 font-serif text-[38px] font-normal leading-[normal] tracking-[-1.14px] sm:text-[48px] sm:leading-[41.28px] sm:tracking-[-1.44px]">{lesson.name}</h1></header>
          <div className="mt-[55px] max-w-[680px] pr-5">
            <div className="max-w-[660px]">
              <Body />
              <div className="mt-[47px] flex min-h-[100px] flex-col justify-center rounded-[8px] border border-tint-lilac-line bg-lightest p-6">
                <div className="flex items-center justify-between font-sans text-[16px] font-semibold">
                  <span>Was this lesson helpful?</span>
                  <span className="flex gap-1 pl-4">
                    {['Helpful', 'Not helpful'].map((l, k) => <button key={l} type="button" aria-label={l} className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-purple-5 ${k ? 'rotate-180' : ''}`}><InlineSvg svg={thumb} className="h-5 w-5" /></button>)}
                  </span>
                </div>
              </div>
              <nav aria-label="Lesson navigation" className={`mt-[47px] grid gap-6 sm:grid-cols-[318px_318px]`}>
                {[{ ...prev, dir: 'prev' }, next && { ...next, dir: 'next' }].filter(Boolean).map((n) => (
                  <a key={n.dir} href={n.href} className="grid min-h-[100px] grid-cols-1 gap-[28.8px] rounded-[8px] border border-tint-lilac-line bg-lightest px-4 py-[12.8px] font-sans text-[16px] font-semibold transition-colors hover:bg-purple-2">
                    <InlineSvg svg={n.dir === 'prev' ? arrowL : arrowR} className={`h-6 w-6 ${n.dir === 'next' ? 'justify-self-end' : ''}`} />
                    <span className={n.dir === 'next' ? 'text-right' : ''}>{n.name}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
