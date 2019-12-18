import React from 'react'
import { Box } from 'atomic-layout'
import { GoLinkExternal } from 'react-icons/go'

const Link = (props) => {
  const isExternal = /^https?:\/\//.test(props.href)
  return (
    <a {...props} target={isExternal && '_blank'}>
      {props.children}
      <Box inline as={GoLinkExternal} size={14} marginLeft={2} />
    </a>
  )
}

export default Link
