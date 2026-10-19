/** Coda (specs/pages-a.md §2.7): stamp, kicker, centered Reckless statement. */
import { CODA, A } from './data.jsx'

export function ThreeBCoda() {
  return (
    <section className="flex flex-col items-center gap-sp-lg px-[18px] pb-36 pt-28 text-center md:px-[35px] md:pb-48 md:pt-24 2xl:px-10">
      <img src={`${A}coda-stamp.svg`} alt="" width="123" height="129" className="block" />
      <p className="kicker m-0">{CODA.kicker}</p>
      <p className="m-0 max-w-[512px] font-serif text-coda-sm font-normal md:max-w-[672px] md:text-coda-md xl:max-w-[768px] xl:text-coda">{CODA.statement}</p>
    </section>
  )
}
