import React from 'react'
import { Box } from 'atomic-layout'

const Container = (props) => (
  <Box
    width="1400px"
    marginHorizontal="auto"
    paddingHorizontal={1}
    maxWidth="100%"
    {...props}
  />
)

export default Container
