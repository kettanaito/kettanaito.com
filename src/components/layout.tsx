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
  --color-primary: ${({ theme }) => theme.colors.primary};
  --color-gray: ${({ theme }) => theme.colors.gray};
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
