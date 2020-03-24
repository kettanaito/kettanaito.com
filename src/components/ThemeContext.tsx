import { createContext } from 'react'
import { ColorScheme } from '../themes/ColorScheme'

export const ThemeContext = createContext<{
  themeName: ColorScheme
  updateThemeMode: (nextValue: ColorScheme) => void
}>(null)
