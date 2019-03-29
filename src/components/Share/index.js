import React from 'react'
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

const StyledContainer = styled(Box)`
  background-color: hsla(221, 44%, 41%, 0.1);
`

const Share = ({ title, url }) => {
  return (
    <StyledContainer flex flexDirection="column" alignItems="center" padding={32}>
      <h3>Share this post:</h3>
      <Composition
        templateCols="repeat(3, 32px)"
        gutter={16}
        alignItems="center"
        justifyContent="center"
      >
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
    </StyledContainer>
  )
}

export default Share
