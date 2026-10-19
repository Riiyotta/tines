import { useEffect } from 'react'
import { NotFoundPage } from '../../components/shared/NotFoundPage.jsx'
import { ExplosionCta, STORIES_LAYERS, STORIES_DECOS } from '../../components/shared/ExplosionCta.jsx'
import { useParams } from 'react-router-dom'
import UniversityNav from '../../components/pages/university/UniversityNav.jsx'
import CourseDetail from '../../components/pages/university/CourseDetail.jsx'
import { getCourse } from '../../components/pages/university/data.js'

export const theme = 'plain'

export default function UniversityCourse() {
  const { course: slug } = useParams()
  const course = getCourse(slug)
  useEffect(() => {
    if (course) document.title = `${course.name} learning path | Tines Stories University`
  }, [course])
  if (!course) {
    return (
      <>
        <UniversityNav />
        <NotFoundPage actions={[{ href: '/university/', label: 'Back to University' }, { href: '/', label: 'Back to home' }]} />
      </>
    )
  }
  return (
    <>
      <UniversityNav crumbs={[{ label: course.name, href: course.href }]} />
      <CourseDetail course={course} />
      <div className="pb-24 pt-[95px] max-sm:pb-10 lg:pt-[312px]">
        <ExplosionCta variant="legacy" showMark restScale storiesFit backdropLayers={STORIES_LAYERS} decos={STORIES_DECOS} />
      </div>
    </>
  )
}
