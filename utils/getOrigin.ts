export function getOrigin(): string {
  return typeof location === 'undefined'
    ? 'https://kettanaito.com'
    : location.origin
}
