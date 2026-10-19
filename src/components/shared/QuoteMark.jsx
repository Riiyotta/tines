/** Quotation-mark glyph used by PullQuoteCard / QuoteCard / PullQuote (pages-a §1.4 40x40, §9.4 27x24, pages-c §2.5 36px). Fill = currentColor. */
export function QuoteMark({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 24.5C8 19.1 10.6 14.6 15.8 11.6L17.4 14.2C14.6 15.9 13.2 17.9 13 20.2H17.4V29H8V24.5ZM22.6 24.5C22.6 19.1 25.2 14.6 30.4 11.6L32 14.2C29.2 15.9 27.8 17.9 27.6 20.2H32V29H22.6V24.5Z" />
    </svg>
  )
}
