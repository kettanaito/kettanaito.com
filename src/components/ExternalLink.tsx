import * as React from 'react'

type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string
}

export function ExternalLink({
  to,
  children,
  ...anchorProps
}: ExternalLinkProps): JSX.Element {
  return (
    <a
      className="inline-flex"
      {...anchorProps}
      href={to}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}
