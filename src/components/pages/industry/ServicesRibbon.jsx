/**
 * ServicesRibbon (mssps "With you every step of the way"). Implements specs/pages-b.md 4.15 (orange theme, ribbon fold like RibbonQuote).
 * >=1280: grid minmax(auto,5fr) / minmax(auto,7fr); header (orange-5, border orange-20, pad sp-lg, r 8 0 0 8, mb 47, z 1) with icon + h2 + p (max 20em)
 * and a 72x47 fold; grid card (r 0 8 8 0, mt 47, ml -72, pad 72 50 55 134.4, 2 cols gap 32). <1280: centered header without box; card full radius, pad sp-xl.
 * Service: title Roobert 600 20/23, text 500 14/18.2, link 600 14 (hover underline).
 */
import InlineSvg from '../../InlineSvg.jsx'

export function ServicesRibbon({ icon, title, body, services }) {
  return (
    <section data-color-theme="orange" className="mx-auto w-full max-w-[1440px] px-page-wide text-[var(--acc70)]">
      <div className="2xl:grid 2xl:grid-cols-[minmax(auto,5fr)_minmax(auto,7fr)]">
        <div className="relative z-[1] max-2xl:mb-sp-xl max-2xl:text-center 2xl:mb-[47px] 2xl:mr-[-1px] 2xl:rounded-l-[8px] 2xl:border 2xl:border-[var(--acc20)] 2xl:bg-[var(--acc5)] 2xl:p-sp-lg">
          <div>
            <InlineSvg svg={icon} className="block h-[90px] w-[82px] max-2xl:mx-auto" />
            <h2 className="mt-[45px] [text-wrap:balance] font-serif text-section-h2-sm font-normal sm:text-section-h2-md xl:text-section-h2">{title}</h2>
            <p className="mt-6 max-w-[20em] font-sans text-[16px] font-medium leading-[22.4px] max-2xl:mx-auto">{body}</p>
          </div>
          <span aria-hidden="true" className="absolute right-[-1px] top-[calc(100%+1px)] hidden h-[47px] w-[72px] border-b border-l border-[var(--acc20)] bg-[linear-gradient(to_right_bottom,var(--acc20)_50%,transparent_50%)] 2xl:block" />
        </div>
        <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-[8px] border border-[var(--acc20)] bg-[var(--acc5)] p-sp-xl sm:grid-cols-2 2xl:ml-[-72px] 2xl:mt-[47px] 2xl:rounded-l-none 2xl:py-[72px] 2xl:pb-[55px] 2xl:pl-[134.4px] 2xl:pr-[50px]">
          {services.map((s) => (
            <div key={s.title}>
              <h3 className="font-sans text-[20px] font-semibold leading-[23px]">{s.title}</h3>
              <p className="mt-2 font-sans text-[14px] font-medium leading-[18.2px]">{s.text}</p>
              <a href={s.href} className="mt-3 inline-block font-sans text-[14px] font-semibold hover:underline">{s.link} →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
