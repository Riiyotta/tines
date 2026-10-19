// /solutions/security/ai-soc/ (specs/pages-b.md)
import SubSolutionPage from '../../../components/pages/solutions/SubSolutionPage.jsx'
import { AI_SOC } from '../../../components/pages/solutions/data.js'

export const title = 'AI SOC Solutions: Build the AI SOC your team actually needs'
export const theme = 'plain'

export default function Page() {
  return <SubSolutionPage data={AI_SOC} />
}
