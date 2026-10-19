// Library sample data (specs/pages-c.md §6.3). Titles, tools and hrefs are real; descriptions are original placeholders.
const L = '/assets/pages/library'
const icon = (n) => ({ src: `${L}/${n}` })

export const stories = [
  { id: '1165570', slug: 'monitor-and-deactivate-long-lasting-aws-iam-keys', name: 'Monitor and deactivate long-lasting AWS IAM keys', tools: 'AWS', theme: 'green', icons: [icon('tool-aws.svg'), icon('story-icon-1f511.png'), icon('story-icon-26a0-fe0f.png')] },
  { id: '87634', slug: 'download-code42-cases', name: 'Download Code42 Cases', tools: 'Code42, Jira Software', theme: 'purple', icons: [icon('story-icon-1f6a8.png'), icon('story-icon-1f4be.png'), icon('story-icon-1f4eb.png')] },
  { id: '1354837', slug: 'contain-or-release-hosts-in-crowdstrike-from-jira', name: 'Contain or release hosts in CrowdStrike from Jira', tools: 'CrowdStrike, Jira Software', by: 'Cody Mood', theme: 'purple', icons: [icon('tool-crowdstrike.svg'), icon('story-icon-logo-jira.svg'), icon('story-icon-1f512.png')] },
  { id: '1359340', slug: 'request-and-approve-slack-posts-to-a-restricted-channel', name: 'Request and approve Slack posts to a restricted channel', tools: 'Slack', theme: 'purple', icons: [icon('story-icon-logo-slack.svg'), icon('story-icon-1f4e2.png'), icon('story-icon-2705.png')] },
  { id: '1359513', slug: 'sync-insider-threat-matrix-records-and-attach-to-cases', name: 'Sync Insider Threat Matrix records and attach to Cases', theme: 'orange', icons: [icon('story-icon-logo-tines.svg'), icon('story-icon-1f512.png'), icon('story-icon-1f517.png')] },
  { id: '1347799', slug: 'lookup-iocs-via-slack-using-an-agent', name: 'Lookup IOCs via Slack using an agent', tools: 'AbuseIPDB, Slack, URLScan.io, VirusTotal', theme: 'purple', icons: [icon('story-icon-1f928.png'), icon('story-icon-logo-virustotal.svg'), icon('story-icon-logo-slack.svg')] },
  { id: '1347198', slug: 'extract-certificate-chain-and-upload-to-custom-ca-in-tines', name: 'Extract certificate chain and upload to custom CA in Tines', theme: 'orange', icons: [icon('story-icon-logo-tines.svg'), icon('story-icon-1f6e1-fe0f.png'), icon('story-icon-fe0f.png')] },
  { id: '1346866', slug: 'detect-deepfakes-with-reality-defender-and-triage-in-jira', name: 'Detect deepfakes with Reality Defender and triage in Jira', tools: 'EmailRep, Reality Defender, Slack, Twilio', theme: 'green', icons: [icon('story-icon-emailrep.png'), icon('story-icon-logo-slack.svg'), icon('story-icon-logo-jira.svg')] },
  { id: '1346522', slug: 'generate-a-branching-text-adventure-using-the-ai-agent-action', name: 'Generate a branching text adventure using the AI Agent action', theme: 'green', icons: [icon('story-icon-logo-tines.svg'), icon('story-icon-1f3ae.png'), icon('story-icon-1f4fa.png')] },
]
const DESC = [
  'A placeholder summary of what this story automates, written for the clone.',
  'Shows how the steps connect together, with a short original description line.',
  'Illustrative text standing in for the real story summary on the live site.',
]
export const storyHref = (s) => `/library/stories/${s.id}/${s.slug}/`
export const storyProps = (s, i = 0) => ({ ...s, href: storyHref(s), description: s.description || DESC[i % 3] })
export const storyById = (id, slug) => stories.find((s) => s.id === id && (!slug || s.slug === slug))

export const teams = [
  { name: 'Security', image: `${L}/team-security.svg`, soft: 'bg-purple-5', wrap: 'bg-purple-10', ink: 'text-purple-65' },
  { name: 'IT operations', image: `${L}/team-it-operations.svg`, soft: 'bg-tint-peach', wrap: 'bg-tint-peach-mid', ink: 'text-orange-70' },
  { name: 'Engineering', image: `${L}/team-engineering.svg`, soft: 'bg-green-5', wrap: 'bg-green-10', ink: 'text-tint-green-ink' },
  { name: 'Product', image: `${L}/team-product.svg`, soft: 'bg-tint-rose', wrap: 'bg-tint-rose-mid', ink: 'text-pink-65' },
  { name: 'Infrastructure', image: `${L}/team-infrastructure.svg`, soft: 'bg-purple-5', wrap: 'bg-purple-10', ink: 'text-purple-65' },
]
export const useCases = [
  { name: 'Asset and app management', image: `${L}/usecase-asset-and-app-management.svg`, bg: 'bg-pink-50' },
  { name: 'Employee lifecycle management', image: `${L}/usecase-employee-lifecycle-management.svg`, bg: 'bg-tint-green-book' },
  { name: 'Incidents and alerts', image: `${L}/usecase-incidents-and-alerts.svg`, bg: 'bg-red-50' },
  { name: 'Communication', image: `${L}/usecase-communication.svg`, bg: 'bg-pink-50' },
  { name: 'Ticket synchronization', image: `${L}/usecase-ticket-synchronization.svg`, bg: 'bg-tint-green-book' },
  { name: 'Core capabilities', image: `${L}/usecase-core-capabilities.svg`, bg: 'bg-purple-50' },
]
export const tools = ['AWS', 'Code42', 'CrowdStrike', 'Elastic', 'Drata', 'HashiCorp', 'Lacework', 'Material Security', 'Panther', 'Recorded Future', 'Snowflake', 'Wiz'].map((n) => ({
  name: n, logo: `${L}/tool-${n.toLowerCase().replace(/ /g, '-')}.svg`,
}))
export const allStoriesCount = 1213
