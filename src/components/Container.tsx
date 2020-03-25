import React from 'react'
import { Box } from 'atomic-layout'
import { BoxProps } from '@atomic-layout/core'

export const Container: React.FC<BoxProps> = (props) => (
  <Box
    width="1400px"
    marginHorizontal="auto"
    paddingHorizontal={1}
    paddingHorizontalSm={2}
    maxWidth="100%"
    {...props}
  />
)
