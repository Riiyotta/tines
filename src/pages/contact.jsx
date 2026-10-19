// /contact/ (specs/pages-a.md §8).
import { useState } from 'react'
import { PageSection, SectionHeading, SimplePageHero } from '../components/shared/index.js'
import InlineSvg from '../components/InlineSvg.jsx'
import CtaStartToday from '../components/CtaStartToday.jsx'
import { SECONDARY, OFFICES, pen, bell } from '../components/pages/contact/data.js'
import support from '../../reference/svg/pages/contact-chx0na-supportillustration.svg?raw'

export const title = 'Contact us | Tines'
export const theme = 'plain'

const H2 = 'font-serif text-[18px] font-bold leading-[19.8px] tracking-[-0.18px] sm:text-[20px] sm:leading-[22px] sm:tracking-[-0.2px] text-purple-55'
const LINK = 'font-sans text-[14px] font-semibold hover:text-accent hover:underline hover:decoration-accent'
const FIELD = 'block w-full border border-tint-violet-mid bg-transparent px-4 font-sans text-[16px] font-medium leading-[18.4px] text-purple-65 placeholder:text-purple-65 transition-colors duration-100 hover:border-accent focus:border-accent focus:outline-none'

function Sticker({ svg, className = '' }) {
  return <InlineSvg svg={svg} className={`absolute right-6 top-6 h-10 w-10 ${className}`} />
}

function SupportForm() {
  const [file, setFile] = useState(null)
  return (
    <form className="flex flex-col rounded-lg border border-tint-violet-mid" onSubmit={(e) => e.preventDefault()}>
      <input className={`${FIELD} h-12 rounded-t-lg border`} type="text" required placeholder="What is your question? *" aria-label="What is your question?" />
      <input className={`${FIELD} -mt-px h-12 border`} type="email" required placeholder="Email *" aria-label="Email" />
      <textarea className={`${FIELD} -mt-px h-32 resize-none border-x border-y py-3`} required placeholder="Add more details to your inquiry… *" aria-label="Details" />
      <div className="-mt-px border-t border-tint-violet-mid p-4 sm:p-6">
        <p className="mb-6 font-sans text-[14px] font-semibold leading-[19.6px]">Attach a file (optional)</p>
        <label className="flex cursor-pointer items-center justify-center rounded-[7px] border border-tint-violet-mid bg-purple-5 px-6 py-10 text-center transition-colors duration-100 hover:bg-purple-10">
          <input type="file" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <span className="max-w-[205px] font-sans text-[14px] font-medium leading-[19.6px]">{file ? file.name : 'Choose a file, or drag and drop here. Size limit: 5MB'}</span>
        </label>
      </div>
      <div className="flex flex-col gap-6 px-4 pb-4 sm:px-6 sm:pb-6">
        <label className="flex items-center gap-2 font-sans text-[14px] font-medium leading-[19.6px]">
          <input type="checkbox" required className="h-4 w-4 rounded-[3px] accent-purple-65" />
          <span>I have read and agree to Tines’ <a href="/legal/privacy/" className="text-purple-40 underline">privacy notice</a></span>
        </label>
        <button type="submit" className="btn btn-sans btn-filled w-full">Submit</button>
      </div>
    </form>
  )
}

export default function Contact() {
  return (
    <div className="mx-auto max-w-page">
      <SimplePageHero align="center" title="Contact us" className="[&_h1]:text-purple-55">
        The fastest way to reach us is to <a href="#support" className="font-bold underline hover:text-accent">send us a message</a>.
      </SimplePageHero>

      <section className="mx-auto flex max-w-[1320px] flex-col gap-4 px-page sm:gap-6">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          <div className="relative flex min-h-[200px] flex-col justify-between rounded-[12px] border border-green-25 bg-green-5 p-6 sm:rounded-usp">
            <div><h2 className={H2}>Get support</h2><p className="mt-[3.5px] font-sans text-[14px] font-semibold leading-[22.4px]">Report an issue or get help.</p></div>
            <Sticker svg={pen} />
            <div className="flex flex-wrap items-center gap-5">
              <a href="#support" className="btn btn-sans btn-filled">Contact support</a>
              <a href="https://status.tines.com/" target="_blank" rel="noopener noreferrer" className={LINK}>Tines status page</a>
            </div>
          </div>
          <div className="relative flex min-h-[200px] flex-col justify-between rounded-[12px] border border-tint-violet-mid bg-purple-5 p-6 sm:rounded-usp">
            <div><h2 className={H2}>Talk to sales</h2><p className="mt-[3.5px] font-sans text-[14px] font-semibold leading-[22.4px]">Book a demo, request pricing or send us an RFP.</p></div>
            <Sticker svg={bell} />
            <div className="flex flex-wrap items-center gap-5">
              <a href="/book-a-demo/?cta_source=contact_page" className="btn btn-sans btn-outlined">Contact sales</a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {SECONDARY.map((c) => (
            <div key={c.title} className={`relative flex min-h-[200px] flex-col justify-between rounded-[12px] border px-6 py-[20.8px] sm:rounded-usp ${c.cls}`}>
              <h2 className={`${H2} max-w-[180px]`}>{c.title}</h2>
              <Sticker svg={c.icon} className="!top-[20.8px] !h-9 !w-9" />
              <div className="flex flex-col">
                {c.links.map((l) => <a key={l.label} href={l.href} className="font-sans text-[14px] font-semibold leading-[19.6px] hover:text-accent hover:underline">{l.label}</a>)}
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-[51px] max-w-[576px] text-center font-sans text-[16px] font-medium leading-[22.4px] sm:mt-[calc(var(--sp-xl)+24px)] sm:leading-[25.6px]">
          If your inquiry does not match one of the above departments, contact support using <a href="#support" className="font-bold">this form</a> or send a question to <a href="mailto:hello@tines.com" className="font-bold">hello@tines.com</a>.
        </p>
      </section>

      <section className="mt-section-margin px-[18px] pb-24 sm:px-page-wide sm:pb-section-margin">
        <SectionHeading loose mb={false} className="mb-sp-xl text-purple-55">Our offices</SectionHeading>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          {OFFICES.map((o) => (
            <div key={o.city} className={`flex flex-col gap-4 rounded-[12px] border p-6 sm:gap-6 sm:rounded-usp ${o.cls}`}>
              <div>
                <h3 className="font-serif text-[22px] font-bold leading-[24.2px] text-purple-55 sm:text-[28px] sm:leading-[30.8px]">{o.city}</h3>
                <p className="mt-[6px] font-sans text-[16px] font-medium leading-[22.4px]">{o.sub}</p>
              </div>
              <address className="font-sans text-[16px] font-medium not-italic leading-[22.4px]">{o.lines.map((l) => <span key={l} className="block">{l}</span>)}</address>
              <div className="mt-auto flex items-end justify-between">
                <a href={o.maps} target="_blank" rel="noopener noreferrer" className="btn btn-sans btn-outlined">View on maps<sup className="ml-1 text-[10.5px]">↗</sup></a>
                <InlineSvg svg={o.art} className="h-[112px] w-[80px]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="support" className="px-[18px] pb-24 sm:px-page-wide sm:pb-section-margin">
        <SectionHeading loose align="left" mb={false} className="mb-sp-xl text-purple-55">Contact support</SectionHeading>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SupportForm />
          <aside className="flex flex-col justify-between max-sm:order-first">
            <div>
              <h4 className="font-serif text-[20px] font-bold leading-[22px] text-purple-55">Learn more</h4>
              <ul className="m-0 mt-1.5 sm:mt-6 flex list-none flex-col gap-2 p-0 font-sans text-[16px] font-medium leading-[22.4px]">
                <li><a href="https://explained.tines.com/" className="hover:text-purple-40">→ Tines support reference guide</a></li>
                <li><a href="https://explained.tines.com/" className="hover:text-purple-40">→ Getting answers to your Tines questions</a></li>
              </ul>
            </div>
            <InlineSvg svg={support} className="mx-auto mt-10 hidden h-[240px] w-[243px] lg:block" />
          </aside>
        </div>
      </section>

      <CtaStartToday flush />
    </div>
  )
}
