import React, { useEffect, useState } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import AtomicLayout from 'atomic-layout'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import { useThemePreference } from '../hooks/useThemePreference'
import PageHeader from './PageHeader'
import PageFooter from './PageFooter'
import './layout.css'
import './custom.css'
import { ThemeContext } from './ThemeContext'
import lightTheme from '../themes/light'
import darkTheme from '../themes/dark'

const GET_SITE_INFO = graphql`
  query GetSiteInfo {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export const Layout: React.FC = ({ children }) => {
  const [themeName, updateThemeMode] = useThemePreference()
  const [theme, setTheme] = useState(
    themeName === 'dark' ? darkTheme : lightTheme
  )

  useEffect(() => {
    setTheme(themeName === 'dark' ? darkTheme : lightTheme)
  }, [themeName])

  return (
    <StaticQuery
      query={GET_SITE_INFO}
      render={(data) => (
        <ThemeProvider theme={theme}>
          <ThemeContext.Provider value={{ themeName, updateThemeMode }}>
            <PageHeader siteTitle={data.site.siteMetadata.title} />
            <main>{children}</main>
            <PageFooter />
          </ThemeContext.Provider>
        </ThemeProvider>
      )}
    />
  )
}
