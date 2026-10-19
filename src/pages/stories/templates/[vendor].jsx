import { useParams } from 'react-router-dom'
import { NotFoundPage } from '../../../components/shared/NotFoundPage.jsx'
import { CardGrid, ContentCard, SectionHeader, StoryCard } from '../../../components/shared/index.js'
import StoriesNav, { ExplosionCta } from '../../../components/pages/stories/StoriesNav.jsx'
import BuildYourOwn from '../../../components/pages/stories/BuildYourOwn.jsx'
import TemplatesBackdrop from '../../../components/pages/stories/TemplatesBackdrop.jsx'
import { relatedResources, vendorBySlug } from '../../../components/pages/stories/data.js'

export const title = 'Templates | Tines Stories'
export const theme = 'plain'

const ACTION_TEMPLATES = ['Check an IP address', 'Check a CIDR block', 'Report an IP address', 'Bulk report IP addresses', 'Get the blacklist', 'Clear reports for an IP']
const QUICK = [
  { name: 'credentials', title: (v) => `${v} connect flow`, alt: 'Credentials documentation', body: 'Learn how to use credentials in Tines Stories.', href: '/stories/docs/credentials/' },
  { name: 'auth', title: () => 'Authentication guides', body: 'Learn how to authenticate third-party products for use with Tines Stories.', href: '/stories/docs/' },
]
const arrowOut = <span aria-hidden="true" className="absolute right-4 top-4 text-[12px] opacity-60">↗</span>

/** Vendor / product detail (specs/pages-c.md §5.5). Unknown vendors fall back to a "not found in this clone" state. */
export default function VendorTemplate() {
  const v = vendorBySlug(useParams().vendor)
  if (!v) {
    return (
      <>
        <StoriesNav crumb="Templates" crumbHref="/stories/templates/" active="Discover" />
        <NotFoundPage actions={[{ href: "/stories/templates/", label: "All templates" }, { href: "/", label: "Back to home" }]} />
      </>
    )
  }
  const workflows = (
    <section key="wf" className="mt-[72px] sm:mt-[125px]">
      <SectionHeader
        serif
        title="Full workflow examples"
        descriptionMobile description={`Explore pre-built workflows for ${v.name}. Use them for inspiration or as a starting point to build your custom automation solution.`}
        action={<a href="/library/" className="btn btn-outlined">Explore all →</a>}
        className="!mb-[55px] !items-center"
      />
      <CardGrid cols={{ base: 1, md: 2, lg: 3 }} gap={[24, 24]} className="max-sm:!gap-2">
        {v.stories.map((s) => <StoryCard key={s.id} {...s} description={undefined} className="sm:h-[280px]" />)}
      </CardGrid>
    </section>
  )
  const build = <BuildYourOwn key="byo" className="mt-6 sm:mt-16" />
  const prebuilt = v.prebuilt && (
    <section key="pre" className="mt-[72px] sm:mt-[125px] pb-[15px]">
      <SectionHeader serif title="Pre-built templates" className="!mb-[55px]" description={`Ready-made ${v.name} actions you can drop straight onto the storyboard.`} />
      <CardGrid cols={{ base: 1, md: 2, lg: 3 }} gap={[24, 24]}>
        {ACTION_TEMPLATES.map((a) => (
          <a key={a} href="/stories/docs/templates/" className="block rounded-usp border border-tint-lilac-edge bg-purple-5 p-5 transition-colors duration-150 hover:border-purple-50">
            <p className="font-mono text-mono-label-sm font-bold uppercase">Action template</p>
            <h3 className="mt-2 font-sans text-[18px] font-semibold leading-[21.6px]">{a}</h3>
            <p className="mt-2 font-sans text-[14px] font-medium leading-[19.6px]">A placeholder description of what this pre-built {v.name} action does.</p>
          </a>
        ))}
      </CardGrid>
    </section>
  )
  const order = v.prebuilt ? [prebuilt, build, workflows] : [workflows, build]
  return (
    <>
      <StoriesNav crumb="Templates" crumbHref="/stories/templates/" active="Discover" />
      <div className="relative">
        <TemplatesBackdrop faded />
        <div className="mx-auto max-w-[1440px] px-page-wide pb-[125px] pt-[14px] sm:pt-[94px]">
          <header className="grid gap-6 lg:grid-cols-[736px_368px] max-lg:text-center">
            <div className="max-lg:order-2">
              <a href="/stories/templates/" className="font-mono text-mono-dt font-semibold uppercase hover:underline">Templates</a>
              <h1 className="mt-[46px] font-serif lg:mt-10 text-display-xl-sm font-light sm:text-display-xl">{v.name} × Tines</h1>
              <p className="mx-auto mt-6 max-w-[600px] font-serif text-[20px] font-medium leading-[26px] lg:mx-0 lg:mr-[136px]">
                Integrating Tines and <a href="/stories/templates/" className="font-semibold underline">{v.name}</a> automates secure, connected workflows, improving operational efficiency and enhancing security work.
              </p>
              <div className="mt-6 grid grid-cols-[156px_156px] justify-center gap-2 lg:justify-start">
                <a href="/book-a-demo/" className="btn border-legacy-ink bg-legacy-ink text-lightest hover:brightness-110">Book a demo</a>
                <a href="https://login.tines.com/saml_idp/signup" className="btn btn-outlined">Sign up free</a>
              </div>
            </div>
            <div className="relative z-[2] flex items-center justify-center max-lg:order-1">
              <span className="flex h-[90px] w-[90px] items-center justify-center rounded-full border border-tint-lilac-line bg-lightest lg:h-[220px] lg:w-[220px]">
                <img src={v.icon} alt="" className="h-12 w-12 object-contain lg:h-20 lg:w-20" />
              </span>
            </div>
          </header>

          {order.map((x) => x)}

          <section className="mt-[72px] sm:mt-[125px]">
            <SectionHeader serif title="Connect quickly" className="!mb-[55px]" description="It takes minutes, not months, to connect to tools in Tines Stories." />
            <CardGrid cols={{ base: 1, md: 2 }} gap={[24, 24]}>
              {QUICK.map((q) => (
                <a key={q.name} href={q.href} className="relative flex h-[200px] flex-col justify-end sm:h-[260px] rounded-usp border border-tint-lilac-edge bg-purple-5 p-6 transition-colors duration-150 hover:border-purple-50">
                  {arrowOut}
                  <h3 className="font-sans text-[24px] font-semibold leading-[25px] max-sm:text-[18px]">{q.title(v.name)}</h3>
                  <p className="mt-3 font-sans text-[14px] font-medium leading-[16.8px]">{q.body}</p>
                </a>
              ))}
            </CardGrid>
          </section>

          <section className="mt-[72px] sm:mt-[125px]">
            <SectionHeader serif title="Explore more resources" className="!mb-[55px]" description="Check out our blogs, browse our learning paths, and more." />
            <CardGrid cols={{ base: 2, lg: 4 }} gap={[24, 24]} className="max-sm:!gap-2">
              {relatedResources.map((r, i) => (
                <ContentCard
                  key={r.title}
                  {...r}
                  tone={['orange', 'green', 'purple', 'pink'][i]}
                  body={[null, 'Discover how companies, from Fortune 10 to startups, apply Tines Stories to transform how their teams operate.', 'Build your knowledge with dedicated learning paths at all levels.', null][i]}
                  className="min-h-[215px] !rounded-[10px] !p-6 !pb-[50px] sm:min-h-[360px] max-sm:!p-4"
                />
              ))}
            </CardGrid>
          </section>
        </div>
      </div>
      <ExplosionCta storiesFit />
    </>
  )
}
