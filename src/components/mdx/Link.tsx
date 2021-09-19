import * as React from 'react'
import { ExternalLinkIcon, DocumentTextIcon } from '@heroicons/react/solid'

interface LinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

export function Link(props: LinkProps): JSX.Element {
  const isExternal = /^https?:\/\//.test(props.href)
  const isLocalArticle = props.href.startsWith('/blog')

  return (
    <a {...props} target={isExternal ? '_blank' : undefined}>
      {isLocalArticle && (
        <DocumentTextIcon className="inline w-4 align-text-bottom" />
      )}
      {props.children}
      {isExternal && (
        <ExternalLinkIcon className="inline ml-0.5 w-4 align-text-bottom" />
      )}
    </a>
  )
}
