/**
 * CenteredIntro. Implements specs/pages-a.md §11.2 / §11.12 / §10.6 header: spot icon (68x90 / 84x90), H2 Reckless 400 46/48.3 -0.92
 * (mt 24, max 736, centered), optional text (mt 24, max 608; Roobert 500 16/20.8).
 * Additive: textMax (Tailwind max-w class for the text, default max-w-[608px]).
 * Props: icon (svg string), iconClass (size, default 'h-[90px] w-[68px]'), title, children (text), titleMax, className.
 */
import InlineSvg from '../InlineSvg.jsx'

export function CenteredIntro({ icon, iconClass = 'h-[90px] w-[68px]', title, children, titleMax = 'max-w-[736px]', textMax = 'max-w-[608px]', className = '' }) {
  return (
    <div className={`mx-auto flex flex-col items-center text-center ${className}`}>
      {icon && <InlineSvg svg={icon} className={iconClass} />}
      <h2 className={`${icon ? 'mt-6' : ''} ${titleMax} font-serif text-section-h2-sm font-normal sm:text-section-h2`}>{title}</h2>
      {children && <p className={`mt-6 ${textMax} font-sans text-[16px] font-medium leading-[20.8px]`}>{children}</p>}
    </div>
  )
}
