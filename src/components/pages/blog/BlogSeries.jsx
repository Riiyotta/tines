import { CardGrid, NewsletterSection, SectionHeader } from '../../shared/index.js'
import CtaStartToday from '../../CtaStartToday.jsx'
import InlineSvg from '../../InlineSvg.jsx'
import chevron from '../../../../reference/svg/pages/blog-series-list-chevron.svg?raw'
import BlogNav from './BlogNav.jsx'
import { moreSeries, seriesBySlug } from './data.js'

export default function BlogSeries({ slug }) {
  const s = seriesBySlug(slug)
  return (
    <>
      <BlogNav active="/blog/" />
      <div className="mx-auto max-w-[1440px] px-page-wide pt-[44px] md:pt-16">
        <div className="grid gap-6 text-purple-70 max-md:gap-12 md:grid-cols-[460px_644px]">
          <div className="mx-auto aspect-[8.5/11] h-[353px] overflow-hidden rounded-[5px] bg-light-200 md:mx-0 md:h-auto md:w-full md:max-w-[460px]">
            <img src={s.cover} alt="" className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="pb-8 md:pl-6">
              <h1 className="font-serif text-series-h1-sm font-normal sm:text-series-h1">{s.title}</h1>
              <p className="mt-4 font-sans text-[16px] font-medium leading-[22.4px]">{s.description}</p>
            </div>
            <div className="mt-4 pt-6 md:mt-[68px] md:pl-6">
              <h2 className="mb-[5px] font-mono text-mono-label-sm font-bold uppercase">Content</h2>
              <ul className="flex flex-col">
                {s.entries.map((e) => (
                  <li key={e.href}>
                    <a href={e.href} className="flex items-center gap-3 py-6 font-sans text-[16px] font-medium leading-[18.4px] hover:underline">
                      <InlineSvg svg={chevron} className="h-2 w-[5px] shrink-0" />
                      {e.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <section className="mt-10 md:mt-24">
          <SectionHeader title="More series" action={{ label: 'See all →', href: '/blog/' }} className="max-md:!mb-6" />
          <CardGrid cols={{ base: 2, lg: 4 }} gap={[24, 24]} className="max-sm:!gap-4">
            {moreSeries.map((m) => (
              <a key={m.name} href={m.href} className="block">
                <div className={`aspect-[8.5/11] overflow-hidden rounded-[5px] border bg-light-200 ${m.border}`}>
                  <img src={m.cover} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-[14px] font-sans text-[14px] font-semibold leading-[17px] sm:text-[16px] sm:leading-[19.2px]">{m.name}</h3>
                <p className="mt-2 font-sans text-[16px] font-medium leading-[20.8px] opacity-80">{m.description}</p>
              </a>
            ))}
          </CardGrid>
        </section>
        <NewsletterSection className="max-md:!mt-10" />
      </div>
      <CtaStartToday flush />
    </>
  )
}
