import React from 'react'
import { Box } from 'atomic-layout'
import { IoMdEye } from 'react-icons/io'

import Text from './Text'
import { useViewsCount } from '../hooks/useViewsCount'

export const ViewsCount = ({ post, shouldIncrement }) => {
  const { loading, viewsCount } = useViewsCount(post, shouldIncrement)

  if (loading) {
    return null
  }

  return (
    <Box as={Text} inline muted flex alignItems="center">
      <Box as={IoMdEye} marginRight={4} />
      {viewsCount > 0 ? viewsCount.toLocaleString() : 'No views'}
    </Box>
  )
}
