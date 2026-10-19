import { CardGrid, PaginatedListNav, SidebarLayout, StoryCard } from '../../shared/index.js'
import LibraryHero from './LibraryHero.jsx'
import LibraryNav from './LibraryNav.jsx'
import LibrarySidebar from './LibrarySidebar.jsx'
import { allStoriesCount, stories, storyProps } from './data.js'

const PER_PAGE = 24
export const ALL_PAGES = Math.ceil(allStoriesCount / PER_PAGE)

/** "All stories" view (hero tab "All stories"): /library/stories/ + /library/stories/page/N/, 24 cards per page cycling the sample stories. */
export default function AllStories({ page = 1 }) {
  const list = Array.from({ length: PER_PAGE }, (_, i) => storyProps(stories[(i + (page - 1) * PER_PAGE) % stories.length], i))
  return (
    <>
      <LibraryNav />
      <SidebarLayout aside={<LibrarySidebar active="" className="max-xl:hidden" />} stickyTop={154} asideClassName="" className="!pt-6 pb-16">
        <LibraryHero view="all" />
        <CardGrid cols={{ base: 1, md: 2 }} gap={[30, 30]} className="mt-16 max-sm:!gap-[18px]">
          {list.map((s, i) => <StoryCard key={i} {...s} by={s.by} className="min-h-[280px]" />)}
        </CardGrid>
        <PaginatedListNav className="mt-16" page={page} total={ALL_PAGES} hrefFor={(n) => (n === 1 ? '/library/stories/' : `/library/stories/page/${n}/`)} />
      </SidebarLayout>
    </>
  )
}
