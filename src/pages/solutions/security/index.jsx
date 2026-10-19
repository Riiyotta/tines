// /solutions/security/ (specs/pages-b.md)
import SolutionPage from '../../../components/pages/solutions/SolutionPage.jsx'
import { SECURITY } from '../../../components/pages/solutions/data.js'

export const title = 'Security Solutions: Built by security practitioners, for security practitioners'
export const theme = 'plain'

export default function Page() {
  return <SolutionPage data={SECURITY} />
}
