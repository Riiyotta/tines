import { useMemo, useState } from 'react'
import { ExplosionCta, FilterBar, PaginatedListNav, PillDropdown, SearchPill } from '../../shared/index.js'
import AvatarStack from './AvatarStack.jsx'
import StoriesNav from './StoriesNav.jsx'
import WhatsNewCard from './WhatsNewCard.jsx'
import InlineSvg from '../../InlineSvg.jsx'
import rss from '../../../../reference/svg/pages/stories-rss-icon.svg?raw'
import sun from '../../../../reference/svg/pages/stories-theme-sun.svg?raw'
import { WHATS_NEW_PAGES, whatsNewPage } from './data.js'

const CATEGORIES = ['All categories', 'AI in Tines', 'Cases', 'Actions', 'Credentials and resources', 'Records and dashboards', 'Self-hosted']

/** What's new index (specs/pages-c.md §5.2): 20 entries per page, month divider, search filter, 55 pages. */
export default function WhatsNewFeed({ page = 1 }) {
  const [q, setQ] = useState('')
  const { entries, month, count } = whatsNewPage(page)
  const shown = useMemo(() => entries.filter((e) => e.title.toLowerCase().includes(q.trim().toLowerCase())), [entries, q])
  return (
    <>
      <StoriesNav crumb="What’s new" crumbHref="/stories/whats-new/" active="Discover" />
      <div className="mx-auto max-w-[1440px] px-page-wide pb-24 pt-2 sm:pb-[122px] sm:pt-[53px]">
        <header className="mb-[42.4px] text-center">
          <h1 className="font-serif text-category-h1-sm font-normal sm:text-page-h1">What’s new</h1>
          <p className="mt-[19.2px] font-sans text-[16px] font-medium leading-[22.4px]">Real product velocity. See what we’ve shipped—this week, and every week.</p>
        </header>
        <FilterBar className="!gap-x-2 !gap-y-[6px] sm:!flex-nowrap">
          <SearchPill placeholder="Search updates…" value={q} onChange={(e) => setQ(e.target.value)} className="min-w-0 basis-full sm:basis-0 sm:flex-1" />
          <PillDropdown label="Categories" options={CATEGORIES} />
          <PillDropdown label="RSS" icon={rss} />
          <span aria-hidden="true" className="ml-[10px] h-4 w-px bg-[color-mix(in_srgb,currentColor_15%,transparent)] max-sm:hidden" />
          <button type="button" aria-label="Toggle theme" className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[color-mix(in_srgb,currentColor_10%,transparent)] max-sm:ml-auto">
            <InlineSvg svg={sun} className="h-[18px] w-[18px]" />
          </button>
        </FilterBar>
        <p className="pl-[6.5px] pt-[10px] font-sans text-[13px] font-medium leading-[18.2px] opacity-50">{q ? `${shown.length} updates` : '1088 updates'}</p>

        <div className="flex items-center gap-[7.5px] pb-[23px] pt-[30px] sm:pb-[30px] sm:pt-[55px]">
          <h2 className="font-mono text-[14px] font-semibold uppercase leading-[16.1px] tracking-[0.28px]">{month}</h2>
          <span className="rounded-[130px] bg-tint-page-active px-[11.7px] py-[3.9px] font-sans text-[13px] font-medium leading-[14.95px] text-tint-page-ink-hover">{count} updates</span>
        </div>
        <div>
          {shown.map((e, i) => (
            <div key={`${e.slug}-${i}`} className="relative py-4 sm:py-6 after:absolute after:bottom-0 after:left-[80px] after:right-0 after:border-b after:border-[color-mix(in_srgb,currentColor_12%,transparent)] max-sm:after:left-0 last:after:hidden">
              <div className="grid grid-cols-[1fr_auto] items-start gap-6">
                <WhatsNewCard e={e} />
                <AvatarStack index={i} className="max-sm:hidden" />
              </div>
            </div>
          ))}
        </div>
        {!shown.length && <p className="py-10 font-sans text-[16px] font-medium">No updates match your search.</p>}
        <PaginatedListNav className="mt-6 sm:mt-[84px]" page={page} total={WHATS_NEW_PAGES} hrefFor={(n) => (n === 1 ? '/stories/whats-new/' : `/stories/whats-new/page/${n}/`)} />
      </div>
      <ExplosionCta storiesFit />
    </>
  )
}
