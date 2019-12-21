import * as R from 'ramda'
import styled from 'styled-components'
import { Box } from 'atomic-layout'

const getColor = R.cond([
  [R.prop('primary'), R.always('hsl(1, 65%, 50%)')],
  [R.prop('muted'), R.always('hsl(0, 5%, 41%)')],
  [R.T, R.always('inherit')],
])

const getFontSize = R.cond([
  [R.prop('lead'), R.always(1.25)],
  [R.prop('small'), R.always(0.85)],
  [R.T, R.always(1)],
])

const getLineHeight = R.cond([
  [R.prop('small'), R.always('1.2')],
  [R.T, R.always('inherit')],
])

const Text = styled(Box)`
  color: ${getColor};
  font-size: ${getFontSize}em;
  line-height: ${getLineHeight};
`

Text.defaultProps = {
  as: 'span',
}

export default Text
