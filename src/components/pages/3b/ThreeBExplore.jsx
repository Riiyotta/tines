/** "Explore Tines 3B" (specs/pages-a.md §2.3): kicker + statement left, hanging-monitor garden right (alpha capture of the live canvas). */
import { EXPLORE, A } from './data.jsx'

export function ThreeBExplore() {
  return (
    <section className="mx-auto mt-[90px] grid max-w-page grid-cols-1 items-center gap-[35px] px-page md:mt-[90px] xl:mt-[100px] xl:grid-cols-2 xl:gap-6 2xl:mt-[116px] 3xl:mt-32">
      <div className="md:pb-10 md:text-center xl:ml-[91.33px] xl:max-w-[577px] xl:pb-0 xl:text-left">
        <h2 className="kicker m-0 mb-[20.8px]">{EXPLORE.kicker}</h2>
        <p className="m-0 font-serif text-statement-sm font-normal md:mx-[74px] md:text-statement-md xl:mx-0 xl:text-statement">
          <strong className="font-bold">{EXPLORE.lead}</strong> {EXPLORE.rest}
        </p>
      </div>
      <div className="relative flex justify-center self-stretch md:my-[30px] xl:my-0">
        <div className="relative aspect-[420/453.2] w-[88%] max-w-[420px]">
          <picture aria-hidden="true">
            <source media="(min-width: 640px)" srcSet={`${A}garden.png`} />
            <img src={`${A}garden-m.png`} alt="" className="pointer-events-none absolute block h-auto max-w-none" style={{ width: '244.7%', left: '-26.3%', top: '-109.7%' }} />
          </picture>
        </div>
      </div>
    </section>
  )
}
