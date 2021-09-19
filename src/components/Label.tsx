import * as React from 'react'

export function Label(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >
): JSX.Element {
  return <span {...props} />
}
