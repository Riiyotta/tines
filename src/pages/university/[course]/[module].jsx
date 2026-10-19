import { useParams } from 'react-router-dom'
import LessonPage from './_lesson-page.jsx'
import { getModule } from '../../../components/pages/university/data.js'

export const title = 'Tines Stories University'
export const theme = 'plain'

// /university/<course>/<module>/ opens the module's first lesson.
export default function UniversityModule() {
  const { course, module: mod } = useParams()
  return <LessonPage courseSlug={course} moduleSlug={mod} lessonSlug={getModule(course, mod)?.lessons[0]?.slug} />
}
