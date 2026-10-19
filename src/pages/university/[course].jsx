import { PageSection } from '../../components/shared/index.js'
import { ExplosionCta, STORIES_LAYERS, STORIES_DECOS } from '../../components/shared/ExplosionCta.jsx'
import { useParams } from 'react-router-dom'
import UniversityNav from '../../components/pages/university/UniversityNav.jsx'
import CourseDetail from '../../components/pages/university/CourseDetail.jsx'
import { getCourse } from '../../components/pages/university/data.js'

export const title = 'Tines Stories University'
export const theme = 'plain'

export default function UniversityCourse() {
  const { course: slug } = useParams()
  const course = getCourse(slug)
  if (!course) {
    return (
      <>
        <UniversityNav />
        <PageSection className="py-24 text-center">
          <h1 className="font-serif text-h2-sm">Course not found in this clone</h1>
          <a href="/university/" className="btn btn-filled mt-6">Back to University</a>
        </PageSection>
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
