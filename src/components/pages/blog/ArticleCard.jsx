import { CoverCard } from '../../shared/index.js'

/** Blog cover card (default). Works for article objects from data.js. */
export default function ArticleCard({ a }) {
  return <CoverCard href={a.href} cover={a.cover} title={a.title} />
}
