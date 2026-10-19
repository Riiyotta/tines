import { CardGrid, ExplosionCta, JoinedSearchSelect, SectionHeader } from '../../../components/shared/index.js'
import InlineSvg from '../../../components/InlineSvg.jsx'
import topIcon from '../../../../reference/svg/pages/stories-top-products-icon.svg?raw'
import StoriesNav from '../../../components/pages/stories/StoriesNav.jsx'
import BuildYourOwn from '../../../components/pages/stories/BuildYourOwn.jsx'
import TemplatesBackdrop from '../../../components/pages/stories/TemplatesBackdrop.jsx'
import { byCategory, byVendor, categoryOptions, moreProducts, topProducts } from '../../../components/pages/stories/data.js'

export const title = 'Templates | Tines Stories'
export const theme = 'plain'

const CATEGORY_TONES = [
  'bg-tint-lilac-line-2/50 border-tint-lilac-line-2 text-purple-65',
  'bg-tint-peach border-tint-peach-mid text-orange-70',
  'bg-green-10 border-green-15 text-tint-green-ink',
  'bg-tint-rose border-tint-rose-mid text-pink-65',
]
const logos = [...topProducts, ...byVendor].map((p) => p.icon)

export default function TemplatesIndex() {
  const products = [...topProducts, ...moreProducts]
  return (
    <>
      <StoriesNav crumb="Templates" crumbHref="/stories/templates/" active="Discover" />
      <div className="relative">
        <TemplatesBackdrop />
        <div className="mx-auto max-w-[1440px] px-page-wide pb-[156px] pt-[14px] sm:pt-[95px]">
          <header className="text-center">
            <p className="font-mono text-mono-dt font-semibold uppercase">Templates</p>
            <h1 className="mt-[14px] font-serif text-display-lg-sm font-normal sm:text-display-lg">Connect anything</h1>
            <p className="mx-auto mt-[26px] max-w-[620px] font-sans text-[16px] font-medium leading-[23px] max-sm:text-[14px]">
              If it offers an API, Tines Stories connects with it. From mainstream solutions to niche and internal tools, Tines Stories is an integrator across your entire stack.
            </p>
          </header>
          <JoinedSearchSelect className="mt-[84px]" placeholder="Find a product…" options={categoryOptions} />

          <section className="mt-[71px]">
            <SectionHeader serif title="Top products" icon={<InlineSvg svg={topIcon} className="h-[71px] w-[69px] max-sm:hidden" />} description="Discover the top platforms users integrate through Tines, building connections between systems in minutes and delivering valuable workflows within hours." />
            <CardGrid cols={{ base: 2, md: 3, lg: 6 }} gap={[24, 24]} className="max-sm:!gap-4">
              {products.map((p) => (
                <a key={p.slug} href={p.href} className="grid aspect-square place-items-center content-center gap-3 rounded-[16px] border border-tint-lilac-edge bg-lightest p-4 text-center transition-colors duration-150 hover:border-purple-50">
                  {p.icon ? <img src={p.icon} alt="" className="h-[42px] w-[42px] object-contain" /> : <span aria-hidden="true" className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-purple-5 font-sans text-[18px] font-semibold">{p.name[0]}</span>}
                  <span className="font-sans text-[14px] font-semibold leading-[14px]">{p.name}</span>
                </a>
              ))}
            </CardGrid>
            <div className="mt-[71px] flex justify-center"><a href="/stories/templates/all/page/1/" className="btn btn-outlined">View all products</a></div>
          </section>

          <section className="mt-[177px] max-sm:mt-16">
            <SectionHeader serif title="By vendor" className="min-h-[117px] max-sm:min-h-0" />
            <CardGrid cols={{ base: 1, md: 2, lg: 3 }} gap={[24, 24]} className="max-sm:!grid-cols-2 max-sm:!gap-4">
              {byVendor.map((v) => (
                <a key={v.slug} href={v.href} className="grid grid-cols-[1fr_64px] items-center gap-2 rounded-usp border border-tint-lilac-edge bg-purple-5 p-5 transition-colors duration-150 hover:border-purple-50 max-sm:grid-cols-1">
                  <div>
                    <h3 className="font-serif text-[24px] font-normal leading-[28.8px] max-sm:text-[16px] max-sm:leading-[19.2px]">{v.name}</h3>
                    <p className="mt-[7px] font-sans text-[14px] font-bold leading-[19.6px]">View products →</p>
                  </div>
                  <span className="flex h-[72px] w-[72px] items-center justify-center justify-self-end rounded-full bg-[color-mix(in_srgb,var(--page-bg)_33%,transparent)] max-sm:hidden"><img src={v.icon} alt="" className="h-[45%] w-[45%] object-contain" /></span>
                </a>
              ))}
            </CardGrid>
          </section>

          <section className="mt-[53px] max-sm:mt-16">
            <SectionHeader serif title="By category" className="min-h-[52px] max-sm:min-h-0" />
            <CardGrid cols={{ base: 2, lg: 4 }} gap={[24, 24]} className="max-sm:!gap-4">
              {byCategory.map((c, i) => (
                <a key={c} href="/stories/templates/all/page/1/" className={`block h-[276px] overflow-hidden rounded-usp border p-5 ${CATEGORY_TONES[(i + (i > 3 ? 1 : 0)) % 4]}`}>
                  <h3 className="font-sans text-[18px] font-medium leading-[21px] max-sm:text-[14px] max-sm:leading-[16.8px]">{c}</h3>
                  <div className="mt-[22px] grid w-[290px] grid-cols-5 gap-[10px]">
                    {Array.from({ length: 15 }, (_, k) => (
                      <span key={k} className="flex h-[49px] w-[49px] items-center justify-center rounded-full bg-surface-story-icon">
                        <img src={logos[(i * 4 + k * 3) % logos.length]} alt="" className="h-6 w-6 object-contain" />
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </CardGrid>
          </section>

          <BuildYourOwn className="mt-[156px] max-sm:mt-16" />
        </div>
      </div>
      <ExplosionCta storiesFit />
    </>
  )
}
