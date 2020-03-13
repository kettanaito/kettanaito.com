import React from 'react'
import { Box } from 'atomic-layout'

const Container = (props) => (
  <Box
    width="1400px"
    marginHorizontal="auto"
    paddingHorizontal={2}
    maxWidth="100%"
    {...props}
  />
)

export default Container
