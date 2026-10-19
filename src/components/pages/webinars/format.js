// Webinar time pill: formatted with Intl.DateTimeFormat in the visitor's timezone (live: "9:30 PM Calcutta Time").
const clean = (s) => s.replace(/[  ]/g, ' ')

export function tzLabel() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
    const city = tz.split('/').pop().replace(/_/g, ' ')
    return city === 'UTC' ? 'UTC' : city
  } catch {
    return 'UTC'
  }
}

export function formatWebinar(startsAt) {
  const d = new Date(startsAt)
  const sameYear = d.getFullYear() === new Date().getFullYear()
  const date = clean(new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', ...(sameYear ? {} : { year: 'numeric' }) }).format(d))
  const time = clean(new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(d))
  const long = `${d.getDate()} ${new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(d)}, ${d.getFullYear()}`
  return { date, time: `${time} ${tzLabel()} Time`, long }
}
