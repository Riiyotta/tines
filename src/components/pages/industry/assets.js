// Raw inline SVGs + asset paths shared by the industry page data files (specs/pages-b.md, assets from reference/svg/pages and public/assets/pages).
import quoteMarkNeue from '../../../../reference/svg/pages/mssps-quote-card-mark-1.svg?raw'
import psHeroIllo from '../../../../reference/svg/pages/public-sector-hero-illustration-1.svg?raw'
import msspHeroIllo from '../../../../reference/svg/pages/mssps-mssp-hero-illustration-1.svg?raw'
import fsIcon from '../../../../reference/svg/pages/financial-services-section-icon-1.svg?raw'
import psIcon1 from '../../../../reference/svg/pages/public-sector-section-icon-1.svg?raw'
import psIcon2 from '../../../../reference/svg/pages/public-sector-section-icon-2.svg?raw'
import psIcon3 from '../../../../reference/svg/pages/public-sector-section-icon-3.svg?raw'
import msIcon1 from '../../../../reference/svg/pages/mssps-section-icon-1.svg?raw'
import msIcon2 from '../../../../reference/svg/pages/mssps-section-icon-2.svg?raw'
import msServicesIcon from '../../../../reference/svg/pages/mssps-services-icon-1.svg?raw'
import elasticLogo from '../../../../reference/svg/pages/public-sector-company-logo-1.svg?raw'
import bitpandaLogo from '../../../../reference/svg/pages/financial-services-company-logo-1.svg?raw'
import aws from '../../../../reference/svg/pages/public-sector-partner-logo-aws-marketplace.svg?raw'
import crowdstrike from '../../../../reference/svg/pages/public-sector-partner-logo-crowdstrike.svg?raw'
import recordedFuture from '../../../../reference/svg/pages/public-sector-partner-logo-recorded-future.svg?raw'
import elastic from '../../../../reference/svg/pages/public-sector-partner-logo-elastic.svg?raw'
import psPartner1 from '../../../../reference/svg/pages/public-sector-partner-logo-1.svg?raw'
import axonius from '../../../../reference/svg/pages/public-sector-partner-logo-axonius.svg?raw'
import noname from '../../../../reference/svg/pages/public-sector-partner-logo-noname.svg?raw'
import tenable from '../../../../reference/svg/pages/public-sector-partner-logo-tenable.svg?raw'
import msPartner1 from '../../../../reference/svg/pages/mssps-partner-logo-1.svg?raw'
import msPartner2 from '../../../../reference/svg/pages/mssps-partner-logo-2.svg?raw'
import msPartner3 from '../../../../reference/svg/pages/mssps-partner-logo-3.svg?raw'
import msPartner4 from '../../../../reference/svg/pages/mssps-partner-logo-4.svg?raw'
import msPartner5 from '../../../../reference/svg/pages/mssps-partner-logo-5.svg?raw'
import customerLogo2 from '../../../../reference/svg/pages/solutions-security-ai-soc-customer-logo-2.svg?raw'
import beyon from '../../../../reference/svg/pages/solutions-security-ai-soc-customer-logo-beyon-cyber.svg?raw'
import sophos from '../../../../reference/svg/pages/solutions-security-ai-soc-customer-logo-sophos.svg?raw'
import mssp1 from '../../../../reference/svg/pages/mssps-mssp-logo-1.svg?raw'
import mssp2 from '../../../../reference/svg/pages/mssps-mssp-logo-2.svg?raw'
import mssp3 from '../../../../reference/svg/pages/mssps-mssp-logo-3.svg?raw'
import mssp4 from '../../../../reference/svg/pages/mssps-mssp-logo-4.svg?raw'
import mssp5 from '../../../../reference/svg/pages/mssps-mssp-logo-5.svg?raw'
import mssp6 from '../../../../reference/svg/pages/mssps-mssp-logo-6.svg?raw'
import mssp7 from '../../../../reference/svg/pages/mssps-mssp-logo-7.svg?raw'
import co1 from '../../../../reference/svg/pages/mssps-company-logo-1.svg?raw'
import co2 from '../../../../reference/svg/pages/mssps-company-logo-2.svg?raw'
import co3 from '../../../../reference/svg/pages/mssps-company-logo-3.svg?raw'
import co4 from '../../../../reference/svg/pages/mssps-company-logo-4.svg?raw'
import co5 from '../../../../reference/svg/pages/mssps-company-logo-5.svg?raw'
import co6 from '../../../../reference/svg/pages/mssps-company-logo-6.svg?raw'
import co7 from '../../../../reference/svg/pages/mssps-company-logo-7.svg?raw'

export const SHARED = '/assets/pages/solutions-shared'
export const FS = '/assets/pages/financial-services'
export const PS = '/assets/pages/public-sector'
export const MS = '/assets/pages/mssps'

export const svg = {
  quoteMarkNeue, psHeroIllo, msspHeroIllo, fsIcon, psIcon1, psIcon2, psIcon3, msIcon1, msIcon2, msServicesIcon, elasticLogo, bitpandaLogo,
  aws, crowdstrike, recordedFuture, elastic, psPartner1, axonius, noname, tenable, msPartner1, msPartner2, msPartner3, msPartner4, msPartner5, customerLogo2,
  beyon, sophos, mssp1, mssp2, mssp3, mssp4, mssp5, mssp6, mssp7, co1, co2, co3, co4, co5, co6, co7,
}

export const SIGNUP_URL = 'https://login.tines.com/saml_idp/signup'
export const heroButtons = (outlined = true) => [
  { label: 'Book a demo', href: '/book-a-demo/', kind: 'filled' },
  ...(outlined ? [{ label: 'Sign up free', href: SIGNUP_URL, kind: 'outlined' }] : []),
]
// Area nav shared by every industry page (specs/pages-b.md section 1): no crumb, current page active.
export const industryLinks = (current) =>
  [
    ['IT', '/solutions/it/'],
    ['Security', '/solutions/security/'],
    ['Public sector', '/public-sector/'],
    ['Financial services', '/financial-services/'],
    ['MSSPs', '/mssps/'],
  ].map(([label, href]) => ({ label, href, active: href === current }))
