import React from 'react'
import styled from 'styled-components'
import { GoLinkExternal } from 'react-icons/go'

const Icon = styled(GoLinkExternal)`
  margin-left: 0.2em;
  vertical-align: middle;
`

type LinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

export const Link: React.FC<LinkProps> = (props) => {
  const isExternal = /^https?:\/\//.test(props.href)
  return (
    <a {...props} target={isExternal && '_blank'}>
      {props.children}
      {isExternal && <Icon size={14} />}
    </a>
  )
}
