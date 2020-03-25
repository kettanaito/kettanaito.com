import * as R from 'ramda'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { BoxProps } from '@atomic-layout/core'

const getColor = R.cond([
  [R.propEq('colorVariant', 'primary'), R.always('hsl(1, 65%, 50%)')],
  [R.propEq('colorVariant', 'muted'), R.always('hsl(0, 5%, 41%)')],
  [R.T, R.always('inherit')],
])

const getFontSize = R.cond([
  [R.propEq('sizeVariant', 'lead'), R.always(1.25)],
  [R.propEq('sizeVariant', 'small'), R.always(0.85)],
  [R.T, R.always(1)],
])

const getLineHeight = R.cond([
  [R.propEq('sizeVariant', 'small'), R.always('1.5')],
  [R.T, R.always('inherit')],
])

interface TextProps extends BoxProps {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  sizeVariant?: 'lead' | 'normal' | 'small'
  colorVariant?: 'primary' | 'normal' | 'muted'
}

export const Text: React.FC<TextProps> = styled(Box)`
  ${({ colorVariant }) =>
    colorVariant !== 'normal' &&
    `
  color: ${getColor};
  `}
  ${({ sizeVariant }) =>
    sizeVariant !== 'normal' &&
    `
    font-size: ${getFontSize}em;
    line-height: ${getLineHeight};
  `}
`

Text.defaultProps = {
  as: 'p',
}
