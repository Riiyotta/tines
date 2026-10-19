// /events/ index + detail data (specs/pages-c.md §8.3). Detail bodies are empty on the live samples; only header, details and map are shown.
import { EVENTS } from './cards.js'

const A = '/assets/pages/events/'
const imageFor = (slug) => `${A}event-${slug}.png`
const IMAGE_OVERRIDE = { 'how-we-built-a-custom-ai-soc': `${A}event-how-we-built-a-custom-ai-soc.png` }

export const events = EVENTS.map((e) => ({ ...e, image: IMAGE_OVERRIDE[e.slug] || imageFor(e.slug), href: e.href || `/events/${e.slug}/` }))

export const eventNav = {
  pill: { label: 'Events', href: '/events/' },
  links: [
    { label: 'Upcoming', href: '/events/' },
    { label: 'Webinars', href: '/webinars/' },
    { label: 'Builder Connect', href: '/events/builder-connect/' },
    { label: 'Workflow.live', href: 'https://www.workflow.live/', ext: true },
  ],
}

const MONTHS = { Jan: 'January', Feb: 'February', Mar: 'March', Apr: 'April', May: 'May', Jun: 'June', Jul: 'July', Aug: 'August', Sep: 'September', Oct: 'October', Nov: 'November', Dec: 'December' }
const longDate = (dates) => {
  const [m1, d1] = dates[0].split(' ')
  if (dates.length === 1) return `${MONTHS[m1]} ${d1}, 2026`
  const [m2, d2] = dates[1].split(' ')
  return m1 === m2 ? `${MONTHS[m1]} ${d1}–${d2}, 2026` : `${MONTHS[m1]} ${d1} – ${MONTHS[m2]} ${d2}, 2026`
}

// Known sample details (live labels); every other card gets a generated detail from its card data.
const SAMPLES = {
  'cribl-connect-munich': {
    cover: `${A}cover-cribl-connect-munich.png`, cta: 'Register on cribl.io ↗', time: '11:45 AM Germany Time',
    place: 'SOFITEL MUNICH BAYERPOST Bayerstrasse 12 80335 , Munich, Germany', address: ['SOFITEL MUNICH BAYERPOST Bayerstrasse 12', 'Munich', 'Germany'],
    excerpt: 'Meet the Tines team at Cribl Connect Munich and see automation in action.', textClass: '', related: [],
  },
  'black-hat-eu-2026': {
    cover: `${A}cover-black-hat-eu-2026.png`, cta: 'Register on blackhat.com ↗', date: 'December 9–10, 2026',
    place: 'ExCel , London, UK', address: ['ExCel', 'London', 'UK'],
    excerpt: 'Find the Tines team on the show floor.', textClass: 'text-tint-green-ink', related: ['black-hat-eu-book-a-meeting-2026'],
  },
}

export function getEvent(slug) {
  const card = events.find((e) => e.slug === slug)
  if (!card) return null
  const s = SAMPLES[slug] || {}
  const place = s.place || card.location
  return {
    ...card,
    cover: s.cover || card.image,
    cta: s.cta || 'Register now ↗',
    date: s.date || longDate(card.dates),
    time: s.time || null,
    place,
    address: s.address || (card.location ? card.location.split(', ') : []),
    excerpt: s.excerpt || `Join the Tines team at ${card.title}.`,
    textClass: s.textClass || '',
    related: (s.related || []).map((r) => events.find((e) => e.slug === r)).filter(Boolean),
  }
}
