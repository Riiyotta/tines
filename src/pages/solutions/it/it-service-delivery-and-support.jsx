// /solutions/it/it-service-delivery-and-support/ (specs/pages-b.md)
import SubSolutionPage from '../../../components/pages/solutions/SubSolutionPage.jsx'
import { ITSD } from '../../../components/pages/solutions/data.js'

export const title = 'IT service delivery and support Solutions: Build the future of IT service delivery'
export const theme = 'plain'

export default function Page() {
  return <SubSolutionPage data={ITSD} />
}
