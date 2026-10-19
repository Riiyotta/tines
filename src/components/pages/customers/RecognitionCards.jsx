/** Mobile-only recognition cards (specs/pages-a.md §4.4): G2 ranking + Gartner Cool Vendor. Hidden >=768. */
import { G2BadgeList } from '../../shared/G2BadgeList.jsx'
import { RECOGNITION } from './data.jsx'

const BADGES = ['Leader.svg', 'MostImplementable.svg', 'BestUsability.svg', 'BestRelationship.svg', 'EasiestToDoBusinessWith_Enterprise.svg', 'FastestImplementation_Enterprise.svg'].map((f) => ({ src: `/assets/pages/pricing/${f}`, alt: `G2 badge, Fall 2026` }))

const Heading = ({ lead, bold }) => (
  <h2 className="m-0 text-center text-[28px] leading-[32.2px]">
    <span className="block font-serif font-normal">{lead}</span>
    <span className="block font-sans font-semibold">{bold}</span>
  </h2>
)

export function RecognitionCards() {
  const { g2, gartner } = RECOGNITION
  return (
    <div className="relative mt-20 flex flex-col items-center gap-6 py-12 md:hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(currentColor_1px,transparent_1.5px)] opacity-30 [background-size:24px_24px]" />
      <section className="flex w-full max-w-[480px] flex-col items-center gap-[35px] rounded-[12px] bg-lightest px-4 py-6 text-center">
        <Heading {...g2} />
        <p className="m-0 font-sans text-[16px] font-medium leading-[22.4px]">{g2.text}</p>
        <G2BadgeList badges={BADGES} size={90} />
        <a href={g2.cta.href} className="btn btn-sans btn-outlined">{g2.cta.label}</a>
      </section>
      <section className="flex w-full max-w-[480px] flex-col items-center gap-[35px] rounded-[12px] bg-lightest px-4 py-6 text-center">
        <img src="/assets/pages/customers/gartner-cool-vendor-2021.png" alt="Gartner Cool Vendor 2021" className="block h-auto w-full max-w-[200px]" />
        <Heading {...gartner} />
        <p className="m-0 font-sans text-[16px] font-medium leading-[22.4px]">{gartner.text}</p>
        <a href={gartner.cta.href} className="btn btn-sans btn-outlined">{gartner.cta.label}</a>
      </section>
    </div>
  )
}
