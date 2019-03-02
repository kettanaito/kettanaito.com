import React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'

import Container from './Container'
import Text from './Text'

const StyledBox = styled(Box)`
  border-top: 1px solid #ddd;
  color: #676767;
`

const Footer = () => (
  <Container>
    <StyledBox flex justifyContent="center" paddingVertical={16}>
      <Text as="span" small>
        © {new Date().getFullYear()}, Built with love, with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>.
      </Text>
    </StyledBox>
  </Container>
)

export default Footer
