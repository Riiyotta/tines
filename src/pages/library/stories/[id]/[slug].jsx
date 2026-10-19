import { useParams } from 'react-router-dom'
import LibraryNav from '../../../../components/pages/library/LibraryNav.jsx'
import StoryEmbed from '../../../../components/pages/library/StoryEmbed.jsx'
import { storyById } from '../../../../components/pages/library/data.js'

export const title = 'Library story | Tines'
export const theme = 'plain'

const CREDIT = { '1354837': { label: 'Community author', name: 'Cody Mood' }, '1359340': { label: 'Created by', name: 'Audrey Kwong' } }

/** Library story detail (specs/pages-c.md §6.2): full-width StoryEmbed, sidebar not rendered. Unknown ids get a "not found in this clone" state. */
export default function LibraryStory() {
  const { id, slug } = useParams()
  const story = storyById(id, slug)
  if (!story) {
    return (
      <>
        <LibraryNav />
        <section className="mx-auto flex min-h-[50vh] max-w-page flex-col items-start justify-center px-page">
          <h1 className="font-sans text-[30px] font-medium leading-[30.6px] tracking-[-0.3px] sm:text-[44px] sm:leading-[44.88px] sm:tracking-[-1.32px]">Not found in this clone</h1>
          <p className="mt-4 font-sans text-[16px] font-medium leading-[22.4px]">This story has not been cloned.</p>
          <a href="/library/" className="btn btn-filled mt-6">Back to the library</a>
        </section>
      </>
    )
  }
  return (
    <>
      <LibraryNav />
      <div className="mx-auto max-w-page px-page pb-[85px] pt-6 max-sm:-mt-[25px] max-sm:pt-0 sm:pb-40">
        <StoryEmbed story={story} variant="full" credit={CREDIT[story.id] || { label: 'Created by', name: story.by || 'Tines' }} />
      </div>
    </>
  )
}
