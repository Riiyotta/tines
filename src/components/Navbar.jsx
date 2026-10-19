import { useEffect, useRef, useState } from 'react'
import InlineSvg from './InlineSvg.jsx'
import tinesLogo from '../../reference/svg/tines-logo.svg?raw'
import searchIcon from '../../reference/svg/nav-pillButton-1.svg?raw'
import hamburgerIcon from '../../reference/svg/nav-hamburger-2.svg?raw'
import storiesIcon from '../../reference/svg/nav-storiesIcon-3.svg?raw'
import closeIcon from '../../reference/svg/nav-close-x.svg?raw'
// Tile illustrations + leaf icons, exported from the live DOM while the menus were open
import itSquare from '../../reference/svg/nav-squareIcon-it.svg?raw'
import securitySquare from '../../reference/svg/nav-squareIcon-security.svg?raw'
import iconPublicSector from '../../reference/svg/nav-leafIcon-public-sector.svg?raw'
import iconFinancial from '../../reference/svg/nav-leafIcon-financial-services.svg?raw'
import iconMssps from '../../reference/svg/nav-leafIcon-mssps.svg?raw'
import iconBlog from '../../reference/svg/nav-leafIcon-blog.svg?raw'
import iconEvents from '../../reference/svg/nav-leafIcon-events.svg?raw'
import iconWebinars from '../../reference/svg/nav-leafIcon-webinars.svg?raw'
import iconCommunity from '../../reference/svg/nav-leafIcon-community.svg?raw'

const SIGNUP_URL = 'https://login.tines.com/saml_idp/signup'
const LOGIN_URL = 'https://login.tines.com'

const NAV_ITEMS = [
  { id: 'product', label: 'Product' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'customers', label: 'Customers', href: '/customers/' },
  { id: 'discover', label: 'Discover' },
  { id: 'pricing', label: 'Pricing', href: '/pricing/' },
]

/* ---------- Dropdown building blocks (CLONE_SPEC §1 Dropdowns) ---------- */

// Tile border = currentColor 14% (snapshot .primarySquare); hover = --tileHover
// Radius is set per tile (12px tiles, 20px solo tiles).
const tileBase =
  'relative flex flex-col justify-between overflow-hidden border border-[color-mix(in_srgb,currentColor_14%,transparent)] p-3 transition-colors'
// Column border (live .column.boxed)
const boxed = 'border border-[color-mix(in_srgb,currentColor_14%,transparent)]'

function TileHead({ label, desc, labelClass = 'text-dd-hero-label font-medium', className = '', descClass = '' }) {
  return (
    <span className={`relative z-[1] flex flex-col gap-1 ${className}`}>
      <span className={`font-sans ${labelClass}`}>{label}</span>
      {desc && <span className={`mt-[3.25px] max-w-[234px] text-dd-desc font-medium opacity-85 ${descClass}`}>{desc}</span>}
    </span>
  )
}

const Arrow = ({ ext, abs }) => (
  <span aria-hidden="true" className={`z-[1] text-[18px] font-medium leading-[1.15] ${abs ? 'absolute bottom-3 right-3' : 'relative self-end'}`}>
    {ext ? '↗' : '→'}
  </span>
)

function Leaf({ href, label, desc, icon, ext, chipClass, hoverClass }) {
  return (
    <a
      href={href}
      {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group flex items-center gap-2 rounded-dd-tile p-2 font-medium transition-colors ${hoverClass}`}
    >
      <span className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-dd-chip transition-colors ${chipClass} group-hover:bg-purple-15`}>
        {icon && <InlineSvg svg={icon} className="h-[18px] w-[18px]" />}
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="flex items-center gap-[6px] text-nav font-semibold">
          {label}
          {ext && <span aria-hidden="true" className="text-footer-mark font-semibold leading-[12.65px] opacity-60">↗</span>}
        </span>
        {desc && <span className="max-w-[18em] text-dd-leaf-desc font-medium opacity-70">{desc}</span>}
      </span>
    </a>
  )
}

function ColumnTitle({ children }) {
  return (
    <p className="mb-2 mt-1 pl-2 font-mono text-dd-col-title font-semibold uppercase opacity-80">{children}</p>
  )
}

function BlogCard({ href, img, title, cta }) {
  return (
    <a
      href={href}
      className={`flex flex-col overflow-hidden rounded-usp border border-[color-mix(in_srgb,currentColor_14%,transparent)] bg-lightest transition-colors hover:border-[color-mix(in_srgb,currentColor_40%,transparent)] w-[362px]`}
    >
      <img src={img} alt="" className="block aspect-[1200/630] w-full bg-purple-30 object-cover" />
      <span className="flex flex-1 flex-col justify-end gap-1 p-[14px]">
        <span className="font-sans text-dd-blog-title font-semibold">{title}</span>
        <span className="mt-[0.5em] font-mono text-dd-cta font-bold uppercase opacity-80">{cta}</span>
      </span>
    </a>
  )
}

// Flower canvas strip (live .heroFlowers: back layer, PC art, front layer). PNGs captured from the live canvas.
function HeroFlowers({ front }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 bottom-0 h-[33%] ${front ? 'z-[1]' : 'z-0'}`}>
      <img
        src={`/assets/canvas/nav-3b-flowers-${front ? 'front' : 'back'}.png`}
        alt=""
        draggable="false"
        className="absolute left-[-23.33%] top-[-70%] h-[240%] w-[146.67%] max-w-none select-none"
      />
    </span>
  )
}

function ProductPanel({ mobile }) {
  return (
    <>
      <div
        className={`flex flex-col gap-[6px] rounded-dd-col text-lightest ${mobile ? 'w-full' : `w-[600px] min-w-0 shrink bg-purple-50 p-2 ${boxed}`}`}
      >
        <div className={`flex gap-[6px] ${mobile ? 'flex-col' : ''}`}>
          <a href="/3b/" className={`${tileBase} justify-start rounded-dd-tile bg-purple-60 hover:bg-purple-65 ${mobile ? 'aspect-[4/3] w-full' : 'h-[288px] w-[384px] shrink-0'}`}>
            <HeroFlowers />
            <img
              src="/assets/images/3b-flower-pc.svg"
              alt=""
              aria-hidden="true"
              draggable="false"
              className="pointer-events-none absolute bottom-[21%] left-1/2 z-[1] h-auto w-[42%] -translate-x-1/2"
            />
            <HeroFlowers front />
            <TileHead label="Tines 3B" desc="One environment to deliver AI agents, apps, and automation." />
          </a>
          <div className={`flex gap-[6px] ${mobile ? 'w-full flex-row' : 'w-[192px] flex-col'}`}>
            <a href="/3b/examples/" className={`${tileBase} flex-1 rounded-dd-tile bg-purple-60 hover:bg-purple-65 ${mobile ? 'aspect-[5/3]' : 'h-[141px]'}`}>
              <TileHead label="Examples gallery" desc="Real-world examples of Tines 3B at work." labelClass="text-dd-tile-title font-bold" />
              <Arrow />
            </a>
            <a
              href="https://docs.3b.tines.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${tileBase} flex-1 rounded-dd-tile bg-purple-60 hover:bg-purple-65 ${mobile ? 'aspect-[5/3]' : 'h-[141px]'}`}
            >
              <TileHead label="Docs" labelClass="text-dd-tile-title font-bold" />
              <Arrow ext />
            </a>
          </div>
        </div>
      </div>
      <div className={`self-start rounded-dd-col ${mobile ? 'w-full' : 'w-[275px]'}`}>
        <a
          href="/stories/"
          className={`${tileBase} w-full rounded-dd-col bg-purple-5 p-[18px] text-purple-75 hover:bg-purple-10 ${mobile ? '' : 'aspect-square'}`}
        >
          <TileHead label="Tines Stories" desc="The intelligent workflow platform." />
          {!mobile && <InlineSvg svg={storiesIcon} className="pointer-events-none absolute bottom-[18px] left-[18px] z-0 h-[88px] w-[94px]" />}
          <Arrow abs={mobile} />
        </a>
      </div>
    </>
  )
}

function SolutionsPanel({ mobile }) {
  return (
    <>
      <div
        className={`flex flex-col gap-0.5 rounded-dd-col text-purple-80 ${mobile ? 'w-full' : `w-[480px] min-w-0 shrink bg-dd-by-function p-2 ${boxed}`}`}
      >
        {!mobile && <ColumnTitle>By function</ColumnTitle>}
        <div className="flex gap-[6px]">
          {[
            ['/solutions/it/', 'IT', 'Strengthen IT as the foundation for business-wide execution.', 'bg-dd-it-tile hover:bg-tab-it', itSquare, 'h-[92px] w-16'],
            ['/solutions/security/', 'Security', 'Build, run, and monitor mission-critical cybersecurity workflows.', 'bg-purple-50 hover:bg-purple-55', securitySquare, 'h-[76px] w-[86px] -translate-x-[4.3px]'],
          ].map(([href, label, desc, color, art, artClass]) => (
            <a key={href} href={href} className={`${tileBase} flex-1 rounded-dd-tile text-lightest ${color} ${mobile ? 'justify-start' : 'aspect-square w-[228px]'}`}>
              <TileHead label={label} desc={desc} className="pb-2" descClass={mobile ? 'mr-[-6.5px]' : ''} />
              <InlineSvg svg={art} className={`pointer-events-none relative block max-w-[calc(100%-24px)] shrink-0 self-start ${mobile ? 'mt-3' : ''} ${artClass}`} />
              <Arrow abs />
            </a>
          ))}
        </div>
      </div>
      <div className={`flex flex-col gap-0.5 self-start rounded-dd-col bg-dd-by-industry p-2 text-dd-by-industry-text ${boxed} ${mobile ? 'w-full' : 'w-[300px] min-w-0 shrink'}`}>
        <ColumnTitle>By industry</ColumnTitle>
        {[
          ['/public-sector/', 'Public sector', 'Modernize your security approach.', iconPublicSector],
          ['/financial-services/', 'Financial services', 'Streamline compliance and reduce operational risk.', iconFinancial],
          ['/mssps/', 'MSSPs', 'Transform MSSP operations.', iconMssps],
        ].map(([href, label, desc, icon]) => (
          <Leaf key={href} href={href} label={label} desc={desc} icon={icon} chipClass="bg-dd-industry-chip" hoverClass="hover:bg-dd-by-industry-hover" />
        ))}
      </div>
    </>
  )
}

function DiscoverPanel({ mobile }) {
  return (
    <>
      <div className={`flex flex-col gap-[6px] rounded-dd-col bg-purple-5 p-2 text-purple-80 ${boxed} ${mobile ? 'w-full' : 'w-[380px] min-w-0 shrink'}`}>
        {/* Mobile (<1024) drops the article/event cards and keeps only the leaves */}
        {!mobile && (
          <BlogCard
            href="/blog/"
            img="/assets/images/nav-blog-finance-billing.png"
            title="“Better than the tools we were quoted six figures for”: How Tines’ finance team built a custom billing app for <$1,000"
            cta="Read article →"
          />
        )}
        <Leaf href="/blog/" label="Tines Blog" icon={iconBlog} chipClass="bg-purple-10" hoverClass="hover:bg-purple-10" />
      </div>
      <div className={`flex flex-col gap-[6px] rounded-dd-col bg-green-5 p-2 text-dd-events-text ${boxed} ${mobile ? 'w-full' : 'w-[380px] min-w-0 shrink'}`}>
        {!mobile && (
          <BlogCard
            href="/events/"
            img="/assets/images/nav-event-builder-connect-nyc.png"
            title="Builder Connect New York"
            cta="View event →"
          />
        )}
        <div className="flex flex-col gap-0.5">
          <Leaf href="/events/" label="Upcoming events" icon={iconEvents} chipClass="bg-green-10" hoverClass="hover:bg-green-10" />
          <Leaf href="/webinars/" label="Webinars" icon={iconWebinars} chipClass="bg-green-10" hoverClass="hover:bg-green-10" />
        </div>
      </div>
      {mobile ? (
        <div className={`flex w-full flex-col gap-0.5 rounded-dd-col bg-dd-by-industry p-2 text-dd-by-industry-text ${boxed}`}>
          <Leaf
            href="https://community.tines.com/"
            ext
            label="Community"
            desc="Connect, learn, and share with peers."
            icon={iconCommunity}
            chipClass="bg-dd-industry-chip"
            hoverClass="hover:bg-dd-by-industry-hover"
          />
        </div>
      ) : (
      <div className="w-[250px] self-start rounded-dd-col">
        <a
          href="https://community.tines.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={`${tileBase} w-full rounded-dd-col bg-dd-community p-[18px] text-lightest ${mobile ? 'aspect-[5/3]' : 'aspect-square'}`}
        >
          <TileHead label="Community" desc="Connect, learn, and share with peers." />
          <img
            src="/assets/images/community-crystal-ball.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[18px] left-[18px] h-[72px] w-[72px]"
          />
          <Arrow ext />
        </a>
      </div>
      )}
    </>
  )
}

const PANELS = { product: ProductPanel, solutions: SolutionsPanel, discover: DiscoverPanel }

/* ---------- Navbar ---------- */

/**
 * variant="simple" (specs/pages-a.md REUSE MAP, /soar/): header 62px, primary nav hidden, right group = text CTAs
 * "Log in" + "Sign up" only (no Book a demo, search or hamburger). Default variant unchanged.
 */
export default function Navbar({ variant = 'default' }) {
  const simple = variant === 'simple'
  const [open, setOpen] = useState(null) // desktop dropdown id
  const [menuOpen, setMenuOpen] = useState(false) // mobile menu
  const [accordion, setAccordion] = useState(null) // mobile accordion id
  const headerRef = useRef(null)
  // SiteNav26: blur + backdrop layers are opacity 0 at the top of the page and fade in
  // (opacity .2s ease) once scrollY > 10, or while a dropdown / the mobile menu is open.
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const layersOn = scrolled || open != null || menuOpen

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(null)
        setMenuOpen(false)
      }
    }
    const onClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setOpen(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [])

  const Panel = open ? PANELS[open] : null

  return (
    <header
      id="site-nav"
      ref={headerRef}
      onMouseLeave={() => setOpen(null)}
      className={`sticky top-0 z-nav text-page-fg max-sm:top-[5px] max-sm:mx-2 max-sm:mt-[5px] max-sm:h-[62px] ${simple ? 'h-[62px]' : 'h-[68px]'}`}
    >
      {/* 1. blur layer */}
      <div
        aria-hidden="true"
        className={`nav-blur-mask pointer-events-none absolute inset-x-0 top-0 z-[-1] hidden h-[68px] bg-surface-nav-blur backdrop-blur-nav transition-opacity duration-200 ease-ease sm:block ${layersOn ? 'opacity-100' : 'opacity-0'}`}
      />
      {/* 2. backdrop pill */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 mx-auto max-w-[1476px] rounded-pill bg-surface-nav-backdrop backdrop-blur-nav transition-opacity duration-200 ease-ease sm:rounded-none xl:inset-x-[22px] xl:bottom-auto xl:top-[6px] xl:h-[62px] xl:rounded-pill ${layersOn ? 'opacity-100' : 'opacity-0'}`}
      />
      {/* 3. bar */}
      <div className="relative z-[1] mx-auto flex w-full max-w-page items-center gap-5 p-3 sm:px-page sm:pb-3 sm:pt-[18px]">
        <div className="flex min-w-0 items-center gap-[14px]">
          <a href="/" title="Tines" className="flex shrink-0 items-center">
            <InlineSvg svg={tinesLogo} label="Tines" className="h-6 w-[78px] sm:h-[28px] sm:w-[91px]" />
          </a>
          <nav aria-label="Primary" className={`hidden items-center ${simple ? '' : 'xl:flex'}`}>
            {NAV_ITEMS.map((item) =>
              item.href ? (
                <a
                  key={item.id}
                  href={item.href}
                  onMouseEnter={() => setOpen(null)}
                  className="hover-tint inline-flex h-8 items-center gap-[6px] whitespace-nowrap rounded-nav-item px-3 py-2 text-nav font-semibold"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.id}
                  type="button"
                  aria-expanded={open === item.id}
                  onMouseEnter={() => setOpen(item.id)}
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpen((cur) => (cur === item.id ? null : item.id))
                  }}
                  className={`hover-tint inline-flex h-8 items-center gap-[6px] whitespace-nowrap rounded-nav-item px-3 py-2 text-nav font-semibold ${
                    open === item.id ? 'bg-[color-mix(in_srgb,currentColor_10%,transparent)]' : ''
                  }`}
                >
                  {item.label}
                  <span className="nav-caret" aria-hidden="true" />
                </button>
              ),
            )}
          </nav>
        </div>

        <div className="ml-auto flex shrink-0 items-center font-semibold">
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`hover-tint items-center whitespace-nowrap rounded-nav-item px-[14px] py-2 text-nav font-semibold ${simple ? 'inline-flex' : 'hidden xl:inline-flex'}`}
          >
            Log in
          </a>
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`hover-tint items-center whitespace-nowrap rounded-nav-item px-[14px] py-2 text-nav font-semibold ${simple ? 'inline-flex' : 'hidden xl:inline-flex'}`}
          >
            Sign up
          </a>
          {/* Desktop: Mono pill; <1024: plain Roobert 600 text link */}
          {!simple && <a
            href="/book-a-demo/"
            className="inline-flex items-center whitespace-nowrap rounded-nav-item px-3 py-2 font-sans text-nav font-semibold xl:ml-3 xl:h-[35px] xl:rounded-pill xl:bg-purple-70 xl:px-5 xl:py-[10px] xl:font-mono xl:text-nav-demo xl:font-bold xl:uppercase xl:text-lightest xl:transition-colors xl:hover:bg-purple-60"
          >
            Book a demo
          </a>}
          {!simple && <button
            type="button"
            aria-label="Open search"
            className="ml-2 flex h-[38px] w-[38px] items-center justify-center rounded-full text-purple-55 transition-colors xl:bg-purple-5 xl:text-purple-60 xl:hover:bg-purple-10"
          >
            <InlineSvg svg={searchIcon} className="h-4 w-4" />
          </button>}
          {!simple && <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="ml-1 inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center xl:hidden"
          >
            <InlineSvg svg={menuOpen ? closeIcon : hamburgerIcon} className="h-4 w-4" />
          </button>}
        </div>
      </div>

      {/* Desktop dropdown panel: starts at the header's bottom edge; 16px transparent gap keeps hover alive */}
      {Panel && !simple && (
        <div className="absolute inset-x-0 top-full hidden xl:block">
          <div
            data-motion="nav-dropdown-columns"
            className="mx-auto flex w-full max-w-page items-start gap-[3px] px-page pt-1 font-medium"
          >
            <Panel />
          </div>
        </div>
      )}

      {/* Mobile menu (<1024) */}
      {menuOpen && !simple && (
        <div
          data-motion="mobile-menu"
          className="fixed left-2 right-2 top-[67px] max-h-[calc(100dvh-75px)] overflow-y-auto overscroll-contain rounded-dd-col bg-surface-mobile-menu px-3 pb-3 pt-2 backdrop-blur-menu sm:top-[68px] sm:max-h-[calc(100dvh-76px)] xl:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              if (item.href) {
                return (
                  <a key={item.id} href={item.href} className="flex h-12 items-center rounded-pill bg-surface-mobile-pill p-4 font-sans text-nav font-semibold">
                    {item.label}
                  </a>
                )
              }
              const MobilePanel = PANELS[item.id]
              const isOpen = accordion === item.id
              return (
                <div key={item.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setAccordion(isOpen ? null : item.id)}
                    className={`flex h-12 w-full items-center justify-between gap-[10px] rounded-pill p-4 text-left font-sans text-nav font-semibold ${isOpen ? 'bg-surface-mobile-pill-open' : 'bg-surface-mobile-pill'}`}
                  >
                    {item.label}
                    <span className="mobile-chevron" data-open={isOpen} aria-hidden="true" />
                  </button>
                  <div className="accordion" data-open={isOpen}>
                    <div>
                      <div className="flex flex-col items-stretch gap-[6px] pb-1 pt-2 font-medium">
                        <MobilePanel mobile />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div className="flex gap-1">
              <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-pill bg-surface-mobile-pill p-4 text-center text-nav font-semibold">
                Log in
              </a>
              <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-pill bg-surface-mobile-pill p-4 text-center text-nav font-semibold">
                Sign up
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
