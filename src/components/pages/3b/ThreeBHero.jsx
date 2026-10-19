/**
 * /3b/ hero (specs/pages-a.md §2.2): HeroCopy (no tag, no wordmark) + PullQuoteCard + VideoPlayer, over two flower beds.
 * The beds are alpha PNG captures of the live canvases (public/assets/pages/3b/bed-*.png) that drift down 100px over the first viewport.
 */
import { HeroCopy } from '../../shared/HeroCopy.jsx'
import { PullQuoteCard } from '../../shared/PullQuoteCard.jsx'
import InlineSvg from '../../InlineSvg.jsx'
import headspace from '../../../../reference/svg/pages/3b-headspace.svg?raw'
import { VideoPlayer } from './VideoPlayer.jsx'
import { HERO, SIGNUP_URL, A } from './data.jsx'

const quoteProps = { ...HERO.quote, logo: <InlineSvg svg={headspace} label="Headspace" className="block h-[30px] w-36 shrink-0" /> }

export function ThreeBHero() {
  return (
    <section className="relative pt-[8.5px]">
      {/* Backdrop: frameBox = the video frame's footprint, bottom-aligned with the section */}
      {/* <640: separate captures of the mobile layout (live re-lays the canvases out per breakpoint) */}
      <div aria-hidden="true" className="hero-bed pointer-events-none absolute left-[-88px] top-[642px] w-[335px] sm:hidden">
        <img src={`${A}bed-left-m.png`} alt="" className="block h-auto w-full" />
      </div>
      <div aria-hidden="true" className="hero-bed pointer-events-none absolute left-[119px] top-[313px] w-[356px] sm:hidden">
        <img src={`${A}bed-right-m.png`} alt="" className="block h-auto w-full" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 top-0 mx-auto hidden max-w-page overflow-visible px-page sm:block">
        <div className="absolute bottom-0 left-[var(--page-margin)] right-[var(--page-margin)] aspect-[1360/765]">
          <div className="hero-bed absolute" style={{ left: '-7.29%', top: '61.1%', width: '44.58%' }}>
            <img src={`${A}bed-left.png`} alt="" className="block h-auto w-full" />
          </div>
          <div className="hero-bed absolute" style={{ left: '41.9%', top: '-43.2%', width: '71.03%' }}>
            <img src={`${A}bed-right.png`} alt="" className="block h-auto w-full" />
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-page flex-col px-page xl:flex-row xl:items-start xl:gap-[55px] 2xl:items-end">
        <HeroCopy
          title={HERO.title}
          byline={HERO.byline}
          h1Class="!mt-0 sm:max-w-[784px] 3xl:!max-w-[896px]"
          bylineClass="sm:max-w-[624px]"
          actions={
            <>
              <a href="/book-a-demo/" className="btn btn-filled w-full">Book a demo</a>
              <a href={SIGNUP_URL} className="btn btn-frosted-page w-full">Sign up free</a>
            </>
          }
          className="min-w-0 sm:flex-[0_1_auto]"
        />
        <div className="hidden xl:block xl:min-w-0 xl:flex-[0_1_420px]">
          <PullQuoteCard variant="card" {...quoteProps} className="sm:!max-w-none" />
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-page px-page sm:mt-12 xl:mt-20 2xl:mt-[90px] 3xl:mt-24">
        <VideoPlayer />
      </div>
      <div className="relative sm:px-[30px] sm:pt-[30px] xl:hidden">
        <PullQuoteCard variant="card" {...quoteProps} className="sm:!min-h-0 sm:!max-w-none" />
      </div>
    </section>
  )
}
