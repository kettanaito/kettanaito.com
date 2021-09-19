import * as React from 'react'
import { Box } from 'atomic-layout'

export const PostGrid: React.FC = ({ children }) => {
  return (
    <Box width="900px" maxWidth="100%" marginHorizontal="auto">
      {children}
    </Box>
  )
}
