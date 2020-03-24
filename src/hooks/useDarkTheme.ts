import { usePersistentState } from './usePersistentState'
import { useColorSchemePreference } from './useColorSchemePreference'
import { ColorScheme } from '../themes/ColorScheme'

const DEFAULT_THEME_NAME = ColorScheme.light

export const useThemePreference = (): [ColorScheme, typeof updateThemeMode] => {
  const prefersDarkSchema = useColorSchemePreference(ColorScheme.dark)
  const [storedThemeMode, updateThemeMode] = usePersistentState<ColorScheme>(
    'theme-mode'
  )

  const themeModePreference = prefersDarkSchema
    ? ColorScheme.dark
    : ColorScheme.light
  const themeMode = storedThemeMode || themeModePreference || DEFAULT_THEME_NAME

  return [themeMode, updateThemeMode]
}
