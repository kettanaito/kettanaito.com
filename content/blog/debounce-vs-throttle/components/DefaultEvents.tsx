import { useCallback, useMemo, useState } from 'react'
import { VendingMachine } from './VendingMachine'

export interface Props {
  maxBalls?: number
  action?: (throwBall: () => void) => void
  children?: React.ReactNode
}

export function DefaultEvents({
  action = () => (fn: Function) => fn(),
  maxBalls = 30,
  children,
}: Props): JSX.Element {
  const [clickCount, setClickCount] = useState(0)
  const [eventCount, setEventCount] = useState(0)

  const shouldThrowBalls = useMemo(() => {
    return eventCount < maxBalls
  }, [maxBalls, eventCount])

  const runAction = useCallback(
    // @ts-ignore
    action((func) => func()),
    [action]
  )

  const handleButtonClick = (throwBall: () => void) => {
    if (!shouldThrowBalls) {
      return
    }

    setClickCount(clickCount + 1)

    runAction(() => {
      throwBall()
      setEventCount(eventCount + 1)
    })
  }

  const handleReset = () => {
    setClickCount(0)
    setEventCount(0)
  }

  return (
    <div className="my-16 md:flex gap-10 items-center">
      <VendingMachine
        ballRadius={10}
        maxBalls={maxBalls}
        onButtonClick={handleButtonClick}
        onReset={handleReset}
      />
      <div className="space-y-10 w-full">
        <table className="text-base w-full">
          <tbody>
            <tr>
              <td className="text-gray-500">Button clicked:</td>
              <td className="text-right">
                <strong>
                  <span style={{ fontVariantNumeric: 'ordinal' }}>
                    {clickCount}
                  </span>{' '}
                  time(s)
                </strong>
              </td>
            </tr>
            <tr>
              <td className="text-gray-500">Event handler called:</td>
              <td className="text-right">
                <strong>
                  <span style={{ fontVariantNumeric: 'ordinal' }}>
                    {eventCount}
                  </span>{' '}
                  time(s)
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
        {children ? <div className="my-5 mb-16 md:mb-0">{children}</div> : null}
      </div>
    </div>
  )
}
