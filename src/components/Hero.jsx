import InlineSvg from './InlineSvg.jsx'
import tagArrow from '../../reference/svg/hero-content-4.svg?raw'
import pauseIcon from '../../reference/svg/hero-icon-109.svg?raw'
import filletLeft from '../../reference/svg/hero-filletLeft-110.svg?raw'
import filletRight from '../../reference/svg/hero-filletRight-111.svg?raw'
import productFrame from '../../reference/svg/hero-product-visual-frame.svg?raw'
// Live re-lays out the scripted SVG per breakpoint: phone (<640, 3:4), tablet (640-1279, 4:3), desktop (>=1280, 2:1).
// Phone/tablet frames captured from the live DOM at 390 / 1000 (ids prefixed to avoid collisions).
import productFramePhone from '../../reference/svg/hero-product-visual-frame-phone.svg?raw'
import productFrameTablet from '../../reference/svg/hero-product-visual-frame-tablet.svg?raw'
import coinbase from '../../reference/svg/logo-coinbase.svg?raw'
import databricks from '../../reference/svg/logo-databricks.svg?raw'
import reddit from '../../reference/svg/logo-reddit.svg?raw'
import snowflake from '../../reference/svg/logo-snowflake.svg?raw'
import intercom from '../../reference/svg/logo-intercom.svg?raw'
import dropbox from '../../reference/svg/logo-dropbox.svg?raw'
import pinterest from '../../reference/svg/logo-pinterest.svg?raw'
import mongodb from '../../reference/svg/logo-mongodb.svg?raw'
import sophos from '../../reference/svg/logo-sophos.svg?raw'
import canva from '../../reference/svg/logo-canva.svg?raw'
import mckesson from '../../reference/svg/logo-mckesson.svg?raw'

const SIGNUP_URL = 'https://login.tines.com/saml_idp/signup'

// §2 Logo marquee order
const LOGOS = [
  ['Coinbase', coinbase], ['Databricks', databricks], ['Reddit', reddit], ['Snowflake', snowflake],
  ['Intercom', intercom], ['Dropbox', dropbox], ['Pinterest', pinterest], ['MongoDB', mongodb],
  ['Sophos', sophos], ['Canva', canva], ['McKesson', mckesson],
]

// §2 Timeline: 9 segment widths (%) and a static "0:01" state for Animation to drive.
const SEGMENTS = [4.09248, 4.74727, 3.12388, 13.9067, 19.5505, 17.2748, 19.2059, 9.49215, 8.60636]
const STATIC_PROGRESS = (1 / 91) * 100 // 0:01 of 1:31


function LogoSet({ hidden }) {
  return LOGOS.map(([name, svg]) => (
    <span
      key={name}
      className="relative flex shrink-0 items-center [&>svg]:block"
      aria-hidden={hidden || undefined}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  ))
}

function TimelineBar() {
  let left = 0
  const segs = SEGMENTS.map((w) => {
    const seg = { left, width: w }
    left += w
    return seg
  })
  const fillFor = (s) => Math.max(0, Math.min(100, ((STATIC_PROGRESS - s.left) / s.width) * 100))

  return (
    <div
      data-motion="timeline-bar"
      data-dock="top"
      className="absolute left-tl-inset right-tl-inset top-0 z-[1] -translate-y-full select-none font-sans text-[13px] text-purple-70"
    >
      <div className="relative isolate flex min-h-[44px] flex-nowrap items-center gap-x-3 gap-y-2 rounded-t-transport p-2">
        <div aria-hidden="true" className="absolute inset-0 -z-10 rounded-[inherit] bg-surface-timeline-bar backdrop-blur-timeline" />
        <button
          type="button"
          aria-label="Pause"
          data-motion="timeline-play"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-purple-70 transition-colors hover:bg-[color-mix(in_srgb,theme(colors.purple.90)_8%,transparent)]"
        >
          <InlineSvg svg={pauseIcon} className="h-[14px] w-[14px] [&_svg]:fill-current" />
        </button>
        <div data-motion="timeline-track" className="relative flex h-4 min-w-[140px] flex-1 items-center">
          {segs.map((s, i) => (
            <div
              key={i}
              data-motion="timeline-segment"
              className="absolute top-1/2 z-[1] h-1 -translate-y-1/2 overflow-hidden rounded-[3px] bg-surface-timeline-track data-[hot]:bg-surface-timeline-track-hot"
              style={{ left: `calc(${s.left}% + 1px)`, width: `calc(${s.width}% - 2px)` }}
            >
              <div className="h-full bg-purple-55" style={{ width: `${fillFor(s)}%` }} />
            </div>
          ))}
          {/* Hover tick (live .hoverTick): shown at the hovered x while the pointer is over the track */}
          <div
            data-motion="timeline-hover-tick"
            aria-hidden="true"
            className="pointer-events-none absolute top-0 z-[2] hidden w-[2px] -translate-x-px bg-timeline-hover-tick"
          />
          <div
            data-motion="timeline-knob"
            className="pointer-events-none absolute top-1/2 z-[3] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ left: `${STATIC_PROGRESS}%` }}
          >
            {/* knobDot; data-hot = hovered within 16px of the knob (live .knobDotHot) */}
            <div
              data-motion="timeline-knob-dot"
              className="h-[9px] w-[9px] rounded-full bg-purple-55 transition-transform duration-[120ms] ease-ease data-[hot]:scale-[1.6] data-[hot]:bg-purple-90"
            />
          </div>
          {/* Caption chip, docked to the top edge of the transport */}
          <div
            data-motion="timeline-caption"
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[calc(100%+13.1px)] z-[5] whitespace-nowrap rounded-t-[8px] bg-surface-timeline-bar px-[9px] pb-[2px] pt-[4.5px] font-sans text-timeline-caption font-semibold text-purple-70 backdrop-blur-timeline"
            style={{ left: '-18px' }}
          >
            <InlineSvg svg={filletLeft} className="absolute bottom-0 right-full h-2 w-2 -scale-y-100 fill-surface-timeline-bar" />
            Your workspace
            <InlineSvg svg={filletRight} className="absolute bottom-0 left-full h-2 w-2 -scale-y-100 fill-surface-timeline-bar" />
          </div>
        </div>
        <span data-motion="timeline-time" className="pr-[6px] text-timeline-time font-semibold tabular-nums text-purple-60">
          0:01 / 1:31
        </span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative mx-auto flex max-w-page flex-col pt-[16.5px] sm:pt-[19.5px] lg:block xl:pt-[16.5px]">
      {/* Fold region (>=1024): copy + marquee + wordmark capped to the viewport height. <1024: display:contents */}
      <div className="hero-fold">
      {/* Copy block */}
      <div className="relative z-[1] order-1 px-page">
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <a
            href="/blog/introducing-tines-3b/"
            className="inline-flex h-[30px] items-center gap-[7px] overflow-hidden rounded-tag text-left border border-purple-55 bg-surface-tag backdrop-blur-frosted hover:bg-surface-tag-hover"
          >
            <span className="flex h-full items-center border-r border-purple-55 px-[11.9px] py-[2.38px] font-mono text-tag-new font-bold uppercase">
              New
            </span>
            <span className="flex items-center gap-[7px] pl-[4.62px] pr-[10.5px]">
              <span className="text-tag font-semibold">Introducing Tines 3B</span>
              <InlineSvg svg={tagArrow} className="h-2 w-[9px]" />
            </span>
          </a>

          <h1 className="mt-6 max-w-[896px] font-sans text-h1-sm font-medium text-purple-55 sm:text-h1-md sm:font-normal 3xl:max-w-none 3xl:text-h1-lg">
            <span className="block text-pretty">You told everyone to use&nbsp;AI.</span>
            <span className="block text-pretty">Now give them a secure place to do&nbsp;it.</span>
          </h1>

          <p className="mt-[0.8em] max-w-[342px] font-sans text-hero-byline-sm font-medium sm:max-w-[1152px] sm:font-serif sm:text-hero-byline">
            Tines lets every team build. IT and Security maintain complete visibility, governance, and control.
          </p>

          <div className="mt-6 grid grid-cols-[140px_140px] gap-2">
            <a href="/book-a-demo/" className="btn btn-filled w-full">Book a demo</a>
            <a href={SIGNUP_URL} className="btn btn-frosted w-full">Sign up free</a>
          </div>
        </div>
      </div>

      {/* Logo marquee */}
      <div className="relative z-0 order-2 mb-2 mt-sp-lg px-page">
        <div
          data-motion="logo-marquee"
          className="marquee-mask -mx-5 cursor-grab select-none overflow-hidden py-1 [zoom:0.96] active:cursor-grabbing sm:[zoom:0.8] xl:[zoom:0.96]"
        >
          <div data-motion="logo-marquee-track" className="flex w-max items-center gap-5 sm:gap-[30px] xl:gap-[45px]">
            <LogoSet />
            <LogoSet hidden />
          </div>
        </div>
      </div>

      {/* "100×" wordmark stage (canvas stand-in) */}
      <div className="hero-stage order-3 flex flex-col items-center">
        <div
          data-motion="hundredx-sink"
          className="hero-wordmark relative z-0 mt-sp-md aspect-[504.96/264] max-w-none sm:-mt-[6.5%] xl:-mb-[12%]"
        >
          <img
            data-motion="hero-canvas-100x"
            src="/assets/canvas/hero-field-0.png"
            alt="100× — simpler, faster, easier to adopt"
            draggable="false"
            className="pointer-events-none absolute left-1/2 top-1/2 h-auto w-[131.71%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none"
          />
        </div>
      </div>
      </div>

      {/* Product visual: margin-top xxl (<640), xxl-175px (640-1023), -(40px + peek growth) (>=1024, see .hero-visual) */}
      <div className="hero-visual relative z-[3] order-4 px-page max-sm:mt-sp-xxl sm:max-xl:mt-[calc(var(--sp-xxl)-175px)]">
        <div data-motion="product-visual-root" className="relative max-sm:mx-[calc(50%-50vw)] max-sm:w-screen">
          {/* Dock sentinel (live .dockSentinel): 1px at the top of the visual; drives the bar's data-dock */}
          <div data-motion="timeline-dock-sentinel" aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-px w-px" />
          <TimelineBar />
          <div
            data-motion="product-visual"
            className="relative aspect-[3/4] overflow-hidden rounded-hero-frame sm:aspect-[4/3] sm:rounded-none 2xl:aspect-[2/1]"
          >
            <InlineSvg svg={productFramePhone} className="absolute inset-0 h-full w-full sm:!hidden [&>svg]:overflow-hidden" />
            <InlineSvg svg={productFrameTablet} className="absolute inset-0 !hidden h-full w-full sm:!block 2xl:!hidden [&>svg]:overflow-hidden" />
            <InlineSvg svg={productFrame} className="absolute inset-0 !hidden h-full w-full 2xl:!block [&>svg]:overflow-hidden" />
          </div>
        </div>
      </div>
    </section>
  )
}
