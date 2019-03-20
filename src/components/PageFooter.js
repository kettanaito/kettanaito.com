import React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'

import Container from './Container'
import Text from './Text'

const StyledBox = styled(Box)`
  border-top: 1px solid #eaeaea;
  color: #676767;
  font-size: 0.7rem;
`

const Footer = () => (
  <Container>
    <StyledBox flex justifyContent="center" paddingVertical={16}>
      <Text as="span">
        © {new Date().getFullYear()}, Built with love and
        {` `}
        <a
          href="https://www.gatsbyjs.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          Gatsby
        </a>
        . Licensed under{' '}
        <a
          href="https://creativecommons.org/licenses/by-nc/2.0/"
          rel="noopener noreferrer"
          target="_blank"
        >
          CC BY-NC 2.0
        </a>
        .
      </Text>
    </StyledBox>
  </Container>
)

export default Footer
