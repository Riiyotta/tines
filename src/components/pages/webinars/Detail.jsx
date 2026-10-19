/** Webinar detail pieces (specs/pages-c.md §9.2): gated registration form, speakers sidebar, "Missed this webinar?" newsletter block. */
import { useState } from 'react'
import InlineSvg from '../../InlineSvg.jsx'
import formIcon from '../../../../reference/svg/pages/webinars-access-form-icon.svg?raw'
import toaster from '../../../../reference/svg/pages/blog-newsletter-illustration.svg?raw'
import { Avatar } from './Cards.jsx'

const FIELD = 'h-[42px] w-full border bg-transparent px-[14px] font-sans text-[14px] font-medium leading-[16.1px] focus:outline-none'

function Box({ checked, onChange, dark, children, required }) {
  return (
    <label className="flex cursor-pointer items-start font-sans text-[14px] font-medium leading-[17.5px]">
      <input type="checkbox" checked={checked} onChange={onChange} required={required} className="peer sr-only" />
      <span
        aria-hidden="true"
        className={`mt-0 flex h-[17.5px] w-[17.5px] shrink-0 items-center justify-center rounded-[20%] border text-white transition-colors duration-100 peer-checked:[&>svg]:opacity-100 ${
          dark ? 'border-tint-lilac-line-2 bg-purple-2 peer-checked:border-purple-55 peer-checked:bg-purple-45' : 'border-tint-lilac-line-2 bg-purple-2 peer-checked:border-purple-55 peer-checked:bg-purple-45'
        }`}
      >
        <svg viewBox="0 0 16 16" className="h-[14px] w-[14px] opacity-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3.5 8.5 3 3 6-6.5" /></svg>
      </span>
      <span className="ml-[7px]">{children}</span>
    </label>
  )
}

function FieldGrid({ dark, names }) {
  const cls = dark ? 'border-purple-70 text-lightest placeholder:text-lightest/70' : 'border-pcu-violet-line placeholder:text-current placeholder:opacity-70'
  return (
    <fieldset className="m-0 grid grid-cols-1 border-0 p-0 pl-px pt-px sm:grid-cols-2 [&>input:first-child]:rounded-t-[7px] [&>input:last-child]:rounded-b-[7px] sm:[&>input:first-child]:rounded-tl-[7px] sm:[&>input:first-child]:rounded-tr-none sm:[&>input:nth-child(2)]:rounded-tr-[7px] sm:[&>input:nth-child(3)]:rounded-bl-[7px] sm:[&>input:last-child]:rounded-bl-none sm:[&>input:last-child]:rounded-br-[7px]">
      {names.map(([ph, type]) => <input key={ph} type={type || 'text'} placeholder={ph} aria-label={ph.replace(' *', '')} required={ph.includes('*')} className={`-ml-px -mt-px ${FIELD} ${cls}`} />)}
    </fieldset>
  )
}

export function AccessForm() {
  const [done, setDone] = useState(false)
  const [more, setMore] = useState(true)
  const [priv, setPriv] = useState(false)
  return (
    <div className="rounded-[16px] bg-darkest">
      <div className={`bg-purple-80 p-6 text-lightest transition-opacity duration-300 sm:p-10 ${done ? 'opacity-100' : ''}`}>
        {done ? (
          <div className="flex min-h-[470px] flex-col items-center justify-center text-center">
            <InlineSvg svg={formIcon} className="h-[150px] w-[150px]" />
            <h3 className="mt-[3px] font-sans text-[18.72px] font-semibold">Thanks for registering</h3>
            <p className="mt-[9px] font-sans text-[16px] font-medium leading-[22.4px]">The recording player is a third-party embed that is not part of this clone.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true) }}>
            <div className="flex justify-center"><InlineSvg svg={formIcon} className="h-[150px] w-[150px]" /></div>
            <h3 className="mb-[9.36px] mt-[3px] text-center font-sans text-[18.72px] font-semibold">Register for this on-demand webinar</h3>
            <p className="text-center font-sans text-[16px] font-medium leading-[22.4px]">You’ll be able to watch instantly.</p>
            <div className="my-8">
              <FieldGrid dark names={[['First name *'], ['Last name *'], ['Email *', 'email'], ['Company *']]} />
            </div>
            <Box checked={more} onChange={(e) => setMore(e.target.checked)} dark>I would like to receive more information about Tines products, events, and webinars, including updates on new releases, upcoming sessions and invitations to customer stories.</Box>
            <div className="h-2" />
            <Box checked={priv} onChange={(e) => setPriv(e.target.checked)} dark required>I have read and agree to Tines’ <a href="/legal/privacy/" className="font-semibold text-purple-55 underline decoration-purple-10">privacy notice</a></Box>
            <div className="h-4" />
            <div className="flex justify-center">
              <button type="submit" className={`inline-flex h-[38.5px] items-center justify-center rounded-[7px] bg-accent px-[14px] font-sans text-[14px] font-semibold leading-[14px] text-white transition-[opacity,filter] duration-100 hover:brightness-110 ${priv ? '' : 'opacity-50'}`}>Watch now</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export function SpeakerSidebar({ speakers }) {
  return (
    <div className="lg:sticky lg:top-[68px]">
      <h3 className="font-sans text-[18.72px] font-semibold">Speakers</h3>
      <div className="mt-[30px] flex flex-col gap-4">
        {speakers.map((s) => (
          <div key={s.name} className="grid grid-cols-[48px_1fr] items-center gap-3">
            <Avatar src={s.photo} size={48} />
            <div className="font-sans">
              <p className="text-[14px] font-semibold leading-[19.6px]">{s.name}</p>
              {s.role && <p className="text-[12px] font-medium leading-[13.8px]">{s.role}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MissedBlock() {
  const [priv, setPriv] = useState(false)
  const [more, setMore] = useState(true)
  return (
    <section className="mx-auto max-w-[1440px] px-page-wide">
      <div className="mt-[55px] grid gap-10 border-y border-tint-page-active py-[72px] lg:grid-cols-[704px_360px] lg:gap-16">
        <header>
          <h2 className="font-serif text-[26px] font-light leading-[normal] tracking-[-0.39px] sm:text-[38px] sm:tracking-[-0.57px]">Missed this webinar?</h2>
          <p className="mt-2 font-sans text-[16px] font-medium leading-[22.4px]">Sign up to our newsletter and we will let you know about the next one.</p>
          <form className="mt-8 max-w-[620px]" onSubmit={(e) => e.preventDefault()}>
            <FieldGrid names={[['Your email *', 'email'], ['Your company name'], ['First name'], ['Last name']]} />
            <div className="h-4" />
            <Box checked={more} onChange={(e) => setMore(e.target.checked)}>I would like to receive more information about Tines products, events, and webinars.</Box>
            <div className="h-2" />
            <Box checked={priv} onChange={(e) => setPriv(e.target.checked)} required>I have read and agree to Tines’ <a href="/legal/privacy/" className="font-semibold text-purple-50 underline decoration-purple-10">privacy notice</a></Box>
            <div className="h-4" />
            <button type="submit" className={`inline-flex h-[38.5px] w-[140px] items-center justify-center rounded-[7px] bg-legacy-ink px-[14px] font-sans text-[14px] font-semibold leading-[14px] text-white transition-[opacity,filter] duration-100 hover:brightness-110 ${priv ? '' : 'opacity-50'}`}>Subscribe</button>
          </form>
        </header>
        <div className="flex h-[360px] w-full max-w-[360px] items-center justify-center rounded-usp border border-tint-violet-line bg-tint-page-active p-[72px] lg:justify-self-end">
          <InlineSvg svg={toaster} className="h-[200px] w-[200px]" />
        </div>
      </div>
    </section>
  )
}
