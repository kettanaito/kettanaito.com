import React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { Link } from 'gatsby'

import Container from './Container'
import Text from './Text'
import { ExternalLink } from './ExternalLink'

const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.grayDim};
  border-top: 1px solid ${({ theme }) => theme.colors.grayGhost};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grayFoo};
  line-height: 1.4;

  a {
    color: ${({ theme }) => theme.styles.footer.linkColor};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const FooterLink = styled(ExternalLink)`
  text-decoration: none;
`

const Delimiter = () => (
  <Box as="span" inline marginHorizontal="8px">
    ·
  </Box>
)

const Footer = () => (
  <Box as={StyledFooter} paddingVertical={1}>
    <Container>
      <Box
        flex
        alignItems="center"
        flexDirection="column"
        flexDirectionLg="row"
        justifyContent="space-between"
        paddingVertical={1}
      >
        <Text as="p" marginBottomLg={0}>
          © {new Date().getFullYear()}. Made by{' '}
          <FooterLink to="https://github.com/kettanaito">kettanaito</FooterLink>
          . Built with
          {` `}
          <FooterLink to="https://www.gatsbyjs.org">Gatsby</FooterLink>.
          Deployed with{' '}
          <FooterLink to="https://www.netlify.com/">Netlify</FooterLink>.
        </Text>

        <Text as="p">
          Licensed under{' '}
          <a
            href="https://creativecommons.org/licenses/by-nc/4.0/"
            rel="noopener noreferrer"
            target="_blank"
          >
            CC BY-NC
          </a>
          <Delimiter />
          <a
            href="https://github.com/Redd-Developer/redd.one"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <Delimiter />
          <Link to="/privacy">Privacy policy</Link>
        </Text>
      </Box>
    </Container>
  </Box>
)

export default Footer
