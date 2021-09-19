import * as React from 'react'

export function CategoryName(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >
): JSX.Element {
  return (
    <span
      {...props}
      className={[
        'font-semibold uppercase tracking-widest',
        props.className,
      ].join(' ')}
    />
  )
}
