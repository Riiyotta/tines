import { SidebarLayout } from '../../components/shared/index.js'
import LibrarySidebar from '../../components/pages/library/LibrarySidebar.jsx'
import LibraryHero from '../../components/pages/library/LibraryHero.jsx'
import StoryEmbed from '../../components/pages/library/StoryEmbed.jsx'
import LibraryNav from '../../components/pages/library/LibraryNav.jsx'
import { Community, FeaturedStories, HowItWorks, LatestStories, Partners, SubmitStory, Teams, UseCases } from '../../components/pages/library/LibraryIndexSections.jsx'
import { stories } from '../../components/pages/library/data.js'

export const title = 'Library | Tines Stories'
export const theme = 'plain'

export default function LibraryIndex() {
  return (
    <>
      <LibraryNav />
      <SidebarLayout
        aside={
          <>
            <details className="group -mx-2 -mb-10 xl:hidden">
              <summary className="flex h-14 cursor-pointer list-none items-center gap-3 rounded-usp px-4 font-sans text-nav font-semibold [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="text-[18px] leading-none">☰</span>
                Library menu
              </summary>
              <div className="px-2 pb-4 pt-2"><LibrarySidebar /></div>
            </details>
            <div className="max-xl:hidden"><LibrarySidebar /></div>
          </>
        }
        stickyTop={154}
        asideClassName="" className="!pt-6 pb-16">
        <LibraryHero view="featured" />
        <div className="mt-16 max-sm:mt-12">
          <FeaturedStories />
          <div className="mt-24 max-sm:mt-16"><StoryEmbed story={{ ...stories[4], icons: stories[4].icons, tools: 'Tines' }} /></div>
          <div className="mt-24 max-sm:mt-16"><HowItWorks /></div>
          <div className="mt-24 max-sm:mt-16"><Teams /></div>
          <div className="mt-24 max-sm:mt-16"><UseCases /></div>
          <div className="mt-24 max-sm:mt-16"><LatestStories /></div>
          <div className="mt-24 max-sm:mt-16"><Partners /></div>
          <div className="mt-24 max-sm:mt-16"><Community /></div>
          <div className="mt-24 max-sm:mt-16"><SubmitStory /></div>
        </div>
      </SidebarLayout>
    </>
  )
}
