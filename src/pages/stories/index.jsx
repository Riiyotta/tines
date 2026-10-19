import StoriesNav, { ExplosionCta } from '../../components/pages/stories/StoriesNav.jsx'
import WhatsNewCard from '../../components/pages/stories/WhatsNewCard.jsx'
import { features, products, whatsNew } from '../../components/pages/stories/data.js'

export const title = 'Tines Stories | Tines'
export const theme = 'plain'

const arrow = <span aria-hidden="true" className="inline-block transition-transform duration-100 group-hover:translate-x-[2px]">→</span>

export default function StoriesHub() {
  return (
    <>
      <StoriesNav />
      <div className="mx-auto max-w-[1440px] px-page-wide pb-20 pt-[29px] sm:pt-[60px]">
        <header className="text-center">
          <h1 className="font-serif text-monitor-h2-sm font-normal sm:text-stories-h1">Meet Tines Stories</h1>
          <p className="mx-auto mt-4 max-w-[544px] font-sans text-[18px] font-medium leading-[22.5px] sm:text-[16px] sm:leading-[22.4px]">
            Build, run, and monitor your most important workflows with the platform loved by the world’s security-minded companies.
          </p>
          <div className="-mx-[18px] mt-10 flex h-[140px] justify-center overflow-hidden sm:mx-auto sm:h-auto sm:max-w-[1082px]"><img src="/assets/pages/stories/hero-illustration.svg" alt="" className="h-full max-w-none sm:aspect-[984/257] sm:h-auto sm:w-full" /></div>
        </header>

        <div className="mt-[58px] grid gap-4 sm:mt-[60px] md:grid-cols-3 md:gap-6">
          {products.map((p) => (
            <a
              key={p.name}
              href={p.href}
              className={`group relative grid h-[450px] grid-rows-[auto_1fr] content-start gap-6 overflow-hidden rounded-usp border p-[23.24px] transition-colors ${p.card}`}
            >
              <div className="relative z-[2]">
                <h2 className="font-serif text-[26px] font-normal leading-[26px] tracking-[-0.52px]">{p.name}</h2>
                <p className="mt-[10.5px] font-sans text-[14px] font-medium leading-[16.8px]">{p.blurb}</p>
                <p className="mt-[10.5px] font-sans text-[14px] font-bold leading-[16.8px]">Details {arrow}</p>
              </div>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 top-[126px] bg-contain bg-right-bottom bg-no-repeat" style={{ backgroundImage: `url(${p.backdrop})` }} />
              <img src={p.icon} alt="" className="absolute bottom-[23.24px] left-[23.24px] z-[3] h-[92px] w-[92px] -translate-x-2 translate-y-2" />
            </a>
          ))}
        </div>

        <div className="mt-[60px] grid gap-x-6 gap-y-8 md:grid-cols-3">
          {features.map((f) => (
            <a key={f.name} href={f.href} className="group grid grid-cols-[80px_1fr] gap-4 md:grid-cols-[92px_1fr] md:gap-6">
              <span className={`flex h-20 w-20 md:h-[92px] md:w-[92px] items-center justify-center rounded-full border transition-colors ${f.ring}`}>
                <img src={f.icon} alt="" className="w-1/2" />
              </span>
              <span className="block pt-[21px] max-md:pt-[7px]">
                <h3 className="font-serif text-[24px] font-normal leading-[24px] tracking-[-0.48px]">{f.name}</h3>
                <p className="mt-2 font-sans text-[14px] font-medium leading-[16.8px]">{f.blurb}</p>
                <p className="mt-2 font-sans text-[14px] font-bold leading-[16.8px]">Details {arrow}</p>
              </span>
            </a>
          ))}
        </div>

        <section className="mt-20 grid gap-6 max-md:gap-[39px] md:mt-[120px] md:rounded-usp md:border md:border-[color-mix(in_srgb,currentColor_14%,transparent)] md:p-10 md:grid-cols-[408.8px_1fr]">
          <div className="self-start md:sticky md:top-[120px]">
            <h2 className="font-serif text-[28px] font-normal leading-[28px] tracking-[-0.56px]">What’s new</h2>
            <p className="mt-[12.8px] max-w-[352px] font-sans text-[16px] font-medium leading-[22.4px]">Real product velocity. See what we’ve shipped this week, and every week.</p>
            <div className="mt-5 flex gap-2">
              <a href="/stories/whats-new/" className="btn btn-sans bg-tint-page-ink text-white">See all updates</a>
              <a href="/stories/whats-new/rss.xml" className="btn btn-sans border-tint-page-ink text-tint-page-ink hover:bg-[color-mix(in_srgb,currentColor_8%,transparent)]">RSS feed ↗</a>
            </div>
          </div>
          <div>
            {whatsNew.slice(0, 7).map((e, i) => (
              <div key={e.slug} className={i ? 'mt-[14px] border-t border-[color-mix(in_srgb,currentColor_12%,transparent)] pt-4 sm:mt-6 sm:pt-6' : ''}>
                <WhatsNewCard e={e} />
              </div>
            ))}
            <a href="/stories/whats-new/" className="mt-6 flex w-full justify-center rounded-usp border border-[color-mix(in_srgb,currentColor_18%,transparent)] p-4 font-sans text-nav font-bold transition-colors hover:bg-[color-mix(in_srgb,currentColor_5%,transparent)]">
              View all product updates →
            </a>
          </div>
        </section>
        <ExplosionCta storiesFit className="mt-[48px] md:mt-[89px]" />
      </div>
    </>
  )
}
