// About page data (specs/pages-a.md §6). Body copy is original placeholder text.
import accel from '../../../../reference/svg/pages/about-accel.svg?raw'
import activant from '../../../../reference/svg/pages/about-activantcapital-com.svg?raw'
import addition from '../../../../reference/svg/pages/about-addition.svg?raw'
import blossom from '../../../../reference/svg/pages/about-blossom.svg?raw'
import felicis from '../../../../reference/svg/pages/about-felicis.svg?raw'
import goldman from '../../../../reference/svg/pages/about-goldmansachs-com.svg?raw'
import index from '../../../../reference/svg/pages/about-index-ventures.svg?raw'
import softbank from '../../../../reference/svg/pages/about-visionfund-com-uk.svg?raw'

const P = '/assets/pages/about'
export const LEADERS = [
  { name: 'Eoin Hinchy', title: 'Co-founder and CEO', photo: `${P}/1713882536-tines_eoin_hinchy.jpg`, linkedin: 'https://www.linkedin.com/in/eoinhinchy/' },
  { name: 'Thomas Kinsella', title: 'Co-founder and COO', photo: `${P}/1713882905-tines_thomas_kinsella.jpg`, linkedin: 'https://www.linkedin.com/in/thomaskinsella/' },
  { name: 'Terry Tripp', title: 'Chief Revenue Officer', photo: `${P}/1713882944-tines_terry_tripp.jpg`, linkedin: 'https://www.linkedin.com/' },
  { name: 'Maria Dillon', title: 'Head of People', photo: `${P}/1713882989-tines_maria_dillon.jpg`, linkedin: 'https://www.linkedin.com/' },
  { name: 'Niall Cowman', title: 'Head of Finance', photo: `${P}/1714073891-tines-niall-cowman.jpg`, linkedin: 'https://www.linkedin.com/' },
  { name: 'Stephen O’Brien', title: 'Head of Product', photo: `${P}/1713883040-tines_stephen_obrien.jpg`, linkedin: 'https://www.linkedin.com/' },
  { name: 'Brian Long', title: 'Head of Engineering', photo: `${P}/1713883074-tines_brian_long.jpg`, linkedin: 'https://www.linkedin.com/' },
  { name: 'Jonny Belton', title: 'Head of Design', photo: `${P}/1713883104-tines_jonny_belton.jpg`, linkedin: 'https://www.linkedin.com/' },
]

export const INVESTORS = [
  { name: 'Accel', svg: accel, w: 97, h: 31 },
  { name: 'Activant', svg: activant, w: 185, h: 32 },
  { name: 'Addition', svg: addition, w: 192, h: 24 },
  { name: 'Blossom', svg: blossom, w: 154, h: 36 },
  { name: 'Felicis', svg: felicis, w: 115, h: 34 },
  { name: 'Goldman Sachs', svg: goldman, w: 191, h: 36 },
  { name: 'Index Ventures', svg: index, w: 117, h: 32 },
  { name: 'SoftBank Vision Fund', svg: softbank, w: 150, h: 23 },
]

export const VALUES = [
  { title: 'Simplicity', body: 'We strive for products and interactions that are as simple and straightforward as possible. In everything we do we try to remove unnecessary barriers and friction, so effort goes to the work that matters most. Fewer steps, clearer words and calmer screens help everyone we serve move forward with confidence.' },
  { title: 'Speed', body: 'We are quick to ship and quick to respond. Speed matters, but only when it is applied with purpose: we take ownership, gather feedback and iterate. In this way, speed becomes momentum rather than a rush that leaves quality behind. We keep feedback loops short and learn fast.' },
  { title: 'Soundness', body: 'We are determined to meet our mission and goals, and to be proud of how we get there. Doing the right thing for customers and teammates is what sets us apart, so we are open about our tradeoffs and act with honesty and integrity at all times. Careful work lets people depend on us.' },
]
