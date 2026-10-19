/**
 * UseCaseTabs (pages-b section 4.2, SolutionForUseCasesSection): tab list + stacked fading cards + a "next" notch button with a
 * 10s progress ring that auto-advances while the cards are on screen. Below 768 it is a static stack of cards.
 *
 * Props
 *   header   { variant: 'horizontal' | 'centered', heading, description?, icon (img src) }
 *   items    [{ label, heading, description, img }]   hue cycles purple > orange > green > pink > teal
 *   interval ms per tab (default 10000)
 * Motion: ring = CSS animation `useCaseRing` (src/motion.css, linear, `animationend` advances); card fade .2s opacity;
 * chevron .2s opacity + .35s cubic-bezier(.22,1,.36,1) slide. Easing for the fade is not in the spec (CSS default ease).
 * Reduced motion: no auto-advance (tabs and the notch still work by click).
 * NOTE: the notch silhouette (live: 75x88 inline SVG) was not exported in the spec, so it is approximated (circle cut-out + ring + arrow).
 */
import { useEffect, useRef, useState } from 'react'
import { SectionHeading } from './SectionHeading.jsx'

const HUES = ['purple', 'orange', 'green', 'pink', 'teal']

export function UseCaseTabs({ header, items, interval = 10000, className = '' }) {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)
  const ref = useRef(null)
  const n = items.length

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  const next = () => setActive((a) => (a + 1) % n)
  const centered = header.variant === 'centered'

  return (
    <div className={className}>
      {centered ? (
        <div className="flex flex-col items-center">
          {header.icon && <img src={header.icon} alt="" className="mb-sp-md block" />}
          <SectionHeading size="solution" mb={false} max="max-w-[480px] sm:max-w-[690px]">{header.heading}</SectionHeading>
          {header.description && <p className="m-0 mt-6 max-w-[38em] text-center font-sans text-solution-body-sm font-medium">{header.description}</p>}
          <div className="h-sp-xl" aria-hidden="true" />
        </div>
      ) : (
        <div className="mb-sp-xl flex flex-col-reverse items-center gap-4 text-center md:flex-row md:justify-between md:gap-6 md:text-left">
          <SectionHeading size="solution" align="left" mb={false} className="max-md:!text-center">{header.heading}</SectionHeading>
          {header.icon && <img src={header.icon} alt="" width="124" height="81" className="block" />}
        </div>
      )}

      <div className="grid gap-sp-gap md:grid-cols-[8.5em_minmax(0,1fr)] 2xl:grid-cols-[200px_minmax(0,1fr)]">
        <div role="tablist" className="z-10 hidden gap-[.75em] text-[13px] xl:text-[14px] 2xl:text-[16px] md:grid md:content-start">
          {items.map((it, i) => (
            <div key={it.label} className="relative">
              <button
                type="button"
                role="tab"
                aria-selected={i === active}
                data-color-theme={HUES[i % 5]}
                onClick={() => setActive(i)}
                className={`flex min-h-[54px] w-full items-center rounded-[.5em] border border-[var(--acc20)] px-[.8em] py-[.6em] text-left font-sans font-medium text-[var(--acc70)] transition-colors hover:border-[var(--acc30)] ${i === active ? 'bg-[var(--acc10)]' : 'bg-[var(--acc5)]'}`}
              >
                {it.label}
              </button>
              <svg
                aria-hidden="true"
                width="11"
                height="33"
                viewBox="0 0 11 33"
                data-color-theme={HUES[i % 5]}
                className={`pointer-events-none absolute left-[calc(100%+var(--sp-gap)+1px)] top-1/2 -translate-y-1/2 overflow-visible text-[var(--acc20)] transition-opacity duration-200 ${i === active ? 'opacity-100' : 'opacity-0'}`}
              >
                <path
                  d="M0 0 L11 16.5 L0 33 Z"
                  fill="currentColor"
                  className={`transition-transform duration-[350ms] ease-snappy ${i === active ? 'translate-x-0' : '-translate-x-[10px]'}`}
                />
              </svg>
            </div>
          ))}
        </div>

        <div ref={ref} className="relative max-md:grid max-md:gap-4 md:min-h-[320px]">
          {items.map((it, i) => (
            <article
              key={it.label}
              data-color-theme={HUES[i % 5]}
              aria-hidden={i !== active || undefined}
              className={`grid rounded-card border border-[var(--acc20)] bg-[var(--acc5)] p-card-pad text-center text-[var(--acc70)] [grid-template-areas:'heading'_'desc'_'img'] md:absolute md:inset-0 md:text-left md:transition-opacity md:duration-200 md:[grid-template-areas:'heading_.'_'desc_icon'] md:[grid-template-columns:2fr_minmax(30%,1fr)] md:[grid-template-rows:minmax(auto,1fr)_auto] min-[1194px]:[grid-template-columns:2fr_minmax(38%,1fr)] 2xl:pt-16 ${i === active ? 'md:opacity-100' : 'md:pointer-events-none md:opacity-0'}`}
            >
              <h3 className="m-0 text-balance font-serif text-[24px] font-normal leading-[27.6px] [grid-area:heading] 2xl:text-[36px] 2xl:leading-[36px] 2xl:tracking-[-0.72px]">{it.heading}</h3>
              <p className="m-0 mt-4 max-w-[26em] font-sans text-solution-body-sm font-medium [grid-area:desc] max-md:mx-auto md:mt-0 md:self-end">{it.description}</p>
              <img src={it.img} alt="" className="mx-auto mt-4 w-[60%] max-w-[60%] [grid-area:img] max-md:-mb-[5%] md:m-0 md:ml-[-15%] md:mr-[-9%] md:mt-[-15%] md:mb-[-20%] md:w-[275px] md:max-w-none md:self-end md:[grid-area:icon]" />
            </article>
          ))}
          <button
            type="button"
            aria-label="Next"
            onClick={next}
            data-color-theme={HUES[active % 5]}
            className="group absolute left-[calc(100%+.5px)] top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          >
            <svg width="75" height="88" viewBox="0 0 75 88" fill="none" className="block overflow-visible">
              <circle cx="37.5" cy="44" r="37" fill="var(--page-bg)" stroke="var(--acc20)" />
              <circle cx="37.5" cy="44" r="30.5" strokeWidth="2" className="fill-transparent stroke-[var(--acc20)] transition-colors group-hover:fill-[var(--acc30)]" />
              <circle
                key={`${active}-${visible}`}
                cx="37.5" cy="44" r="30.5" strokeWidth="2" strokeDasharray="191.54"
                strokeDashoffset={reduced ? 0 : 191.54}
                transform="rotate(-90 37.5 44)"
                className="stroke-[var(--acc70)] [animation:useCaseRing_linear_forwards]"
                style={{ animationDuration: `${interval}ms`, animationPlayState: visible && !reduced ? 'running' : 'paused', animationName: reduced ? 'none' : undefined }}
                onAnimationEnd={next}
              />
              <path d="M33 37 L42 44 L33 51" stroke="var(--acc70)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
