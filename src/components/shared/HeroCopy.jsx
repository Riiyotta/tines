/**
 * HeroCopy: the hero copy block extracted from src/components/Hero.jsx (homepage) and reused by /3b/
 * (specs/pages-a.md REUSE MAP, 3b row 2: H1 64/67.2 -0.03em, Reckless byline 24/31.2 mt 19.2, actions grid 140x2 gap 8 mt 24).
 * Props: tag (node|null, the announcement pill), title (string | array of lines), byline (string),
 * actions (node; default Book a demo + Sign up free), h1Class / bylineClass (overrides), className.
 */
const SIGNUP_URL = 'https://login.tines.com/saml_idp/signup'

export function HeroCopy({ tag = null, title, byline, actions, h1Class = '', bylineClass = '', className = '' }) {
  const lines = Array.isArray(title) ? title : [title]
  return (
    <div className={`flex flex-col items-center text-center sm:items-start sm:text-left ${className}`}>
      {tag}
      <h1 className={`mt-6 max-w-[896px] font-sans text-h1-sm font-medium text-page-fg sm:text-h1-md sm:font-normal 3xl:max-w-none 3xl:text-h1-lg ${h1Class}`}>
        {lines.map((l, i) => (
          <span key={i} className="block text-pretty">{l}</span>
        ))}
      </h1>
      <p className={`mt-[0.8em] max-w-[342px] font-sans text-hero-byline-sm font-medium sm:max-w-[1152px] sm:font-serif sm:text-hero-byline ${bylineClass}`}>
        {byline}
      </p>
      <div className="mt-6 grid grid-cols-[140px_140px] gap-2">
        {actions || (
          <>
            <a href="/book-a-demo/" className="btn btn-filled w-full">Book a demo</a>
            <a href={SIGNUP_URL} className="btn btn-frosted w-full">Sign up free</a>
          </>
        )}
      </div>
    </div>
  )
}
