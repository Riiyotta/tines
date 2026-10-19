import { ArticleLayout, AuthorChip, Callout, PersonInfo, Prose, StoryCard, TintedBlock, VideoBlock } from '../../shared/index.js'
import CtaStartToday from '../../CtaStartToday.jsx'
import InlineSvg from '../../InlineSvg.jsx'
import anchorIcon from '../../../../reference/svg/pages/blog-heading-anchor-link.svg?raw'
import BlogNav from './BlogNav.jsx'
import { bySlug } from './data.js'
import { genericBody, gridStories, longBody, shortBody } from './articleBody.js'

function SidebarCard({ className = '' }) {
  return (
    <a href="https://login.tines.com/saml_idp/signup" className={`grid min-h-[330px] grid-rows-[auto_1fr] gap-[14px] rounded-usp border border-tint-lilac-line bg-purple-5 p-[21px] transition-colors hover:border-tint-lilac-edge ${className}`}>
      <div>
        <h3 className="font-serif text-[22px] font-normal leading-[25.3px]">Sign up for Tines 3B Explore Edition</h3>
        <p className="mt-2 font-sans text-[14px] font-semibold leading-[19.6px]">Get started for free →</p>
      </div>
      <img src="/assets/images/usp/blossoming-transformation.svg" alt="" className="h-[90px] w-[90px] translate-x-1 self-end justify-self-end" />
    </a>
  )
}

function Block({ b, i }) {
  switch (b.t) {
    case 'p': return <p style={b.gap ? { marginTop: 18 + b.gap } : undefined}>{b.text}</p>
    case 'h2': {
      const id = `section-${i}`
      return (
        <h2 id={id} className="group">
          <a href={`#${id}`} className="!font-normal !no-underline hover:!text-inherit">
            {b.text}
            <InlineSvg svg={anchorIcon} className="ml-[8.4px] h-[17px] w-[17px] align-middle opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
          </a>
        </h2>
      )
    }
    case 'h3': return <h3>{b.text}</h3>
    case 'ul':
      return (
        <ul>
          {b.items.map((x, k) => (
            <li key={k}>
              {x}
              {b.nested && k === 1 && <ul>{b.nested.map((n, j) => <li key={j}>{n}</li>)}</ul>}
            </li>
          ))}
        </ul>
      )
    case 'callout': return <Callout><p>{b.text}</p></Callout>
    case 'tint':
      return (
        <TintedBlock tone={b.tone}>
          <h2>{b.heading}</h2>
          <ul className="!mb-0">{b.links.map((l, k) => <li key={k}><a href="/blog/articles/">{l}</a></li>)}</ul>
        </TintedBlock>
      )
    case 'grid':
      return (
        <div className="my-9 border-y-2 border-[color-mix(in_srgb,currentColor_7.5%,transparent)] py-9">
          <h3 className="!mt-0 !text-[28px] !leading-[33.6px] pt-[14px]">{b.title}</h3>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {gridStories(b.stories).map((s) => <StoryCard key={s.id} size="sm" {...s} />)}
          </div>
        </div>
      )
    case 'spacer': return <div aria-hidden="true" style={{ height: b.h }} />
    case 'video': return <VideoBlock aspect="aspect-video" src="/assets/pages/stories/whatsnew-personal-tool-controls-video.mp4" />
    default: return null
  }
}

export default function BlogArticle({ slug }) {
  const a = bySlug(slug)
  if (!a) return null
  const body = slug === 'building-ai-agents-getting-started' ? longBody() : a.kind === 'video' ? shortBody() : genericBody(slug.length)
  const cover = a.detailCover ? `/assets/pages/blog/${a.detailCover}` : a.cover
  const authors = a.authors || [{ name: 'Tines Team', role: 'Tines' }]
  return (
    <>
      <BlogNav active={`/blog/${(a.categories?.[0] || '').toLowerCase()}/`} />
      <div className="mx-auto max-w-[1440px] px-page-wide pt-[55px]">
        <h1 className="font-serif text-article-h1-sm font-normal sm:text-article-h1">{a.title}</h1>
        <div className="mt-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          {authors.length > 1 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[repeat(2,418px)] md:gap-6">
              {authors.map((au) => <AuthorChip key={au.name} {...au} />)}
            </div>
          ) : (
            <PersonInfo prefix="Written by" size={42} {...authors[0]} />
          )}
          <div className="flex flex-wrap items-center gap-[10.5px] md:justify-end">
            <time className="font-sans text-[14px] font-medium leading-[16.1px] opacity-70">{a.date || 'Published on July 16, 2026'}</time>
            {(a.categories || []).map((c) => (
              <a key={c} href={`/blog/${c === 'Tines × Tines' ? 'tines-x-tines' : c.toLowerCase().replace(/ /g, '-')}/`} className="rounded-[26px] bg-[color-mix(in_srgb,currentColor_10%,transparent)] px-[9.75px] py-[5.2px] font-sans text-[13px] font-medium leading-[14.95px]">{c}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 pb-36">
        <ArticleLayout variant="article" aside={<SidebarCard />}>
          <div className="mb-8 aspect-[828/435] overflow-hidden rounded-[22px] bg-light-200">
            <img src={cover} alt="" className="h-full w-full object-cover" />
          </div>
          <Prose>
            {body.map((b, i) => <Block key={i} b={b} i={i} />)}
          </Prose>
          <SidebarCard className="mt-10 md:hidden" />
        </ArticleLayout>
      </div>
      <CtaStartToday flush />
    </>
  )
}
