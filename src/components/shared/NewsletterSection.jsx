/**
 * NewsletterSection. Implements specs/pages-c.md §2.8. Section mt 96; inner grid `1fr 346px` (974/346 @1440) gap 40, pad 96 0,
 * border-y 1px #d7c4fa (tint-violet-line). H2 Reckless 400 40/46 -0.4 (390: 24/27.6). Form mt 24 max 620 flex col gap 16: 2x2 fieldset of
 * inputs (46 tall, pad 12.8 16, border #d7c4fa, -1px joins, outer corners 6), two consent rows (16px boxes r 3; row 2 checked by default),
 * "Subscribe" `.btn-sans` filled #6956a8 @ opacity .5 until valid. Illustration card 346x342, pad 72, bg purple-10, r 14, border #d7c4fa.
 * Props: heading, description (events only), illustration (svg string), submitLabel, bleed (events: mt = section-margin, inner max 1440 + px-page-wide), className.
 */
import { useState } from 'react'
import InlineSvg from '../InlineSvg.jsx'
import defaultIllustration from '../../../reference/svg/pages/blog-newsletter-illustration.svg?raw'

const input = '-mt-px -ml-px h-[46px] w-full border border-tint-violet-line bg-transparent px-4 py-[12.8px] font-sans text-[16px] transition-colors duration-150 placeholder:text-current placeholder:opacity-60 focus:border-purple-45 focus:outline-none'

export function NewsletterSection({ heading = 'World class ideas right in your inbox', description, illustration = defaultIllustration, submitLabel = 'Subscribe', bleed = false, className = '' }) {
  const [valid, setValid] = useState(false)
  return (
    <section className={`${bleed ? 'mt-section-margin' : 'mt-24'} ${className}`}>
      <div className={`grid gap-10 border-y border-tint-violet-line py-24 md:grid-cols-[1fr_346px] ${bleed ? 'mx-auto max-w-[1440px] px-page-wide' : ''} md:items-center max-md:gap-0 max-md:pb-[31px] max-md:pt-[26px]`}>
        <div>
          <h2 className="font-serif text-newsletter-h2-sm font-normal max-md:text-center sm:text-newsletter-h2">{heading}</h2>
          {description && <p className="mt-2 font-sans text-[16px] font-medium leading-[25.6px]">{description}</p>}
          <form
            className="mt-6 flex max-w-[620px] flex-col gap-4"
            onChange={(e) => setValid(e.currentTarget.checkValidity())}
            onSubmit={(e) => e.preventDefault()}
          >
            <fieldset className="m-0 grid grid-cols-1 border-0 p-0 pl-px pt-px sm:grid-cols-2 [&>input:first-child]:rounded-tl-[6px] [&>input:nth-child(2)]:sm:rounded-tr-[6px] [&>input:nth-child(3)]:sm:rounded-bl-[6px] [&>input:last-child]:rounded-br-[6px]">
              <input type="email" required placeholder="Your email *" aria-label="Email" className={input} />
              <input placeholder="Your company name" aria-label="Company" className={input} />
              <input placeholder="First name" aria-label="First name" className={input} />
              <input placeholder="Last name" aria-label="Last name" className={input} />
            </fieldset>
            <div className="flex flex-col gap-2">
              {[
                { id: 'nl-privacy', label: 'I have read and agree to Tines’ privacy notice', req: true },
                { id: 'nl-marketing', label: 'I would like to receive product updates, events, and marketing communications', checked: true },
              ].map((c) => (
                <label key={c.id} htmlFor={c.id} className="flex cursor-pointer items-start gap-[7px] font-sans text-[14px] font-medium leading-[18.2px]">
                  <input id={c.id} type="checkbox" required={c.req} defaultChecked={c.checked} className="peer sr-only" />
                  <span aria-hidden="true" className="mt-px h-4 w-4 shrink-0 rounded-[3px] border border-[rgb(93_56_174_/_0.65)] transition-colors duration-100 peer-checked:border-purple-45 peer-checked:bg-purple-45" />
                  <span>{c.label}</span>
                </label>
              ))}

            </div>
            <button type="submit" className={`btn btn-sans w-fit bg-tint-page-ink text-white transition-opacity ${valid ? 'opacity-100' : 'opacity-50'}`}>
              {submitLabel}
            </button>
          </form>
        </div>
        <div className="flex h-[342px] w-full max-w-[346px] items-center justify-center rounded-usp border border-tint-violet-line bg-purple-10 p-[72px] max-md:order-first max-md:h-[200px] max-md:w-[200px] max-md:justify-self-center max-md:border-0 max-md:bg-transparent max-md:p-0 md:justify-self-end">
          <InlineSvg svg={illustration} className="h-[200px] w-[200px]" />
        </div>
      </div>
    </section>
  )
}
