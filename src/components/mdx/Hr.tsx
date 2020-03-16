import React from 'react'
import { Box } from 'atomic-layout'
import { useTheme } from 'styled-components'
import { ReactComponent as DecorationIcon } from '../../images/icons/decoration.svg'

export const Hr = () => {
  const theme = useTheme()
  return (
    <Box flex justifyContent="center" marginVertical={4}>
      <DecorationIcon stroke={theme.colors.gray} strokeWidth={6} width={48} />
    </Box>
  )
}
