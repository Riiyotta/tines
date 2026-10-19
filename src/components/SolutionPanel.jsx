import InlineSvg from './InlineSvg.jsx'
import orb from '../../reference/svg/solution-orb-112.svg?raw'

const ITEMS = [
  [['Visibility across', 'AI-created work'], 'Know what exists, who built it, and what it touches. Focus on empowering teams without leaving a mess to untangle.'],
  [['Control without', 'bottlenecks'], 'Determine where and how access happens so teams can self-serve and freely build. Make the governed path the easy one.'],
  [['Autonomous fixes,', 'controlled by you'], 'Tines identifies and suggests fixes for anomalies and potential breaks. Your workflows get better the longer they run. You control what goes live.'],
  [['AI on your', 'terms, always'], 'Start where you’re already working. Choose where, when, and how your LLMs are used, with freedom to switch as your AI strategy evolves.'],
]

export default function SolutionPanel() {
  return (
    <section className="relative z-[1] mx-auto max-w-page lg:px-page">
      <div data-motion="solution-panel" className="relative grid gap-sp-xl overflow-hidden rounded-panel-sm bg-purple-55 px-page pb-sp-xl pt-sp-xxl text-lightest lg:grid-cols-[1fr_2fr] lg:grid-rows-[auto_1fr] lg:gap-y-sp-lg lg:rounded-panel-md lg:p-sp-xl 2xl:grid-cols-2 2xl:gap-x-[calc((min(100vw,1520px)-344px)/12+48px)] 2xl:rounded-panel">
        {/* <920: flower strip sticking up out of the panel */}
        <div className="relative z-0 -mx-[calc(var(--page-margin)+var(--sp-lg))] -mt-[calc(var(--sp-xxl)+var(--sp-lg))] mb-sp-md aspect-[457/85] sm:mx-auto sm:w-4/5 sm:max-w-[500px] lg:hidden">
          {/* Live canvas overflows this slot by (-8.75%, -47%), 117.5% x 195%; captured at 390 / 768 */}
          <picture>
            <source media="(min-width: 640px)" srcSet="/assets/canvas/solution-field-top-md.png" />
            <img
              data-motion="solution-flower-top"
              src="/assets/canvas/solution-field-top-sm.png"
              alt=""
              aria-hidden="true"
              draggable="false"
              className="pointer-events-none absolute left-[-8.75%] top-[-47%] h-[195%] w-[117.5%] max-w-none select-none"
            />
          </picture>
        </div>

        <div className="relative z-[1] m-0 text-center lg:col-start-1 lg:row-start-1 lg:text-left">
          <p className="kicker mb-[31.2px]">Our 100× solution</p>
          <h2 className="m-0 text-pretty font-sans text-h2-sm font-medium sm:text-h2-solution-md lg:font-normal 2xl:text-h2">
            <span className="block">Freedom to build.</span> <span className="block">Complete security.</span>{' '}
            <span className="block">No compromises.</span>
          </h2>
        </div>

        <div className="relative z-[1] flex flex-col gap-sp-xxl lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="grid grid-cols-2 gap-sp-lg border-y border-purple-40 py-sp-xl lg:gap-y-sp-xl lg:border-0 lg:py-0">
            {ITEMS.map(([[l1, l2], body]) => (
              <div key={l1} className="flex flex-col gap-3">
                <h3 className="m-0 font-sans text-solution-h3-sm font-bold lg:font-serif lg:text-solution-h3">
                  {l1}
                  <br />
                  {l2}
                </h3>
                <p className="m-0 text-wrap text-solution-body-sm font-medium opacity-80 lg:text-pretty lg:text-solution-body lg:opacity-100">{body}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-sp-md text-center lg:ml-auto lg:w-[calc((100%-var(--sp-lg))/2)] lg:items-start lg:text-left">
            <InlineSvg svg={orb} data-motion="solution-orb" className="h-12 w-12" />
            <p className="m-0 max-w-[340px] font-serif text-solution-footer font-normal">
              <strong className="font-bold">Tines 3B</strong> powers faster delivery, safer operations, and AI execution that
              scales with confidence.
            </p>
            <a href="/3b/" className="btn btn-filled-white">Explore the product</a>
          </div>
        </div>

        {/* Flower bed (canvas stand-in). <920: bottom strip; >=920: bottom-left, bleeding to panel edges */}
        <div data-motion="solution-flower-bed-wrap" className="relative z-0 order-last -mx-[calc(var(--page-margin)+var(--sp-lg))] -mb-[calc(var(--sp-xl)+var(--sp-lg))] mt-sp-md aspect-[500/136.8] overflow-visible sm:mx-auto sm:w-4/5 sm:max-w-[500px] lg:order-none lg:col-span-full lg:row-start-2 lg:-ml-[calc(var(--sp-xl)+var(--sp-lg))] lg:mr-[34%] lg:mt-0 lg:aspect-[920/307.7] lg:w-auto lg:max-w-none lg:self-end">
          <picture>
            <source media="(min-width: 920px)" srcSet="/assets/canvas/solution-field-2.png" />
            <source media="(min-width: 640px)" srcSet="/assets/canvas/solution-field-md.png" />
          <img
            data-motion="solution-flower-bed"
            src="/assets/canvas/solution-field-sm.png"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="pointer-events-none absolute left-[-8.75%] top-[-32%] h-[164%] w-[117.5%] max-w-none select-none object-cover lg:left-[-4.647%] lg:top-[-13.89%] lg:h-[127.78%] lg:w-[109.29%]"
          />
          </picture>
        </div>
      </div>
    </section>
  )
}
