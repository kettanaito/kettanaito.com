import React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { Link } from 'gatsby'

import Container from './Container'
import Text from './Text'

const StyledBox = styled(Box)`
  border-top: 1px solid #eaeaea;
  color: #676767;
  font-size: 0.85rem;
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
  <Container>
    <StyledBox
      flex
      flexDirection="column"
      flexDirectionSm="row"
      justifyContent="space-between"
      paddingVertical={1}
    >
      <Text as="span">
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
      </Text>

      <Text as="span">
        Licensed under{' '}
        <FooterLink
          href="https://creativecommons.org/licenses/by-nc/4.0/"
          rel="noopener noreferrer"
          target="_blank"
        >
          CC BY-NC
        </FooterLink>
        <Delimiter />
        <FooterLink
          href="https://github.com/Redd-Developer/redd.one"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </FooterLink>
        <Delimiter />
        <FooterLink as={Link} to="/privacy">
          Privacy policy
        </FooterLink>
      </Text>
    </StyledBox>
  </Container>
)

export default Footer
