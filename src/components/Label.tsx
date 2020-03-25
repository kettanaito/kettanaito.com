import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { BoxProps } from '@atomic-layout/core'

export const Label: React.FC<BoxProps> = styled(Box)`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray};
  line-height: 1.4;
`

Label.defaultProps = {
  as: 'span',
}
