import styled from 'styled-components'
import theme from '../theme'

interface CategoryNameProps {
  color?: keyof typeof theme['colors']
}

export const CategoryName = styled.span<CategoryNameProps>`
  color: ${({ theme, color }) => theme.colors[color]};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  line-height: 1.5;
`

CategoryName.defaultProps = {
  color: 'primary',
}
