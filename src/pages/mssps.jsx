// /mssps/ (specs/pages-b.md section 8). Shell: src/components/pages/industry/IndustryPage.jsx
import IndustryPage from '../components/pages/industry/IndustryPage.jsx'
import * as data from '../components/pages/industry/mssps.js'

export const title = 'MSSPs | Tines'
export const theme = 'industry'

export default function Mssps() {
  return <IndustryPage page={data} />
}
