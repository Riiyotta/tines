// DEV ONLY gallery for src/components/shared (route /dev/shared-gallery/). Delete before shipping.
// Every block is wrapped in a data-page-theme element so theme variants can be compared on one page
// (the [data-page-theme] CSS vars in index.css apply to any element, not only <html>).
import {
  AreaNav, ArticleEntryCard, ArticleLayout, AuthorChip, CardGrid, CaseStudyBookCard, Callout, CenteredIntro, ContentCard,
  CoverCard, DemoForm, ExplosionCta, FaqAccordion, FilterBar, G2BadgeList, HeroCopy, ImageBlock, JoinedSearchSelect,
  LegacyButton, LegacyHero, LegacyLogoMarquee, LogoMarquee, PageSection, PaginatedListNav, PersonInfo, Pill, Prose,
  PillDropdown, PullQuote, PullQuoteCard, QuoteCard, RelatedGrid, SearchPill, SectionHeader, SectionHeading,
  SegmentedTabs, SidebarLayout, SidebarSearch, SimplePageHero, SplitRibbonCard, StoryCard, NewsletterSection,
  TintedBlock, ValueCards, VideoBlock, THEMES,
} from '../../components/shared/index.js'
import CtaStartToday from '../../components/CtaStartToday.jsx'
import brex from '../../../reference/svg/pages/case-studies-logo-brex.svg?raw'
import notion from '../../../reference/svg/pages/case-studies-logo-notion.svg?raw'
import vimeo from '../../../reference/svg/pages/case-studies-logo-vimeo.svg?raw'

export const title = 'Shared component gallery'
export const theme = 'plain'

const P = '/assets/pages'
const g2 = ['Leader', 'MostImplementable', 'BestUsability', 'BestRelationship', 'EasiestToDoBusinessWith_Enterprise', 'FastestImplementation_Enterprise'].map((n) => ({
  src: `${P}/pricing/${n}.svg`, alt: `G2 badge ${n}`,
}))
const faq = [
  { q: 'Do you offer flexible hosting options?', a: <p>Placeholder answer with <a href="#">an inline link</a> and a second short sentence.</p> },
  { q: 'Is there a community I can join?', a: <p>Another short placeholder answer for the accordion.</p> },
  { q: 'Do you offer startup discounts?', a: <p>A third short placeholder answer.</p> },
]

function Block({ theme, name, children, bare }) {
  return (
    <div data-page-theme={theme} className="bg-page-bg text-page-fg">
      <div className="border-b border-dashed border-page-fg/30 px-4 py-2 font-mono text-[11px] uppercase">{name} {theme ? `(theme: ${theme})` : ''}</div>
      <div className={bare ? '' : 'py-12'}>{children}</div>
    </div>
  )
}

export default function SharedGallery() {
  return (
    <div>
      <Block name="AreaNav 3b / examples / customers / partners" theme="3b" bare>
        <AreaNav pill={{ label: 'Tines 3B', href: '#' }} pillTone="purple-10" links={[{ label: 'Examples', href: '#' }, { label: 'Updates', href: '#' }, { label: 'Academy', href: '#', ext: true }, { label: 'Docs', href: '#', ext: true }]} cta={{ label: 'Get started', href: '#' }} />
      </Block>
      <Block name="AreaNav crumb + toggle" theme="plain" bare>
        <AreaNav pill={{ label: 'Tines 3B', href: '#' }} crumbs={[{ label: 'Examples', href: '#' }]} links={[{ label: 'Overview', href: '#', caret: true, active: true }, { label: 'Directory', href: '#' }]} showThemeToggle cta={{ label: 'Try Tines Stories', href: '#' }} />
        <AreaNav pill={{ label: 'Customers', href: '#' }} links={[{ label: 'All case studies', href: '#' }]} />
      </Block>

      <Block name="HeroCopy + LogoMarquee size=lg (white on purple-50)" theme="pricing">
        <div className="mx-auto max-w-page px-page"><HeroCopy title={['The AI-native', 'workflow platform']} byline="Short placeholder byline for the hero copy block." /></div>
        <div className="mx-auto mt-10 max-w-page px-page"><LogoMarquee size="lg" /></div>
      </Block>

      <Block name="SectionHeading + G2BadgeList + FaqAccordion lg" theme="pricing">
        <PageSection>
          <SectionHeading>Don’t take our word for it</SectionHeading>
          <G2BadgeList badges={g2} />
        </PageSection>
        <PageSection wider className="mt-24">
          <FaqAccordion heading="FAQs" items={faq} size="lg" />
        </PageSection>
      </Block>

      <Block name="SplitRibbonCard quote (pricing)" theme="pricing">
        <PageSection>
          <SplitRibbonCard variant="quote" tone="bg-purple-60 border-purple-40" tab={<div className="h-[397px]" />}>
            <blockquote className="my-[30px] font-serif text-[20px] leading-[26px] text-purple-5 sm:text-[30px] sm:leading-[37.5px]">Placeholder quote text of a few lines showing how the ribbon overlaps its tab panel.</blockquote>
            <p className="font-bold">Name Surname</p><p className="font-medium">Role, Company</p>
          </SplitRibbonCard>
        </PageSection>
      </Block>

      <Block name="FaqAccordion md + SplitRibbonCard figure + PullQuoteCard card/centered" theme="3b">
        <PageSection><FaqAccordion heading="Frequently asked questions" items={faq} size="md" /></PageSection>
        <PageSection className="mt-24">
          <SplitRibbonCard
            variant="figure" tone="bg-purple-2 border-tint-violet-mid"
            tab={<div className="p-10"><h2 className="font-serif text-[36px] leading-[41.4px] tracking-[-0.72px]">Short ribbon heading</h2><p className="mt-[30px] max-w-[448px] text-[14px] leading-[19.6px]">Placeholder copy.</p></div>}
            panelClass="bg-orange-2 !border-[color:#ff9c5b] p-10 min-h-[300px]"
          >
            <p className="font-serif text-[22px] text-orange-70">Placeholder figure quote.</p>
          </SplitRibbonCard>
        </PageSection>
        <PageSection className="mt-24"><div className="max-w-[544px]"><PullQuoteCard quote="Short placeholder quote for the frosted card." name="Name Surname" title="Role" /></div></PageSection>
        <PageSection className="mt-24"><PullQuoteCard variant="centered" quote="A placeholder centered quote that spans a couple of lines to show the layout." name="Name Surname" title="Analyst" logo={<span className="font-bold">LOGO</span>} /></PageSection>
      </Block>

      <Block name="SplitRibbonCard legacy + LegacyHero + LegacyButton + CenteredIntro" theme="enterprise">
        <LegacyHero kicker="Enterprise" title="Intelligent workflows for the enterprise" actions={<LegacyButton href="#">Book a demo</LegacyButton>}>Short placeholder hero text for the legacy hero block.</LegacyHero>
        <PageSection className="mt-12">
          <SplitRibbonCard variant="legacy" tone="bg-tint-peach border-tint-peach-edge" tab={<div><h2 className="font-serif text-section-h2 text-orange-70">With you every step</h2></div>} panelClass="min-h-[300px]">
            <div className="flex gap-2"><LegacyButton variant="outlined" href="#">Outlined</LegacyButton><LegacyButton shape="pill" href="#">Pill</LegacyButton><LegacyButton shape="pill" mono href="#">Mono pill</LegacyButton></div>
          </SplitRibbonCard>
        </PageSection>
        <PageSection className="mt-24"><CenteredIntro title="Modernize your security approach">Short placeholder text under the heading.</CenteredIntro></PageSection>
        <div className="mt-16"><LegacyLogoMarquee label="Trusted by global leaders across industries" /></div>
        <PageSection className="mt-16"><LegacyLogoMarquee rows={2} boxed /></PageSection>
        <ExplosionCta variant="legacy" />
      </Block>

      <Block name="ContentCard / ArticleEntryCard / QuoteCard / ValueCards / CaseStudyBookCard" theme="plain">
        <PageSection>
          <CardGrid cols={{ base: 1, md: 2, lg: 4 }} gap={[24, 24]}>
            <ContentCard eyebrow="Blog" title="Short placeholder card title" cta="Read now" tone="pink" minH={200} />
            <ContentCard eyebrow="Webinar" title="Another card title" cta="Watch now" tone="orange" ext minH={200} />
            <ContentCard eyebrow="Podcast" title="Third card title" cta="Listen" tone="purple" minH={200} />
            <ContentCard eyebrow="Case study" title="Solid case study" cta="Read" tone="case-purple" minH={200} />
          </CardGrid>
          <CardGrid cols={{ base: 1, md: 2 }} className="mt-12">
            <ArticleEntryCard title="Placeholder article entry title" />
            <ArticleEntryCard title="Second placeholder article entry" />
          </CardGrid>
          <CardGrid cols={{ base: 1, md: 2 }} className="mt-12">
            <QuoteCard tone="orange" quote="Placeholder quote text, short." name="Name" role="Role" />
            <QuoteCard tone="purple" quote="Another placeholder quote." name="Name" role="Role" />
          </CardGrid>
          <CardGrid cols={{ base: 1, md: 3 }} className="mt-12">
            <CaseStudyBookCard palette="purple" logo={notion} quote="A short original placeholder quote about saving time every week." />
            <CaseStudyBookCard palette="pink" logo={brex} stat={{ value: '90%', label: 'of weekly alerts analyzed' }} />
            <CaseStudyBookCard palette="green" logo={vimeo} quote="Short placeholder quote." />
          </CardGrid>
        </PageSection>
      </Block>

      <Block name="ValueCards about (dark) / careers" theme="about">
        <PageSection><ValueCards variant="about" /></PageSection>
      </Block>
      <Block name="ValueCards careers" theme="plain"><PageSection><ValueCards variant="careers" /></PageSection></Block>

      <Block name="DemoForm card + embedded" theme="3b">
        <div className="px-4"><DemoForm /></div>
      </Block>
      <Block name="DemoForm embedded" theme="plain"><PageSection><DemoForm variant="embedded" /></PageSection></Block>

      <Block name="SimplePageHero left / centered" theme="plain">
        <SimplePageHero title="Your AI interaction layer" actions={<><a className="btn btn-filled" href="#">Sign up free</a><a className="btn btn-outlined" href="#">Book a demo</a></>}>Short placeholder hero text.</SimplePageHero>
        <SimplePageHero align="center" title="Contact us">Placeholder subtitle with a <a className="font-bold" href="#">link</a>.</SimplePageHero>
      </Block>

      <Block name="Collections: CoverCard default + featured, SectionHeader, CardGrid, PaginatedListNav, Pills" theme="plain">
        <div className="mx-auto max-w-page px-page">
          <CoverCard variant="featured" title="Featured article headline placeholder" excerpt="Short placeholder excerpt that wraps onto a couple of lines to show the layout of the featured card." author={{ prefix: 'Written by', name: 'Name Surname', role: 'Role' }} />
          <SectionHeader className="mt-24" title="Latest articles" action={{ label: 'See all →', href: '#' }} />
          <CardGrid cols={{ base: 1, md: 2, lg: 3 }} gap={[64, 24]}>
            {[1, 2, 3].map((n) => <CoverCard key={n} title={`Placeholder article ${n}`} />)}
          </CardGrid>
          <div className="mt-12"><PaginatedListNav page={11} total={22} /></div>
          <div className="mt-8 flex gap-2"><Pill>Nov 5</Pill><Pill tone="bg-purple-15 text-purple-70" size="md" rounded="24">9:30 PM local</Pill></div>
          <div className="mt-8"><RelatedGrid title="More case studies" items={[1, 2, 3]} renderItem={() => <CaseStudyBookCard logo={notion} quote="Placeholder." />} footer={<a className="btn btn-sans btn-outlined" href="#">See all case studies</a>} /></div>
        </div>
      </Block>

      <Block name="FilterBar parts" theme="plain">
        <div className="mx-auto max-w-page space-y-6 px-page">
          <FilterBar><SearchPill placeholder="Search updates" /><PillDropdown label="Categories" options={['All', 'News']} /><PillDropdown label="RSS" /></FilterBar>
          <SegmentedTabs tabs={[{ value: 'a', label: 'Upcoming' }, { value: 'b', label: 'Webinars' }, { value: 'c', label: 'Builder Connect' }]} active="a" search="Search" />
          <JoinedSearchSelect placeholder="Search products" options={['All categories', 'Productivity']} />
          <div className="flex gap-6"><SidebarSearch /><SidebarSearch variant="webinar" placeholder="Search..." /></div>
        </div>
      </Block>

      <Block name="NewsletterSection" theme="plain"><div className="mx-auto max-w-[1128px] px-page"><NewsletterSection /></div></Block>

      <Block name="ArticleLayout + Prose + Callout + TintedBlock + PullQuote + ImageBlock + VideoBlock + AuthorChip + PersonInfo" theme="plain">
        <ArticleLayout aside={<p className="text-[14px]">Sticky aside placeholder.</p>}>
          <div className="mb-6 grid max-w-[860px] grid-cols-1 gap-4 md:grid-cols-2"><AuthorChip name="Name Surname" role="Role" /><AuthorChip name="Other Name" role="Role" /></div>
          <PersonInfo prefix="Written by" name="Name Surname" role="Role" />
          <Prose>
            <p>Placeholder paragraph of prose text, with <strong>strong</strong>, <em>emphasis</em> and <a href="#">a link</a>.</p>
            <h2>Section heading</h2>
            <p>Another paragraph.</p>
            <ul><li>First item</li><li>Second item</li></ul>
          </Prose>
          <Callout><p>Placeholder note text.</p></Callout>
          <TintedBlock><h2 className="font-serif text-prose-h2">Further reading:</h2><a href="#">A link</a></TintedBlock>
          <TintedBlock tone="green"><a href="#">Green block link</a></TintedBlock>
          <PullQuote source="Name Surname, Role">Placeholder pull quote text for the case study layout.</PullQuote>
          <ImageBlock src={`${P}/customers/gartner-cool-vendor-2021.png`} alt="" />
          <VideoBlock />
        </ArticleLayout>
      </Block>

      <Block name="StoryCard lg + sm, 4 themes" theme="plain">
        <div className="mx-auto max-w-page px-page">
          <CardGrid cols={{ base: 1, md: 2, lg: 4 }}>
            {['green', 'purple', 'orange', 'pink'].map((t) => (
              <StoryCard key={t} theme={t} name={`${t} story`} description="Short placeholder description of what the story does, clamped to two lines." tools="Slack, Jira" by="Name" icons={[{ emoji: '🔔' }, { emoji: '📨' }]} className="min-h-[280px]" />
            ))}
          </CardGrid>
          <CardGrid cols={{ base: 1, md: 2 }} className="mt-6">
            <StoryCard size="sm" theme="purple" name="Small story" tools="Slack" icons={[{ emoji: '🔔' }]} className="min-h-[236px]" />
          </CardGrid>
        </div>
      </Block>

      <Block name="SidebarLayout" theme="plain" bare>
        <SidebarLayout aside={<><h1 className="font-serif text-[36px]">Webinars</h1><SidebarSearch variant="webinar" placeholder="Search..." className="mt-4" /></>}>
          <p>Main column placeholder.</p>
        </SidebarLayout>
      </Block>

      <Block name="ExplosionCta stories" theme="plain" bare><ExplosionCta /></Block>

      <Block name="CtaStartToday dark (about theme)" theme="about" bare><CtaStartToday flush /></Block>
      <Block name="Theme colour map" theme="plain">
        <div className="mx-auto flex max-w-page flex-wrap gap-3 px-page">
          {Object.entries(THEMES).map(([k, t]) => <div key={k} className={`rounded-usp border p-4 ${t.soft} ${t.line} ${t.dark}`}>{k}</div>)}
        </div>
      </Block>
    </div>
  )
}
