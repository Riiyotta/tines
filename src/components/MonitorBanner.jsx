export default function MonitorBanner() {
  return (
    <section className="relative mx-auto my-section-pad w-full max-w-page sm:max-2xl:mt-[calc(var(--section-padding)+var(--sp-md))]">
      {/* <640: canvas stand-in sits above the copy in a 1.93548:1 slot, min 403px tall (live .gardenSlot) */}
      {/* Live canvas overflows the slot (780x490 @390); stand-in captured from the live canvas at 390 */}
      <div className="relative aspect-[1.93548/1] min-h-[403px] sm:hidden">
        <img
          data-motion="monitor-canvas"
          src="/assets/canvas/monitor-canvas-sm.png"
          alt="An interconnected wall of retro monitors with animated screens"
          draggable="false"
          className="pointer-events-none absolute left-0 top-0 h-auto w-full max-w-none select-none"
        />
      </div>
      {/* >=640: canvas stand-in behind the copy, full viewport width, overflowing below the band */}
      {/* The live canvas re-lays out per width; stand-ins captured at 768 / 1100 / 1440 */}
      <picture>
        <source media="(min-width: 1280px)" srcSet="/assets/canvas/monitor-canvas-1.png" />
        <source media="(min-width: 920px)" srcSet="/assets/canvas/monitor-canvas-lg.png" />
        <img
          data-motion="monitor-canvas"
          src="/assets/canvas/monitor-canvas-md.png"
          alt="An interconnected wall of retro monitors with animated screens"
          draggable="false"
          className="pointer-events-none absolute left-1/2 top-0 z-0 hidden h-[150%] w-screen max-w-none -translate-x-1/2 select-none object-cover object-top sm:block"
        />
      </picture>

      <div className="pointer-events-none relative z-[1] flex flex-col items-center px-page-wide pb-section-pad pt-sp-lg text-center text-balance sm:pt-section-pad [&>*]:pointer-events-auto [&>*]:m-0 [&>*]:w-[min(100%,440px)]">
        <p className="kicker !mb-[62.4px]">The new reality for IT and security</p>
        <h2 className="font-serif text-monitor-h2-sm font-normal sm:max-w-[8em] sm:text-monitor-h2-md xl:text-monitor-h2">
          <span className="block">AI made everyone a builder.</span>{' '}
          <strong className="block font-bold">But security and IT got 100× harder.</strong>
        </h2>
        <div className="!mb-6 !mt-9 flex justify-center xl:!mb-9 xl:!mt-[52px]">
          <img src="/assets/images/ai-tangle.svg" alt="" className="block h-auto max-w-[114px]" width="114" height="114" />
        </div>
        <div className="flex flex-col gap-[14px] font-serif text-monitor-body-sm font-medium xl:text-monitor-body">
          <p>
            Now, finance is building dashboards in Claude Code. Marketing shipped an app on a personal Vercel account.
            Someone committed an API key to GitHub last week.
          </p>
          <p>
            None of it is malicious. They’re doing exactly what you asked. But without visibility and control, innovation
            creates new risk. It’s time to give every team a secure place to build.
          </p>
        </div>
      </div>
    </section>
  )
}
