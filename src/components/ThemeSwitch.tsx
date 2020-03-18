import React, { useContext, useMemo } from 'react'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'
import { GhostButton } from './GhostButton'
import { ThemeContext } from './ThemeContext'

export const ThemeSwitch = () => {
  const { themeName, toggleTheme } = useContext(ThemeContext)
  const Icon = useMemo(() => (themeName === 'light' ? IoMdMoon : IoMdSunny), [
    themeName,
  ])

  return (
    <GhostButton onClick={toggleTheme}>
      <Icon size={24} width={24} />
    </GhostButton>
  )
}
