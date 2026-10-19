import { useCallback, useEffect, useRef, useState } from 'react'

// Use-case tab switch (HomeUseCasesSection): the previous colour stays on the base layer while a
// wipe layer in the new colour plays panelWipe (1s, cubic-bezier(.22,1,.36,1)). While the wipe runs
// the new stage is marked "stage in" so its frames play frameFloatIn (.4s, inactive +50ms).
// When the wipe ends the base layer adopts the new colour. Under reduced motion the switch is instant.
export function useTabWipe(active) {
  const [base, setBase] = useState(active)
  const [wipeKey, setWipeKey] = useState(0)
  const prevActive = useRef(active)
  const baseRef = useRef(base)
  baseRef.current = base

  useEffect(() => {
    if (prevActive.current === active) return
    const leaving = prevActive.current
    prevActive.current = active
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBase(active)
      return
    }
    // A click mid-wipe: commit the tab that was wiping in as the new base first
    if (baseRef.current !== leaving) setBase(leaving)
    setWipeKey((k) => k + 1)
  }, [active])

  const onWipeEnd = useCallback(() => setBase(active), [active])
  return { base, wiping: base !== active, wipeKey, onWipeEnd }
}
