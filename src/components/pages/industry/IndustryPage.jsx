/**
 * IndustryPage: one shell for /financial-services/, /public-sector/ and /mssps/ (specs/pages-b.md section 4).
 * AreaNav (section links, no crumb) -> IndustryHero -> sections[] separated by the fixed spacers
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
import InlineSvg from '../../InlineSvg.jsx'
import { BannerQuote } from './BannerQuote.jsx'
import { ChildCardGrid } from './ChildCardGrid.jsx'
import { ContentCardGrid } from './ContentCardGrid.jsx'
import { IndustryHero } from './IndustryHero.jsx'
import { Kaleidoscope } from './Kaleidoscope.jsx'
import { MsspLogoMarquee } from './MsspLogoMarquee.jsx'
import { ServicesRibbon } from './ServicesRibbon.jsx'
import { UseCaseTabs } from './UseCaseTabs.jsx'
import { ValuePropositionGrid } from './ValuePropositionGrid.jsx'
import { industryLinks, svg, MS } from './assets.js'

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
      return <UseCaseTabs header={s.header} tabs={s.tabs} />
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
      return <ChildCardGrid {...s} />
    case 'banner':
      return <BannerQuote {...s} logo={<InlineSvg svg={s.logo} className="block h-[38px] w-[153px]" />} />
    case 'kaleidoscope':
      return <Kaleidoscope lines={s.lines} />
    case 'content':
      return (
        <ContentCardGrid
          layout={s.layout}
          cards={s.cards.map(({ iconSrc, iconClass, ...c }) => ({
            ...c,
            icon: iconSrc ? <img src={iconSrc} alt="" className={iconClass || ''} /> : undefined,
          }))}
        />
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
        <section className="mx-auto w-full max-w-[1440px] px-page-wide">
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
        <section className="mx-auto w-full max-w-[1440px] px-page-wide">
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

export default function IndustryPage({ page }) {
  const { hero, sections, slug } = page
  const links = industryLinks(slug)
  const heroProps = {
    ...hero,
    footer: hero.marqueeLogos ? <MsspLogoMarquee logos={hero.marqueeLogos} /> : undefined,
    smallPrint: hero.smallPrint && (
      <>
        {hero.smallPrint.map((l, i) => (
          <p key={i}>
            {l.text}
            {l.link && <a href={l.link.href} className="underline underline-offset-[.15em]">{l.link.label}</a>}
            {l.after}
          </p>
        ))}
      </>
    ),
  }
  return (
    <div>
      <AreaNav pill={{ label: 'Solutions', static: true }} links={links} collapseLabel={links.find((l) => l.active)?.label} />
      <IndustryHero {...heroProps} />
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
