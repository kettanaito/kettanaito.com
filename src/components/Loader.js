import React from 'react'
import styled, { css } from 'styled-components'
import { Box } from 'atomic-layout'

const Circle = styled.span`
  --background-color: #fff;
  --border-color: var(--color-gray);

  margin: 0 2px;
  display: inline-block;
  border-radius: 50%;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  height: 6px;
  width: 6px;

  animation: zoom 1.5s ease infinite;

  ${({ delay }) =>
    delay &&
    css`
      animation-delay: ${delay}s;
    `}

  @keyframes zoom {
    0% {
      transform: scale(1);
    }
    15% {
      transform: scale(0.8);
      background-color: var(--border-color);
      border-color: var(--border-color);
    }
    25% {
      transform: scale(1.25);
      background-color: var(--color-primary);
      border-color: var(--color-primary);
    }
    35% {
      transform: scale(1);
    }
  }
`

export const Loader = () => {
  return (
    <Box as="span" flex alignItems="center">
      <Circle delay={0} />
      <Circle delay={0.25} />
      <Circle delay={0.55} />
    </Box>
  )
}
