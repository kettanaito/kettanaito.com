import React from 'react'
import { Box } from 'atomic-layout'

export const InnerGrid: React.FC = ({ children, ...props }) => {
  return (
    <Box paddingHorizontalSm={1} paddingHorizontalMd={2} {...props}>
      {children}
    </Box>
  )
}
