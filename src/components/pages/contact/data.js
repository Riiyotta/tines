// /contact/ data (specs/pages-a.md §8). Addresses are placeholders.
import pen from '../../../../reference/svg/pages/contact-dlpgqa-pensticker.svg?raw'
import bell from '../../../../reference/svg/pages/contact-0lthvg-bellsticker.svg?raw'
import hands from '../../../../reference/svg/pages/contact-raehdq-handssticker.svg?raw'
import scroll from '../../../../reference/svg/pages/contact-scrollsticker.svg?raw'
import flower from '../../../../reference/svg/pages/contact-etvr3a-flowersticker.svg?raw'
import bulb from '../../../../reference/svg/pages/contact-nte4ta-lightbulbsticker.svg?raw'
import dublin from '../../../../reference/svg/pages/contact-chx0na-officeillustration.svg?raw'
import boston from '../../../../reference/svg/pages/contact-chx0na-officeillustration-2.svg?raw'

export { pen, bell }
export const SECONDARY = [
  { title: 'Partnerships', icon: hands, cls: 'bg-tint-rose border-pga-pink-line', links: [{ label: 'Visit our partners page', href: '/partners/' }] },
  { title: 'Federal and public sector', icon: scroll, cls: 'bg-tint-peach border-pga-orange-line', links: [{ label: 'Visit our federal page', href: '/solutions/public-sector/' }, { label: 'federal@tines.com', href: 'mailto:federal@tines.com' }] },
  { title: 'Work at Tines', icon: flower, cls: 'bg-pga-lime-5 border-pga-lime-25', links: [{ label: 'Visit our careers page', href: '/careers/' }] },
  { title: 'Media and analysts', icon: bulb, cls: 'bg-blue-5 border-pga-blue-25', links: [{ label: 'Press: pr@tines.com', href: 'mailto:pr@tines.com' }, { label: 'Analysts: analysts@tines.com', href: 'mailto:analysts@tines.com' }] },
]
export const OFFICES = [
  { city: 'Dublin', sub: 'Our European headquarters.', cls: 'border-green-25', art: dublin, maps: 'https://maps.google.com/?q=Dublin', lines: ['Tines Limited', '10 Westland Square', 'Pearse Street', 'Dublin, D02 CX36', 'Ireland'] },
  { city: 'Boston', sub: 'Our US headquarters.', cls: 'border-pga-orange-line', art: boston, maps: 'https://maps.google.com/?q=Boston', lines: ['Tines Technology Inc.', '99 High Street', '14th Floor', 'Boston, MA, 02110', 'United States'] },
]
