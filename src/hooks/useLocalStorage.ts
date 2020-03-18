import { useState } from 'react'

export const useLocalStorage = (
  name: string
): {
  value: string
  set: (nextValue: string) => void
  get: () => string
} => {
  const [value, setValue] = useState(
    typeof window === 'undefined' ? null : localStorage.getItem(name)
  )

  const set = (value: string) => {
    localStorage.setItem(name, value)
    setValue(value)
  }

  const get = () => {
    return localStorage.getItem(name)
  }

  return { value, set, get }
}
