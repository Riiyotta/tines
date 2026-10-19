// /solutions/it/ (specs/pages-b.md)
import SolutionPage from '../../../components/pages/solutions/SolutionPage.jsx'
import { IT } from '../../../components/pages/solutions/data.js'

export const title = 'IT Solutions: One platform for every workflow, every team, and every AI.'
export const theme = 'plain'

export default function Page() {
  return <SolutionPage data={IT} />
}
