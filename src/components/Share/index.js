import React from 'react'
import { Composition } from 'atomic-layout'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share'

import Text from '../../components/Text'

const Share = ({ title, url }) => {
  return (
    <Composition
      templateCols="auto repeat(3, 32px)"
      gutter={8}
      alignItems="center"
      justifyContent="end"
    >
      <Text small>Share this post:</Text>
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton title={`"${title}"`} url={url}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <RedditShareButton title={title} url={url}>
        <RedditIcon size={32} round />
      </RedditShareButton>
    </Composition>
  )
}

export default Share
