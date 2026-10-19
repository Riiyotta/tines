/** Case-study detail pieces (specs/pages-c.md §10.2): hero card, narrow article body built from block tokens, "More case studies". */
import { PageSection, Prose, PullQuote, ImageBlock, CardGrid, CaseStudyBookCard } from '../../shared/index.js'
import InlineSvg from '../../InlineSvg.jsx'
import plus from '../../../../reference/svg/pages/case-studies-plus-sign.svg?raw'
import tinesMark from '../../../../reference/svg/pages/case-studies-tines-logo-cell.svg?raw'
import { makeText } from './placeholder.js'

// hero card theme (card bg / header cell / quote ink); notion + vimeo are green on the live site
const HERO = {
  green: { card: 'bg-green-5', cell: 'bg-tint-green-book', ink: 'text-tint-green-ink-xdk' },
  purple: { card: 'bg-purple-5', cell: 'bg-purple-50', ink: 'text-purple-80' },
  pink: { card: 'bg-tint-rose', cell: 'bg-pink-50', ink: 'text-pink-80' },
  orange: { card: 'bg-tint-peach', cell: 'bg-orange-50', ink: 'text-orange-80' },
}

export function StudyHero({ s }) {
  const t = HERO[s.theme] || HERO.green
  return (
    <section className="mx-auto max-w-page px-page">
      <div className={`grid gap-6 rounded-[32px] p-6 lg:grid-cols-2 max-lg:rounded-[24px] max-sm:p-[18px] ${t.card}`}>
        <div className={`grid content-between gap-8 rounded-[16px] p-8 sm:gap-12 sm:p-10 ${t.cell} text-lightest`}>
          <h1 className="font-serif text-[28px] font-normal leading-[29.4px] tracking-[-0.28px] lg:min-h-[204.1px] sm:mr-[72px] sm:text-[48px] sm:leading-[50.4px] sm:tracking-[-1.44px]">{s.title}</h1>
          <div>
            <p className="font-mono text-[12px] font-semibold uppercase leading-[12px] tracking-[0.36px]">Highlights</p>
            <ul className="-ml-10 mt-4 list-none p-0">
              {s.highlights.map((h, i) => (
                <li key={h} className={`relative pl-10 font-sans text-[16px] font-normal leading-[19.2px] ${i ? 'mt-2' : ''}`}>
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="absolute left-[18px] top-[1.6px] h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m3.5 8.5 3 3 6-7" /></svg>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-rows-[224px_1fr]">
          <div className="relative grid grid-cols-2 gap-6">
            <div className="flex h-[150px] items-center justify-center rounded-[16px] bg-lightest p-6 text-purple-70 sm:h-[224px] sm:p-10">
              {s.customerLogo ? <img src={s.customerLogo} alt={s.company} className="max-h-12 w-auto max-w-full" /> : <InlineSvg svg={s.logoSvg} className="w-[138px] max-w-full" />}
            </div>
            <div className="flex h-[150px] items-center justify-center rounded-[16px] bg-lightest p-6 text-purple-70 sm:h-[224px] sm:p-10"><InlineSvg svg={tinesMark} className="h-12 w-12" /></div>
            <InlineSvg svg={plus} className="absolute left-1/2 top-1/2 z-[2] h-[95px] w-[78px] -translate-x-1/2 -translate-y-1/2 text-lightest max-sm:h-[60px] max-sm:w-[50px]" />
          </div>
          <blockquote className={`m-0 flex items-center justify-center rounded-[22px] bg-lightest p-8 text-center sm:p-[55px] ${t.ink}`}>
            <p className="font-serif text-[22px] font-medium leading-[30.8px]">“{s.heroQuote}”</p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

export function StudyBody({ s }) {
  let h = 0
  let n = 0
  return (
    <PageSection className="mt-24">
      <article className="mx-auto max-w-[680px]">
        <Prose weight500 className="[&_p]:!max-w-none">
          {s.blocks.map((tok, idx) => {
            const [head, w] = tok.split(':')
            const k = head[0]
            const lines = parseInt(head.slice(1) || '0', 10)
            const words = w ? parseInt(w, 10) : null
            n += 1
            const after = idx > 0 && 'iq'.includes(s.blocks[idx - 1][0]) ? '!mt-10' : ''
            if (k === 'h') {
              const text = s.heads[h++]
              const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
              return (
                <h2 key={idx} id={id} className="group relative">
                  <a href={`#${id}`}><span>{text}</span><span aria-hidden="true" className="ml-[8.4px] inline-block h-[17px] w-[17px] align-middle text-[14px] opacity-0 transition-opacity duration-150 group-hover:opacity-100">#</span></a>
                </h2>
              )
            }
            if (k === 'i') return <ImageBlock key={idx} src={s.image} alt="" />
            if (k === 'q') {
              return (
                <PullQuote key={idx} source={`Team lead, ${s.company}`}>
                  {makeText(words || Math.max(6, lines * 7 - 2), n)}
                </PullQuote>
              )
            }
            if (k === 'L') {
              return (
                <div key={idx} className="mt-10 rounded-usp bg-purple-5 p-[33px] font-sans text-[22px] font-semibold leading-[33px] tracking-[-0.22px]">
                  {makeText(words || 60, n)}
                </div>
              )
            }
            if (k === 's') return <p key={idx} className={after}><strong>{makeText(words || 4, n).replace(/\.$/, '')}</strong></p>
            return <p key={idx} className={after}>{makeText(words || Math.max(4, Math.round(lines * 12.6) - 5), n)}</p>
          })}
        </Prose>
      </article>
    </PageSection>
  )
}

export function MoreStudies({ items }) {
  return (
    <PageSection spaced>
      <h2 className="mb-[55px] font-serif text-[24px] font-normal leading-[27.6px] tracking-[-0.24px] sm:text-[32px] sm:leading-[36.8px] sm:tracking-[-0.64px]">More case studies</h2>
      <CardGrid cols={{ base: 1, lg: 3 }} gap={[24, 24]} className="max-lg:!gap-y-4">
        {items.map((c) => <CaseStudyBookCard key={c.slug} href={c.href} palette={c.theme} logo={c.logoSvg} logoAlt={c.company} quote={c.quote || c.headline} stat={c.stat} />)}
      </CardGrid>
      <div className="mt-[55px] flex justify-center"><a href="/case-studies/all/" className="btn btn-sans btn-outlined">See all case studies</a></div>
    </PageSection>
  )
}
