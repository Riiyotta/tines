import { useParams } from 'react-router-dom'
import LessonPage from '../_lesson-page.jsx'

export const title = 'Tines Stories University'
export const theme = 'plain'

export default function UniversityLesson() {
  const { course, module: mod, lesson } = useParams()
  return <LessonPage courseSlug={course} moduleSlug={mod} lessonSlug={lesson} />
}
