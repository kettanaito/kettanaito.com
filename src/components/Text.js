import * as R from 'ramda'
import styled from 'styled-components'

const getColor = R.cond([
  [R.prop('primary'), R.always('hsl(1, 80%, 60%)')],
  [R.always, R.always('inherit')],
])

const getOpacity = R.cond([
  [R.prop('muted'), R.always(0.7)],
  [R.always, R.always(1)],
])

const getFontSize = R.cond([
  [R.prop('lead'), R.always(1.25)],
  [R.prop('small'), R.always(0.85)],
  [R.always, R.always(1)],
])

const Text = styled.span`
  color: ${getColor};
  font-size: ${getFontSize}em;
  opacity: ${getOpacity};
`

export default Text
