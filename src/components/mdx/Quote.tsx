import * as React from 'react'

export function Quote({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return <blockquote className="lead-blockquote">{children}</blockquote>
}
