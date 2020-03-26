import { useState, useEffect } from 'react'
import { ColorScheme } from '../themes/ColorScheme'

export const useColorSchemePreference = (colorScheme: ColorScheme): boolean => {
  const media =
    typeof window !== 'undefined' &&
    window.matchMedia(`(prefers-color-scheme: ${colorScheme})`)

  const [prefersColorScheme, updatePreference] = useState(media?.matches)

  useEffect(() => {
    if (!media) {
      return
    }

    const handleMediaChange = (nextMedia: MediaQueryListEvent) => {
      updatePreference(nextMedia.matches)
    }

    // Handle Safari, where "addEventListener" is not implemented
    media.addEventListener
      ? media.addEventListener('change', handleMediaChange)
      : media.addListener(handleMediaChange)

    return () => {
      return media.removeEventListener
        ? media.removeEventListener('change', handleMediaChange)
        : media.removeListener(handleMediaChange)
    }
  }, [colorScheme, media])

  return prefersColorScheme
}
