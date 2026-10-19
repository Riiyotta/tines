// SolutionPage template (specs/pages-b.md section 2): /solutions/security/ and /solutions/it/ differ only by data.
import { AreaNav, PageSection, SectionHeading, SolutionHero, OpeningParagraphs, ValuePropsSection, ChildEntryCard, ChildEntryCardGrid, RibbonQuote } from '../../shared/index.js'
import InlineSvg from '../../InlineSvg.jsx'
import CtaStartToday from '../../CtaStartToday.jsx'
import quoteMark from '../../../../reference/svg/pages/solutions-it-quote-mark-1.svg?raw'
import elastic from '../../../../reference/svg/pages/solutions-security-company-logo-1.svg?raw'
import intercom from '../../../../reference/svg/pages/solutions-it-company-logo-1.svg?raw'

const LOGOS = { elastic, intercom }
export const RAINBOW = '/assets/pages/solutions-shared/RainbowBridgeToSkyIcon.svg'

export function SolutionAreaNav({ area, active }) {
  return (
    <AreaNav
      pill={{ label: 'Solutions', href: '/solutions/', static: true }}
      crumbs={[area.crumb]}
      collapseLabel={area.crumb.label}
      links={area.links.map((l) => ({ ...l, active: l.label === active }))}
    />
  )
}

export default function SolutionPage({ data }) {
  const { hero, opening, valueProps, children: kids, ribbon, area } = data
  return (
    <>
      <SolutionAreaNav area={area} />
      <SolutionHero {...hero}>
        <OpeningParagraphs heading={opening.heading}>
          {opening.paragraphs.map((p) => (
            <p key={p} className="m-0">{p}</p>
          ))}
          {opening.list && (
            <ul className="m-0">
              {opening.list.map((li) => (
                <li key={li.lead}><strong>{li.lead}</strong> {li.text}</li>
              ))}
            </ul>
          )}
        </OpeningParagraphs>
      </SolutionHero>

      <PageSection>
        <ValuePropsSection heading={valueProps.heading} icon={RAINBOW} items={valueProps.items} columns={3} />
      </PageSection>

      <PageSection spaced>
        <SectionHeading size="solution" mb={false}>Dive into the details</SectionHeading>
        <p className="m-0 mt-sp-gap text-center font-sans text-solution-body-sm font-medium">{kids.intro}</p>
        <ChildEntryCardGrid layout={kids.layout} className="mt-sp-xl">
          {kids.cards.map((c) => (
            <ChildEntryCard key={c.title} {...c} />
          ))}
        </ChildEntryCardGrid>
      </PageSection>

      <PageSection spaced>
        <RibbonQuote
          {...ribbon}
          mark={<InlineSvg svg={quoteMark} className="block h-10 w-10 max-lg:mx-auto" />}
          logo={<InlineSvg svg={LOGOS[ribbon.logo]} className="block" />}
        />
      </PageSection>

      <CtaStartToday />
    </>
  )
}
