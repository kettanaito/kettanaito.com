export const useLocalStorage = (key: string): [string, typeof setValue] => {
  const value = typeof window === 'undefined' ? null : localStorage.getItem(key)

  const setValue = (nextValue: string) => {
    localStorage.setItem(key, nextValue)
  }

  return [value, setValue]
}
