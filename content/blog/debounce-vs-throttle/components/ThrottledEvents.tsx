import { useCallback, useState } from 'react'
import { DefaultEvents } from './DefaultEvents'

const DEFAULT_THROTTLE_DURATION_MS = 500

function throttle(func: Function, timeout: number) {
  let wait = false

  return function (this: unknown, ...args: unknown[]) {
    if (!wait) {
      func.apply(this, args)
      wait = true

      setTimeout(function () {
        wait = false
      }, timeout)
    }
  }
}

export function ThrottledEvents(): JSX.Element {
  const [throttleDuration, setThrottleDuration] = useState(
    DEFAULT_THROTTLE_DURATION_MS
  )

  const wrapCallback = useCallback(
    function throttledCallback(callback: any) {
      return throttle(callback, throttleDuration)
    },
    [throttleDuration]
  )

  return (
    <DefaultEvents action={wrapCallback}>
      <fieldset className="p-5 border shadow-lg rounded-lg">
        <legend className="px-3 font-bold">Throttle options</legend>
        <label htmlFor="throttleDuration">
          Duration:{' '}
          <span className="font-mono" style={{ fontVariantNumeric: 'ordinal' }}>
            {throttleDuration}ms
          </span>
        </label>
        <input
          id="throttleDuration"
          className="block mt-1 w-full"
          type="range"
          min="0"
          max="2000"
          step="100"
          value={throttleDuration}
          onChange={(event) => setThrottleDuration(event.target.valueAsNumber)}
          onDoubleClick={() =>
            setThrottleDuration(DEFAULT_THROTTLE_DURATION_MS)
          }
        />
        {throttleDuration === 0 && (
          <p className="mt-2 font-semibold text-yellow-600">
            No throttling applied.
          </p>
        )}
      </fieldset>
    </DefaultEvents>
  )
}
