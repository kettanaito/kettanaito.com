import React from 'react'
import { Box } from 'atomic-layout'
import styled from 'styled-components'

const StyledBlockquote = styled.blockquote`
  position: relative;
  border: 0;
  color: ${({ theme }) => theme.colors.grayDark};
  font-family: 'Playfair Display', Charter, 'Bookman Antiqua', Georgia, serif;
  font-size: 1.4rem;
  font-weight: bold;
  font-style: italic;
  line-height: 1.75;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 1rem;
    margin-right: 2rem;
  }
`

export default ({ children }) => {
  return (
    <Box
      as={StyledBlockquote}
      marginVertical={2}
      marginVerticalMd={4}
      marginLeftMd={2}
    >
      {children}
    </Box>
  )
}
