import { createContext } from 'react'

export const ThemeContext = createContext({
  themeName: null,
  toggleTheme: () => null,
})
