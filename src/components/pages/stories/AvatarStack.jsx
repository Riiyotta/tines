/** Overlapping 28px contributor avatars (specs/pages-c.md §5.2); cycles the downloaded whatsnew-contributor-N.jpg files. */
export default function AvatarStack({ index = 0, count, size = 28, className = '' }) {
  const n = count || (index % 3) + 1
  return (
    <span className={`flex ${className}`}>
      {Array.from({ length: n }, (_, k) => (
        <img
          key={k}
          src={`/assets/pages/stories/whatsnew-contributor-${((index + k * 3) % 9) + 1}.jpg`}
          alt=""
          className="rounded-full border border-lightest object-cover"
          style={{ width: size, height: size, marginLeft: k ? -size * 0.3 : 0 }}
        />
      ))}
    </span>
  )
}
