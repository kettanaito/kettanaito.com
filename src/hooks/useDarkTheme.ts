import { useCallback, useMemo, useEffect } from 'react'
import lightTheme from '../themes/light'
import darkTheme from '../themes/dark'
import { usePersistentState } from './usePersistentState'

interface UseDarkThemePayload {
  themeName: string
  isLight: boolean
  theme: any
  toggleTheme: () => void
}

export const useDarkTheme = (): UseDarkThemePayload => {
  const prefersDarkMode =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)')

  // Retreive and update persistant value in localStorage
  const {
    value: themeName,
    update: updateThemeName,
    updateWithoutPersistence,
    getPersistedValue,
  } = usePersistentState('theme', prefersDarkMode.matches ? 'dark' : 'light')

  useEffect(() => {
    const handleDarkModeChange = ({ matches }) => {
      if (!getPersistedValue()) {
        updateWithoutPersistence(matches ? 'dark' : 'light')
      }
    }
    prefersDarkMode.addListener(handleDarkModeChange)

    return () => {
      prefersDarkMode.removeListener(handleDarkModeChange)
    }
  }, [])

  // Compute whether current theme is light
  const isLight = useMemo(() => themeName === 'light', [themeName])

  // Shorthand toggle function for toggling the theme
  const toggleTheme = useCallback(() => {
    updateThemeName(isLight ? 'dark' : 'light')
  }, [updateThemeName, isLight])

  const theme = isLight ? lightTheme : darkTheme

  return { themeName, isLight, theme, toggleTheme }
}
