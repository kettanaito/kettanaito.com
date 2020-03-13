import React from 'react'
import { Box } from 'atomic-layout'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share'

interface ShareComponentProps {
  url: string
}

const SOCIAL_ICON_PROPS = {
  borderRadius: 3,
  size: 64,
}

export const ShareInFacebook: React.FC<ShareComponentProps> = ({ url }) => {
  return (
    <Box flex as={FacebookShareButton} url={url}>
      <FacebookIcon {...SOCIAL_ICON_PROPS} />
    </Box>
  )
}

export const ShareInTwitter: React.FC<ShareComponentProps & {
  title: string
  hashtags?: string[]
}> = (props) => {
  return (
    <Box flex as={TwitterShareButton} {...props}>
      <TwitterIcon {...SOCIAL_ICON_PROPS} />
    </Box>
  )
}

export const ShareInReddit: React.FC<ShareComponentProps & {
  title: string
}> = ({ url, title }) => {
  return (
    <Box flex as={RedditShareButton} title={title} url={url}>
      <RedditIcon {...SOCIAL_ICON_PROPS} />
    </Box>
  )
}
