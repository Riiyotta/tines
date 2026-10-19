import InlineSvg from '../../InlineSvg.jsx'
import starIcon from '../../../../reference/svg/pages/library-hero-tab-icons-1.svg?raw'
import listIcon from '../../../../reference/svg/pages/library-hero-tab-icons-4.svg?raw'
import cornerL from '../../../../reference/svg/pages/library-hero-tab-corner.svg?raw'
import cornerR from '../../../../reference/svg/pages/library-hero-tab-icons-3.svg?raw'
import { allStoriesCount } from './data.js'

/** LibraryDirectoryHero (specs/pages-c.md §6.1): 1000x411 purple-50 card, copy + illustration, "Featured / All stories" folder tabs on its bottom edge. */
export default function LibraryHero({ view = 'featured' }) {
  const featured = view === 'featured'
  const tab = 'relative flex items-center gap-[8px] rounded-t-[10.5px] px-[17.5px] py-[14px] font-sans text-nav font-semibold transition-colors duration-150'
  return (
    <section className="relative flex min-h-[411px] flex-col overflow-hidden rounded-[24px] bg-purple-50 px-[22px] text-lightest sm:px-[60px] md:grid md:grid-cols-[1fr_300px] md:items-start md:pr-[55px]">
      <div className="py-[72px] max-sm:pb-8 max-sm:pt-12 md:pb-[55px] md:pr-[72px] md:pt-[127px]">
        <p className="font-mono text-mono-label-sm font-bold uppercase">Library</p>
        <h1 className="mt-[14px] font-sans text-[30px] font-medium leading-[30.6px] tracking-[-0.3px] sm:text-[44px] sm:leading-[44.88px] sm:tracking-[-1.32px]">What will you build?</h1>
        <p className="mt-[14px] max-w-[480px] font-sans text-[16px] font-medium leading-[20.8px]">Explore stories built by Tines and the community. Import any of them into your tenant and adapt it to your own workflow.</p>
      </div>
      <img src="/assets/pages/library/directory-hero-illustration.svg" alt="" className="mx-auto h-[300px] w-[300px] self-center max-sm:hidden" />
      <div role="tablist" className="absolute bottom-0 left-[60px] flex max-sm:left-[22px]">
        <a role="tab" aria-selected={featured} href="/library/" className={`${tab} ${featured ? 'bg-lightest text-purple-60' : 'bg-coll-tab-off'}`}>
          <InlineSvg svg={starIcon} className="h-[15px] w-[15px]" />
          Featured
          {featured && <><InlineSvg svg={cornerL} className="absolute -left-2 bottom-0 h-2 w-2 text-lightest" /><InlineSvg svg={cornerR} className="absolute -right-2 bottom-0 h-2 w-2 text-lightest" /></>}
        </a>
        <a role="tab" aria-selected={!featured} href="/library/stories/" className={`${tab} ${!featured ? 'bg-lightest text-purple-60' : 'bg-coll-tab-off text-lightest'}`}>
          <InlineSvg svg={listIcon} className="h-[14px] w-[14px]" />
          All stories
          <span className="rounded-[18px] bg-coll-badge px-[6px] py-[2.4px] font-sans text-[12px] font-semibold leading-[13.8px] text-lightest">{allStoriesCount}</span>
          {!featured && <><InlineSvg svg={cornerL} className="absolute -left-2 bottom-0 h-2 w-2 text-lightest" /><InlineSvg svg={cornerR} className="absolute -right-2 bottom-0 h-2 w-2 text-lightest" /></>}
        </a>
      </div>
    </section>
  )
}
