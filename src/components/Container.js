import React from 'react'
import { Box } from 'atomic-layout'

const Container = props => (
  <Box
    width={920}
    widthXxl={1200}
    marginHorizontal="auto"
    paddingHorizontal={16}
    paddingHorizontalMd={32}
    maxWidth="100%"
    {...props}
  />
)

export default Container
