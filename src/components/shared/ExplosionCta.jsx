/**
 * ExplosionCta / LegacyExplosiveCta ("Built by you, powered by Tines").
 * Implements specs/pages-c.md §2.9 (variant 'stories': card 360x412, bg lightest, 1px #aa94ff, r 12, body pad 56 32 48,
 * 42px Tines mark, H3 Roobert 500 28/32.2 -0.56 purple-70, buttons gap 6, lavender footer band with "Log in") and
 * specs/pages-a.md §10.12 / §12.11 (variant 'legacy': card 360x408, H3 Reckless 400 28 -0.28 purple-70, Mono pill buttons pad 0 22.75,
 * footer pad 42 bg purple-2 "Already have an account? Log in.").
 * Section: wrap pad-top 32 / mt -32, overflow hidden; inner flex centre, pad 200 0; backdrop 1770x900 centred on the card.
 *
 * Static state only: backdrop layers rendered at rest scales 0.7/0.6/0.5/0.4 (stories) and fully visible (`.ready`).
 * MOTION (for Animation): fade-in via IntersectionObserver `data-motion="explosion-backdrop"` (opacity .3/.5s), pointer-hover layer
 * scale toward 1.0 on `[data-explosion-layer]`, deco parallax on `[data-explosion-deco]`, legacy backdropGlow 1s alternate.
 *
 * Additive: showMark (legacy only: render the 42px mark above the heading, as the live enterprise/careers card does) + markSvg (svg string).
 * pages-c additive: storiesFit (Tines Stories area: mobile section py 62 / login band 76 tall, band reads "Already have an account? Log in").
 * pages-c additive: restScale (legacy card with the 4 stories layers at rest scales 0.7/0.6/0.5/0.4: /university/ and /webinars/ Gatsby copy). STORIES_LAYERS / STORIES_DECOS exported.
 * Props: variant, backdropLayers (string[] urls; defaults to the downloaded assets per variant), decos ([{ src, className }]), className.
 */
import { useEffect, useRef } from 'react'
import InlineSvg from '../InlineSvg.jsx'
import tinesMark from '../../../reference/svg/pages/stories-explosion-cta-tines-logo.svg?raw'

export const STORIES_LAYERS = [1, 2, 3, 4].map((n) => `/assets/pages/stories/explosion-cta-layer-${n}.svg`)
export const STORIES_DECOS = [
  { src: '/assets/pages/stories/explosion-cta-top-left-block-light.svg', className: 'left-[-90px] top-[40px] w-[53px]' },
  { src: '/assets/pages/stories/explosion-cta-coffee-mug-light.svg', className: 'right-[-80px] top-[-30px] w-[60px]' },
  { src: '/assets/pages/stories/explosion-cta-bottom-right-pentagon-light.svg', className: 'bottom-[-30px] right-[-60px] w-[51px]' },
]
const LEGACY_LAYERS = [
  '/assets/pages/enterprise/explosion-cta-backdrop-layer-light-speed-1-a5e592da744b86019fa7dd20a08675fa.svg',
  '/assets/pages/enterprise/explosion-cta-backdrop-layer-light-speed-2-d9c9fd3504b9d73566556cd6fe9bab48.svg',
  '/assets/pages/enterprise/explosion-cta-backdrop-layer-light-speed-3-063d5549af5e844b3f0873183eaa8beb.svg',
]
const SCALES = [0.7, 0.6, 0.5, 0.4]
// pages-b2 (specs/pages-b.md 4.8): 'industry' variant = stories card + solutions-shared layers/decos + scroll-driven layer scale.
const INDUSTRY_LAYERS = [1, 2, 3, 4].map((n) => `/assets/pages/solutions-shared/explosion-cta-backdrop-layer-light-speed-${n}.svg`)
const INDUSTRY_DECOS = [
  { src: '/assets/pages/solutions-shared/top-left-block-light.svg', className: 'left-0 top-0 w-[53px] -translate-x-3/4 -translate-y-[47%] max-sm:scale-[.7]' },
  { src: '/assets/pages/solutions-shared/coffee-mug-light.svg', className: 'bottom-[4.5em] right-full w-[81px] translate-x-[15%] max-sm:scale-[.7]' },
  { src: '/assets/pages/solutions-shared/bottom-right-pentagon-light.svg', className: 'right-0 top-full w-[51px] translate-x-1/4 -translate-y-[55%] max-sm:scale-[.7]' },
]

// Fitted to the live site: p = 1 - exp(-(945 - top)/262), clamped [0,1]; scale_i = s0_i + (1 - s0_i) * p; smoothed ~0.12/frame.
function useExplosionScroll(rootRef, enabled) {
  useEffect(() => {
    const root = rootRef.current
    if (!enabled || !root) return undefined
    const layers = [...root.querySelectorAll('[data-explosion-layer]')]
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      layers.forEach((l) => { l.style.transform = 'none' })
      return undefined
    }
    let cur = null
    let raf = 0
    const target = () => {
      const top = root.getBoundingClientRect().top
      return Math.min(1, Math.max(0, 1 - Math.exp(-(945 - top) / 262)))
    }
    const apply = (p) => layers.forEach((l, i) => { const s0 = SCALES[i] ?? 0.4; l.style.transform = `scale(${s0 + (1 - s0) * p})` })
    const tick = () => {
      const t = target()
      cur = cur === null ? t : cur + (t - cur) * 0.12
      if (Math.abs(t - cur) < 0.0005) cur = t
      apply(cur)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [rootRef, enabled])
}

export function ExplosionCta({ variant = 'stories', backdropLayers, decos, showMark = false, markSvg = tinesMark, storiesFit = false, restScale = false, className = '' }) {
  const industry = variant === 'industry'
  const legacy = variant === 'legacy'
  const layers = backdropLayers || (legacy ? LEGACY_LAYERS : industry ? INDUSTRY_LAYERS : STORIES_LAYERS)
  const deco = decos || (legacy ? [] : industry ? INDUSTRY_DECOS : STORIES_DECOS)
  const rootRef = useRef(null)
  useExplosionScroll(rootRef, industry)
  return (
    <div ref={rootRef} className={`mt-[-32px] overflow-hidden pt-8 ${className}`}>
      <section className={`relative flex justify-center px-page ${industry ? 'pb-[100px] pt-20 sm:py-[200px]' : storiesFit ? 'py-[62px] sm:py-[200px]' : 'py-[120px] sm:py-[200px]'}`}>
        <div
          data-motion="explosion-backdrop"
          aria-hidden="true"
          className={`pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[1770px] -translate-x-1/2 -translate-y-1/2 opacity-100 ${industry ? 'max-sm:scale-[.7]' : ''}`}
        >
          {layers.map((src, i) => (
            <div
              key={src}
              data-explosion-layer={i + 1}
              className="absolute inset-0 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${src})`, transform: legacy && !restScale ? undefined : `scale(${SCALES[i] ?? 0.4})`, transformOrigin: industry ? '50% 45%' : undefined }}
            />
          ))}
        </div>
        <div className="relative w-full max-w-[360px]">
          {deco.map((d) => (
            <img key={d.src} data-explosion-deco src={d.src} alt="" aria-hidden="true" className={`pointer-events-none absolute ${d.className}`} />
          ))}
          <div className={`relative overflow-hidden rounded-[12px] border border-tint-lilac-edge bg-lightest text-purple-70 ${legacy ? 'min-h-[408px]' : 'min-h-[412px]'}`}>
            <div className={`flex flex-col items-center px-8 text-center ${legacy ? (showMark ? 'pb-10 pt-[63px]' : 'pb-10 pt-12') : 'pb-12 pt-14'}`}>
              {(!legacy || showMark) && <InlineSvg svg={markSvg} className="mb-5 h-[42px] w-[42px]" />}
              <h3
                className={
                  legacy
                    ? 'font-serif text-[28px] font-normal leading-[1.15] tracking-[-0.28px]'
                    : 'font-sans text-[28px] font-medium leading-[32.2px] tracking-[-0.56px]'
                }
              >
                Built by you,<br />powered by Tines
              </h3>
              <div className={`${industry ? 'mt-8' : 'mt-6'} flex ${legacy ? 'gap-[7px]' : 'gap-[6px]'}`}>
                <a href="/book-a-demo/" className={`btn ${legacy ? '!px-[22.75px]' : ''} border-purple-70 bg-purple-70 text-lightest`}>Book a demo</a>
                <a href="https://login.tines.com/saml_idp/signup" className={`btn ${legacy ? '!px-[22.75px]' : ''} border-purple-70 text-purple-70 hover:bg-purple-5`}>Sign up free</a>
              </div>
            </div>
            <div className={`absolute inset-x-0 bottom-0 flex items-center justify-center bg-purple-2 font-sans text-[14px] font-medium leading-[19.6px] ${legacy ? 'h-[84px] rounded-b-[12px]' : storiesFit ? 'h-[76px] bg-purple-10/60 sm:h-[105px]' : 'h-[105px] bg-purple-10/60'}`}>
              <p>
                {legacy || storiesFit ? 'Already have an account? ' : ''}
                <a href="https://login.tines.com/" className="font-semibold underline">Log in</a>{legacy ? '.' : ''}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export const LegacyExplosiveCta = (props) => <ExplosionCta variant="legacy" {...props} />
