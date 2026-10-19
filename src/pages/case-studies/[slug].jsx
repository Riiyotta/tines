import { useParams } from 'react-router-dom'
import { AreaNav, PageSection } from '../../components/shared/index.js'
import CtaStartToday from '../../components/CtaStartToday.jsx'
import { StudyHero, StudyBody, MoreStudies } from '../../components/pages/case-studies/Study.jsx'
import { getStudy } from '../../components/pages/case-studies/data.js'
import { caseNav } from './all.jsx'

export const title = 'Case study | Tines'
export const theme = 'plain'

export default function CaseStudyPage() {
  const { slug } = useParams()
  const s = getStudy(slug)
  return (
    <div>
      <AreaNav pill={caseNav.pill} links={caseNav.links.map((l) => ({ ...l, active: false }))} />
      {s ? (
        <>
          <StudyHero s={s} />
          <StudyBody s={s} />
          <MoreStudies items={s.related} />
          <div className="pt-0"><CtaStartToday /></div>
        </>
      ) : (
        <PageSection className="py-24 text-center">
          <h1 className="font-serif text-h2-sm">Case study not found in this clone</h1>
          <a href="/case-studies/all/" className="btn btn-filled mt-6">All case studies</a>
        </PageSection>
      )}
    </div>
  )
}
