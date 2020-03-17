import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import AtomicLayout from 'atomic-layout'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import theme from '../theme'
import Header from './PageHeader'
import Footer from './PageFooter'
import './layout.css'
import './custom.css'

const GlobalStyle = createGlobalStyle`
  h1 {
    @media (max-width: ${AtomicLayout.breakpoints.sm.maxWidth}) {
      font-size: 3rem;
    }
  }
`

const Layout: React.FC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
        <Footer />
      </ThemeProvider>
    )}
  />
)

export default Layout
