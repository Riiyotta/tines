import { useEffect } from 'react'
import { NotFoundPage } from '../../../components/shared/NotFoundPage.jsx'
import { ExplosionCta, STORIES_LAYERS, STORIES_DECOS } from '../../../components/shared/ExplosionCta.jsx'
import UniversityNav from '../../../components/pages/university/UniversityNav.jsx'
import Lesson from '../../../components/pages/university/Lesson.jsx'
import { getModule } from '../../../components/pages/university/data.js'

// Shared by the module and lesson routes. Omit lessonSlug for the module landing page.
// Unknown course / module / lesson slugs show the shared NotFoundPage. `title` sets document.title (pages export no static title because it is per-entry).
export default function LessonPage({ courseSlug, moduleSlug, lessonSlug, title }) {
  const ctx = getModule(courseSlug, moduleSlug)
  const known = ctx && !ctx.module.exam && (lessonSlug == null || ctx.lessons.some((l) => l.slug === lessonSlug))
  const docTitle = known && (title || (lessonSlug != null && `${ctx.lessons.find((l) => l.slug === lessonSlug).name} | ${ctx.module.name} | ${ctx.course.name} | Tines Stories University`))
  useEffect(() => {
    if (docTitle) document.title = docTitle
  }, [docTitle])
  if (!known) {
    return (
      <>
        <UniversityNav />
        <NotFoundPage actions={[{ href: '/university/', label: 'Back to University' }, { href: '/', label: 'Back to home' }]} />
      </>
    )
  }
  return (
    <>
      <UniversityNav crumbs={[{ label: ctx.course.name, href: ctx.course.href }, { label: ctx.module.name, href: ctx.module.href }]} />
      <Lesson ctx={ctx} lessonSlug={lessonSlug} />
      <div className="pb-10 pt-[35px] sm:pb-20 min-[1280px]:pb-24 min-[1024px]:pt-10 min-[1280px]:pt-[45px] min-[1400px]:pt-[55px]">
        <ExplosionCta variant="legacy" showMark restScale storiesFit backdropLayers={STORIES_LAYERS} decos={STORIES_DECOS} />
      </div>
    </>
  )
}
