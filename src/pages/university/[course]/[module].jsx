import { useParams } from 'react-router-dom'
import LessonPage from './_lesson-page.jsx'
import { getModule } from '../../../components/pages/university/data.js'

export const theme = 'plain'

// /university/<course>/<module>/ is the module landing page (live reuses the lesson shell: kicker, "Start module", Introduction, Learning objectives).
export default function UniversityModule() {
  const { course, module: mod } = useParams()
  const ctx = getModule(course, mod)
  const title = ctx ? `${ctx.module.name} | ${ctx.course.name} | Tines Stories University` : undefined
  return <LessonPage courseSlug={course} moduleSlug={mod} title={title} />
}
