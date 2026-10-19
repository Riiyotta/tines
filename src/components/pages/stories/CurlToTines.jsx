import { DotGrid } from '../../shared/index.js'
import InlineSvg from '../../InlineSvg.jsx'
import copyIcon from '../../../../reference/svg/pages/stories-copy-icon.svg?raw'
import arrow from '../../../../reference/svg/pages/stories-curl-arrow.svg?raw'
import actionCard from '../../../../reference/svg/pages/stories-action-card.svg?raw'

const CODE = 'curl -v \\ -X GET \\ --location \\\n"https://api.example.com/v1/items?\napi_key=DEMO_KEY" \\ -H \'Content-\nType: application/json\''

/** CurlToTinesIllustration (specs/pages-c.md §5.4): pink panel with a cURL code block, copy button, hand-drawn arrow and a mini action card. */
export default function CurlToTines({ className = '' }) {
  return (
    <div className={`relative grid min-h-[327px] grid-cols-1 content-between gap-y-3 overflow-hidden rounded-usp border border-tint-rose-mid bg-tint-rose p-[30px] ${className}`}>
      <DotGrid dotClass="bg-tint-pink-dot" opacity={0.6} />
      <div className="relative grid grid-cols-[1fr_64px] rounded-[10px] border border-pink-60 bg-pink-80 p-4 text-tint-rose">
        <div>
          <h3 className="font-sans text-[12px] font-bold uppercase leading-[16.8px] tracking-[1.2px]">cURL request</h3>
          <pre className="mt-4 whitespace-pre-wrap font-mono text-[12px] font-semibold leading-[13.8px]">{CODE}</pre>
        </div>
        <button type="button" className="flex h-fit items-center gap-1 self-end justify-self-end rounded-[6px] bg-coll-pink-btn px-[9px] py-[6px] font-sans text-[12px] font-semibold leading-[13.8px] text-lightest transition-[filter] hover:brightness-110">
          <InlineSvg svg={copyIcon} className="h-[11px] w-[11px]" />
          Copy
        </button>
      </div>
      <div className="relative flex items-end justify-between px-6 pt-4">
        <InlineSvg svg={actionCard} className="h-[57px] w-[149px]" label="HTTP request action" />
        <span className="relative text-pink-60">
          <InlineSvg svg={arrow} className="h-[73px] w-[110px]" />
          <span className="absolute -bottom-1 right-3 -rotate-[5deg] whitespace-nowrap font-sans text-[12px] font-semibold leading-[13.2px]">Paste in your story</span>
        </span>
      </div>
    </div>
  )
}
