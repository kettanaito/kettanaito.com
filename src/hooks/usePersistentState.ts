import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

export const usePersistentState = <StateType = string>(
  persistentKey: string,
  initialValue?: StateType
): [StateType, typeof update] => {
  const [storedValue, updateStoredValue] = useLocalStorage(persistentKey)
  const [value, rawSetValue] = useState<StateType>(
    (storedValue as any) || initialValue
  )

  const update = (nextValue: StateType) => {
    rawSetValue(nextValue)
    updateStoredValue(nextValue.toString())
  }

  return [value, update]
}
