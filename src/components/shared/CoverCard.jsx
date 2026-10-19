/**
 * CoverCard ("ArticleEntryLink"). Implements specs/pages-c.md §2.2. `default` = ArticleEntryCard (reused, not copied).
 * `featured`: grid of the parent's 3 tracks, cover spans 2 (899x472, r 22), header in track 3 with pl 12:
 *   H3 Reckless 400 38/41.8 ls -0.475, excerpt Roobert 500 16/22.4 @ .8 mt 10 max 90%, PersonInfo mt 20.
 * <768: 1 column; the featured H3 drops to Roobert 500 18/21.6.
 * c1 (measured live): the H3 is Roobert 18 below 1024, Reckless 26/31.2 at 1024-1365, 38/41.8 from 1366, max-width 24em; header pl 12 only from 1280 (pr 30 at 920-1279).
 * Props: variant, href, cover, alt, title, excerpt, author { src, name, role, prefix }, className.
 */
import { ArticleEntryCard } from './ArticleEntryCard.jsx'
import { PersonInfo } from './PersonInfo.jsx'

export function CoverCard({ variant = 'default', href = '#', cover, alt = '', title, excerpt, author, className = '' }) {
  if (variant !== 'featured') return <ArticleEntryCard {...{ href, cover, alt, title, className }} />
  return (
    <a href={href} className={`grid cursor-pointer gap-y-[14px] lg:grid-cols-3 lg:gap-x-6 ${className}`}>
      <div className="aspect-[1200/630] w-full overflow-hidden rounded-[10px] bg-light-200 lg:col-span-2 lg:mt-1 lg:rounded-[22px]">
        {cover && <img src={cover} alt={alt} className="h-full w-full object-cover" />}
      </div>
      <div className="max-w-[90%] lg:max-w-none lg:pr-[30px] 2xl:pl-3 2xl:pr-0">
        <h3 className="max-w-[24em] font-sans text-[18px] font-medium leading-[21.6px] xl:font-serif xl:text-[26px] xl:font-normal xl:leading-[31.2px] xl:tracking-[-0.26px] min-[1366px]:text-[38px] min-[1366px]:leading-[41.8px] min-[1366px]:tracking-[-0.475px]">{title}</h3>
        {excerpt && <p className="mt-[10px] max-w-[90%] font-sans text-[16px] font-medium leading-[22.4px] opacity-80">{excerpt}</p>}
        {author && <PersonInfo {...author} className="mt-5" />}
      </div>
    </a>
  )
}
