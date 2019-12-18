import * as R from 'ramda'
import styled from 'styled-components'

const getColor = R.cond([
  [R.prop('primary'), R.always('hsl(1, 65%, 50%)')],
  [R.prop('muted'), R.always('hsl(0, 5%, 41%)')],
  [R.always, R.always('inherit')],
])

const getFontSize = R.cond([
  [R.prop('lead'), R.always(1.25)],
  [R.prop('small'), R.always(0.85)],
  [R.always, R.always(1)],
])

const Text = styled.span`
  color: ${getColor};
  font-size: ${getFontSize}em;
`

export default Text
