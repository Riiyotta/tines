import { useParams } from 'react-router-dom'
import { NotFoundPage } from '../../components/shared/NotFoundPage.jsx'
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
        <NotFoundPage actions={[{ href: "/case-studies/all/", label: "All case studies" }, { href: "/", label: "Back to home" }]} />
      )}
    </div>
  )
}
