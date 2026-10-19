/**
 * TrustArticlePage pieces for /security/ (specs/pages-b.md section 9).
 *  StandardPageHeader: rounded tinted band (margin 0 --page, bg trust-header, r 32 (12 <640), py 40 (18 <640), h 330 / 158) with the H1 (Reckless 52/58 -0.3, 38/42 <640)
 *    at x = page-wide + 40 (it is inset like the article column).
 *  ArticleWithToc: grid 816 | 264 gap 48 (single column <1024, TOC hidden) with the article (pull quote, h3 / h4 with hover anchor icons, p, ul)
 *    and a sticky scrollspy table of contents (top 100, bg light-100, r 14, "Contents" + level-3 / level-4 links; the heading in view turns accent).
 *  Embed: the HackerOne iframe is cross-origin and not reproducible: a 800x4000 warm-gray-95 box (r 18) with a static "Submit Vulnerability Report" stand-in.
 */
import { useEffect, useMemo, useState } from 'react'
import InlineSvg from '../../InlineSvg.jsx'
import anchorIcon from '../../../../reference/svg/pages/security-anchor-link-1.svg?raw'
import quoteMark from '../../../../reference/svg/pages/security-pullquote-mark-1.svg?raw'
import { slugify } from './data.js'

export function StandardPageHeader({ title }) {
  // Fluid like the live band: height ~26.5vw below 1280 (min 158), then 301.5 + 0.178 * (vw - 1280) up to 330; H1 = clamp(38px, 29.7px + 1.64vw, 52px).
  return (
    <header className="flex min-h-[max(158px,26.5vw)] items-center bg-trust-header py-[18px] sm:mx-page sm:rounded-[32px] sm:py-10 2xl:min-h-[min(330px,calc(301.5px+(100vw-1280px)*.178))]">
      <h1 className="px-page-wide font-serif text-[clamp(38px,29.7px+1.64vw,52px)] font-normal leading-[1.115] tracking-[-0.3px]">
        {title}
      </h1>
    </header>
  )
}

function Heading({ block }) {
  const id = slugify(block.text)
  const h3 = block.kind === 'h3'
  const Tag = block.kind
  return (
    <Tag
      id={id}
      className={`group scroll-mt-[100px] font-sans font-semibold ${h3 ? 'mt-[22px] pt-[16.5px] text-[22px] leading-[25.3px] xl:mt-[26px] xl:pt-[19.5px] xl:text-[26px] xl:leading-[29.9px]' : 'mt-5 pt-[10px] text-[20px] leading-[32.5px]'}`}
    >
      <span className="inline-flex items-center">
        <span>{block.text}</span>
        <a
          href={`#${id}`}
          aria-label={`Link to ${block.text}`}
          className={`flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 ${h3 ? 'h-[29.9px] w-[30.8px] text-purple-50' : 'h-8 w-[26px] text-accent'}`}
        >
          <InlineSvg svg={anchorIcon} className={h3 ? 'h-[20.8px] w-[20.8px]' : 'h-4 w-4'} />
        </a>
      </span>
    </Tag>
  )
}

function Para({ parts }) {
  return (
    <p className="mt-4 font-sans text-[16px] font-normal leading-[26px] 2xl:mt-[18px] 2xl:text-[18px] 2xl:leading-[29.25px]">
      {parts.map((p, i) =>
        typeof p === 'string' ? p : p.br ? <br key={i} /> : (
          <a key={i} href={p.href} className="font-semibold text-accent underline">{p.label}</a>
        ),
      )}
    </p>
  )
}

function Embed() {
  return (
    <div className="mt-[18px] h-[4000px] max-w-[800px] overflow-hidden rounded-[18px] bg-warm-gray-95">
      <div className="flex h-full items-start justify-center pt-24">
        <p className="font-sans text-[18px] font-semibold text-lightest">Submit Vulnerability Report</p>
      </div>
    </div>
  )
}

function Toc({ blocks, activeId }) {
  const items = blocks.filter((b) => b.kind === 'h3' || b.kind === 'h4')
  return (
    <aside className="sticky top-[100px] hidden max-h-[calc(100vh-120px)] self-start overflow-y-auto rounded-[14px] bg-light-100 px-6 py-4 font-sans font-medium transition-[top,max-height] duration-[250ms] ease-[ease] md:block" aria-label="Table of contents">
      <p className="mb-[16.8px] border-b border-[color-mix(in_srgb,theme(colors.accent)_20%,transparent)] pb-[8.4px] pt-[5.6px] text-[14px] font-semibold leading-[17.5px]">Contents</p>
      <ul>
        {items.map((b) => {
          const id = slugify(b.text)
          const on = id === activeId
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block hover:text-accent ${on ? 'text-accent' : ''} ${b.kind === 'h3' ? 'ml-[11px] rounded-[5.25px] py-[5.25px] text-[14px] leading-[17.5px]' : 'ml-[25px] rounded-[5.25px] py-[4.725px] text-[12.6px] leading-[15.75px]'}`}
              >
                {b.text}
              </a>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export function ArticleWithToc({ pullQuote, blocks }) {
  const [activeId, setActiveId] = useState(null)
  const ids = useMemo(() => blocks.filter((b) => b.kind === 'h3' || b.kind === 'h4').map((b) => slugify(b.text)), [blocks])
  // Scrollspy: the active entry is the last heading whose top has passed 25% of the viewport height (live: Access to production systems at scrollY 2500, 900 high).
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      let cur = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top - window.innerHeight * 0.25 <= 0) cur = id
      }
      setActiveId(cur)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [ids])
  return (
    <section className="mx-page-wide grid grid-cols-1 gap-12 pb-10 md:grid-cols-[minmax(0,1fr)_200px] lg:grid-cols-[minmax(0,816fr)_minmax(0,264fr)]">
      <div className="min-w-0 sm:pr-4">
        <article className="pb-[18px] pt-[18px]">
          <blockquote className="m-0 rounded-[12px] bg-trust-header px-[18px] pb-[18px] pt-[18px] md:rounded-[14px] md:px-10 md:pb-10 md:pt-9 2xl:px-[45px] 2xl:pb-[45px] 2xl:pt-[41px]">
            <InlineSvg svg={quoteMark} className="!block h-9 w-9 [--ac200:theme(colors.purple.15)]" />
            <p className="mt-4 font-serif text-[18px] leading-[23.4px] md:text-[22px] md:leading-[28.6px]">{pullQuote}</p>
          </blockquote>
          <p className="mt-4 min-h-[26px] 2xl:mt-[18px] 2xl:min-h-[29.25px]" aria-hidden="true" />
          {blocks.map((b, i) => {
            if (b.kind === 'h3' || b.kind === 'h4') return <Heading key={i} block={b} />
            if (b.kind === 'p') return <Para key={i} parts={b.parts} />
            if (b.kind === 'ul')
              return (
                <ul key={i} className="my-4 list-disc pl-10 font-sans text-[16px] leading-[26px] marker:text-purple-65 2xl:my-[18px] 2xl:text-[18px] 2xl:leading-[29.25px] [&>li+li]:mt-[9px]">
                  {b.items.map((t) => <li key={t}>{t}</li>)}
                </ul>
              )
            return <Embed key={i} />
          })}
        </article>
      </div>
      <Toc blocks={blocks} activeId={activeId} />
    </section>
  )
}
