import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Composition } from 'atomic-layout'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share'

import Text from '../../components/Text'

const defaultShareText =
  'Liked this article? Please support publications like this by sharing it with your friends.'

const StyledContainer = styled(Box)`
  background-color: hsla(221, 44%, 41%, 0.075);
`

const Share = ({ title, url, text }) => {
  return (
    <StyledContainer
      flex
      flexDirection="column"
      alignItems="center"
      padding={32}
      marginTop={32}
    >
      <h3>Share this post</h3>
      <Text as="p" small>
        {text || defaultShareText}
      </Text>
      <Composition
        templateCols="repeat(3, 48px)"
        gutter={20}
        alignItems="center"
        justifyContent="center"
      >
        <FacebookShareButton url={url}>
          <FacebookIcon size={48} round />
        </FacebookShareButton>
        <TwitterShareButton title={`"${title}"`} url={url}>
          <TwitterIcon size={48} round />
        </TwitterShareButton>
        <RedditShareButton title={title} url={url}>
          <RedditIcon size={48} round />
        </RedditShareButton>
      </Composition>
    </StyledContainer>
  )
}

Share.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
}

export default Share
