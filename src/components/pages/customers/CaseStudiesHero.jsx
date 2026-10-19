/** Customers hero (specs/pages-a.md §4.2): illustration, then a split header (kicker + H1 left, description right). */
import { HERO } from './data.jsx'

export function CaseStudiesHero() {
  return (
    <header className="px-[18px] pb-[35px] pt-10 sm:px-[70px] sm:pb-16 sm:pt-[60px] lg:px-[85px] xl:px-[125px] 2xl:px-[156px]">
      <div className="mx-auto max-w-[1128px]">
        <div className="-mx-[18px] overflow-hidden sm:mx-0 sm:overflow-visible"><img src={HERO.illustration} alt="" className="mx-auto -mt-[33.8px] mb-[55px] block h-auto w-full max-w-[1128px] max-sm:mb-8 max-sm:w-[505px] max-sm:max-w-none" /></div>
        <div className="grid grid-cols-1 gap-4 max-md:text-center md:grid-cols-2 md:gap-6">
          <div>
            <p className="m-0 font-mono text-mono-label-sm font-bold uppercase">{HERO.kicker}</p>
            <h1 className="m-0 mt-6 font-serif text-[38px] font-normal leading-[38px] tracking-[-0.76px] md:text-[48px] md:leading-[48px] md:tracking-[-0.96px] 2xl:text-[56px] 2xl:leading-[56px] 2xl:tracking-[-1.12px]">{HERO.title}</h1>
          </div>
          <p className="m-0 max-w-[544px] font-sans text-[18px] font-medium leading-[23.4px] max-md:mx-auto md:justify-self-end md:text-[16px] md:leading-[20.8px]">{HERO.text}</p>
        </div>
      </div>
    </header>
  )
}
