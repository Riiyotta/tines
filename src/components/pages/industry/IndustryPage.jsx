/**
 * IndustryPage: one shell for /financial-services/, /public-sector/ and /mssps/ (specs/pages-b.md section 4).
 * AreaNav (section links, no crumb) -> SolutionHero -> sections[] separated by the fixed spacers
 * (`margin` = --section-margin 156/96, `pad` = --section-padding 96/40, `xxl` = --sp-xxl 64/45, `none`) -> ExplosionCta (industry variant).
 * Each page supplies { hero, sections } from its sibling data file.
 */
import { AreaNav } from '../../shared/AreaNav.jsx'
import { CenteredQuote } from '../../shared/CenteredQuote.jsx'
import { ExplosionCta } from '../../shared/ExplosionCta.jsx'
import { ExampleCards } from '../../shared/ExampleCards.jsx'
import { FeatureHighlights } from '../../shared/FeatureHighlights.jsx'
import { G2BadgeList } from '../../shared/G2BadgeList.jsx'
import { PartnerLogoGrid } from '../../shared/PartnerLogoGrid.jsx'
import { QuoteCardNeue } from '../../shared/QuoteCardNeue.jsx'
import { SectionHeading } from '../../shared/SectionHeading.jsx'
import { ChildEntryCard, ChildEntryCardGrid } from '../../shared/ChildEntryCard.jsx'
import { ContentCard } from '../../shared/ContentCard.jsx'
import { ContentCardGrid } from '../../shared/ContentCardGrid.jsx'
import { RibbonQuote } from '../../shared/RibbonQuote.jsx'
import { UseCaseTabs } from '../../shared/UseCaseTabs.jsx'
import { SolutionHero } from '../../shared/SolutionHero.jsx'
import { OpeningParagraphs } from '../../shared/OpeningParagraphs.jsx'
import InlineSvg from '../../InlineSvg.jsx'
import { Kaleidoscope } from './Kaleidoscope.jsx'
import { MsspLogoMarquee } from './MsspLogoMarquee.jsx'
import { ServicesRibbon } from './ServicesRibbon.jsx'
import { ValuePropositionGrid } from './ValuePropositionGrid.jsx'
import quoteMark from '../../../../reference/svg/pages/solutions-it-quote-mark-1.svg?raw'
import { industryLinks, svg, MS } from './assets.js'

const WRAP = 'mx-auto w-full max-w-[1440px] px-page-wide'
const GAP = { margin: 'h-section-margin', pad: 'h-section-pad', xxl: 'h-sp-xxl', none: '' }

const G2_ALT = {
  Leader: 'Leader',
  MostImplementable: 'Most Implementable',
  BestUsability: 'Best Usability',
  BestRelationship: 'Best Relationship',
  EasiestToDoBusinessWith_Enterprise: 'Easiest To Do Business With, Enterprise',
  FastestImplementation_Enterprise: 'Fastest Implementation, Enterprise',
}

function ProductVisual({ base }) {
  return (
    <div className="mt-sp-xl flex w-full select-none justify-center xl:mt-sp-sm">
      <picture>
        <source media="(min-width: 1024px)" srcSet={`${base}-desktop.png`} />
        <source media="(min-width: 512px)" srcSet={`${base}-tablet.png`} />
        <img src={`${base}-phone.png`} alt="" className="mx-auto block h-auto w-full max-w-[1310px]" />
      </picture>
    </div>
  )
}

function Section({ s }) {
  switch (s.type) {
    case 'tabs':
      return <UseCaseTabs as="section" className={WRAP} header={s.header} tabs={s.tabs} />
    case 'quote':
      return (
        <CenteredQuote
          quote={s.quote}
          name={s.name}
          title={s.title}
          logo={s.logo ? <InlineSvg svg={s.logo} className="block h-[43px] w-[114px]" /> : undefined}
          button={s.button}
        />
      )
    case 'childGrid':
      return (
        <section className={WRAP}>
          <ChildEntryCardGrid layout="headingCell" title={s.title} description={s.description}>
            {s.cards.map((c) => (
              <ChildEntryCard key={c.title} {...c} />
            ))}
          </ChildEntryCardGrid>
        </section>
      )
    case 'banner':
      return (
        <RibbonQuote
          {...s}
          size="banner"
          as="section"
          className={WRAP}
          mark={<InlineSvg svg={quoteMark} className="block h-10 w-10" />}
          logo={<InlineSvg svg={s.logo} className="block h-[38px] w-[153px]" />}
        />
      )
    case 'kaleidoscope':
      return <Kaleidoscope lines={s.lines} />
    case 'content':
      return (
        <section className={WRAP}>
          <ContentCardGrid layout={s.layout} rows="auto">
            {s.cards.map(({ iconSrc, iconClass, ...c }) => (
              <ContentCard
                key={c.title}
                titleBleed={!c.caseDecor}
                compact
                {...c}
                icon={iconSrc ? <img src={iconSrc} alt="" className={iconClass || ''} /> : undefined}
              />
            ))}
          </ContentCardGrid>
        </section>
      )
    case 'productVisual':
      return <ProductVisual base={s.base} />
    case 'features':
      return <FeatureHighlights {...s} />
    case 'examples':
      return <ExampleCards title={s.title} button={s.button} cards={s.cards} />
    case 'partners':
      return <PartnerLogoGrid {...s} />
    case 'valueProps':
      return <ValuePropositionGrid {...s} />
    case 'quoteCards':
      return (
        <section className={WRAP}>
          {s.title && <SectionHeading solution max="max-w-[690px]">{s.title}</SectionHeading>}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {s.cards.map((c, i) => (
              <QuoteCardNeue
                key={c.stat || i}
                variant={s.stat ? 'stat' : 'quote'}
                quoteMark={s.stat ? undefined : svg.quoteMarkNeue}
                {...c}
                logo={c.logo ? <InlineSvg svg={c.logo} className="block w-[110px]" /> : undefined}
              />
            ))}
          </div>
        </section>
      )
    case 'services':
      return <ServicesRibbon {...s} />
    case 'g2':
      return (
        <section className={WRAP}>
          <G2BadgeList
            size={120}
            gap={24}
            itemWidth={120}
            imgSize={[130, 150]}
            className="max-sm:!gap-6 xl:[&>li+li]:ml-6 [&_li]:pb-1"
            badges={s.badges.map((b) => ({
              src: `${MS}/${b}.svg`,
              alt: `Tines is a ${G2_ALT[b]} on G2`,
              href: 'https://www.g2.com/products/tines/reviews?utm_source=rewards-medal',
            }))}
          />
        </section>
      )
    default:
      return null
  }
}

// Maps a page's `hero` data (industry data files) onto the shared SolutionHero props.
function Hero({ hero }) {
  const { variant, kicker, title, description, buttons, decoration, backdropSvg, aside, marqueeLogos, smallPrint, opening } = hero
  const common = { kicker, title, description, buttons }
  if (variant === 'split') {
    return (
      <SolutionHero
        {...common}
        variant="split"
        aside={<InlineSvg svg={aside} className="block h-auto w-[286px] max-md:order-3 max-md:mt-8 max-md:max-h-[220px] max-md:w-auto max-md:justify-self-center [&>svg]:max-md:max-h-[220px] [&>svg]:max-md:w-auto" />}
        footer={marqueeLogos ? <MsspLogoMarquee logos={marqueeLogos} /> : undefined}
      />
    )
  }
  const hasBackdrop = decoration?.left || decoration?.right || backdropSvg
  return (
    <SolutionHero
      {...common}
      decoration={decoration?.pageIcon ? { icon: { src: decoration.pageIcon, className: 'mb-[42px] h-auto w-[117px]' } } : undefined}
      backdrop={
        hasBackdrop ? (
          <>
            {decoration?.left && <img src={decoration.left} alt="" className="absolute -left-5 top-[40px] h-[454px] w-[360px] max-w-none" />}
            {decoration?.right && <img src={decoration.right} alt="" className="absolute -right-5 top-[23px] h-[454px] w-[360px] max-w-none" />}
            {backdropSvg && <InlineSvg svg={backdropSvg} className="absolute bottom-0 left-[70px] block h-[169px] w-[207px]" />}
          </>
        ) : undefined
      }
      smallPrint={
        smallPrint && (
          <>
            {smallPrint.map((l, i) => (
              <p key={i}>
                {l.text}
                {l.link && <a href={l.link.href} className="underline underline-offset-[.15em]">{l.link.label}</a>}
                {l.after}
              </p>
            ))}
          </>
        )
      }
    >
      {opening && <OpeningParagraphs variant="wide" heading={opening.title} paragraphs={opening.paragraphs} />}
    </SolutionHero>
  )
}

export default function IndustryPage({ page }) {
  const { hero, sections, slug } = page
  const links = industryLinks(slug)
  return (
    <div>
      <AreaNav pill={{ label: 'Solutions', static: true }} links={links} collapseLabel={links.find((l) => l.active)?.label} />
      <Hero hero={hero} />
      {sections.map((s, i) => (
        <div key={i}>
          <div className={GAP[s.gap || 'margin']} aria-hidden="true" />
          <Section s={s} />
        </div>
      ))}
      <div className="h-section-margin" aria-hidden="true" />
      <ExplosionCta variant="industry" />
    </div>
  )
}
