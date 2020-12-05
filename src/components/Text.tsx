import * as R from 'ramda'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { BoxProps } from '@atomic-layout/core'

const getFontSize = R.cond([
  [R.equals('lead'), R.always(1.25)],
  [R.equals('small'), R.always(0.85)],
  [R.T, R.always(1)],
])

const getLineHeight = R.cond([
  [R.equals('small'), R.always('1.5')],
  [R.T, R.always('inherit')],
])

interface TextProps extends BoxProps {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  size?: 'lead' | 'normal' | 'small'
  color?: string
}

export const Text: React.FC<TextProps> = styled(Box)`
  color: ${({ color }) => color || 'inherit'};

  ${({ size }) =>
    size !== 'normal' &&
    `
    font-size: ${getFontSize(size)}em;
    line-height: ${getLineHeight(size)};
  `}
`

Text.defaultProps = {
  as: 'p',
}
