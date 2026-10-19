/**
 * ContentCardGrid ("related content", live SolutionForRelatedContentSection; specs/pages-b.md 3.4 / 4.7). Used by the sub-solution and industry pages.
 * 2 columns (gap 8 <640, 24 above); >=1280 four columns x two rows. Cards 1-3 span two rows at >=1280; card 4 also spans unless layout=5,
 * where cards 4 and 5 stack in column 4 (below 1280 card 3 spans two rows so 4 and 5 stack beside it). Min heights 225 / 300 / 340
 * on every card except the stacked 4 and 5.
 * Props: layout (4 | 5), rows ('equal' = two 1fr rows, the solution pages | 'auto' = content-sized rows, the industry pages: financial-services
 * measures 240 + 135 on live), children = ContentCard elements (pass nothing but the cards), className.
 */
import { Children, cloneElement } from 'react'

export function ContentCardGrid({ layout = 4, rows = 'equal', children, className = '' }) {
  const cards = Children.toArray(children)
  return (
    <div className={`grid grid-cols-2 gap-2 sm:gap-6 xl:grid-cols-4 ${rows === 'auto' ? 'xl:grid-rows-[auto_auto]' : 'xl:grid-rows-2'} ${className}`}>
      {cards.map((c, i) => {
        const stacked = layout === 5 && i >= 3
        const span = [
          layout === 5 && i === 2 ? 'row-span-2' : '',
          i < 3 || (i === 3 && layout !== 5) ? 'xl:row-span-2' : '',
        ].join(' ')
        return cloneElement(c, { className: `${span} ${stacked ? '' : 'min-h-[225px] sm:min-h-[300px] xl:min-h-[340px]'} ${c.props.className || ''}` })
      })}
    </div>
  )
}
