import * as React from 'react'

export function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}): JSX.Element {
  return (
    <div
      className={['mx-auto max-w-7xl px-6', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
