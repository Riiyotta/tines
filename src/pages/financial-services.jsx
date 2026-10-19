// /financial-services/ (specs/pages-b.md section 6). Shell: src/components/pages/industry/IndustryPage.jsx
import IndustryPage from '../components/pages/industry/IndustryPage.jsx'
import * as data from '../components/pages/industry/financial-services.js'

export const title = 'Financial Services | Tines'
export const theme = 'industry'

export default function FinancialServices() {
  return <IndustryPage page={data} />
}
