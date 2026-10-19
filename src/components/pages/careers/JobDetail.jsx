// /careers/jobs/<id>/ detail template (live: Greenhouse-backed page). Measured from one live posting; all copy here is original placeholder text.
// Pieces: lilac rounded header (eyebrow, role, location/department, Apply now, notice) / two columns (Job Details + sticky Our Benefits) / explosion CTA.
import { LegacyExplosiveCta, LegacyButton } from '../../shared/index.js'
import ctaMark from '../../../../reference/svg/pages/enterprise-built-by-you-powered-by-tines.svg?raw'
import decoCube from '../../../../reference/svg/pages/enterprise-dataimg-built-by-you-powered-by-tines-2.svg?url'
import decoMug from '../../../../reference/svg/pages/enterprise-dataimg-built-by-you-powered-by-tines-3.svg?url'
import decoHex from '../../../../reference/svg/pages/enterprise-dataimg-built-by-you-powered-by-tines-4.svg?url'

const DECOS = [
  { src: decoCube, className: 'left-[-40px] top-[-22px] w-[53px]' },
  { src: decoMug, className: 'left-[-68px] top-[258px] w-[81px]' },
  { src: decoHex, className: 'left-[323px] top-[363px] w-[51px]' },
]

const BENEFITS = [
  'Competitive salary',
  ['Startup equity & extended exercise window', 'Equity comes with a generous window to exercise after you leave.'],
  'Matching retirement plans',
  ['Home office setup', 'A budget to set up a comfortable workspace.'],
  'Private healthcare plans',
  ['25 days annual leave', 'Plus company-wide holidays across locations.'],
  'Flexibility in how and where you work',
  'Phone and home internet allowance',
]

const INTRO = [
  'Tines builds workflow software that lets security, IT and operations teams automate the work that matters most, without giving up control or privacy.',
  'Our customers range from fast-growing companies to some of the largest enterprises in the world, and they depend on us every day.',
  'We value simplicity, speed and soundness. If you like clear thinking, careful shipping and quick learning, you will fit right in.',
]

const DOING = {
  Marketing: ['Plan and run campaigns and programs that bring the right people to Tines', 'Work with sales and product to shape messaging that is clear and honest', 'Track results, share what you learn and adjust quickly', 'Manage budgets, vendors and timelines across several projects at once'],
  Legal: ['Review and negotiate customer, partner and vendor agreements', 'Advise teams on privacy, security and commercial questions', 'Build simple templates and playbooks that speed up deals', 'Keep policies current as the company grows'],
  'Commercial Operations': ['Keep the systems and data behind our go-to-market motion accurate', 'Design processes that remove friction for sellers and customers', 'Build reports that help leaders decide what to do next', 'Partner with finance and sales leadership on planning'],
  Product: ['Understand customer problems and turn them into clear priorities', 'Work with engineering and design from first idea to launch', 'Write specs, define success measures and review outcomes', 'Share what we are building with customers and teammates'],
  'Knowledge, Education & Support': ['Help customers solve problems quickly and kindly', 'Write and improve guides, docs and training material', 'Spot patterns in questions and feed them back to product', 'Share knowledge with the wider team'],
  'Professional Services': ['Guide customers through design, build and rollout of workflows', 'Run workshops and translate needs into working solutions', 'Document patterns that other teams can reuse', 'Give product feedback from the field'],
  Engineering: ['Design, build and ship reliable features end to end', 'Review code and share what you know with the team', 'Improve performance, security and developer tooling', 'Take part in on-call and learn from every incident'],
  Sales: ['Build relationships with security and IT teams', 'Understand what customers want to automate and show them how', 'Run structured evaluations and guide deals to a close', 'Share customer insight with product and marketing'],
  'Customer Success': ['Help customers get value from Tines from day one', 'Run regular reviews and plan for growth together', 'Spot risks early and work with the team to resolve them', 'Share stories and feedback across the company'],
  People: ['Support managers and teammates through the employee lifecycle', 'Improve hiring, onboarding and development programs', 'Keep processes fair, simple and well documented', 'Use data to shape how the team grows'],
}
const ALSO_DOING = [
  'Work closely with teammates in other functions and share progress openly',
  'Keep notes, plans and decisions written down so others can build on them',
  'Raise problems early, propose options and help the team choose',
]
const NICE = [
  'Experience with automation, security or workflow software',
  'A track record of improving a process you did not start with',
  'Comfort working with data to make decisions',
  'Experience working across time zones with a remote team',
]
const PROCESS = [
  'A short intro call with someone from our talent team',
  'A conversation with the hiring manager about the role and your experience',
  'A practical exercise or working session that mirrors real work',
  'Meetings with future teammates from across the company',
  'A final chat, reference checks and an offer',
]
const BRING = [
  'Relevant experience in a similar role, ideally in a fast-growing company',
  'Clear written and spoken communication',
  'Curiosity and a habit of learning from others',
  'A collaborative, low-ego approach to your work',
  'The ability to manage several priorities at once',
  'Good judgement about when to move fast and when to slow down',
  'Interest in how customers actually use the product',
  'Comfort giving and receiving direct, kind feedback',
]

const Check = () => (
  <span aria-hidden="true" className="absolute left-0 top-[11px] flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white">
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4l2.6 2.6L9 1.2" /></svg>
  </span>
)
const Info = ({ tip }) => (
  <span title={tip} className="relative ml-1.5 inline-flex h-[13px] w-[13px] translate-y-[1px] items-center justify-center rounded-full bg-accent font-sans text-[9px] font-bold italic leading-none text-white">i</span>
)

function Notice() {
  return (
    <p className="m-0 font-sans text-[14px] font-normal leading-[21px] opacity-80">
      * By applying for this job listing, you agree to our{' '}
      <a href="/legal/" className="font-semibold underline">Data Protection Notice<span aria-hidden="true"> ↗</span></a>{' '}
      for recruitment and job applications.
    </p>
  )
}

export function JobDetail({ job }) {
  const doing = DOING[job.team] || DOING.Marketing
  const p = 'm-0 mt-4 font-sans text-[16px] font-normal leading-[26px] xl:mt-[18px] xl:text-[18px] xl:leading-[29.25px]'
  const li = 'mt-2 xl:mt-[9px]'
  const ul = 'my-4 list-disc pl-10 font-sans text-[16px] font-normal leading-[26px] xl:my-[18px] xl:text-[18px] xl:leading-[29.25px]'
  return (
    <div>
      <header className="-mt-[62px] rounded-b-[32px] bg-trust-header xl:-mt-[68px]">
        <div className="mx-auto w-full max-w-[1440px] px-page-wide pb-12 pt-[102px] xl:pb-[67px] xl:pt-[132px]">
          <h3 className="m-0 font-sans text-[11.5px] font-bold uppercase leading-3 tracking-[1.15px]">Join the team</h3>
          <h1 className="m-0 mt-8 max-w-[832px] font-serif text-[38px] font-normal leading-[42px] xl:text-[52px] xl:leading-[58px] xl:tracking-[-0.3px]">{job.role}</h1>
          <div className="mt-4">
            <p className="m-0 font-sans text-[16px] font-medium leading-[22.4px]"><strong className="font-bold">Location:</strong> {job.location}</p>
            <p className="m-0 font-sans text-[16px] font-medium leading-[22.4px]"><strong className="font-bold">Department:</strong> {job.team}</p>
            <LegacyButton href="#apply" className="mt-[31px] min-w-[130px] !border-accent !bg-accent">Apply now</LegacyButton>
            <div className="mt-4"><Notice /></div>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-[1440px] px-page-wide pt-16 xl:pt-24">
        <div className="flex flex-col gap-16 xl:grid xl:grid-cols-[648px_456px] xl:gap-6">
          <div className="xl:pr-24">
            <h2 className="m-0 mb-[35px] font-sans text-[28px] font-semibold leading-normal xl:mb-[55px]">Job Details</h2>
            {INTRO.map((t, i) => <p key={i} className={`${p} ${i === 0 ? '!mt-0' : ''}`}>{t}</p>)}
            <hr className="my-14 border-0 border-t border-green-30" />
            <p className={`${p} !mt-0 italic`}><strong className="font-semibold">*Placeholder posting: this role is open to candidates in the locations listed above.</strong></p>
            <p className={`${p} !mt-8`}><strong className="font-semibold">Job Summary</strong></p>
            <p className={p}>We are looking for a {job.role} to join our {job.team} team. You will work with colleagues across the company, take ownership of your area and help us do our best work for customers as we keep growing.</p>
            <p className={`${p} !mt-8`}><strong className="font-semibold">About the team:</strong></p>
            <p className={p}>The {job.team} team is small, close and curious. We meet regularly to share what we are learning, we write things down so that others can follow, and we help each other when priorities change.</p>
            <p className={p}>Everyone here is expected to own a real piece of the work from day one, with support from a manager who cares about your growth and a group of colleagues who are happy to share what they know.</p>
            <p className={p}>We work across Dublin, Boston and several remote locations, so you will often collaborate asynchronously and meet in person a few times a year.</p>
            <p className={`${p} !mt-8`}><strong className="font-semibold">What you will do:</strong></p>
            <ul className={ul}>{[...doing, ...ALSO_DOING].map((t) => <li key={t} className={li}>{t}</li>)}</ul>
            <p className={`${p} !mt-8`}><strong className="font-semibold">What you bring with you:</strong></p>
            <ul className={ul}>{BRING.map((t) => <li key={t} className={li}>{t}</li>)}</ul>
            <p className={`${p} !mt-8`}><strong className="font-semibold">Nice to have:</strong></p>
            <ul className={ul}>{NICE.map((t) => <li key={t} className={li}>{t}</li>)}</ul>
            <p className={`${p} !mt-8`}><strong className="font-semibold">How we hire:</strong></p>
            <p className={p}>Our process is designed to be transparent and respectful of your time. Here is what to expect, though the exact steps can vary a little by role.</p>
            <ul className={ul}>{PROCESS.map((t) => <li key={t} className={li}>{t}</li>)}</ul>
            <p className={p}>We aim to reply to every applicant, and we keep you informed at each stage so you always know what comes next.</p>
            <p className={`${p} !mt-8`}><strong className="font-semibold">Compensation:</strong> shared with candidates early in the process, alongside equity.</p>
            <p className={`${p} italic`}>We welcome applications from people with all kinds of backgrounds and experience. If you need any adjustments during the process, let us know and we will help.</p>
            <hr className="my-14 border-0 border-t border-green-30" />
            <div id="apply" className="scroll-mt-24">
              <LegacyButton href="#apply" className="min-w-[130px] !border-accent !bg-accent">Apply now</LegacyButton>
              <div className="mt-4"><Notice /></div>
            </div>
          </div>
          <aside className="order-first xl:order-none">
            <div className="xl:sticky xl:top-24">
              <h2 className="m-0 mb-[35px] font-sans text-[28px] font-semibold leading-normal xl:mb-[55px]">Our Benefits</h2>
              <ul className="m-0 list-none p-0">
                {BENEFITS.map((b) => {
                  const [label, tip] = Array.isArray(b) ? b : [b]
                  return (
                    <li key={label} className="relative py-3 pl-8 font-sans text-[16px] font-medium leading-normal">
                      <Check />{label}{tip && <Info tip={tip} />}
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <div data-legacy-cta className="mt-24 pb-24">
        <LegacyExplosiveCta showMark markSvg={ctaMark} decos={DECOS} />
      </div>
    </div>
  )
}
