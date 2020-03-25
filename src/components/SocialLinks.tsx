import React from 'react'
import styled from 'styled-components'
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

const GeneralIcon = styled(Box)``

GeneralIcon.defaultProps = {
  minWidth: '32px',
  maxWidth: '100%',
}

export const ShareInFacebook: React.FC<ShareComponentProps> = ({ url }) => {
  return (
    <Box flex as={FacebookShareButton} url={url} aria-label="Share on Facebook">
      <GeneralIcon as={FacebookIcon} {...SOCIAL_ICON_PROPS} />
    </Box>
  )
}

export const ShareInTwitter: React.FC<ShareComponentProps & {
  title: string
  hashtags?: string[]
}> = (props) => {
  return (
    <Box flex as={TwitterShareButton} {...props} aria-label="Share on Twitter">
      <GeneralIcon as={TwitterIcon} {...SOCIAL_ICON_PROPS} />
    </Box>
  )
}

ShareInTwitter.defaultProps = {
  hashtags: [],
}

export const ShareInReddit: React.FC<ShareComponentProps & {
  title: string
}> = ({ url, title }) => {
  return (
    <Box
      flex
      as={RedditShareButton}
      title={title}
      url={url}
      aria-label="Share on Reddit"
    >
      <GeneralIcon as={RedditIcon} {...SOCIAL_ICON_PROPS} />
    </Box>
  )
}
