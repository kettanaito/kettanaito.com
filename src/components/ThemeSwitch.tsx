import React, { useContext, useMemo } from 'react'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'
import { ColorScheme } from '../themes/ColorScheme'
import { GhostButton } from './GhostButton'
import { ThemeContext } from './ThemeContext'

export const ThemeSwitch = () => {
  const { themeName, updateThemeMode } = useContext(ThemeContext)
  const Icon = useMemo(
    () => (themeName === ColorScheme.light ? IoMdMoon : IoMdSunny),
    [themeName]
  )

  const handleClick = () => {
    updateThemeMode(
      themeName === ColorScheme.dark ? ColorScheme.light : ColorScheme.dark
    )
  }

  return (
    <GhostButton aria-label="Switch theme" onClick={handleClick}>
      <Icon size={24} width={24} />
    </GhostButton>
  )
}
