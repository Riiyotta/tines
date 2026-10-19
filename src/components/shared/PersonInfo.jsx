/**
 * PersonInfo (avatar + name + role) and AuthorChip. Implements specs/pages-c.md §2.6.
 *  PersonInfo: grid `<size>px 1fr` gap 12; avatar circle (bg #8578e6-ish placeholder while loading); `prefix` ("Written by") Roobert 700 14/19.6,
 *   name weight 900 (featured) or 600 (speakers), role Roobert 500 14/19.6 @ .8. size 28 / 48 / 64. Speaker variant (`speaker`): name 600 14/19.6,
 *   role 500 12/13.8 @ .75.
 *  AuthorChip: flex gap 10.5 pad 14 bg currentColor@6% r 14 h 70; photo 42 circle; name 600 14/16.1; role 500 14/17.5 @ .8.
 */
const Avatar = ({ src, alt = '', size }) => (
  <span className="block shrink-0 overflow-hidden rounded-full bg-purple-45" style={{ width: size, height: size }}>
    {src && <img src={src} alt={alt} className="h-full w-full object-cover" />}
  </span>
)

export function PersonInfo({ src, name, role, prefix, size = 48, speaker = false, className = '' }) {
  return (
    <div className={`grid items-center gap-3 ${className}`} style={{ gridTemplateColumns: `${size}px 1fr` }}>
      <Avatar src={src} size={size} />
      <div className="font-sans">
        {speaker ? (
          <>
            <p className="text-[14px] font-semibold leading-[19.6px]">{name}</p>
            <p className="text-[12px] font-medium leading-[13.8px] opacity-75">{role}</p>
          </>
        ) : (
          <>
            <p className="text-[14px] font-bold leading-[19.6px]">{prefix && <>{prefix} </>}<span className="font-black">{name}</span></p>
            <p className="text-[14px] font-medium leading-[19.6px] opacity-80">{role}</p>
          </>
        )}
      </div>
    </div>
  )
}

export function AuthorChip({ src, name, role, href, className = '' }) {
  const Tag = href ? 'a' : 'div'
  return (
    <Tag href={href} className={`flex h-[70px] items-center gap-[10.5px] rounded-usp bg-[color-mix(in_srgb,currentColor_6%,transparent)] p-[14px] ${className}`}>
      <Avatar src={src} size={42} />
      <span className="block font-sans">
        <span className="block text-[14px] font-semibold leading-[16.1px]">{name}</span>
        <span className="block text-[14px] font-medium leading-[17.5px] opacity-80">{role}</span>
      </span>
    </Tag>
  )
}
