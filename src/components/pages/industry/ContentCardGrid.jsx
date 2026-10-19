/**
 * ContentCardGrid ("related content", live SolutionForRelatedContentSection). Implements specs/pages-b.md 3.4 / 4.7.
 * 2 cols gap 8 (<640), gap 24 (>=640); >=1024: 4 cols x 2 rows, cards 1-3 span 2 rows; card 4 spans 2 rows unless layout === 5
 * (cards 4 and 5 stack in col 4; below 1024 card 3 spans 2 rows so 4 and 5 stack beside it). Min heights 225 / 300 / 340 (not on stacked cards). Cards are the shared ContentCard with `hue` / `shade`.
 */
import { ContentCard } from '../../shared/ContentCard.jsx'

export function ContentCardGrid({ layout = 4, cards }) {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-page-wide">
      <div className="grid grid-cols-2 gap-2 sm:gap-6 xl:grid-cols-4 xl:grid-rows-[auto_auto]">
        {cards.map((c, i) => {
          const stacked = layout === 5 && i >= 3
          const span = [
            layout === 5 && i === 2 ? 'row-span-2' : '',
            i < 3 || (i === 3 && layout !== 5) ? 'xl:row-span-2' : '',
          ].join(' ')
          return (
            <ContentCard
              key={c.title}
              titleBleed={!c.caseDecor}
              compact
              {...c}
              className={`${span} ${stacked ? '' : 'min-h-[225px] sm:min-h-[300px] xl:min-h-[340px]'} ${c.className || ''}`}
            />
          )
        })}
      </div>
    </section>
  )
}
