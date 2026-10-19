/**
 * PageSection container. Implements specs/pages-a.md §REUSE shared pattern 16 + pages-c.md §0.4.
 * Default: content column of 1128 at 1440 = `px-page-wide` (18 / 70 @640 / 85 @920 / 125 @1024 / 156 @1280), max 1440.
 * `wider`: max 1520, `px-page` (18 / 30 / 35 / 40).
 * Sections are separated with `spaced` (margin-top = the existing `section-margin` token: 96 / 120 / 125 / 140 / 156).
 */
export function PageSection({ as: Tag = 'section', wider = false, spaced = false, className = '', children, ...rest }) {
  return (
    <Tag
      className={`mx-auto w-full ${wider ? 'max-w-page px-page' : 'max-w-[1440px] px-page-wide'} ${spaced ? 'mt-section-margin' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
