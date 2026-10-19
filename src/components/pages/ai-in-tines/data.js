// /ai-in-tines/ data (specs/pages-a.md §7). Body copy is original placeholder text.
const A = '/assets/pages/ai-in-tines'
export const EXTEND_CARDS = [
  { title: 'Chat and copilots', text: 'Ask questions, get summaries, and trigger work through chat, pages, or Slack.', bg: `${A}/ai-page-extend-chat-illo.svg`, cls: 'border-tint-lilac-line-2 text-purple-70 max-sm:rounded-t-[12px] sm:rounded-tl-usp' },
  { title: 'AI agents', text: 'Assist with investigations, coordinate tasks, or guide workflows with clearly defined controls.', bg: `${A}/ai-page-extend-agent-illo.svg`, cls: 'border-green-15 text-tint-green-ink-dk sm:rounded-tr-usp' },
  { title: 'MCP servers', text: 'Enforce intentional systems access to AI that’s always aligned to your organizational policies.', bg: `${A}/ai-page-extend-mcp-server-illo.svg`, cls: 'border-pga-orange-edge text-orange-70 sm:rounded-bl-usp' },
  { title: 'MCP clients', text: 'Connect your existing MCP servers to Tines for your AI interactions across the platform.', bg: `${A}/ai-page-extend-mcp-client-illo.svg`, cls: 'border-pga-pink-edge text-pink-70 max-sm:rounded-b-[12px] sm:rounded-br-usp' },
]
export const BADGES = [
  { src: `${A}/aicpaBadge.png`, alt: 'AICPA SOC', w: 83, h: 83 },
  { src: `${A}/hippaBadge.png`, alt: 'HIPAA', w: 128, h: 68 },
  { src: `${A}/gdprBadge.png`, alt: 'GDPR', w: 83, h: 83 },
  { src: `${A}/sensiba-iso-iec-27001.png`, alt: 'ISO/IEC 27001', w: 83, h: 110 },
  { src: `${A}/sensiba-iso-iec-27701.png`, alt: 'ISO/IEC 27701', w: 83, h: 110 },
  { src: `${A}/sensiba-x-iso-42001.png`, alt: 'ISO/IEC 42001', w: 83, h: 110 },
]
export const TRUST_GREEN = ['Stateless', 'Private', 'Geo-bound', 'Tenant-scoped']
export const TRUST_ORANGE = ['No networking', 'No training', 'No storage', 'No logging']
export const OWN_CARDS = [
  { lead: 'Your AI, your choice', text: 'Run Tines AI on hosted cloud infrastructure and pick from the model providers that suit your team and your policies, or point Tines at a provider you already trust and manage.', img: `${A}/ai-page-custom-ai-provider-support.svg`, cls: 'bg-purple-5 border-tint-violet-mid' },
  { lead: 'AI for all', text: 'AI features are available on every deployment type, so every team in every environment can use them without special setup or extra approvals.', img: `${A}/ai-page-ai-for-all.svg`, cls: 'bg-orange-2 border-pga-orange-line' },
]
export const OUTCOMES = [
  { title: 'AI agent and copilot orchestration', items: ['Multi-agent security investigation', 'IT help desk copilot', 'Automated phishing response'], icon: `${A}/ai-page-outcome-agent-icon.svg`, w: 73, h: 87, cls: 'bg-pga-cream border-pga-cream-line text-pga-cream-ink' },
  { title: 'AI-assisted workflow execution', items: ['Intelligent alert triage and routing', 'Dynamic decision-making in workflows', 'Automated incident report generation'], icon: `${A}/ai-page-outcome-execution-icon.svg`, w: 106, h: 100, cls: 'bg-green-2 border-green-15 text-tint-green-ink-dk' },
  { title: 'Custom AI capabilities for internal systems', items: ['Bring your own AI models', 'Build AI-powered internal tools', 'Extend proprietary systems with AI'], icon: `${A}/ai-page-outcome-internal-icon.svg`, w: 63, h: 72, cls: 'bg-orange-2 border-pga-orange-edge text-orange-70' },
  { title: 'Enterprise knowledge and system coordination', items: ['Leverage knowledge bases such as Notion/Glean/Confluence', 'Sync unstructured data across systems', 'Real-time documentation sync for workflows'], icon: `${A}/ai-page-outcome-enterprise-icon.svg`, w: 80, h: 98, cls: 'bg-purple-2 border-tint-lilac-line-2 text-purple-70' },
]
