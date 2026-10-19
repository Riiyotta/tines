// /soar/ (legacy Gatsby, simple chrome). specs/pages-a.md §11. Theme 'plain': bg lightest, fg purple-65.
import { useRef } from 'react'
import { LegacyHero, LegacyButton, CenteredIntro, ContentCard, DemoForm } from '../components/shared/index.js'
import InlineSvg from '../components/InlineSvg.jsx'
import { StatCards, TrustedBox, FeatureRows, WholeTeam, HardToBelieve } from '../components/pages/soar/Sections.jsx'
import { HERO_ILLO, RATINGS, CARDS, asset } from '../components/pages/soar/data.js'
import { useMarqueeDrift } from '../components/pages/_lib/motion.js'
import shield from '../../public/assets/pages/soar/1730978909-spot-icon-floating-shielded-building.svg?raw'
import assetMgmt from '../../public/assets/pages/soar/1746808120-spot-icon-asset-management.svg?raw'
import appSec from '../../public/assets/pages/soar/1731492731-tines-illo-application-security.svg?raw'
import gridBg from '../../reference/svg/pages/soar-talk-to-a-product-expert.svg?raw'

export const title = 'Break away from legacy SOAR | Tines'
export const theme = 'plain'
export const chrome = 'simple'

const sec = 'mx-auto w-full max-w-[1440px] px-page-wide'

export default function Soar() {
  const root = useRef(null)
  useMarqueeDrift(root)
  return (
    <div ref={root}>
      <LegacyHero
        variant="split"
        className="max-md:!pt-[63px] md:!pt-[104px] md:min-h-[507px] md:items-start [&>div]:min-w-0"
        title="Break away from legacy SOAR"
        illustration={<img src={HERO_ILLO} alt="" className="h-auto w-full max-w-[535px]" />}
        actions={
          <>
            <LegacyButton shape="pill" href="#book-a-demo-form">Book a demo</LegacyButton>
            <LegacyButton shape="pill" variant="outlined" href="/blog/">SOAR migration guide</LegacyButton>
            <InlineSvg svg={RATINGS} className="mt-[26px] block h-9 w-[419px] max-w-full shrink-0" label="Rated 4.8 on G2 and Gartner" />
          </>
        }
      >
        SOAR platforms run mission-critical security workflows, yet they are often hard to maintain and slow to adapt. Tines gives your security team a friendly, flexible platform that delivers results right away, without the weight and overhead of legacy tools.
      </LegacyHero>

      <section className={`${sec} mt-section-margin`}>
        <CenteredIntro icon={shield} iconClass="mb-[3px] h-[90px] w-[68px]" title="Modernize your security approach">
          Tines helps security teams reach their goals sooner than traditional tools allow. Practitioners use it to respond to events faster, cut through duplicate alerts, and work together more efficiently.
        </CenteredIntro>
      </section>

      <section className={`${sec} mt-[82px]`}><StatCards /></section>

      <section className={`${sec} mt-[163px] sm:mt-section-margin xl:mt-[163px]`}>
        <div className="grid items-start gap-6 md:grid-cols-[1fr_158px] xl:grid-cols-[946px_158px]">
          <div>
            <h2 className="max-w-[624px] font-serif text-[32px] font-normal leading-[1] tracking-[-0.48px] sm:text-[48px] sm:tracking-[-0.72px]">Meet Tines: purpose-built to scale your security operations</h2>
            <p className="mt-6 max-w-[640px] font-sans text-[16px] font-medium leading-[22.4px]">Tines security orchestration and automation goes beyond traditional SOAR, helping teams move faster and make better decisions in real time.</p>
          </div>
          <img src={asset('1731492762-tines-illo-build.svg')} alt="" className="hidden h-[176px] w-[158px] md:block" />
        </div>
      </section>

      <section className={`${sec} mt-section-margin xl:mt-[152px]`}><TrustedBox /></section>

      <FeatureRows />

      <section className={`${sec} mt-section-margin`}><WholeTeam /></section>

      <section className={`${sec} mt-section-margin pb-[3px]`}>
        <CenteredIntro icon={assetMgmt} iconClass="mb-[4px] h-[90px] w-[84px]" title="Key resources" />
      </section>

      <section className={`${sec} mt-[78px]`}>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-4">
          {CARDS.map((c) => (
            <ContentCard
              key={c.title}
              eyebrow={c.eyebrow}
              title={c.title}
              cta={c.cta}
              href={c.href}
              ext={c.ext}
              tone={c.tone}
              legacy={c.legacy}
              caseDecor={c.caseDecor}
              className="min-h-[217px] sm:min-h-[340px]"
              icon={
                c.logo ? <img src={c.logo} alt="" className="w-32" /> : <img src={c.icon} alt="" className={`w-auto ${c.iconH}`} />
              }
            />
          ))}
        </div>
      </section>

      <section className={`${sec} mt-24 text-center`}>
        <p className="mx-auto max-w-[500px] font-serif text-[20px] font-normal leading-[28px]">From SOAR to incident response, Tines breaks down barriers across systems, with fewer duplicate efforts, unnecessary alerts, and information silos.</p>
        <LegacyButton shape="pill" href="#book-a-demo-form" className="mt-10">See Tines in action</LegacyButton>
      </section>

      <section className={`${sec} mt-section-margin`}><HardToBelieve /></section>

      <section id="book-a-demo-form" className={`${sec} mt-section-margin mb-10`}>
        <div className="relative overflow-hidden rounded-usp bg-purple-5 [--c-purple20:theme(colors.purple.20)]">
          <InlineSvg svg={gridBg} className="pointer-events-none absolute inset-0 h-full w-full [&>svg]:h-full [&>svg]:w-full" />
          <DemoForm variant="embedded" icon={appSec} className="relative !bg-transparent !pb-[110px]" />
        </div>
      </section>
    </div>
  )
}
