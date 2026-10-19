import InlineSvg from '../../InlineSvg.jsx'
import graphic from '../../../../reference/svg/pages/stories-explorer-header-graphic.svg?raw'

/** ProductExplorerHeaderGraphic: 1440x840 absolute container (z -1) holding a 1900x850 SVG centred; `faded` = vendor detail (opacity .6). */
export default function TemplatesBackdrop({ faded = false }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute left-1/2 top-[-130px] -z-10 h-[840px] w-[1440px] -translate-x-1/2 overflow-visible ${faded ? 'opacity-60' : ''}`}>
      <InlineSvg svg={graphic} className="absolute left-1/2 top-0 h-[850px] w-[1900px] -translate-x-1/2" />
    </div>
  )
}
