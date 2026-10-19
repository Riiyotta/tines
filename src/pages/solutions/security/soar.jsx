// /solutions/security/soar/ (specs/pages-b.md)
import SubSolutionPage from '../../../components/pages/solutions/SubSolutionPage.jsx'
import { SOAR } from '../../../components/pages/solutions/data.js'

export const title = 'SOAR Solutions: Modern SOAR built for speed, security, and scale'
export const theme = 'plain'

export default function Page() {
  return <SubSolutionPage data={SOAR} />
}
