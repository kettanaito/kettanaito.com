import React from 'react'
import DefaultEvents, { Warning } from './DefaultEvents'

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
          <label htmlFor="debounceDuration">
            Duration: {debounceDuration}ms
          </label>
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
          {debounceDuration < 200 && (
            <Warning>{getDebouncedWarning(debounceDuration)}</Warning>
          )}
        </fieldset>
      </div>
    </DefaultEvents>
  )
}

const getDebouncedWarning = (debounceDuration) => {
  if (debounceDuration === 0) {
    return 'No debounce applied.'
  }

  return 'Debounce duration you have chosen is too fast to simulate with a button click. Please choose a higher number.'
}

export default DebouncedEvents
