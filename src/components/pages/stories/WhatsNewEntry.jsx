import { ArticleLayout, ExplosionCta, Prose, VideoBlock } from '../../shared/index.js'
import AvatarStack from './AvatarStack.jsx'
import StoriesNav from './StoriesNav.jsx'
import WhatsNewCard from './WhatsNewCard.jsx'
import { tileTone, whatsNew, whatsNewBodies, whatsNewBySlug } from './data.js'
import { words } from '../placeholder.js'

const pill = 'flex h-[35px] items-center rounded-pill border border-[color-mix(in_srgb,currentColor_20%,transparent)] bg-[color-mix(in_srgb,currentColor_5%,transparent)] px-[15.4px] font-sans text-nav font-semibold transition-colors hover:border-[color-mix(in_srgb,currentColor_35%,transparent)] hover:bg-[color-mix(in_srgb,currentColor_10%,transparent)]'

/** What's new entry (specs/pages-c.md §5.3). Unknown slugs get the "not found in this clone" state. */
export default function WhatsNewEntry({ slug }) {
  const e = whatsNewBySlug(slug)
  if (!e) {
    return (
      <>
        <StoriesNav crumb="What’s new" crumbHref="/stories/whats-new/" active="Discover" />
        <section className="mx-auto flex min-h-[50vh] max-w-[1440px] flex-col items-start justify-center px-page-wide">
          <h1 className="font-serif text-category-h1-sm font-normal sm:text-page-h1">Not found in this clone</h1>
          <p className="mt-4 font-sans text-[16px] font-medium leading-[22.4px]">This update has not been cloned.</p>
          <a href="/stories/whats-new/" className="btn btn-filled mt-6">All updates</a>
        </section>
      </>
    )
  }
  const i = whatsNew.indexOf(e)
  const body = whatsNewBodies[slug] || { paras: [words(34, i + 5), words(24, i + 6)] }
  const firstCat = e.categories.split(',')[0].trim()
  const more = whatsNew.filter((x) => x !== e && x.categories.includes(firstCat))
  const moreList = [...more, ...whatsNew.filter((x) => x !== e && !more.includes(x))].slice(0, 4)
  const other = whatsNew.filter((x) => x !== e && !moreList.includes(x)).concat(whatsNew).slice(0, 4)
  const prev = whatsNew[(i + 1) % whatsNew.length]
  const next = whatsNew[(i + whatsNew.length - 1) % whatsNew.length]
  return (
    <>
      <StoriesNav crumb="What’s new" crumbHref="/stories/whats-new/" active="Discover" />
      <div className="mx-auto max-w-[1440px] px-page-wide pb-[156px] pt-2 sm:pt-[55px] max-sm:pb-24">
        <nav aria-label="Update navigation" className="flex items-center justify-between">
          <a href="/stories/whats-new/" className={pill}>← Back</a>
          <div className="flex">
            <a href={prev.href} aria-label="Previous" className={`${pill} !rounded-r-none max-sm:w-[42px] max-sm:justify-center max-sm:!px-0`}>←<span className="ml-1 max-sm:hidden">Previous</span></a>
            <a href={next.href} aria-label="Next" className={`${pill} -ml-px !rounded-l-none max-sm:w-[42px] max-sm:justify-center max-sm:!px-0`}><span className="mr-1 max-sm:hidden">Next</span>→</a>
          </div>
        </nav>
        <header className="mt-[35px] flex items-start gap-6 border-b border-[color-mix(in_srgb,currentColor_12%,transparent)] pb-[42px] max-sm:gap-4 max-sm:pb-6 sm:mt-[54px]">
          <span className={`flex h-12 w-12 shrink-0 sm:h-16 sm:w-16 items-center justify-center rounded-[12px] border ${tileTone(e.categories)}`}>
            <img src={e.icon} alt="" className="max-w-[75%]" />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="font-serif text-whatsnew-h1-sm font-normal sm:text-whatsnew-h1">{e.title}</h1>
            <p className="mt-2 flex items-baseline gap-1 font-sans text-nav">
              <span className="font-semibold">{e.categories}</span><span>|</span><time className="font-medium">{e.date}</time>
            </p>
          </div>
          <AvatarStack index={i} count={2} className="max-sm:hidden" />
        </header>
        <ArticleLayout variant="whatsnew" className="!px-0 max-sm:[&_article>div]:mt-[27px]">
          <Prose className="mt-10 [&_p]:max-w-[749px] [&_p:first-child]:mt-0">
            {body.paras.map((t, k) => (
              <p key={k}>{[].concat(t).map((x, j) => (typeof x === 'string' ? x : <a key={j} href={x.href} className="!text-purple-40">{x.a}</a>))}</p>
            ))}
          </Prose>
          {body.video && <VideoBlock src="/assets/pages/stories/whatsnew-personal-tool-controls-video.mp4" className="!pr-0 md:-mr-48" />}
        </ArticleLayout>

        <div className="mt-[26px] sm:hidden"><AvatarStack index={i} count={2} size={28} /></div>
        <div className="mt-[26px] grid gap-x-[55px] gap-y-12 border-t sm:mt-[120px] border-[color-mix(in_srgb,currentColor_12%,transparent)] pt-[64px] sm:pt-[76px] md:grid-cols-2">
          {[[`More "${firstCat}" updates`, moreList], ['Other recent updates', other]].map(([h, list]) => (
            <section key={h}>
              <h2 className="font-serif text-[24px] font-semibold leading-[28.8px] tracking-[-0.24px] max-sm:font-sans max-sm:text-[18px] max-sm:leading-[20.7px]">{h}</h2>
              <div className="mt-[30px]">
                {list.map((x, k) => (
                  <div key={`${x.slug}-${k}`} className="relative py-[18px] sm:py-6 after:absolute after:bottom-0 after:left-[80px] max-sm:after:left-0 after:right-0 after:border-b after:border-[color-mix(in_srgb,currentColor_12%,transparent)] last:after:hidden">
                    <WhatsNewCard e={x} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <ExplosionCta storiesFit />
    </>
  )
}
