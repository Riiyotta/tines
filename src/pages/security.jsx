// /security/ (specs/pages-b.md section 9): legacy TrustArticlePage, rebuilt on the shared chrome. No CTA section.
import { AreaNav } from '../components/shared/AreaNav.jsx'
import { StandardPageHeader, ArticleWithToc } from '../components/pages/security/TrustArticle.jsx'
import { blocks, pullQuote } from '../components/pages/security/data.js'

export const title = 'Security at Tines | Tines'
export const theme = 'plain'

const LINKS = [
  { label: 'Security', href: '/security/', caret: true, active: true, activeClass: 'text-purple-50' },
  { label: 'Legal', href: '/legal/', caret: true },
  { label: 'Trust center', href: 'https://trust.tines.com/', ext: true },
]

export default function Security() {
  return (
    <div>
      <AreaNav pill={{ label: 'Trust and security', href: '/security/' }} links={LINKS} collapseLabel="Security" collapseAt="md" />
      <StandardPageHeader title="Security at Tines" />
      <div className="h-section-pad" aria-hidden="true" />
      <ArticleWithToc pullQuote={pullQuote} blocks={blocks} />
      <div className="h-section-margin" aria-hidden="true" />
    </div>
  )
}
