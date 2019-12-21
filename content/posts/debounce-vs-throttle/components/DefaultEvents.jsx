import React from 'react'
import styled from 'styled-components'
import { Composition, useResponsiveValue } from 'atomic-layout'
import { VendorMachine } from './VendorMachine'
import Text from '../../../../src/components/Text'

const Container = styled.div`
  margin: 2rem auto;
  max-width: 100%;
`

export const Warning = ({ children }) => {
  return (
    <Text as="p" small muted marginTop={8}>
      {children}
    </Text>
  )
}

const DefaultEvents = ({ children, maxBalls, wrapCallback }) => {
  const [clicksCount, setClicksCount] = React.useState(0)
  const [eventsCount, setEventsCount] = React.useState(0)

  const arrowSymbol = useResponsiveValue(
    {
      xs: '↑',
      sm: '↑',
    },
    '←'
  )
  const shouldThrowBall = eventsCount < maxBalls

  const handleBallThrow = React.useCallback(
    wrapCallback((func) => {
      return func()
    }),
    [wrapCallback]
  )

  const handleButtonClick = (throwBall) => {
    if (!shouldThrowBall) {
      return
    }

    setClicksCount(clicksCount + 1)

    handleBallThrow(() => {
      throwBall()
      setEventsCount(eventsCount + 1)
    })
  }

  return (
    <Container>
      <Composition
        templateColsMd="350px 1fr"
        gap={32}
        gapMd={48}
        alignItems="center"
        justifyContent="center"
      >
        <VendorMachine onButtonClick={handleButtonClick} />
        <div>
          <p>
            <small>{arrowSymbol} Press the red button of the machine.</small>
          </p>
          <table>
            <tr>
              <td>Button clicked:</td>
              <td>
                <strong>{clicksCount} time(s)</strong>
              </td>
            </tr>
            <tr>
              <td>Event handler called:</td>
              <td>
                <strong>{eventsCount} time(s)</strong>
              </td>
            </tr>
          </table>

          {children}
        </div>
      </Composition>
    </Container>
  )
}

DefaultEvents.defaultProps = {
  maxBalls: 30,
  wrapCallback: function defaultWrapCallback(func) {
    return func
  },
}

export default DefaultEvents
