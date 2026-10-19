import { useParams } from 'react-router-dom'
import AllStories, { ALL_PAGES } from '../../../../components/pages/library/AllStories.jsx'

export const title = 'All stories | Tines Library'
export const theme = 'plain'

export default function LibraryAllStoriesPage() {
  const n = parseInt(useParams().n, 10)
  return <AllStories key={n} page={n >= 1 && n <= ALL_PAGES ? n : 1} />
}
