import * as React from 'react'

export function Avatar({
  size = 50,
  ...props
}: React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & { size?: number }): JSX.Element {
  return (
    <img
      {...props}
      className={[`flex m-0 w-${size} h-${size}`, props.className]
        .filter(Boolean)
        .join(' ')}
    />
  )
}
