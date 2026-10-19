import { CardGrid, SectionHeader, StoryCard } from '../../shared/index.js'
import InlineSvg from '../../InlineSvg.jsx'
import step1 from '../../../../reference/svg/pages/library-howitworks-steps-1.svg?raw'
import step2 from '../../../../reference/svg/pages/library-howitworks-steps-2.svg?raw'
import step3 from '../../../../reference/svg/pages/library-howitworks-steps-3.svg?raw'
import submitIcon from '../../../../reference/svg/pages/library-submit-story-icon.svg?raw'
import { storyProps, stories, teams, tools, useCases } from './data.js'

const Eyebrow = ({ children, tone = 'bg-purple-10 text-purple-65' }) => (
  <span className={`mb-4 inline-block max-sm:mx-auto max-sm:table rounded-[23px] px-[11.5px] py-[6.9px] font-mono text-mono-label-sm font-bold uppercase leading-[13.225px] ${tone}`}>{children}</span>
)
const H2 = ({ children }) => <h2 className="max-w-[480px] max-sm:mx-auto max-sm:text-center font-sans text-[24px] font-semibold leading-[25.2px] tracking-[-0.12px] sm:text-section-h2-sm">{children}</h2>

export function FeaturedStories() {
  return (
    <section>
      <div className="pb-10 pr-10"><H2>Featured stories</H2></div>
      <CardGrid cols={{ base: 1, md: 2 }} gap={[30, 30]} className="max-sm:!gap-[18px]">
        {stories.slice(0, 2).map((s, i) => <StoryCard key={s.id} {...storyProps(s, i)} className="min-h-[280px]" />)}
      </CardGrid>
    </section>
  )
}

export function HowItWorks() {
  const steps = [[step1, 'Explore'], [step2, 'Import'], [step3, 'Adapt']]
  return (
    <section className="grid items-center gap-10 rounded-[24px] bg-coll-howto p-6 text-pink-70 sm:p-[55px] md:min-h-[330px] md:grid-cols-[492px_1fr]">
      <div>
        <h2 className="font-serif text-[30px] font-normal leading-[39px] tracking-[-0.6px]">How it works</h2>
        <p className="mt-3 max-w-[448px] font-sans text-[16px] font-medium leading-[22.4px]">Find a story you like, import it into your tenant, and tailor it to the way your team works.</p>
      </div>
      <div className="grid grid-cols-3 gap-8 max-sm:gap-4">
        {steps.map(([svg, label]) => (
          <div key={label} className="grid justify-items-center gap-3">
            <InlineSvg svg={svg} className="h-[97px] w-[97px]" />
            <span className="font-sans text-[16px] font-bold leading-[20.8px]">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Teams() {
  return (
    <section>
      <Eyebrow>Teams</Eyebrow>
      <div className="pb-[49px]"><H2>See what your team can build with Tines</H2></div>
      <CardGrid cols={{ base: 2, md: 5 }} gap={[24, 24]} className="max-sm:!gap-4">
        {teams.map((t) => (
          <a key={t.name} href="/library/" className={`grid gap-4 rounded-usp p-4 ${t.soft} ${t.ink}`}>
            <span className={`flex aspect-square items-center justify-center rounded-[12px] p-4 ${t.wrap}`}><img src={t.image} alt="" className="h-[135px] w-[117px] object-contain" /></span>
            <span className="font-sans text-[16px] font-semibold leading-[18.4px]">{t.name}</span>
          </a>
        ))}
      </CardGrid>
    </section>
  )
}

export function UseCases() {
  return (
    <section>
      <Eyebrow>Use cases</Eyebrow>
      <div className="pb-[48px]"><H2>Get inspired by our featured use cases</H2></div>
      <CardGrid cols={{ base: 1, md: 2 }} gap={[24, 24]}>
        {useCases.map((u) => (
          <a key={u.name} href="/library/" className={`group relative flex h-[250px] justify-between overflow-hidden rounded-usp p-10 text-lightest ${u.bg}`}>
            <div className="flex flex-col justify-between">
              <h3 className="max-w-[240px] font-serif text-[28px] font-normal leading-[32.2px] tracking-[-0.56px]">{u.name}</h3>
              <p className="font-sans text-[14px] font-bold leading-[16.1px]">View stories <span aria-hidden="true" className="inline-block transition-transform duration-100 group-hover:translate-x-[3px]">→</span></p>
            </div>
            <img src={u.image} alt="" className="absolute bottom-0 right-6 h-[190px] w-auto max-sm:h-[140px]" />
          </a>
        ))}
      </CardGrid>
    </section>
  )
}

export function LatestStories() {
  return (
    <section>
      <Eyebrow tone="bg-tint-rose-mid text-pink-65">Freshly baked</Eyebrow>
      <SectionHeader title="Latest stories" action={<a href="/library/stories/" className="font-sans text-[16px] font-semibold leading-[22.4px] text-pink-50 hover:underline">See more →</a>} className="!mb-[145px] [&_h2]:!text-[32px] [&_h2]:!leading-[33.6px] [&_h2]:!tracking-[-0.32px] max-sm:[&_h2]:!text-[24px]" />
      <CardGrid cols={{ base: 1, md: 2 }} gap={[30, 30]} className="max-sm:!gap-[18px]">
        {stories.map((s, i) => <StoryCard key={s.id} {...storyProps(s, i)} by={s.by} className="min-h-[280px]" />)}
      </CardGrid>
    </section>
  )
}

export function Partners() {
  return (
    <section>
      <Eyebrow>Partnerships</Eyebrow>
      <SectionHeader title="Build smart outcomes with these partners" action={<a href="/stories/templates/" className="font-sans text-[16px] font-semibold hover:underline">All tools →</a>} className="!mb-[94px] [&_h2]:max-w-[480px] [&_h2]:!text-[32px] [&_h2]:!leading-[33.6px] [&_h2]:!tracking-[-0.32px] max-sm:[&_h2]:!text-[24px]" />
      <CardGrid cols={{ base: 2, md: 5 }} gap={[24, 24]} className="max-sm:!gap-4">
        {tools.map((t) => (
          <a key={t.name} href="/stories/templates/" className="grid aspect-square content-between gap-4 rounded-usp border border-transparent bg-coll-tool-card p-6 text-purple-70 transition-[filter,border-color] duration-150 hover:border-coll-tool-edge hover:brightness-[1.03]">
            <img src={t.logo} alt="" className="h-12 w-12 object-contain" />
            <span className="font-sans text-[16px] font-semibold leading-[20.8px]">{t.name}</span>
          </a>
        ))}
      </CardGrid>
    </section>
  )
}

export function Community() {
  return (
    <section>
      <Eyebrow>Community selection</Eyebrow>
      <div className="pb-[93px]"><H2>From our community</H2></div>
      <CardGrid cols={{ base: 1, md: 2 }} gap={[30, 30]} className="max-sm:!gap-[18px]">
        {stories.slice(2, 6).map((s, i) => <StoryCard key={s.id} {...storyProps(s, i)} by={s.by || 'Cody Mood'} className="min-h-[280px]" />)}
      </CardGrid>
    </section>
  )
}

export function SubmitStory() {
  return (
    <section className="flex items-center justify-between gap-6 rounded-[24px] border border-dashed border-tint-lilac-line p-[55px] max-sm:p-6">
      <div>
        <h2 className="mb-[15px] font-serif text-[30px] font-normal leading-[34.5px] tracking-[-0.6px]">Submit your story</h2>
        <p className="mb-8 max-w-[480px] font-sans text-[16px] font-medium leading-[20.8px]">Built something others could use? Share it with the community.</p>
        <a href="/contact/" className="btn bg-accent text-lightest hover:brightness-110">Get in touch</a>
      </div>
      <InlineSvg svg={submitIcon} className="h-[92px] w-[92px] shrink-0 max-sm:hidden" />
    </section>
  )
}
