// /university/ data (specs/pages-c.md §7.4). Course names, meta, hrefs, module names/durations are the live labels;
// excerpts and lesson bodies are original placeholder copy. Class strings are literal so Tailwind's scanner sees them.
const A = '/assets/pages/university/'

// Per-course colour theme: text, 1px card border, dot tints, arrow circle (row 1 only)
const T = {
  green: { text: 'text-tint-green-ink', border: 'border-tint-lilac-edge', arrow: 'bg-green-5 border-tint-green-book', dots: ['green', 'purple', 'purple'], kicker: 'text-tint-green-ink' },
  purple: { text: 'text-purple-65', border: 'border-tint-lilac-edge', arrow: 'bg-purple-5 border-purple-50', dots: ['purple', 'purple', 'purple'], kicker: 'text-purple-65' },
  lime: { text: 'text-pcu-lime-ink', border: 'border-pcu-blue-line', dots: ['green', 'green', 'green'], kicker: 'text-pcu-lime-ink' },
  teal: { text: 'text-pcu-teal-ink', border: 'border-tint-lilac-edge', dots: ['blue', 'blue', 'blue'], kicker: 'text-pcu-teal-ink' },
  orangeEdge: { text: 'text-purple-65', border: 'border-tint-peach-hover', dots: ['blue', 'blue', 'blue'], kicker: 'text-purple-65' },
  amber: { text: 'text-purple-65', border: 'border-pcu-amber', dots: ['green', 'green', 'green'], kicker: 'text-purple-65' },
  blue: { text: 'text-pcu-blue-ink', border: 'border-tint-lilac-edge', dots: ['green', 'green', 'green'], kicker: 'text-pcu-blue-ink' },
  blueTeal: { text: 'text-pcu-blue-ink', border: 'border-pcu-teal-line', dots: ['purple', 'purple', 'purple'], kicker: 'text-pcu-blue-ink' },
  purpleGreen: { text: 'text-purple-65', border: 'border-tint-green-dot', dots: ['purple', 'purple', 'purple'], kicker: 'text-purple-65' },
  greenOrange: { text: 'text-tint-green-ink', border: 'border-tint-peach-hover', dots: ['orange', 'orange', 'orange'], kicker: 'text-tint-green-ink' },
}

// dot tints (28px circle, 1px border)
export const DOT = {
  green: 'bg-green-10 border-green-30',
  purple: 'bg-purple-10 border-tint-lilac-edge',
  blue: 'bg-pcu-blue-soft border-pcu-blue-line',
  orange: 'bg-tint-peach-mid border-tint-peach-hover',
}
export const DOT_ICONS = [`${A}module-small-intro-to-tines-small.svg`, `${A}module-small-core-ui-module-small.svg`, `${A}module-small-stories-module-small.svg`]

// Module tile tints on the course page (72px circle, 1px border)
export const MODULE_TINT = {
  green: 'bg-green-5 border-green-15',
  purple: 'bg-purple-5 border-purple-20',
  orange: 'bg-tint-peach border-tint-peach-line',
}

const C = (slug, name, modules, hours, theme, excerpt, extra = {}) => ({
  slug, name, modules, hours, ...T[theme], excerpt,
  cta: theme === 'green' || theme === 'greenOrange' ? 'bg-green-10 border-tint-green-book' : 'bg-purple-10 border-purple-50',
  href: `/university/${slug}/`,
  icon: `${A}course-icon-${slug}.svg`,
  ...extra,
})

export const courses = [
  C('tines-stories-foundations', 'Tines Stories Foundations', 6, '2.5', 'green',
    'Grow your grasp of intelligent workflows, from the first concepts to spotting automation chances across your daily work.'),
  C('platform-administrator', 'Platform Administrator', 6, '3', 'purple',
    'Learn the admin toolkit for running a tenant: people, teams, access and the guardrails that keep everything compliant.'),
  C('builder-core', 'Builder: Core', 4, '1.5', 'lime',
    'Start building dependable stories with the core patterns that make workflows easy to read, reuse and grow over time.'),
  C('builder-intermediate', 'Builder: Intermediate', 4, '2', 'teal',
    'Polish your stories into smooth, app-like experiences that people can pick up and use without any hand-holding.'),
  C('builder-expert', 'Builder: Expert', 4, '2', 'orangeEdge',
    'Take on large-scale design: modular building blocks and orchestration techniques that hold up across a whole company.'),
  C('builder-ai', 'Builder: AI', 6, '3', 'amber',
    'Explore building with the AI features in Tines Stories, from guided generation to agents that work through tasks alone.'),
  C('specialist-cases', 'Specialist: Cases', 6, '2.5', 'blue',
    'Walk through case design from first sketch to resolution, shaping how your team tracks, manages and closes the work.'),
  C('specialist-records', 'Specialist: Records', 6, '2.5', 'blueTeal',
    'Model structured data in Tines Stories so your workflows can capture, report on and automate against clean records.'),
  C('specialist-workbench', 'Specialist: Workbench', 5, '2', 'purpleGreen',
    'Use the chat-style assistant to take action and reach data across your whole stack from a single conversation, with all of your everyday tools close at hand and ready.'),
  C('specialist-apps', 'Specialist: Apps', 6, '2.5', 'greenOrange',
    'Create interactive front ends that put your workflows directly in the hands of the people who need them, so everyone on the team can use them in their own day-to-day routines.'),
]

export const resources = [
  { title: 'Library', text: 'Pre-built examples of Tines Stories in action.', href: 'https://library.tines.com/', img: `${A}resource-library.png` },
  { title: 'Docs', text: 'Dig into the specifics to make your workflows.', href: 'https://www.tines.com/docs/', img: `${A}resource-docs.png` },
  { title: 'Slack Community', text: 'Connect to share ideas and look for help.', href: 'https://www.tines.com/community/', img: `${A}resource-slack.png` },
]

export const programs = [
  { eyebrow: 'For beginners', title: 'Bootcamps', text: 'Sign up for a guided training session to learn the core concepts of Tines Stories.', href: '/university/bootcamps/', img: `${A}program-bootcamps.png`, tone: 'green' },
  { eyebrow: 'For pros', title: 'Certifications', text: 'Completed all the modules? Sign up for our certification program to accelerate your building potential.', href: '/university/certifications/', img: `${A}program-certifications.png`, tone: 'purple' },
]

// Placeholder testimonials for the marquee strip (original text, similar length to the live four).
export const testimonials = [
  { emoji: '🪁', text: '“I feel more at ease now, and I can find my way around Tines Stories on my own.”' },
  { emoji: '🌱', text: '“The paths are clear, and the pace helped me grow a little more every single week.”' },
  { emoji: '🎯', text: '“Enjoyed every step of the journey so far, and I am already putting the skills to work in my team.”' },
  { emoji: '👌', text: '“I have used Tines Stories for a while, and the modules still taught me plenty of new tricks.”' },
]

const mod = (name, duration, icon) => ({ name, duration, icon: icon ? `${A}module-large-${icon}.svg` : null })
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const COURSE_DETAILS = {
  'tines-stories-foundations': {
    scene: `${A}scene-tines-stories-foundations.svg`,
    sidebarScene: `${A}lesson-sidebar-scene-foundations.svg`,
    blurb: 'A guided route through the basics of the platform. You will meet the interface, learn how stories are put together, practise reading data as it moves between actions and see how events trigger the work. Each module is short enough to finish in a single sitting, and every one ends with a quick check, so you can see your progress as you go. Finish the path, pass the exam and add a shareable badge to your profile, whether you are collaborating with builders or starting your own building journey.',
    modules: [
      mod('Introduction to Tines Stories', '15 minutes', 'introduction-to-tines-stories'),
      mod('Core UI navigation', '15 minutes', 'core-ui-navigation'),
      mod('Stories', '15 minutes', 'stories'),
      mod('Actions', '30 minutes', 'actions'),
      mod('JSON and API', '30 minutes', 'json-and-api'),
      mod('Events', '30 minutes', 'events'),
      mod('Exam', null, null),
    ],
  },
  'builder-core': {
    scene: `${A}scene-builder-core.svg`,
    blurb: 'Pick up the building habits that keep stories dependable. You will learn how to lay out a story so that it stays readable, how to share resources between actions, how to handle credentials safely and how to write your first reusable functions. Each module is short and practical, ends with a quick check, and the final exam earns you a shareable badge for your profile, whether you are collaborating with builders or just starting out on your own building journey.',
    modules: [
      mod('Story design', '15 minutes', 'story-design'),
      mod('Resources', '15 minutes', 'resources'),
      mod('Credentials', '15 minutes', 'credentials'),
      mod('Introduction to functions', '30 minutes', 'introduction-to-functions'),
      mod('Exam', null, null),
    ],
  },
}

// Lessons of the sampled module; other modules get generated placeholder lessons.
const SAMPLE_LESSONS = {
  'tines-stories-foundations/introduction-to-tines-stories': [
    'What are intelligent workflows?', 'Meet Tines Stories', 'Identify intelligent workflow opportunities',
    'Building blocks of intelligent workflows', 'Tines Stories resources', 'Knowledge check', 'Key takeaways',
  ],
  // university group c2: live lesson titles for the Builder: Core modules
  'builder-core/story-design': ['Establish your idea', 'Choose the right tools', 'Linear story design', 'Story fork design', 'Story organization', 'Knowledge check', 'Key takeaways'],
  'builder-core/resources': ['What is a resource?', 'Resource types', 'Create and manage resources', 'Implement resources in stories', 'Knowledge check', 'Key takeaways'],
  'builder-core/credentials': ['What is a credential?', 'Credential types', 'Connect flows', 'Create and manage credentials', 'Implement credentials in stories', 'Knowledge check', 'Key takeaways'],
  'builder-core/introduction-to-functions': ['Formulas and functions', 'Mathematical functions', 'Time functions', 'Text functions', 'Logic functions', 'Knowledge check', 'Key takeaways'],
}

export function getCourse(slug) {
  const base = courses.find((c) => c.slug === slug)
  if (!base) return null
  const d = COURSE_DETAILS[slug]
  const modules = (d?.modules || Array.from({ length: base.modules }, (_, i) => mod(`Module ${i + 1}`, i % 2 ? '30 minutes' : '15 minutes', ['introduction-to-tines-stories', 'core-ui-navigation', 'stories', 'actions', 'json-and-api', 'events'][i % 6])).concat(mod('Exam', null, null))).map((m) => ({ ...m, slug: slugify(m.name), href: `/university/${slug}/${slugify(m.name)}/`, exam: m.name === 'Exam' }))
  return { ...base, scene: d?.scene || base.icon, sidebarScene: d?.sidebarScene || d?.scene || base.icon, blurb: d?.blurb || 'A learning path made of bite-sized modules that you can finish at your own pace. Each module ends with a short knowledge check so you can see how far you have come, and the final exam earns you a shareable badge that you can add to your profile and professional networks, whether you are collaborating with builders or setting out on your very own building journey.', modules }
}

export function getModule(courseSlug, moduleSlug) {
  const course = getCourse(courseSlug)
  const m = course?.modules.find((x) => x.slug === moduleSlug)
  if (!m) return null
  const idx = course.modules.indexOf(m)
  const names = SAMPLE_LESSONS[`${courseSlug}/${moduleSlug}`] || ['Overview', 'Walkthrough', 'Practice', 'Key takeaways']
  const lessons = names.map((n) => ({ name: n, slug: slugify(n), href: `/university/${courseSlug}/${moduleSlug}/${slugify(n)}/` }))
  const own = MODULE_INTROS[`${courseSlug}/${moduleSlug}`]
  const intro = own?.intro || [`Welcome to <strong>${m.name}</strong>, module ${idx + 1} of the <strong>${course.name}</strong> learning path. Work through the lessons in order, try the ideas in your own tenant as you go, and finish with a short knowledge check.`]
  const objectives = own?.objectives || [`Explain the key ideas behind ${m.name.toLowerCase()} in Tines Stories.`, 'Apply them to a small story of your own.', 'Spot common mistakes and know how to avoid them.']
  return { course, module: m, index: idx, lessons, intro, objectives }
}

// Module landing copy (original text; live shows an Introduction + Learning objectives per module).
const MODULE_INTROS = {
  'builder-core/story-design': {
    intro: ['Welcome to <strong>Story design</strong>, the first module of the <strong>Builder: Core</strong> learning path. Here you will look closely at the planning side of building in Tines Stories: how to sketch an idea, pick the right pieces and lay a story out so that teammates can follow it. A little care at this stage saves a great deal of rework later, and it makes the stories you hand over far easier for others to read, trust and maintain over time.'],
    objectives: ['Recognise the kinds of processes that make a good fit for a story in Tines.', 'Sketch and organise a story using sound, consistent habits for layout and naming.', 'Build straight-line and branching flows by choosing the most suitable actions.'],
  },
  'builder-core/resources': {
    intro: ['Welcome to the <strong>Resources</strong> module. Resources give your stories a place to keep information that should outlast a single run, such as lookup lists, settings and counters.', 'You will see how they differ from events, which only live for the duration of a run, and how to read and update them from your actions.'],
    objectives: ['Describe what a resource is and when to use one.', 'Choose between the available resource types.', 'Create, edit and reference resources inside a story.'],
  },
  'builder-core/credentials': {
    intro: ['Almost every story talks to outside systems, and those systems usually want proof of who is asking. This module covers how to keep that proof safe while still using it in your actions.', 'You will meet the different credential types and learn how to set them up without ever pasting a secret into a story.'],
    objectives: ['Explain why credentials are stored separately from actions.', 'Pick the credential type that matches a service.', 'Create a credential and use it from an action.'],
  },
  'builder-core/introduction-to-functions': {
    intro: ['Welcome to <strong>Introduction to functions</strong>. Functions let you reshape data as it moves through a story, from simple arithmetic to dates, text and conditions.', 'Think of them as the formulas you may already know from spreadsheets, applied to the events your story receives.'],
    objectives: ['Write a basic formula using a function.', 'Work with numbers, dates and text values.', 'Use logic functions to branch on the data you have.'],
  },
}

// Placeholder lesson body (original copy; structure from the spec's counts: 11 p, 3 h2, 2 ul / 6 li, 1 callout ~410 words)
export const LESSON_BODY = [
  { t: 'p', c: 'Before we begin, here is one question to keep in mind through this lesson.' },
  { t: 'p', c: 'Every team runs on small routines: the steps, choices and handoffs that carry work from start to finish, like answering an alert, welcoming a colleague or settling an invoice. Many of them live only in people’s heads.' },
  { t: 'p', c: 'For years the answer was simple scripts, which sped up repeated tasks and made them more even. Now there is a new option on the table that mixes those scripts with software that can reason and with people who step in at the right moment.' },
  { t: 'h2', c: 'Three types of work' },
  { t: 'p', c: 'An intelligent workflow blends three ingredients, each suited to its own job:' },
  { t: 'ul', c: [
    '<strong>Fixed rules.</strong> Predictable steps that behave the same way every time, such as sorting requests by priority, adding context to a record or sending a weekly digest to the right group of people.',
    '<strong>Reasoning agents.</strong> Software that can read a messy report, weigh the details and suggest a next step. This suits jobs where the input varies a great deal from one case to the next and needs a little judgement, such as triaging, summarising or drafting a reply for review.',
    '<strong>Human decisions.</strong> Moments where a person should have the final word, because the choice is sensitive, subtle or simply too important to leave unattended. A well designed flow knows when to pause and ask for a human to weigh in before it carries on.',
  ] },
  { t: 'callout', title: 'Note', c: '<strong>Why the mix matters:</strong> no single approach covers every situation. The strongest designs combine fixed rules for speed, agents for flexibility and people for accountability. For example, an incident flow might use rules to gather context, an agent to summarise the findings and a person to approve any remediation step before anything is changed in production.' },
  { t: 'h2', c: 'Why integration is the foundation' },
  { t: 'p', c: 'Here is the catch: rules and agents only help when they can reach your tools.' },
  { t: 'p', c: 'To do real work, a flow has to read from one system, write to another and keep everyone informed along the way. That is where integration comes in, the dependable plumbing that lets rules, agents and people work together across your whole stack.' },
  { t: 'p', c: 'Without integration, you are left with:' },
  { t: 'ul', c: [
    '<strong>Isolated systems</strong> that cannot share what they know.',
    '<strong>Stalled experiments</strong> that never reach everyday use.',
    '<strong>Patchwork tooling</strong> that creates more chores than it removes.',
  ] },
  { t: 'p', c: 'Connecting your tools is more than a technical detail; it is the strategic foundation that makes intelligent workflows possible.' },
  { t: 'h2', c: 'The intelligent workflow platform' },
  { t: 'p', c: 'So how do you combine rules, agents and people in a way that stays secure and grows with your needs? You use a platform designed for exactly that job, one that connects your tools and teams in a single, scalable place.' },
  { t: 'p', c: 'That is what an intelligent workflow platform does. It is the foundation that makes these ideas real in practice.' },
  { t: 'p', c: 'And that is where Tines Stories comes in!' },
]
