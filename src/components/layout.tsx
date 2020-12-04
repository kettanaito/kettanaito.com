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

const GlobalStyle = createGlobalStyle`
  body {
  --color-primary: ${({ theme }) => theme.colors.primary};
  --color-gray: ${({ theme }) => theme.colors.gray};
  --color-gray-light: ${({ theme }) => theme.colors.grayLight};
    background-color: ${({ theme }) => theme.styles.body.bgColor};
    color: ${({ theme }) => theme.styles.body.color};
    transition: background-color .1s ease;
  }

  code {
    background-color: ${({ theme }) => theme.styles.code.bgColor};
    border: 1px solid ${({ theme }) => theme.styles.code.borderColor};
  }

  h1 {
    @media (max-width: ${AtomicLayout.breakpoints.sm.maxWidth}) {
      font-size: 3rem;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    transition: color .1s;
  }

  th,
  tr {
    border-bottom: 1px solid ${({ theme }) => theme.styles.table.borderColor};
  }

  fieldset {
    border-color: ${({ theme }) => theme.styles.fieldset.borderColor};
  }

  input[type='range']::-webkit-slider-runnable-track {
    background-color: ${({ theme }) =>
      theme.styles.rangeInput.runnableTrackBgColor};
  }

  .line-number-focused {
    background-color: ${({ theme }) => theme.styles.code.focusedLineBgColor};
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
            <GlobalStyle />
            <PageHeader siteTitle={data.site.siteMetadata.title} />
            <main>{children}</main>
            <PageFooter />
          </ThemeContext.Provider>
        </ThemeProvider>
      )}
    />
  )
}
