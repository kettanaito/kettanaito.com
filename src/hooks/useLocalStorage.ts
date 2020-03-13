import { useState } from 'react'

export const useLocalStorage = (
  name: string
): [string, (value: string) => void] => {
  const [value, setValue] = useState(
    typeof window === 'undefined' ? null : localStorage.getItem(name)
  )

  const setStorageValue = (value: string) => {
    localStorage.setItem(name, value)
    setValue(value)
  }

  return [value, setStorageValue]
}
