/** Blog card grid: 1 col <768, 2 cols 768-1279, 3 cols >=1280; row gap 45 / 50 (>=1024) / 64 (>=1280), column gap 24 (measured live at 768, 1024, 1440). */
export default function ArticleGrid({ children, className = '' }) {
  return <div className={`grid grid-cols-1 gap-x-6 gap-y-[45px] md:grid-cols-2 xl:gap-y-[50px] 2xl:grid-cols-3 2xl:gap-y-[64px] ${className}`}>{children}</div>
}
