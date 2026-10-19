/**
 * IndustryHero: the live SolutionHero as used by IndustryPage (specs/pages-b.md 2.1 + 4.1).
 * NOTE for reconciliation: group b1 owns the SolutionPage hero; this is a self-contained hero for the industry pages (centered + split).
 *
 * centered: section max 1520, pt sp-xxl; `.content` max 1040 px-page; kicker (mono 11.5) -30- h1 (balance, max 15em) -30- description
 *   (max 576) -40- button grid (auto-flow-col, cols minmax(140px,1fr), gap 8) [-30- small print lines].
 *   Decorations (>=1280): backdrop absolute inset-0 overflow-hidden; <1280: a single page icon (mb 2em).
 * split (mssps): px page-wide; grid "content aside / footer footer" (1fr auto), column gap 24, row gap 72, left-aligned; footer = marquee, mt 60.
 * openingParagraphs { title, paragraphs[] }: max 936, my section-pad, py section-pad, 1px borders currentColor@20%, 2 columns >=768.
 */
import InlineSvg from '../../InlineSvg.jsx'

// spacer heights are the live --sp-md / --sp-md / --sp-lg steps (30/30/40 at 1440, 18/18/24 at 390)
const SP = { md: 'h-sp-md', lg: 'h-sp-lg' }
const Spacer = ({ h }) => <div className={SP[h]} aria-hidden="true" />

function Buttons({ buttons, align }) {
  return (
    <div className={`grid w-fit auto-cols-[minmax(140px,1fr)] grid-flow-col gap-2 ${align === 'center' ? 'mx-auto' : align === 'mobile-center' ? 'mx-auto md:mx-0' : ''}`}>
      {buttons.map((b) => (
        <a key={b.label} href={b.href} className={`btn ${b.kind === 'outlined' ? 'btn-outlined' : 'btn-filled'}`}>
          {b.label}
        </a>
      ))}
    </div>
  )
}

function OpeningParagraphs({ title, paragraphs }) {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-page-wide">
      <div className="mx-auto my-section-pad max-w-[936px] border-y border-[color-mix(in_srgb,currentColor_20%,transparent)] py-section-pad md:columns-2 md:gap-6 [&>*+*]:mt-6">
        <h2 className="max-w-[15em] text-center font-serif text-opening-h2-sm font-normal md:max-w-[12em] md:text-left md:text-opening-h2">{title}</h2>
        {paragraphs.map((p) => (
          <p key={p} className="text-center font-sans text-[16px] font-medium leading-[22.4px] md:text-left">{p}</p>
        ))}
      </div>
    </section>
  )
}

export function IndustryHero({ variant = 'centered', kicker, title, description, buttons, decoration, backdropSvg, smallPrint, aside, footer, opening }) {
  if (variant === 'split') {
    return (
      <section className="mx-auto w-full max-w-page px-page-wide pt-sp-xxl">
        <div className="grid grid-cols-1 items-center gap-x-6 text-center md:grid-cols-[1fr_auto] md:gap-y-[72px] md:text-left">
          <div>
            <p className="font-mono text-kicker-mono font-bold uppercase">{kicker}</p>
            <Spacer h="md" />
            <h1 className="mx-auto max-w-[12em] text-balance font-serif md:mx-0 text-sol-h1-sm font-normal sm:text-sol-h1-md 2xl:text-sol-h1">{title}</h1>
            <Spacer h="md" />
            <p className="mx-auto max-w-[24em] font-sans md:mx-0 text-[16px] font-medium leading-[22.4px]">{description}</p>
            <Spacer h="lg" />
            <Buttons buttons={buttons} align="mobile-center" />
          </div>
          <InlineSvg svg={aside} className="block h-auto w-[286px] max-md:order-3 max-md:mt-8 max-md:max-h-[220px] max-md:w-auto max-md:justify-self-center [&>svg]:max-md:max-h-[220px] [&>svg]:max-md:w-auto" />
          <div className="mt-[60px] max-md:order-2 md:col-span-2" style={{ marginInline: 'calc(-1 * (var(--page-margin-wide) - var(--page-margin)))' }}>
            {footer}
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="relative mx-auto w-full max-w-page pt-sp-xxl">
      {decoration?.pageIcon && (
        <div className="mx-auto mb-[42px] flex justify-center 2xl:hidden">
          <img src={decoration.pageIcon} alt="" className="h-auto w-[117px]" />
        </div>
      )}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden max-2xl:hidden">
        {decoration?.left && <img src={decoration.left} alt="" className="absolute -left-5 top-[40px] h-[454px] w-[360px] max-w-none" />}
        {decoration?.right && <img src={decoration.right} alt="" className="absolute -right-5 top-[23px] h-[454px] w-[360px] max-w-none" />}
        {backdropSvg && <InlineSvg svg={backdropSvg} className="absolute bottom-0 left-[70px] block h-[169px] w-[207px]" />}
      </div>
      <div className="relative mx-auto flex w-full max-w-[1040px] flex-col items-center px-page text-center">
        <p className="w-full font-mono text-kicker-mono font-bold uppercase">{kicker}</p>
        <Spacer h="md" />
        <h1 className="max-w-[15em] text-balance font-serif text-sol-h1-sm font-normal sm:text-sol-h1-md 2xl:text-sol-h1">{title}</h1>
        <Spacer h="md" />
        <p className="max-w-[36em] font-sans text-[16px] font-medium leading-[22.4px]">{description}</p>
        <Spacer h="lg" />
        <Buttons buttons={buttons} align="center" />
        {smallPrint && (
          <>
            <Spacer h="md" />
            <div className="max-w-[50em] font-sans text-[13px] font-medium leading-[18.2px] opacity-70 [&>p+p]:mt-[.6em]">{smallPrint}</div>
          </>
        )}
      </div>
      {opening && <div className="relative"><OpeningParagraphs {...opening} /></div>}
    </section>
  )
}
