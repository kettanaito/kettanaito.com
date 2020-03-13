import React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { Link } from 'gatsby'

import Container from './Container'

const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.grayDim};
  border-top: 1px solid #e8ecf3;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grayFoo};

  a {
    color: #000;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const FooterLink = styled.a`
  color: #000;
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
        flexDirection="column"
        flexDirectionMd="row"
        justifyContent="space-between"
        paddingVertical={1}
      >
        <span>
          © {new Date().getFullYear()}. Built with love and
          {` `}
          <FooterLink
            href="https://www.gatsbyjs.org"
            rel="noopener noreferrer"
            target="_blank"
          >
            Gatsby
          </FooterLink>
          .
        </span>

        <span>
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
        </span>
      </Box>
    </Container>
  </Box>
)

export default Footer
