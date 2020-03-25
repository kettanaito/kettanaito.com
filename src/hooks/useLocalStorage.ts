import { useState } from 'react'

export const useLocalStorage = (key: string): [string, typeof setValue] => {
  const initialValue =
    typeof window === 'undefined' ? null : localStorage.getItem(key)
  // Keep the internal state so that value change in localStore triggers re-render
  const [storedValue, updateStoredValue] = useState(initialValue)

  const setValue = (nextValue: string) => {
    localStorage.setItem(key, nextValue)
    updateStoredValue(nextValue)
  }

  return [storedValue, setValue]
}
