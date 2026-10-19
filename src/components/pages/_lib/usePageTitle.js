import { useEffect } from 'react'

/**
 * Per-entry document.title for dynamic routes (blog, stories, library). Pages that call this export no static `title`,
 * because App's title effect runs after the child's and would overwrite it. Falsy `title` leaves the current title alone.
 */
export function usePageTitle(title) {
  useEffect(() => {
    if (title) document.title = title
  }, [title])
}
