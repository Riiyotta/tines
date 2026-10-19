import { useParams } from 'react-router-dom'
import WhatsNewEntry from '../../../components/pages/stories/WhatsNewEntry.jsx'

export const title = 'What’s new | Tines Stories'
export const theme = 'plain'

export default function WhatsNewDetail() {
  return <WhatsNewEntry slug={useParams().slug} />
}
