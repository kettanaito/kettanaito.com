import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

export const usePersistentState = <V>(
  persistentKey: string,
  initialValue: V
): {
  value: V
  update: (nextValue: V) => void
  updateWithoutPersistence: (nextValue: V) => void
  getPersistedValue: () => string
} => {
  const { value: persistedValue, set, get } = useLocalStorage(persistentKey)
  const [value, rawSetValue] = useState<V>(
    (persistedValue as any) || initialValue
  )

  const update = (nextValue: V) => {
    rawSetValue(nextValue)
    set(nextValue.toString())
  }

  return {
    value,
    update,
    updateWithoutPersistence: rawSetValue,
    getPersistedValue: get,
  }
}
