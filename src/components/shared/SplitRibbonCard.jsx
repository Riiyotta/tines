/**
 * SplitRibbonCard: two-panel card whose left "tab" panel is offset vertically and overlapped by the right panel.
 * Implements specs/pages-a.md §13.2 geometry table, §1.4 (quote), §7.2 / §7.4 (figure), §10.9 / §11.15 (legacy).
 *
 * Props
 *   variant  'quote'  grid `tab 800` (tab 140w pricing / 360w soar via tabWidth), tab r 14 0 0 14, pad-r 71, translateY(-24),
 *                     content margin-left -72, pad 32 48 (390: 32 24), r 0 14 14 0
 *            'figure' 12-col grid; left = cols 1-6 margin-right -96, translateY(28), r 14 0 0 14; right = cols 7-12, r 0 14 14 0
 *            'legacy' grid `504 720`; left r 8 0 0 8 pad 48 mb 47; right mt 47, margin-left -72, r 0 8 8 0 (wrapper 1224, -mx-12)
 *   tone     Tailwind classes for BOTH panels (shared bg + 1px border), e.g. 'bg-purple-60 border-purple-40'
 *   tab      ReactNode for the left panel (may be empty for the pricing quote ribbon: pass tabHidden to hide it <768 too)
 *   children ReactNode for the right panel
 *   tabClass / panelClass  extra classes per panel (padding etc.)
 *   tabWidth px for the quote variant (default 140)
 * <=768 the panels stack: top r 12 12 0 0, bottom r 0 0 12 12, no offsets (an empty tab is hidden).
 */
const WRAP = {
  quote: 'lg:grid lg:grid-cols-[var(--tab-w)_1fr] lg:max-w-[calc(var(--tab-w)+800px)]',
  figure: 'lg:grid lg:grid-cols-2',
  legacy: 'lg:grid lg:grid-cols-[504px_1fr] lg:-mx-12 lg:w-[calc(100%+96px)]',
}
const TAB = {
  quote: 'lg:rounded-l-[14px] lg:rounded-r-none lg:-translate-y-6 lg:pr-[71px]',
  figure: 'lg:rounded-l-[14px] lg:rounded-r-none lg:translate-y-[28px] lg:-mr-[96px] lg:border-r-0',
  legacy: 'lg:rounded-l-[8px] lg:rounded-r-none lg:mb-[47px] lg:p-12',
}
const PANEL = {
  quote: 'lg:-ml-[72px] lg:rounded-r-[14px] lg:rounded-l-none px-6 py-8 lg:px-12',
  figure: 'lg:rounded-r-[14px] lg:rounded-l-none',
  legacy: 'lg:mt-[47px] lg:-ml-[72px] lg:rounded-r-[8px] lg:rounded-l-none lg:py-24 lg:pl-[120px] lg:pr-[72px] px-6 py-8',
}

// `cols` (additive, optional): explicit lg grid tracks e.g. '552px 1fr' (used by /ai-in-tines/ where the figure panel is 648 and
// slides 72px under the 552 header). Replaces the variant's default two-equal-column track; defaults unchanged.
export function SplitRibbonCard({ variant = 'quote', tone = '', tab, children, tabClass = '', panelClass = '', tabWidth = 140, tabHidden = false, cols, className = '' }) {
  const hasTab = !!tab && !tabHidden
  const wrap = cols ? WRAP[variant].replace('lg:grid-cols-2', 'lg:grid-cols-[var(--ribbon-cols)]') : WRAP[variant]
  return (
    <div className={`mx-auto w-full ${wrap} ${className}`} style={{ '--tab-w': `${tabWidth}px`, ...(cols ? { '--ribbon-cols': cols } : null) }}>
      <div
        className={`relative rounded-t-[12px] border max-lg:border-b-0 ${tone} ${TAB[variant]} ${hasTab ? '' : 'max-lg:hidden'} ${tabClass}`}
      >
        {tab}
      </div>
      <div className={`relative border ${hasTab ? 'rounded-b-[12px] max-lg:border-t-0' : 'rounded-[12px]'} ${tone} ${PANEL[variant]} ${panelClass}`}>{children}</div>
    </div>
  )
}
