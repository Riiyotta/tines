// /partners/ (specs/pages-a.md §9).
import { AreaNav, PageSection, SectionHeading, QuoteCard, ArticleEntryCard, ContentCard, CardGrid } from '../components/shared/index.js'
import InlineSvg from '../components/InlineSvg.jsx'
import CtaStartToday from '../components/CtaStartToday.jsx'
import { CHANNEL, TECH, ARTICLES, UPDATES } from '../components/pages/partners/data.js'
import illustration from '../../reference/svg/pages/partners-1qtwww-illustration.svg?raw'
import searchIcon from '../../reference/svg/pages/partners-ycazqw-searchbar.svg?raw'
import logo1 from '../../reference/svg/pages/partners-cardfooter-logo-1.svg?raw'
import logo2 from '../../reference/svg/pages/partners-cardfooter-logo-2.svg?raw'

export const title = 'Tines partners'
export const theme = 'plain'

const NAV_LINKS = [
  { label: 'Overview', href: '/partners/', active: true },
  { label: 'Directory', href: '/partners/directory/' },
  { label: 'Become a partner', href: '/partners/become-a-partner/' },
  { label: 'Partner portal', href: 'https://partners.tines.com/', ext: true },
]
const LK = 'font-sans text-[14px] font-semibold leading-[16.1px] hover:underline'

// Per-row minimum tile heights @<640 (live rows are taller where link labels wrap), px.
const ROW_H = { channel: [185, 154, 154], tech: [215, 215, 185] }

function Panel({ lines, text, partners, kind, cta }) {
  return (
    <div className="rounded-[12px] border border-purple-10 p-[18px] sm:rounded-usp sm:p-[30px]">
      <header className="max-w-[480px] pb-[18px] max-sm:text-center sm:pb-0">
        <h3 className="mt-3 font-sans text-[24px] font-medium leading-[27.6px] sm:mt-0 sm:text-[32px] sm:leading-[30.4px] sm:tracking-[-0.64px]">
          {lines.map((l) => <span key={l} className="max-sm:mr-[5px] sm:block">{l}</span>)}
        </h3>
        <p className="mt-[11px] max-w-[448px] font-sans sm:mt-4 text-[16px] font-medium leading-[22.4px]">{text}</p>
      </header>
      <ul className="m-0 mt-4 grid list-none grid-cols-2 gap-4 p-0 sm:mt-[23px]">
        {partners.map((p, i) => (
          <li key={p.name} className="flex flex-col rounded-lg border border-purple-10 bg-lightest max-sm:min-h-[var(--tile-h)] sm:min-h-0" style={{ '--tile-h': `${ROW_H[kind][Math.floor(i / 2)]}px` }}>
            <div className="flex h-[106px] items-center justify-center px-6 py-4 sm:h-[147px] sm:px-10">
              <img src={p.logo} alt={p.name} loading="lazy" className="max-h-full max-w-[85%] object-contain" />
            </div>
            <div className="-mt-2 flex flex-col items-center justify-center gap-1 px-2 pb-4 pt-[7px] text-center sm:mt-0 sm:flex-row sm:gap-3 sm:p-0 sm:pb-4">
              {kind === 'channel' ? (
                <>
                  <a href="#" className={`${LK} text-purple-60`}>Visit website↗</a>
                  <a href="/customers/" className={`${LK} text-pga-green-link`}>View stories</a>
                </>
              ) : (
                <>
                  <a href="#" className={`${LK} text-pink-60`}>Learn more</a>
                  <a href="#" className={`${LK} text-purple-60`}>Website↗</a>
                  <a href="/customers/" className={`${LK} text-pga-green-link`}>View stories</a>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <a href="/partners/directory/" className="mt-8 block font-mono max-sm:text-center sm:mt-[30px] sm:inline-block text-[12px] font-bold uppercase leading-[13.8px] tracking-[0.6px] hover:underline">{cta}</a>
    </div>
  )
}

export default function Partners() {
  return (
    <div>
      <AreaNav pill={{ label: 'Partners', href: '/partners/' }} crumbs={[{ label: 'Overview', href: '/partners/' }]} links={NAV_LINKS} />

      <PageSection wider className="pt-[35px] sm:pt-[55px]">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[699.8fr_636.2fr]">
          <InlineSvg svg={illustration} className="block aspect-[636/306] w-full max-lg:mb-[55px] lg:order-2" />
          <div className="max-lg:text-center lg:order-1">
            <h1 className="font-sans text-[38px] font-medium leading-[41.8px] tracking-[-0.76px] sm:text-[54px] sm:font-normal sm:leading-[54px] sm:tracking-[-1.62px]">
              <span className="block">Work smarter with</span>
              <span className="block">Tines’ trusted partners</span>
            </h1>
            <p className="mt-4 max-w-[544px] font-sans text-[16px] font-medium leading-[22.4px] max-lg:mx-auto">Tap into a network of more than 200 partners, from boutique consultants to global resellers, who help teams get real value from Tines faster and with less risk.</p>
            <div className="mt-6 grid grid-cols-1 justify-center gap-4 max-lg:justify-items-center sm:mt-10 sm:gap-2 sm:grid-cols-[173.6px_173.6px] lg:justify-start">
              <a href="/partners/become-a-partner/" className="btn btn-filled w-full max-sm:w-[173.6px]">Become a partner</a>
              <a href="https://partners.tines.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outlined w-full max-sm:h-[18px] max-sm:w-[173.6px] max-sm:!border-0 max-sm:!p-0">Partner portal ↗</a>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection wider className="mt-10 flex flex-col gap-10 sm:mt-24">
        <form role="search" onSubmit={(e) => { e.preventDefault(); window.location.href = '/partners/directory/' }} className="flex items-center gap-[12.8px] rounded-pill border border-purple-10 bg-lightest px-[19.2px] py-[12.8px]">
          <InlineSvg svg={searchIcon} className="h-4 w-4 shrink-0 text-purple-50" />
          <input type="search" placeholder="Search for a partner…" aria-label="Search for a partner" className="min-w-0 flex-1 bg-transparent font-sans text-[16px] font-normal leading-[18.4px] placeholder:text-purple-65 focus:outline-none" />
          <a href="/partners/directory/" className="whitespace-nowrap font-sans text-[16px] font-semibold leading-[18.4px] text-purple-60 hover:text-accent">Go to directory →</a>
        </form>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <Panel kind="channel" lines={['Channel', 'partners']} text="Trusted advisors to build better workflow solutions, faster for your organization with Tines." partners={CHANNEL} cta="View all →" />
          <Panel kind="tech" lines={['Technology', 'partners']} text="The tools and systems you use, working together like never before." partners={TECH} cta="View all →" />
        </div>
      </PageSection>

      <PageSection spaced>
        <SectionHeading mb={false} className="mb-10 sm:mb-24" max="max-w-[690px]">Make your tools and systems work together like never before</SectionHeading>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <QuoteCard tone="orange" quote="Connecting our tools used to take weeks of custom work. Now we ship new automations in an afternoon and everyone can see what they do." name="Dan Rubins" role="VP of IT and Information Security" logo={<InlineSvg svg={logo1} className="h-[47px] w-[110px]" />} />
          <QuoteCard tone="purple" quote={<>Tines gave our analysts back their time, and the partner team helped us get started quickly, so we saw value within weeks.<span className="sm:hidden"> Every new workflow we build starts from what the team already learned, which keeps our response consistent and our analysts focused on the hardest problems.</span></>} name="Shasheen Bandodkar" role="Information Security Analyst" logo={<InlineSvg svg={logo2} className="h-8 w-[88px]" />} />
        </div>
      </PageSection>

      <PageSection spaced>
        <SectionHeading mb={false} className="mb-10 sm:mb-24">Backed by the companies<br className="max-sm:hidden" /> you trust</SectionHeading>
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:gap-y-10 lg:grid-cols-2">
          {ARTICLES.map((a) => <ArticleEntryCard key={a.title} {...a} alt="" />)}
        </div>
      </PageSection>

      <PageSection spaced>
        <SectionHeading mb={false} className="mb-10 sm:mb-24">Get the latest updates</SectionHeading>
        <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 sm:gap-6 xl:grid-cols-4">
          {UPDATES.map((u, i) => <li key={u.title} className="contents"><ContentCard {...u} compact className={`${i < 2 ? 'min-h-[265px]' : 'min-h-[204px]'} sm:min-h-[368px]`} /></li>)}
        </ul>
      </PageSection>

      <CtaStartToday />
    </div>
  )
}
