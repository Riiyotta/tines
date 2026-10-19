// /about/ (specs/pages-a.md §6). Dark 'about' theme.
import { PageSection, SectionHeading, ValueCards } from '../components/shared/index.js'
import InlineSvg from '../components/InlineSvg.jsx'
import CtaStartToday from '../components/CtaStartToday.jsx'
import { LEADERS, INVESTORS, VALUES } from '../components/pages/about/data.js'
import illustration from '../../reference/svg/pages/about-l7fuyq-illustration.svg?raw'
import linkedin from '../../reference/svg/pages/about-linkedin-com-in-eoinhinchy.svg?raw'
import mascot from '../../reference/svg/pages/about-cardfooter-logo-1.svg?raw'
import joinMascot from '../../reference/svg/pages/about-ys8.svg?raw'
import icon1 from '../../reference/svg/pages/about-g1t3uw-cardheader.svg?raw'
import icon2 from '../../reference/svg/pages/about-g1t3uw-cardheader-2.svg?raw'
import icon3 from '../../reference/svg/pages/about-g1t3uw-cardheader-3.svg?raw'

export const title = 'About | Tines'
export const theme = 'about'

const KICKER = 'font-sans text-[12px] font-semibold uppercase leading-[16.8px] tracking-[1.2px]'
const ICONS = [icon1, icon2, icon3]
const ICON_W = [74, 89, 94]
const valueItems = VALUES.map((v, i) => ({ ...v, icon: ICONS[i], iconW: ICON_W[i] }))

function Founder({ className, photo, name, chip }) {
  return (
    <div className={`absolute z-10 ${className}`}>
      <img src={photo} alt="" width="72" height="72" className="h-16 w-16 rounded-full object-cover sm:h-[72px] sm:w-[72px]" />
      <span className={`absolute left-[38px] top-[49px] rounded sm:left-[43px] sm:top-[56px]-[990px] px-[10px] py-1 font-sans text-[12px] font-semibold leading-[13.8px] ${chip}`}>{name}</span>
    </div>
  )
}

export default function About() {
  return (
    <div className="pb-[45px] sm:pb-16">
      <header className="mx-auto max-w-[1440px] px-page-wide pt-[35px] text-center sm:pt-[55px]">
        <p className={KICKER}>About us</p>
        <h1 className="mt-[18px] font-serif text-[38px] font-normal leading-[37px] tracking-[-0.76px] sm:mt-[30px] sm:text-[64px] sm:leading-[62.08px] sm:tracking-[-1.92px]">
          <span className="block">The intelligent</span>
          <span className="block">workflow platform.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[720px] font-sans text-[16px] font-medium leading-[22.5px] sm:mt-10 sm:text-[18px] sm:leading-[25.2px]">
          We believe that combining AI, automation and integration with human ingenuity makes organizations more efficient, secure and effective, with happier teams.
        </p>
        <InlineSvg svg={illustration} className="mx-auto mt-[35px] !block aspect-[976/555] w-full max-w-[976px] sm:mt-[55px]" />
      </header>

      <PageSection spaced>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="relative py-12 sm:py-[54px]">
          <Founder className="left-[242px] top-[-16px] sm:left-[426px] sm:top-[36px]" photo="/assets/pages/about/tines-photo-icon-eoin-hinchy.jpg" name="Eoin" chip="bg-purple-50 text-purple-5" />
          <Founder className="left-12 top-[401px] sm:left-[-36px] sm:top-[457px]" photo="/assets/pages/about/tines-photo-icon-thomas-kinsella.jpg" name="Thomas" chip="bg-pink-50 text-tint-rose" />
          <div className="max-w-[480px] pb-16 sm:pb-[90px]">
            <p className={KICKER}>How it started</p>
            <h2 className="mt-[18px] font-serif text-[32px] font-normal leading-[33.6px] tracking-[-0.64px] sm:mt-[30px] sm:text-[44px] sm:leading-[46.2px] sm:tracking-[-1.32px]">
              <span className="block">Born in security,</span>
              <span className="block">used by everyone.</span>
            </h2>
            <p className="mt-6 font-sans text-[16px] font-medium leading-[22.5px] sm:mt-10 sm:text-[18px] sm:leading-[25.2px]">
              Before Tines, our founders,{' '}
              <a className="underline" href="https://www.linkedin.com/in/eoinhinchy/" target="_blank" rel="noopener noreferrer">Eoin</a> and{' '}
              <a className="underline" href="https://www.linkedin.com/in/thomaskinsella/" target="_blank" rel="noopener noreferrer">Thomas</a>, spent a decade as security operators, living the repetitive work every team recognizes. They set out to build one dependable tool that removes it for good. Teams soon said how much time it gave back, and in 2018 the company began.
            </p>
          </div>
          </div>
          <div className="flex flex-col justify-between gap-[26px] rounded-[12px] border border-tint-lilac-edge bg-tint-lilac-line p-6 text-purple-80 sm:rounded-usp sm:p-[55px]">
            <div>
              <p className={KICKER}>Our mission</p>
              <p className="mt-6 max-w-[576px] font-sans text-[28px] font-semibold leading-[30.8px] tracking-[-0.84px] sm:mt-10 sm:text-[48px] sm:leading-[52.8px] sm:tracking-[-1.44px]">To power the world’s most important workflows.</p>
            </div>
            <InlineSvg svg={mascot} className="h-[80px] w-[48px]" />
          </div>
        </div>
      </PageSection>

      <PageSection spaced>
        <SectionHeading align="left" mb={false} className="!text-[32px] !leading-[36.8px] !tracking-[-0.64px] sm:!text-[48px] sm:!leading-[55.2px] sm:!tracking-[-1.44px]">Our leadership</SectionHeading>
        <ul className="m-0 mt-[35px] grid list-none grid-cols-2 gap-2 p-0 sm:mt-[55px] sm:gap-6 lg:grid-cols-4">
          {LEADERS.map((p) => (
            <li key={p.name} className="overflow-hidden rounded-usp bg-coolgray-99 p-[2px]">
              <img src={p.photo} alt={p.name} loading="lazy" className="block aspect-[260/291] w-full rounded-t-[12px] rounded-b-[9px] bg-coolgray-80 object-cover" />
              <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-[1fr_18px] sm:p-6">
                <div>
                  <p className="font-sans text-[16px] font-semibold leading-[19.2px]">{p.name}</p>
                  <p className="mt-[3.2px] font-sans text-[16px] font-medium leading-[19.2px]">{p.title}</p>
                </div>
                <a href={p.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on LinkedIn`} className="h-[18px] w-[18px] justify-self-end opacity-80 transition-opacity duration-150 hover:opacity-100">
                  <InlineSvg svg={linkedin} className="h-[18px] w-[18px]" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection spaced>
        <SectionHeading mb={false} className="!text-[32px] !leading-[36.8px] !tracking-[-0.64px] sm:!text-[48px] sm:!leading-[55.2px] sm:!tracking-[-1.44px]">Backed by the best</SectionHeading>
        <ul className="m-0 mt-[35px] flex list-none flex-wrap items-center justify-center gap-x-16 gap-y-[35px] p-0 sm:mt-[55px] sm:gap-x-16 sm:gap-y-[55px]">
          {INVESTORS.map((i) => (
            <li key={i.name}>
              <a href="#" aria-label={i.name} className="block opacity-100 transition-opacity duration-150 hover:opacity-80">
                <InlineSvg svg={i.svg} className="!block" style={{ width: i.w, height: i.h }} />
              </a>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection spaced>
        <SectionHeading className="!text-[32px] !leading-[36.8px] !tracking-[-0.64px] sm:!text-[48px] sm:!leading-[55.2px] sm:!tracking-[-1.44px]">Our values</SectionHeading>
        <ValueCards variant="about" items={valueItems} />
      </PageSection>

      <PageSection spaced>
        <div className="flex flex-col items-center gap-4 rounded-[12px] border border-surface-card-border bg-coolgray-99 px-6 py-[35px] text-center sm:gap-6 sm:rounded-usp sm:px-10 sm:py-[55px]">
          <InlineSvg svg={joinMascot} className="h-[95px] w-[58px]" />
          <h2 className="font-serif text-[30px] font-normal leading-[34.5px] tracking-[-0.9px] sm:text-[42px] sm:leading-[48.3px] sm:tracking-[-1.26px]">Join our team</h2>
          <p className="max-w-[480px] font-sans text-[16px] font-medium leading-[22.4px]">We invite you to join our world class team in empowering a generation of accidental programmers.</p>
          <a href="/careers/" className="btn btn-filled">Careers at Tines</a>
        </div>
      </PageSection>

      <CtaStartToday />
    </div>
  )
}
