import InlineSvg from '../../InlineSvg.jsx'
import iconFree from '../../../../reference/svg/pages/pricing-ugahsw-icon.svg?raw'
import iconPaid from '../../../../reference/svg/pages/pricing-ugahsw-icon-2.svg?raw'
import { PLANS } from './data.jsx'

const ICON = { free: iconFree, paid: iconPaid }
const TONE = {
  free: { card: 'border-green-30 bg-green-5 text-[#00573c]', pill: 'bg-green-15 text-[#00573c]', btn: 'btn-filled-plan bg-pricing-green text-white', cols: 'grid-cols-[1fr_50px]', icon: 'w-[42px]' },
  paid: { card: 'border-purple-50 bg-purple-70 text-lightest', pill: 'bg-purple-15 text-purple-70', btn: 'bg-lightest text-purple-55', cols: 'grid-cols-[1fr_63px]', icon: 'w-[55px]' },
}

function Check() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true" className="absolute left-0 top-[5px]">
      <path d="M1 4.2 3.7 7 9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Free / Paid plan cards (specs/pages-a.md §1.2). */
export function PricingPlanCards() {
  return (
    <section className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-4 px-page-wide sm:gap-6 lg:grid-cols-2">
      {PLANS.map((p) => {
        const t = TONE[p.id]
        return (
          <article key={p.id} className={`relative grid grid-cols-1 content-start overflow-hidden rounded-[12px] border px-[18px] pb-[18px] sm:rounded-[14px] xl:px-6 xl:pb-6 2xl:px-[30px] 2xl:pb-[30px] 2xl:min-h-[365px] 3xl:min-h-[368px] ${t.card}`}>
            <div className="flex justify-center">
              <span className={`rounded-b-[9px] px-3 pb-2 pt-[7px] font-mono text-[12px] font-semibold uppercase leading-[13.8px] tracking-[0.24px] ${t.pill}`}>{p.pill}</span>
            </div>
            <h2 className="m-0 mt-7 text-center font-sans text-[28px] font-medium leading-[32.2px] tracking-[-0.56px] xl:mt-8 xl:text-[32px] xl:leading-[36.8px] xl:tracking-[-0.64px]">{p.title}</h2>
            <p className="m-0 mt-4 min-h-[40px] text-center font-sans text-[14px] font-semibold leading-[17.5px] xl:min-h-0 xl:text-[16px] xl:leading-[20px]">{p.description}</p>
            <div className="relative -mx-6 mt-[10px] xl:-mx-10 flex justify-center">
              <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-current opacity-20" />
              <a href={p.cta.href} className={`btn btn-lip relative ${t.btn} ${p.id === 'free' ? 'border-green-30/0' : 'border-transparent'}`}>
                {p.cta.label}
              </a>
            </div>
            <div className={`mt-6 grid items-end ${t.cols}`}>
              <ul className="m-0 flex list-none flex-col gap-[5.25px] p-0">
                {p.features.map((f) => (
                  <li key={f} className="relative pl-[17.5px] font-sans text-[14px] font-medium leading-[16.8px]">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <InlineSvg svg={ICON[p.id]} className={`h-[106px] ${t.icon} ml-2 justify-self-end`} />
            </div>
          </article>
        )
      })}
    </section>
  )
}
