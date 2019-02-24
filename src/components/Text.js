import * as R from 'ramda'
import styled from 'styled-components'

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
  font-size: ${getFontSize}em;
  opacity: ${getOpacity};
`

export default Text
