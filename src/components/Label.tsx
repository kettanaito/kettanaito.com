import { Box } from 'atomic-layout'
import styled from 'styled-components'

export const Label = styled(Box)`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray};
  line-height: 1.4;
`

Label.defaultProps = {
  as: 'span',
}
