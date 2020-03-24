import { useState, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

export const usePersistentState = <StateType = string>(
  persistentKey: string,
  initialValue?: StateType
): [StateType, typeof updateState] => {
  const [storedValue, updateStoredValue] = useLocalStorage(persistentKey)
  const [value, updateState] = useState<StateType>(
    (storedValue as any) || initialValue
  )

  useEffect(() => {
    if (value) {
      updateStoredValue(value.toString())
    }
  }, [value])

  return [value, updateState]
}
