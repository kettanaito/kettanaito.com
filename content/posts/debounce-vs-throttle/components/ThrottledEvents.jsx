import React from 'react'
import DefaultEvents from './DefaultEvents'

function throttle(func, timeout) {
  let wait = false

  return function(...args) {
    if (!wait) {
      func(...args)
      wait = true

      setTimeout(function() {
        wait = false
      }, timeout)
    }
  }
}

const DEFAULT_THROTTLE_DURATION = 500

const ThrottledEvents = () => {
  const [throttleDuration, setThrottleDuration] = React.useState(
    DEFAULT_THROTTLE_DURATION
  )

  const wrapCallback = React.useCallback(
    function throttledWrapCallback(callback) {
      return throttle(callback, throttleDuration)
    },
    [throttleDuration]
  )

  return (
    <DefaultEvents wrapCallback={wrapCallback}>
      <div>
        <fieldset>
          <legend>Throttle options</legend>
          <label htmlFor="throttleDuration">Duration: </label>
          <input
            id="throttleDuration"
            type="range"
            min="0"
            max="2000"
            step="100"
            value={throttleDuration}
            onChange={(event) =>
              setThrottleDuration(event.target.valueAsNumber)
            }
            onDoubleClick={() => setThrottleDuration(DEFAULT_THROTTLE_DURATION)}
          />
          <label>{throttleDuration}ms</label>
          {throttleDuration === 0 && (
            <p>
              <small>No throttling applied.</small>
            </p>
          )}
        </fieldset>
      </div>
    </DefaultEvents>
  )
}

export default ThrottledEvents
