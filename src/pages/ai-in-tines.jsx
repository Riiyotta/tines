// /ai-in-tines/ (specs/pages-a.md §7).
import { PageSection, SimplePageHero, SplitRibbonCard, PullQuoteCard } from '../components/shared/index.js'
import InlineSvg from '../components/InlineSvg.jsx'
import CtaStartToday from '../components/CtaStartToday.jsx'
import { QuoteMark } from '../components/shared/QuoteMark.jsx'
import { EXTEND_CARDS, BADGES, TRUST_GREEN, TRUST_ORANGE, OWN_CARDS, OUTCOMES } from '../components/pages/ai-in-tines/data.js'
import attribution from '../../reference/svg/pages/ai-in-tines-7qprqg-attribution.svg?raw'
import idcLogo from '../../reference/svg/pages/ai-in-tines-5uzf-2.svg?raw'

export const title = 'AI in Tines'
export const theme = 'plain'

const H2_32 = 'font-serif text-[32px] font-normal leading-[38.4px] tracking-[-0.96px]'
const A = '/assets/pages/ai-in-tines'
const Check = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" className="shrink-0"><circle cx="8" cy="8" r="8" fill="currentColor" /><path d="M4.5 8.2l2.3 2.3 4.7-4.7" fill="none" stroke="var(--page-bg)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const Dot = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" className="shrink-0"><circle cx="8" cy="8" r="8" fill="currentColor" opacity=".25" /><circle cx="8" cy="8" r="3.5" fill="currentColor" /></svg>
)

export default function AiInTines() {
  return (
    <div>
      <SimplePageHero
        title="Your AI interaction layer"
        actions={
          <>
            <a href="https://login.tines.com/saml_idp/signup" className="btn btn-filled">Sign up free</a>
            <a href="/book-a-demo/" className="btn btn-outlined">Book a demo</a>
          </>
        }
      >
        The straightforward way to bring AI into everyday work.
      </SimplePageHero>

      <PageSection>
        <SplitRibbonCard
          variant="figure"
          cols="552px 1fr"
          tabClass="bg-purple-2 border-tint-violet-mid max-lg:px-6 max-lg:py-[35px] max-lg:text-center lg:!mr-0 lg:py-10 lg:pl-10 lg:pr-[192px]"
          tab={
            <div className="grid gap-[18px] lg:gap-[30px]">
              <h2 className="font-serif text-[24px] font-normal leading-[27.6px] tracking-[-0.48px] lg:text-[36px] lg:leading-[41.4px] lg:tracking-[-0.72px]">Make AI an accelerator for work you can rely on</h2>
              <p className="max-w-[448px] font-sans text-[14px] font-medium leading-[19.6px] max-lg:mx-auto">Use AI across your systems within defined initiatives, with guardrails that keep every action visible, governed and easy to audit by the people who are responsible for it.</p>
            </div>
          }
          panelClass="relative z-10 bg-orange-2 border-pga-orange-line flex flex-col justify-end max-lg:px-6 max-lg:py-[45px] lg:-ml-[72px] lg:min-h-[404px] lg:py-10 lg:pl-10 lg:pr-[77.75px]"
        >
          <img src={`${A}/ai-page-hero-illo.svg`} alt="" className="pointer-events-none max-lg:mx-auto max-lg:mb-[13px] max-lg:w-[300px] lg:absolute lg:left-[127px] lg:top-[-141px] lg:w-[462px]" width="462" height="311" />
          <figure className="relative m-0 max-w-[400px] text-pga-orange-ink max-lg:mx-auto max-lg:text-center lg:mt-0">
            <QuoteMark size={24} className="max-lg:mx-auto" />
            <blockquote className="m-0 mt-3 font-serif text-[18px] leading-[21.6px] tracking-[-0.54px] lg:text-[22px] lg:leading-[26.4px] lg:tracking-[-0.66px]">The rollout was smooth and the results spoke for themselves. Our analysts now spend their time on judgment calls instead of copy and paste, and leadership finally trusts the process from end to end, for the first time.</blockquote>
            <figcaption className="mt-3 flex flex-col items-start font-sans text-[16px] font-semibold leading-[38.4px] max-lg:items-center">
              Zack Rohrbach, Security Architect
              <InlineSvg svg={attribution} className="h-4 w-[100px]" />
            </figcaption>
          </figure>
        </SplitRibbonCard>
      </PageSection>

      <PageSection spaced>
        <div className="grid gap-[18px] max-sm:text-center sm:grid-cols-2 sm:gap-[30px]">
          <h2 className={`${H2_32} max-w-[380px] max-sm:mx-auto`}>Extend your AI with consistent controls and visibility across all surfaces</h2>
          <p className="max-w-[450px] font-sans text-[16px] font-medium leading-5 tracking-[-0.16px] max-sm:mx-auto">Whether you are using AI in chat, in agents or through MCP, Tines sits between your AI and your systems. It gives every chat, copilot, agent and integration the same permissions, approvals and audit trail, so teams can move quickly without losing sight of what AI is doing.</p>
        </div>
        <ul className="m-0 mt-[45px] grid list-none grid-cols-1 p-0 sm:mt-16 sm:grid-cols-2">
          {EXTEND_CARDS.map((c) => (
            <li
              key={c.title}
              className={`grid min-h-[320px] content-end border bg-cover bg-center bg-no-repeat pb-6 pl-6 ${c.cls}`}
              style={{ backgroundImage: `url(${c.bg})` }}
            >
              <h3 className="font-sans text-[14px] font-bold leading-[17.5px]">{c.title}</h3>
              <p className="mt-[7px] max-w-[330px] font-sans text-[14px] font-medium leading-[19.6px]">{c.text}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection spaced>
        <SplitRibbonCard
          variant="figure"
          cols="552px 1fr"
          tabClass="border-green-25 max-lg:px-6 max-lg:pt-[35px] lg:!mr-0 lg:pt-10"
          tab={
            <div className="flex flex-col-reverse lg:block">
              <div className="max-lg:pb-6 max-lg:text-center lg:pl-10 lg:pr-[192px]">
                <h2 className="font-serif text-[28px] lg:max-w-[230px] font-normal leading-[32.2px] text-tab-it max-lg:mx-auto lg:text-[36px] lg:leading-[41.4px]">Taking trust seriously</h2>
                <p className="mt-[18px] max-w-[308px] lg:mt-[30px] font-sans text-[14px] font-medium leading-[19.6px] max-lg:mx-auto">Independent audits and certifications back up how we handle your data and your AI traffic, so security teams can adopt AI without taking on extra risk or giving up the visibility they already rely on.</p>
              </div>
              <div className="mt-0 flex max-w-[450px] flex-wrap items-end gap-6 max-lg:justify-center max-lg:gap-x-8 max-lg:gap-y-[29px] max-lg:pb-4 max-lg:pt-3 lg:mt-6 lg:px-10 lg:pb-10">
                {BADGES.map((b) => (
                  <img key={b.src} src={b.src} alt={b.alt} width={b.w} height={b.h} loading="lazy" className="block max-lg:!h-auto max-lg:!w-[var(--bw)]" style={{ width: b.w, height: b.h, '--bw': `${Math.round(b.w * 0.7)}px` }} />
                ))}
              </div>
            </div>
          }
          panelClass="z-10 border-green-25 bg-green-5 px-6 py-[45px] lg:py-[30px] lg:-ml-[72px] lg:min-h-[585px] lg:px-10 flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-[inherit] bg-cover bg-center" style={{ backgroundImage: `url(${A}/AITrustCardBackdrop.svg)` }} />
          <div className="relative mt-2 grid grid-cols-[121px_121px] gap-x-4 font-serif text-[14px] font-medium leading-[18.47px] lg:grid-cols-[157px_157px] lg:gap-x-8 lg:text-[20px] lg:leading-[23px]">
            <ul className="m-0 list-none p-0 text-tint-green-ink-dk">{TRUST_GREEN.map((t) => <li key={t} className="mt-[14px] flex items-center gap-2 first:mt-0 lg:mt-[30px]"><Check />{t}</li>)}</ul>
            <ul className="m-0 list-none p-0 text-orange-70">{TRUST_ORANGE.map((t) => <li key={t} className="mt-[14px] flex items-center gap-2 first:mt-0 lg:mt-[30px]"><Dot />{t}</li>)}</ul>
          </div>
        </SplitRibbonCard>
      </PageSection>

      <PageSection spaced>
        <div className="grid gap-24 sm:grid-cols-2 sm:gap-6">
          {OWN_CARDS.map((c) => (
            <figure key={c.lead} className="m-0">
              <div className={`flex min-h-[205px] items-center lg:min-h-[320px] justify-center overflow-hidden rounded-[12px] border sm:rounded-usp ${c.cls}`}>
                <img src={c.img} alt="" loading="lazy" className="block h-auto w-full max-w-[550px]" />
              </div>
              <figcaption className="mt-4 max-w-[392px] lg:mt-6 font-sans text-[14px] font-medium leading-[18.9px]">
                <strong className="block font-bold">{c.lead}</strong>{c.text}
              </figcaption>
            </figure>
          ))}
        </div>
      </PageSection>

      <PageSection spaced>
        <div className="text-center">
          <h2 className={`${H2_32} mx-auto max-w-[440px]`}>A practical way to interact with AI across the organization</h2>
          <p className="mt-[18px] font-sans text-[16px] font-medium leading-[22.4px] sm:mt-[30px]">Tines gives you consistent ways to interact with AI in the tools you already use.</p>
        </div>
        <ul className="m-0 mt-[35px] grid list-none grid-cols-1 gap-4 p-0 sm:mt-[55px] sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {OUTCOMES.map((o) => (
            <li key={o.title} className={`grid min-h-[300px] content-between xl:min-h-[437px] rounded-[12px] border py-[18px] pl-[18px] pr-6 sm:rounded-usp ${o.cls}`}>
              <div className="flex flex-col gap-6">
                <h4 className="font-serif text-[21px] font-normal leading-[26.04px] tracking-[-0.42px]">{o.title}</h4>
                <ul className="m-0 list-disc pl-4 font-sans text-[16px] font-medium leading-5">
                  {o.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
              <figure className="m-0 mt-4 flex justify-end">
                <img src={o.icon} alt="" width={o.w} height={o.h} loading="lazy" style={{ width: o.w, height: o.h }} />
              </figure>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection spaced>
        <PullQuoteCard
          variant="centered"
          quote="In my view Tines is becoming the governance layer for enterprise AI. Organizations are asking how to let agents and copilots touch real systems without losing control, and having one place to define access, require approvals and review exactly what ran is what makes that adoption realistic for security and IT leaders everywhere."
          name="Chris Kissel"
          title="IDC Research"
          logo={<InlineSvg svg={idcLogo} className="h-10 w-[132px]" />}
        />
      </PageSection>

      <CtaStartToday />
    </div>
  )
}
