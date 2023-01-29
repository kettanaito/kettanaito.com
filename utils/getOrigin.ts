export function getOrigin(): string {
  return typeof location === 'undefined' ? 'https://redd.one' : location.origin
}
