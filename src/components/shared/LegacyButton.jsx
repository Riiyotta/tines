/**
 * LegacyButton (Gatsby-era pages: enterprise, soar, careers). Implements specs/pages-a.md §"Buttons used" LegacyButton and §13.1.
 * h 39, pad 0 14, r 7, Roobert 600 14/14; filled = page ink bg + white text; outlined = 1px ink border, hover ink@10%.
 * shape 'pill' = r 9990 pad 0 24.5; mono (with pill) = Roobert Mono 700 13 uppercase pad 0 22.75. Hover transition: background-color .1s ease.
 * Ink follows the page theme (--page-fg / --page-btn-bg), so /enterprise/ (theme 'enterprise' = #4d3e78) and soar/careers (purple-65) both work.
 * Props: variant ('filled'|'outlined'), shape ('rect'|'pill'), mono, href, children, className, ...rest (rendered as <a> when href else <button>).
 */
export function LegacyButton({ variant = 'filled', shape = 'rect', mono = false, href, children, className = '', ...rest }) {
  const Tag = href ? 'a' : 'button'
  const size = shape === 'pill' ? `rounded-full ${mono ? 'px-[22.75px]' : 'px-[24.5px]'}` : 'rounded-[7px] px-[14px]'
  const font = mono ? 'font-mono text-[13px] font-bold uppercase leading-[13px] tracking-[0.26px]' : 'font-sans text-btn-sans font-semibold'
  const color =
    variant === 'filled'
      ? 'border-page-btn bg-page-btn text-white hover:brightness-110'
      : 'border-page-fg bg-transparent text-page-fg hover:bg-[color-mix(in_srgb,currentColor_10%,transparent)]'
  return (
    <Tag
      href={href}
      className={`inline-flex h-[39px] items-center justify-center whitespace-nowrap border transition-[background-color,filter] duration-100 ease-ease ${size} ${font} ${color} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
