import InlineSvg from './InlineSvg.jsx'
import radar from '../../reference/svg/usp-radar-119.svg?raw'
import constellation from '../../reference/svg/usp-constellation-118.svg?raw'

const CARDS = [
  ['Born in security, built for the enterprise.', 'Governance, guardrails, and monitoring across every surface.', 'cosmic-tulip.svg', 96, 105],
  ['Built for your most important workflows.', 'Trusted by the world’s most ambitious organizations.', 'kaleidoscope-monitor.svg', 61, 136],
  ['Vendor-agnostic.', 'Work across your entire tech stack and within your infrastructure.', 'pruning-thorns.svg', 105, 136],
  ['Unmatched time to value.', 'Teams love Tines for speed, power, and ease of use.', 'blossoming-transformation.svg', 112, 126],
]

export default function WhyTines() {
  return (
    <section className="mx-auto mt-section-margin max-w-page px-page">
      <div className="mb-sp-xl flex flex-col gap-sp-xl md:grid md:grid-cols-[1.4fr_1fr] md:items-center md:gap-x-sp-xl md:gap-y-sp-lg lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col items-center gap-sp-gap text-center md:items-stretch md:text-left">
          <p className="kicker m-0">Why Tines?</p>
          <h2 className="m-0 max-w-[11em] text-balance font-sans text-h2-sm font-medium sm:text-h2-md sm:font-normal xl:text-h2">
            Powerful workflows, proven success.
          </h2>
          <p className="m-0 max-w-[32em] text-pretty font-sans text-byline-sm font-medium sm:font-serif sm:text-byline sm:font-normal">
            Tines is uniquely positioned — and proven — to be the single, secure environment for every team’s AI-native
            agents, apps, and automations.
          </p>
        </div>

        <div className="relative order-first mx-auto w-[200px] max-w-full sm:w-[240px] md:order-none md:ml-auto md:mr-0 md:w-[300px]">
          <InlineSvg
            svg={radar}
            className="relative z-[1] -mt-[15%] !block aspect-[264/279] w-full"
          />
          <InlineSvg
            svg={constellation}
            data-motion="usp-constellation"
            className="absolute left-[2%] top-[-15%] z-0 aspect-square w-[44%]"
          />
        </div>
      </div>

      <div className="-mx-page grid grid-cols-[1fr] overflow-hidden rounded-panel-sm border border-surface-card-border bg-purple-55 text-lightest backdrop-blur-frosted sm:mx-0 sm:grid-cols-[1fr_1fr] sm:gap-sp-gap sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent sm:backdrop-blur-none 2xl:grid-cols-[repeat(4,1fr)]">
        {CARDS.map(([lead, rest, icon, w, h], i) => (
          <figure
            key={lead}
            className={`m-0 flex items-center gap-4 px-4 py-8 sm:flex-col sm:items-stretch sm:gap-sp-lg sm:rounded-usp sm:border sm:border-surface-card-border sm:bg-purple-55 sm:p-6 sm:backdrop-blur-frosted 2xl:aspect-[3/4] ${
              i > 0 ? 'border-t border-purple-40' : ''
            }`}
          >
            <div className="flex w-[90px] flex-none justify-center sm:order-1 sm:mt-auto sm:w-auto sm:justify-start">
              <img
                src={`/assets/images/usp/${icon}`}
                alt=""
                width={w}
                height={h}
                className="h-auto max-w-none [zoom:0.8] sm:max-w-full sm:[zoom:1]"
              />
            </div>
            <h3 className="m-0 text-pretty font-serif text-usp-title-sm font-normal sm:text-usp-title">
              <strong className="font-bold">{lead}</strong> {rest}
            </h3>
          </figure>
        ))}
      </div>
    </section>
  )
}
