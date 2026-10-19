import { PageSection } from '../../../components/shared/index.js'
import { ExplosionCta, STORIES_LAYERS, STORIES_DECOS } from '../../../components/shared/ExplosionCta.jsx'
import UniversityNav from '../../../components/pages/university/UniversityNav.jsx'
import Lesson from '../../../components/pages/university/Lesson.jsx'
import { getModule } from '../../../components/pages/university/data.js'

// Shared by the module and lesson routes. Unknown course / module / lesson slugs show a "not found in this clone" state.
export default function LessonPage({ courseSlug, moduleSlug, lessonSlug }) {
  const ctx = getModule(courseSlug, moduleSlug)
  const known = ctx && !ctx.module.exam && ctx.lessons.some((l) => l.slug === lessonSlug)
  if (!known) {
    return (
      <>
        <UniversityNav />
        <PageSection className="py-24 text-center">
          <h1 className="font-serif text-h2-sm">Lesson not found in this clone</h1>
          <a href="/university/" className="btn btn-filled mt-6">Back to University</a>
        </PageSection>
      </>
    )
  }
  return (
    <>
      <UniversityNav crumbs={[{ label: ctx.course.name, href: ctx.course.href }, { label: ctx.module.name, href: ctx.module.href }]} />
      <Lesson ctx={ctx} lessonSlug={lessonSlug} />
      <div className="pb-24 pt-[55px]">
        <ExplosionCta variant="legacy" showMark restScale backdropLayers={STORIES_LAYERS} decos={STORIES_DECOS} />
      </div>
    </>
  )
}
