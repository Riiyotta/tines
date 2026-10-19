import { AreaNav, PageSection, CardGrid, CaseStudyBookCard } from '../../components/shared/index.js'
import CtaStartToday from '../../components/CtaStartToday.jsx'
import { studies } from '../../components/pages/case-studies/data.js'

export const title = 'All case studies | Tines'
export const theme = 'plain'

export const caseNav = {
  pill: { label: 'Customers', href: '/customers/' },
  links: [{ label: 'Customers', href: '/customers/' }, { label: 'All case studies', href: '/case-studies/all/', active: true }],
}

export default function CaseStudiesAll() {
  return (
    <div className="pb-20">
      <AreaNav pill={caseNav.pill} links={caseNav.links} />
      <PageSection>
        <header className="mx-auto mb-[55px] mt-10 max-w-[640px] text-center">
          <h1 className="font-serif text-[42px] font-normal leading-[48.3px] tracking-[-0.84px] sm:text-[48px] sm:leading-[55.2px] sm:tracking-[-0.96px]">All case studies</h1>
          <p className="mt-4 font-sans text-[16px] font-medium leading-[22.4px]">Discover how companies, from Fortune 100 enterprises to fast-growing startups, use Tines to automate their most important work.</p>
        </header>
        <CardGrid as="ul" cols={{ base: 1, lg: 3 }} gap={[24, 24]} className="m-0 list-none p-0 max-lg:!gap-y-4">
          {studies.map((c) => (
            <li key={c.slug}>
              <CaseStudyBookCard href={c.href} palette={c.theme} logo={c.logoSvg} logoAlt={c.company} quote={c.quote || c.headline} stat={c.stat} />
            </li>
          ))}
        </CardGrid>
      </PageSection>
      <div className="pt-24 lg:pt-[120px]"><CtaStartToday flush /></div>
    </div>
  )
}
