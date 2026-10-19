/**
 * CardGrid: fixed-track grid used by every index. Implements specs/pages-c.md §1 "Card grid".
 * Props: cols ({ base: 1, md: 2, lg: 3 } -> grid-template-columns repeat; or a CSS track string such as '264px 264px'),
 * gap ([row, col] px, default [24, 24]; blog uses [64, 24]), className.
 * The tracks are `minmax(0,1fr)` so cards fill the page column (437.33 for 3-up @1440 blog, 360 case studies, etc.).
 */
const COLS = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6' }
const MD = { 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4', 5: 'md:grid-cols-5', 6: 'md:grid-cols-6' }
const LG = { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6' }

export function CardGrid({ cols = { base: 1, md: 2, lg: 3 }, gap = [24, 24], as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag
      className={`grid ${COLS[cols.base || 1]} ${cols.md ? MD[cols.md] : ''} ${cols.lg ? LG[cols.lg] : ''} ${className}`}
      style={{ rowGap: gap[0], columnGap: gap[1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
