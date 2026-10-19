/**
 * DemoForm (legacy HubSpot-style demo request form). Implements specs/pages-a.md §5.2 (variant 'card': book-a-demo)
 * and §11.16 (variant 'embedded': soar). Non-submitting: client-side required validation only (spec §5.2 last bullet).
 *
 * card: 774x542 max, bg white, 1px purple-45, r 16; grid `293px 479px`; left = header (pad 26, border-b purple-10) with H1 Roobert 500 28/28 -0.56,
 *   "What to expect:" bold + list; right (border-l) = stacked borderless fields 42 tall pad 0 24 border-b purple-10, Roobert 500 16/18.4;
 *   footer pad 21: two checkboxes (18x18 r 20%), submit full width, bg #8d75e6 (accent) r 6.5 Mono 600 13 uppercase, opacity .5 until valid.
 * embedded: pad 72, bg purple-5, border #c3b5ff, r 14; heading Reckless 46/48.3; form panel pad 55 bg purple-10@.8; inner form 600 wide
 *   (bg lightest, border #aa94ff, r 14, field borders #d7c4fa), submit LegacyButton r 7.
 * <768 (card): one column; the form collapses behind a "Get started" button (354x50, bg purple-45, border 2px purple-55, r 8).
 *
 * forceOpen (additive, default false): form fields visible from the start with no "Get started" button (used by /book-a-demo/ mobile).
 * Props: variant, heading, expect (string[]; defaults to the spec's four short list items), submitLabel, icon (svg string), onValid (cb), className.
 */
import { useState } from 'react'
import InlineSvg from '../InlineSvg.jsx'

const EXPECT = [
  'Zero-pressure, technical demo of the Tines platform',
  'Walkthrough of a relevant use case',
  'Overview of products and plans',
  'Insight into API and integration capabilities',
]
const field = 'block w-full bg-transparent px-6 font-sans text-[16px] font-medium leading-[18.4px] placeholder:text-purple-65/70 focus:outline-none focus:bg-purple-2'

function Check({ id, children, required }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-2 font-sans text-[14px] font-medium leading-[17.5px]">
      <input id={id} type="checkbox" required={required} className="peer sr-only" />
      <span aria-hidden="true" className="mt-px h-[18px] w-[18px] shrink-0 rounded-[20%] border border-tint-lilac-line-2 bg-purple-2 transition-colors duration-100 peer-checked:border-purple-55 peer-checked:bg-purple-45 peer-focus-visible:outline peer-focus-visible:outline-2" />
      <span>{children}</span>
    </label>
  )
}

export function DemoForm({ variant = 'card', heading = 'Talk to a product expert', expect = EXPECT, submitLabel = 'Book a demo', icon, onValid, forceOpen = false, className = '' }) {
  const [open, setOpen] = useState(forceOpen)
  const [valid, setValid] = useState(false)
  const embedded = variant === 'embedded'
  const line = embedded ? 'border-tint-violet-line' : 'border-purple-10'

  const form = (
    <form
      noValidate
      onChange={(e) => setValid(e.currentTarget.checkValidity())}
      onSubmit={(e) => {
        e.preventDefault()
        if (e.currentTarget.checkValidity()) onValid?.()
        else e.currentTarget.reportValidity()
      }}
      className={embedded ? 'mx-auto max-w-[600px] overflow-hidden rounded-usp border border-tint-lilac-edge bg-lightest' : ''}
    >
      <input type="email" required placeholder="Business email *" aria-label="Business email" className={`${field} h-[42px] border-b ${line} sm:rounded-tr-[12px]`} />
      <div className="grid grid-cols-2">
        <input required placeholder="First name *" aria-label="First name" className={`${field} h-[42px] border-b border-r ${line}`} />
        <input required placeholder="Last name *" aria-label="Last name" className={`${field} h-[42px] border-b ${line}`} />
      </div>
      <input type="tel" required placeholder="Phone *" aria-label="Phone" className={`${field} h-[42px] border-b ${line}`} />
      <input required placeholder="Company Name *" aria-label="Company name" className={`${field} h-[42px] border-b ${line}`} />
      <div className="relative">
        <select required defaultValue="" aria-label="Country" className={`${field} h-[42px] appearance-none border-b pr-8 ${line} invalid:text-purple-65/70`}>
          <option value="" disabled>Select country *</option>
          <option>Ireland</option>
          <option>United Kingdom</option>
          <option>United States</option>
        </select>
        <svg aria-hidden="true" width="10" height="7" viewBox="0 0 10 7" fill="none" stroke="currentColor" strokeWidth="1.5" className="pointer-events-none absolute right-6 top-[17.5px] text-purple-15">
          <path d="M1.05 1l4 4 4-4" />
        </svg>
      </div>
      <textarea required placeholder="Tell us more about how we can help you…" aria-label="Message" className={`${field} h-[174px] resize-none border-b py-4 ${line}`} />
      <div className="flex flex-col gap-3 p-[21px]">
        <Check id={`${variant}-consent`} required>
          I have read and agree to Tines’ <a href="/privacy/" className="font-semibold text-purple-55">privacy notice</a>
        </Check>
        <Check id={`${variant}-marketing`}>I agree to receive occasional product and event emails from Tines.</Check>
        <span className="mt-1 block rounded-[8px] bg-purple-70">
          <button
            type="submit"
            className={`block h-[41px] w-full font-mono text-[13px] font-semibold uppercase text-white transition-opacity ${embedded ? 'rounded-[7px]' : 'rounded-[6.5px]'} bg-accent ${valid ? 'opacity-100' : 'opacity-50'}`}
          >
            {submitLabel}
          </button>
        </span>
      </div>
    </form>
  )

  const expectBlock = (
    <>
      <p className="font-sans text-[14px] font-bold leading-[16.8px]">What to expect:</p>
      <ul className="mt-[7px] list-disc pl-[16.8px] font-sans text-[14px] font-medium leading-[16.8px] [&>li+li]:mt-[7px]">
        {expect.map((e) => <li key={e}>{e}</li>)}
      </ul>
    </>
  )

  if (embedded) {
    return (
      <div className={`rounded-usp border border-tint-lilac-line bg-purple-5 p-6 text-purple-65 sm:p-[72px] ${className}`}>
        <div className="grid items-start gap-8 md:grid-cols-3">
          <h2 className="font-serif text-section-h2-sm font-normal sm:text-section-h2 md:col-span-2">{heading}</h2>
          <div className="row-span-2 hidden md:block">{icon && <InlineSvg svg={icon} className="h-[193px] w-[180px]" />}</div>
          <div className="font-sans text-[16px] leading-5 md:col-span-2 [&_p]:text-[16px] [&_ul]:text-[16px] [&_ul]:font-normal [&_ul]:leading-5 [&_ul>li+li]:mt-2">{expectBlock}</div>
        </div>
        <div className="mt-8 rounded-usp border border-tint-lilac-line bg-purple-10/80 p-4 sm:mt-[55px] sm:p-[55px]">{form}</div>
      </div>
    )
  }
  return (
    <div className={`mx-auto max-w-[774px] overflow-hidden rounded-[16px] border border-purple-45 bg-white text-purple-65 ${className}`}>
      <div className="grid md:grid-cols-[293px_1fr]">
        <div className="flex flex-col">
          <div className={`border-b p-[26px] ${line}`}>
            <h1 className="font-sans text-[28px] font-medium leading-[28px] tracking-[-0.56px]">{heading}</h1>
          </div>
          <div className="p-[26px] pt-6">{expectBlock}</div>
          {icon && <InlineSvg svg={icon} className="mt-auto hidden h-[113px] w-[59px] self-start p-0 pl-[26px] md:block" />}
        </div>
        <div className="border-t border-purple-10 md:border-l md:border-t-0">
          <div className={`p-4 md:hidden ${forceOpen ? 'hidden' : ''}`}>
            <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="h-[50px] w-full rounded-[8px] border-2 border-purple-55 bg-purple-45 font-sans text-[16px] font-semibold text-lightest">
              Get started
            </button>
          </div>
          <div className={`${open ? 'block' : 'hidden'} md:block`}>{form}</div>
        </div>
      </div>
    </div>
  )
}
