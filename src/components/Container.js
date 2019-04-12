import React from 'react'
import { Box } from 'atomic-layout'

const Container = props => (
  <Box
    width={920}
    marginHorizontal="auto"
    paddingHorizontal={16}
    maxWidth="100%"
    {...props}
  />
)

export default Container
