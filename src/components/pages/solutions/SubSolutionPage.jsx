// SubSolutionPage template (specs/pages-b.md section 3): ai-soc, soar and it-service-delivery-and-support differ only by data.
import { PageSection, SubSolutionHero, ValuePropsSection, CustomerLogosMarquee, ContentCard, ContentCardGrid } from '../../shared/index.js'
import InlineSvg from '../../InlineSvg.jsx'
import CtaStartToday from '../../CtaStartToday.jsx'
import { SolutionAreaNav, RAINBOW } from './SolutionPage.jsx'
import { CUSTOMERS } from './data.js'
import webinarIcon from '../../../../reference/svg/pages/solutions-security-ai-soc-content-card-icon-1.svg?raw'

const GAP = 'mt-[calc(var(--section-margin)*.8)]'

export default function SubSolutionPage({ data }) {
  const { area, hero, lead, columns, valueProps, cards, layout } = data
  return (
    <>
      <SolutionAreaNav area={area} active={area.active} />
      <div className="pt-sp-xxl">
        <PageSection>
          <SubSolutionHero {...hero} />
        </PageSection>
        <PageSection className={GAP}>
          <ValuePropsSection lead={lead} icon={RAINBOW} items={valueProps} columns={columns} />
        </PageSection>
        <PageSection className={GAP}>
          <CustomerLogosMarquee {...CUSTOMERS} />
        </PageSection>
        <PageSection className={GAP}>
          <ContentCardGrid layout={layout}>
            {cards.map(({ iconSvg, icon, logo, logoW, ...c }) => (
              <ContentCard
                key={c.title}
                {...c}
                titleBleed={!c.caseDecor}
                compact
                icon={
                  iconSvg ? <InlineSvg svg={webinarIcon} className="block" /> : icon ? <img src={icon} alt="" className="block max-h-[90px] w-auto" /> : logo ? <img src={logo} alt="" className={`block h-auto w-full ${logoW}`} /> : undefined
                }
              />
            ))}
          </ContentCardGrid>
        </PageSection>
      </div>
      <CtaStartToday className="!mt-[calc(var(--section-margin)*.8)]" />
    </>
  )
}
