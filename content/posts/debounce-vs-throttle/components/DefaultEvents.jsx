import React from 'react'
import styled from 'styled-components'
import { Canvas, getRandomNumber } from './Canvas'

const Container = styled.div`
  background-color: #f6f8fa;
  margin: 2rem 0;
  padding: 2rem;
`

const DefaultEvents = ({ maxBalls }) => {
  const [clicksCount, setClicksCount] = React.useState(0)
  const [eventsCount, setEventsCount] = React.useState(0)

  const hasBalls = clicksCount < maxBalls
  const buttonLabel = hasBalls ? 'Throw a ball' : 'Sorry, out of balls'

  const handleButtonClick = (trigger) => {
    setClicksCount(clicksCount + 1)
    setEventsCount(eventsCount + 1)

    trigger((canvas) => {
      const startMousePos = {
        x: getRandomNumber(0, canvas.width) + canvas.offsetLeft,
        y: 0 + canvas.offsetTop,
      }

      const endMousePos = {
        x: startMousePos.x + getRandomNumber(-20, 20),
        y: startMousePos.y + getRandomNumber(-20, 20),
      }

      return [startMousePos, endMousePos]
    })
  }

  return (
    <Container>
      <Canvas>
        {({ trigger }) => (
          <div>
            <p>
              Button pressed: <strong>{clicksCount} time(s)</strong>
            </p>
            <p>
              Event handler fired: <strong>{eventsCount} time(s)</strong>
            </p>
            <button
              onClick={() => handleButtonClick(trigger)}
              disabled={!hasBalls}
            >
              {buttonLabel}
            </button>
          </div>
        )}
      </Canvas>
    </Container>
  )
}

DefaultEvents.defaultProps = {
  maxBalls: 100,
}

export default DefaultEvents
