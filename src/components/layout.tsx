import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import AtomicLayout from 'atomic-layout'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import PageHeader from './PageHeader'
import PageFooter from './PageFooter'
import './layout.css'
import './custom.css'
import { useDarkTheme } from '../hooks/useDarkTheme'
import { ThemeContext } from './ThemeContext'

const SITE_INFO = graphql`
  query SiteInfo {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.styles.body.bgColor};
    color: ${({ theme }) => theme.styles.body.color};
    transition: background-color .1s ease;
  }

  code {
    ${({ theme }) => theme.styles.code}
  }

  h1 {
    @media (max-width: ${AtomicLayout.breakpoints.sm.maxWidth}) {
      font-size: 3rem;
    }
  }
`

const Layout: React.FC = ({ children }) => {
  const { theme, themeName, toggleTheme } = useDarkTheme()

  return (
    <StaticQuery
      query={SITE_INFO}
      render={(data) => (
        <ThemeProvider theme={theme}>
          <ThemeContext.Provider value={{ themeName, toggleTheme }}>
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

export default Layout
