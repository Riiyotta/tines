/**
 * ContentCardGrid (pages-b section 3.4): related-content grid. 2 columns (gap 8 <640, 24 above); >=1024 four columns x two rows.
 * Cards 1-3 span two rows at every width (min-height 225 / 300 / 340); card 4 also spans unless layout=5, where cards 4 and 5 stack beside card 3 / in column 4.
 * Props: layout (4 | 5), children = ContentCard elements (pass nothing but the cards).
 */
import { Children, cloneElement } from 'react'

export function ContentCardGrid({ layout = 4, children, className = '' }) {
  const cards = Children.toArray(children)
  return (
    <div className={`grid grid-cols-2 gap-2 sm:gap-6 xl:grid-cols-4 xl:grid-rows-2 ${className}`}>
      {cards.map((c, i) => {
        const tall = i < 3 || (i === 3 && layout !== 5)
        const cls = tall ? 'row-span-2 min-h-[225px] sm:min-h-[300px] xl:min-h-[340px]' : ''
        return cloneElement(c, { className: `${c.props.className || ''} ${cls}` })
      })}
    </div>
  )
}
