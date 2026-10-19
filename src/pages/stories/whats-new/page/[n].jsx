import { useParams } from 'react-router-dom'
import WhatsNewFeed from '../../../../components/pages/stories/WhatsNewFeed.jsx'
import { WHATS_NEW_PAGES } from '../../../../components/pages/stories/data.js'

export const title = 'What’s new | Tines Stories'
export const theme = 'plain'

export default function WhatsNewPage() {
  const n = parseInt(useParams().n, 10)
  return <WhatsNewFeed page={n >= 1 && n <= WHATS_NEW_PAGES ? n : 1} key={n} />
}
