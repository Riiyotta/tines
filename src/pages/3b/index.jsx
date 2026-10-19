import { AreaNav, FaqAccordion } from '../../components/shared/index.js'
import CtaStartToday from '../../components/CtaStartToday.jsx'
import { ThreeBHero } from '../../components/pages/3b/ThreeBHero.jsx'
import { ThreeBExplore } from '../../components/pages/3b/ThreeBExplore.jsx'
import { ThreeBBento } from '../../components/pages/3b/ThreeBBento.jsx'
import { ThreeBCoda } from '../../components/pages/3b/ThreeBCoda.jsx'
import { AREA_NAV, FAQS } from '../../components/pages/3b/data.jsx'

export const title = 'Tines 3B | The AI-native intelligent workflow platform'
export const theme = '3b'

export default function ThreeB() {
  return (
    <>
      <AreaNav {...AREA_NAV} pillTone="purple-10" />
      <ThreeBHero />
      <ThreeBExplore />
      <ThreeBBento section="build" />
      <ThreeBBento section="run" />
      <ThreeBBento section="monitor" />
      <ThreeBCoda />
      <section className="mx-auto mb-24 max-w-page px-page xl:mb-20 2xl:mb-24 max-sm:mb-10">
        <FaqAccordion heading="Frequently asked questions" items={FAQS.map((f) => ({ q: f.q, a: <p className="m-0">{f.a}</p> }))} size="md" />
      </section>
      <CtaStartToday flush />
    </>
  )
}
