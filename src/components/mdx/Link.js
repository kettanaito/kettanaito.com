import React from 'react'
import { GoLinkExternal } from 'react-icons/go'

const Link = props => {
  const isExternal = /^https?:\/\//.test(props.href)
  return (
    <a {...props} target={isExternal && '_blank'}>
      {props.children}
      <GoLinkExternal />
    </a>
  )
}

export default Link
