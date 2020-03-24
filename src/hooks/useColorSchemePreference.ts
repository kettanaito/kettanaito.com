import { useState, useEffect } from 'react'
import { ColorScheme } from '../themes/ColorScheme'

export const useColorSchemePreference = (colorScheme: ColorScheme): boolean => {
  const media =
    typeof window !== 'undefined' &&
    window.matchMedia(`(prefers-color-scheme: ${colorScheme})`)
  const [prefersDarkMode, updatePreference] = useState(media.matches)

  useEffect(() => {
    const handleMediaChange = (nextMedia: MediaQueryListEvent) => {
      updatePreference(nextMedia.matches)
    }

    media.addEventListener('change', handleMediaChange)

    return () => {
      return media.removeEventListener('change', handleMediaChange)
    }
  }, [colorScheme, media])

  return prefersDarkMode
}
