import * as React from 'react'

export function InnerGrid(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
): JSX.Element {
  return <div className="px-4" {...props} />
}
