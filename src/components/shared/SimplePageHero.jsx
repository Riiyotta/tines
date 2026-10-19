/**
 * SimplePageHero (H1 Reckless + short text + optional buttons). Implements specs/pages-a.md §7.1 (ai-in-tines, left) and §8.1 (contact, centered).
 *  left (default): PageSection inner pad 96 0 (390: 40 0, centered), H1 Reckless 400 64/70.4 -1.28 (390: 38/41.8 -0.76), text mt 16 max 480 Roobert 500 16/22.4, buttons mt 40 gap 8.
 *  centered (`align="center"`): pad 96 0 64 (390: 40 0 45), H1 Reckless 400 72/82.8 -2.16 mb 36 (390: 48/55.2, mb 24), text Roobert 500 16/22.4 (390: 14/19.6).
 * Props: title, children (text node), actions (node), align ('left'|'center'), className.
 */
export function SimplePageHero({ title, children, actions, align = 'left', className = '' }) {
  const center = align === 'center'
  return (
    <header className={`mx-auto w-full max-w-[1440px] px-page-wide ${center ? 'pb-[45px] pt-10 text-center sm:pb-16 sm:pt-24' : 'py-10 text-center sm:py-24 sm:text-left'} ${className}`}>
      <h1
        className={
          center
            ? 'mb-6 font-serif text-[48px] font-normal leading-[55.2px] tracking-[-0.96px] sm:mb-9 sm:text-[72px] sm:leading-[82.8px] sm:tracking-[-2.16px]'
            : 'font-serif text-[38px] font-normal leading-[41.8px] tracking-[-0.76px] sm:text-[64px] sm:leading-[70.4px] sm:tracking-[-1.28px]'
        }
      >
        {title}
      </h1>
      {children && (
        <p className={`font-sans font-medium ${center ? 'text-[14px] leading-[19.6px] sm:text-[16px] sm:leading-[22.4px]' : 'mt-4 max-w-[480px] text-[16px] leading-[22.4px] max-sm:mx-auto'}`}>{children}</p>
      )}
      {actions && <div className={`mt-6 flex flex-wrap gap-2 sm:mt-10 ${center ? 'justify-center' : 'justify-center sm:justify-start'}`}>{actions}</div>}
    </header>
  )
}
