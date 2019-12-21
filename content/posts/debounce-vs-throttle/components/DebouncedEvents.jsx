import React from 'react'
import DefaultEvents from './DefaultEvents'

function debounce(func, duration) {
  let timeout

  return (...args) => {
    const effect = () => {
      timeout = null
      return func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(effect, duration)
  }
}

const DEFAULT_DEBOUNCE_DURATION = 500

const DebouncedEvents = () => {
  const [debounceDuration, setDebounceDuration] = React.useState(
    DEFAULT_DEBOUNCE_DURATION
  )

  const wrapCallback = React.useCallback(
    function debouncedCallback(callback) {
      return debounce(callback, debounceDuration)
    },
    [debounceDuration]
  )

  return (
    <DefaultEvents wrapCallback={wrapCallback}>
      <div>
        <fieldset>
          <legend>Debounce options</legend>
          <label htmlFor="debounceDuration">Duration: </label>
          <input
            id="debounceDuration"
            type="range"
            min="0"
            max="2000"
            step="100"
            value={debounceDuration}
            onChange={(event) =>
              setDebounceDuration(event.target.valueAsNumber)
            }
            onDoubleClick={() => setDebounceDuration(DEFAULT_DEBOUNCE_DURATION)}
          />
          <label>{debounceDuration}ms</label>
          {debounceDuration === 0 && (
            <p>
              <small>No debounce applied.</small>
            </p>
          )}
        </fieldset>
      </div>
    </DefaultEvents>
  )
}

export default DebouncedEvents
