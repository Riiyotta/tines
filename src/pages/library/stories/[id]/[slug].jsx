import { useParams } from 'react-router-dom'
import { NotFoundPage } from '../../../../components/shared/NotFoundPage.jsx'
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
        <NotFoundPage actions={[{ href: "/library/", label: "Back to the library" }, { href: "/", label: "Back to home" }]} />
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
