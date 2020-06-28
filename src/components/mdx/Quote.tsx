import React from 'react'
import { Box } from 'atomic-layout'
import styled from 'styled-components'

const StyledBlockquote = styled.blockquote`
  position: relative;
  border: 0;
  color: ${({ theme }) => theme.colors.grayDark};
  font-family: 'Playfair Display', Charter, 'Bookman Antiqua', Georgia, serif;
  font-size: 2rem;
  font-weight: 500;
  font-style: italic;
  line-height: 1.4;

  &:before {
    content: '';
    position: absolute;
    margin: auto;
    bottom: 0;
    right: 0;
    left: 0;
    height: 3px;
    width: 25%;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 5rem;
  }
`

export const Quote: React.FC = ({ children }) => {
  return (
    <Box
      as={StyledBlockquote}
      padding={0}
      paddingBottom={2}
      paddingHorizontal={2}
      marginVertical={2}
      marginVerticalMd={4}
    >
      {children}
    </Box>
  )
}
