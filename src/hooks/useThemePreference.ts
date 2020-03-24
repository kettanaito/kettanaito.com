import { usePersistentState } from './usePersistentState'
import { useColorSchemePreference } from './useColorSchemePreference'
import { ColorScheme } from '../themes/ColorScheme'
import { useEffect, useState } from 'react'

const DEFAULT_THEME_NAME = ColorScheme.light

export const useThemePreference = (): [
  ColorScheme,
  typeof updateStoredThemeMode
] => {
  const prefersDarkSchema = useColorSchemePreference(ColorScheme.dark)
  const [storedThemeMode, updateStoredThemeMode] = usePersistentState<
    ColorScheme
  >('theme-mode')
  const [themeMode, updateThemeMode] = useState(ColorScheme.light)

  useEffect(() => {
    updateStoredThemeMode(themeMode)
  }, [themeMode, updateStoredThemeMode])

  useEffect(() => {
    const themeModePreference = prefersDarkSchema
      ? ColorScheme.dark
      : ColorScheme.light

    updateThemeMode(
      storedThemeMode || themeModePreference || DEFAULT_THEME_NAME
    )
  }, [])

  return [storedThemeMode, updateThemeMode]
}
