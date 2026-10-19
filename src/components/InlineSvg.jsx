// Renders an exported SVG (imported with ?raw) inline so currentColor and the
// page's web fonts apply. Size is controlled by the wrapper (see .svg-fill).
export default function InlineSvg({ svg, className = '', label, ...rest }) {
  return (
    <span
      className={`svg-fill inline-block ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: svg }}
      {...rest}
    />
  )
}
