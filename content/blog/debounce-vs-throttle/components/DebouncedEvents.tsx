import { useCallback, useState } from 'react'
import { DefaultEvents } from './DefaultEvents'

function debounce(func: Function, duration: number) {
  let timeout: NodeJS.Timeout | undefined

  return function (this: any, ...args: unknown[]) {
    const effect = () => {
      timeout = undefined
      return func.apply(this, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(effect, duration)
  }
}

const DEFAULT_DEBOUNCE_DURATION_MS = 500

export function DebouncedEvents() {
  const [debounceDuration, setDebounceDuration] = useState(
    DEFAULT_DEBOUNCE_DURATION_MS
  )

  const wrapCallback = useCallback(
    function debouncedCallback(callback: any) {
      return debounce(callback, debounceDuration)
    },
    [debounceDuration]
  )

  return (
    <DefaultEvents action={wrapCallback}>
      <fieldset className="p-5 border shadow-lg rounded-lg">
        <legend className="px-3 font-bold">Debounce options</legend>
        <label htmlFor="debounceDuration">Duration: {debounceDuration}ms</label>
        <input
          id="debounceDuration"
          className="block mt-1 w-full"
          type="range"
          min="0"
          max="2000"
          step="100"
          value={debounceDuration}
          onChange={(event) => setDebounceDuration(event.target.valueAsNumber)}
          onDoubleClick={() =>
            setDebounceDuration(DEFAULT_DEBOUNCE_DURATION_MS)
          }
        />
        {debounceDuration <= 200 && (
          <p className="text-yellow-600 font-semibold">
            {getDebouncedWarningText(debounceDuration)}
          </p>
        )}
      </fieldset>
    </DefaultEvents>
  )
}

function getDebouncedWarningText(debounceDuration: number) {
  if (debounceDuration === 0) {
    return 'No debounce applied.'
  }

  return 'Debounce duration is too fast to notice any effect. Please choose a higher number.'
}
