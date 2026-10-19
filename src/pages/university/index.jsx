import { PageSection, CardGrid } from '../../components/shared/index.js'
import { ExplosionCta, STORIES_LAYERS, STORIES_DECOS } from '../../components/shared/ExplosionCta.jsx'
import UniversityNav from '../../components/pages/university/UniversityNav.jsx'
import { UniversityHero, DividerTitle, CourseCard, Resources, ProgramCard, WatchIntro } from '../../components/pages/university/Sections.jsx'
import { courses, resources, programs } from '../../components/pages/university/data.js'

export const title = 'Tines Stories University'
export const theme = 'plain'

export default function UniversityIndex() {
  return (
    <>
      <UniversityNav />
      <UniversityHero />
      <PageSection className="mt-16">
        <DividerTitle>What are you looking to learn?</DividerTitle>
        <CardGrid cols={{ base: 1, md: 2 }} gap={[64, 40]} className="mt-16 mb-16">
          {courses.slice(0, 2).map((c) => <CourseCard key={c.slug} course={c} featured />)}
        </CardGrid>
        <CardGrid cols={{ base: 1, md: 2, lg: 3 }} gap={[64, 40]}>
          {courses.slice(2).map((c) => <CourseCard key={c.slug} course={c} />)}
        </CardGrid>
      </PageSection>
      <PageSection spaced>
        <DividerTitle>Support your learning</DividerTitle>
        <div className="mt-16"><Resources items={resources} /></div>
      </PageSection>
      <PageSection spaced>
        <CardGrid cols={{ base: 1, md: 2 }} gap={[80, 24]}>
          {programs.map((p) => <ProgramCard key={p.title} p={p} />)}
        </CardGrid>
      </PageSection>
      <div className="pb-24 pt-section-margin">
        <ExplosionCta variant="legacy" showMark restScale backdropLayers={STORIES_LAYERS} decos={STORIES_DECOS} />
      </div>
      <WatchIntro />
    </>
  )
}
