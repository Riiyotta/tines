/**
 * Pill (date / type / time pills for events + webinars). Implements specs/pages-c.md §1 "Date and type pills" + §3 type roles
 * (mono-pill: Roobert Mono 600 11/12.65 ls .22 uppercase; webinars 700 12/12 ls .24 pad 7.2 12 r 24).
 * Props: tone (any Tailwind bg+text classes, e.g. 'bg-purple-70 text-purple-5'), size ('sm' 11px | 'md' 12px webinar), rounded ('pill'|'24'), children.
 */
export function Pill({ tone = 'bg-purple-70 text-purple-5', size = 'sm', rounded = 'pill', className = '', children }) {
  const type = size === 'md' ? 'text-[12px] font-bold leading-[12px] tracking-[0.24px] px-3 py-[7.2px]' : 'text-mono-pill font-semibold px-[10px] py-[4px]'
  return <span className={`inline-flex items-center font-mono uppercase ${type} ${rounded === '24' ? 'rounded-[24px]' : 'rounded-pill'} ${tone} ${className}`}>{children}</span>
}
