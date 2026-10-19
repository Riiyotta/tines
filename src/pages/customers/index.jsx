import { AreaNav, PageSection, CaseStudyBookCard } from '../../components/shared/index.js'
import CtaStartToday from '../../components/CtaStartToday.jsx'
import { CaseStudiesHero } from '../../components/pages/customers/CaseStudiesHero.jsx'
import { RecognitionCards } from '../../components/pages/customers/RecognitionCards.jsx'
import { AccreditationGrid } from '../../components/pages/customers/AccreditationGrid.jsx'
import { AREA_NAV, GRID, MORE_CASE_STUDIES } from '../../components/pages/customers/data.jsx'

export const title = 'Customers | Tines'
export const theme = 'plain'

export default function Customers() {
  return (
    <div className="overflow-clip pb-20">
      <AreaNav {...AREA_NAV} pillTone="purple-5" />
      <CaseStudiesHero />
      <PageSection>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {GRID.map((c) => (
            <CaseStudyBookCard key={c.slug} href={c.href} palette={c.palette} logo={c.logo} logoAlt="" quote={c.quote} />
          ))}
        </div>
        <div className="mt-[55px] flex justify-center">
          <a href={MORE_CASE_STUDIES.href} className="btn btn-sans btn-outlined">{MORE_CASE_STUDIES.label}</a>
        </div>
        <RecognitionCards />
      </PageSection>
      <PageSection className="mt-20 sm:mt-[120px]">
        <AccreditationGrid />
      </PageSection>
      <div className="mt-20 sm:mt-[120px]">
        <CtaStartToday flush />
      </div>
    </div>
  )
}
