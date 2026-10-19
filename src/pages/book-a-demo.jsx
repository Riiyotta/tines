// /book-a-demo/ (legacy Gatsby). specs/pages-a.md §5. Theme: bg purple-5, fg purple-65.
import { useRef, useState } from 'react'
import { DemoForm } from '../components/shared/index.js'
import { LogoMarquee, LOGOS } from '../components/shared/LogoSet.jsx'
import InlineSvg from '../components/InlineSvg.jsx'
import formIcon from '../../public/assets/pages/book-a-demo/book-a-demo-form-icon-35f81fc8fb7e604edf366ab90becc657.svg?raw'
import { BACKDROP_CARDS, MOBILE_BACKDROP, MOBILE_LOGOS, EXPECT } from '../components/pages/book-a-demo/data.js'
import { useMarqueeDrift, useScrollParallax } from '../components/pages/_lib/motion.js'

export const title = 'Book a demo | Tines'
export const theme = 'purple-5-plain'

function MobileIntro() {
  const [open, setOpen] = useState(false)
  return (
    <div className="lg:hidden">
      <div className="relative h-[265px] overflow-hidden">
        <img src={MOBILE_BACKDROP} alt="" aria-hidden="true" className="h-full w-full object-cover" />
        <InlineSvg svg={formIcon} className="absolute left-1/2 top-[28px] h-[113px] w-[59px] -translate-x-1/2 scale-[1.1]" />
      </div>
      {open ? (
        <div className="mt-4 px-[18px]"><DemoForm forceOpen icon={formIcon} /></div>
      ) : (
        <div className="px-[18px]">
          <h1 className="relative -mt-[107px] text-center font-sans text-[34px] font-medium leading-[38px] tracking-[-0.68px]">Talk to a product expert</h1>
          <button type="button" onClick={() => setOpen(true)} aria-expanded="false" className="mt-[26px] h-[50px] w-full rounded-[8px] border-2 border-purple-55 bg-purple-45 font-sans text-[16px] font-semibold text-lightest transition-[filter] duration-100 hover:brightness-110">
            Get started
          </button>
          <div className="mt-[34px] rounded-[12px] border border-tint-lilac-line bg-lightest/50 px-[18px] py-[22px]">
            <p className="font-sans text-[14px] font-bold leading-[16.8px]">What to expect:</p>
            <ul className="mt-[7px] list-disc pl-[16.8px] font-sans text-[14px] font-medium leading-[19px] [&>li+li]:mt-[7px]">
              {EXPECT.map((e) => <li key={e}>{e}</li>)}
            </ul>
          </div>
        </div>
      )}
      <p className="mt-[30px] text-center font-sans text-[11px] font-bold uppercase leading-[15.4px] tracking-[1.65px]">Trusted by</p>
      <div className="mx-auto mt-5 flex max-w-[354px] flex-wrap items-center justify-center gap-x-[14px] gap-y-[22px] px-[18px] pb-[30px]">
        {MOBILE_LOGOS.map((svg, i) => (
          <span key={i} className="flex items-center [&>svg]:block [&>svg]:h-[21px] [&>svg]:w-auto" dangerouslySetInnerHTML={{ __html: svg }} />
        ))}
      </div>
    </div>
  )
}

export default function BookADemo() {
  const root = useRef(null)
  useMarqueeDrift(root)
  useScrollParallax(root)
  return (
    <div ref={root} className="relative lg:pb-[366px] lg:pt-[72px]">
      <MobileIntro />
      {/* Backdrop: decorative product cards with scroll-driven parallax (translate 0 -> shift). >=768 only */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-[68px] hidden h-[1070px] overflow-hidden lg:block">
        <div className="relative mx-auto h-full w-[1440px] max-w-none">
          {BACKDROP_CARDS.map((c) => (
            <div key={c.id} className="absolute" style={{ left: c.x, top: c.y, width: c.w, height: c.h }}>
              <InlineSvg svg={c.svg} className="absolute inset-0 h-full w-full" data-parallax={`0,${c.shift}`} />
            </div>
          ))}
        </div>
      </div>

      <section className="relative mx-auto hidden max-w-[774px] lg:block">
        <DemoForm icon={formIcon} />
      </section>

      <div className="relative hidden lg:absolute lg:inset-x-0 lg:top-[741px] lg:block">
        <LogoMarquee size="lg" className="text-purple-65" />
      </div>
    </div>
  )
}
