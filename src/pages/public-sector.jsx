// /public-sector/ (specs/pages-b.md section 7). Shell: src/components/pages/industry/IndustryPage.jsx
import IndustryPage from '../components/pages/industry/IndustryPage.jsx'
import * as data from '../components/pages/industry/public-sector.js'

export const title = 'Public sector | Tines'
export const theme = 'industry'

export default function PublicSector() {
  return <IndustryPage page={data} />
}
