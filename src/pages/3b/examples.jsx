import { AreaNav } from '../../components/shared/index.js'
import CtaStartToday from '../../components/CtaStartToday.jsx'
import { ExamplesCatalogue } from '../../components/pages/3b-examples/ExamplesCatalogue.jsx'
import { AREA_NAV } from '../../components/pages/3b-examples/data.jsx'

export const title = 'Tines 3B examples | Tines'
export const theme = 'plain'

export default function ThreeBExamples() {
  return (
    <>
      <AreaNav {...AREA_NAV} pillTone="purple-5" showThemeToggle />
      <ExamplesCatalogue />
      <div className="h-section-margin" aria-hidden="true" />
      <CtaStartToday flush />
    </>
  )
}
