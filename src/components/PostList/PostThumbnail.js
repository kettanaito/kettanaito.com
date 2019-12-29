import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import styled, { css } from 'styled-components'
import { Box, Composition } from 'atomic-layout'

import { ViewsCount } from '../ViewsCount'

import Text from '../Text'

const postTemplate = `
  thumbnail
  content
`

const postTemplateInline = `
  thumbnail content
`

const StyledThumbnail = styled.div`
  position: relative;

  ${({ showLatestBadge }) =>
    showLatestBadge &&
    css`
      &:after {
        content: '';
        position: absolute;
        top: -7px;
        left: -7px;
        height: 14px;
        width: 14px;
        background-color: hsl(1, 65%, 50%);
        box-sizing: content-box;
        border: 5px solid #fff;
        border-radius: 50%;
        animation: beat 3.5s infinite;
      }
    `};

  @keyframes beat {
    0% {
      transform: scale(1);
    }
    5% {
      transform: scale(0.5);
    }
    10% {
      transform: scale(1.25);
    }
    15% {
      transform: scale(1);
    }
  }
`

const ThumbnailMask = styled.div`
  border-radius: 3px;
  overflow: hidden;
  max-height: 100%;
  width: 100%;
`

const PostLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`

const PostTitle = styled.h3`
  margin: 0;
`

const Delimiter = () => (
  <Box as="span" inline marginHorizontal="8px">
    ·
  </Box>
)

const PostThumbnail = ({ post, showLatestBadge }) => {
  return (
    <Composition
      template={postTemplate}
      templateMd={postTemplateInline}
      templateColsMd="250px 1fr"
      gutter={1}
      gutterMd={2}
      height="100%"
      maxWidthSmDown="400px"
      marginHorizontalSmDown="auto"
      alignItems="center"
    >
      {({ Thumbnail, Content }) => (
        <>
          <Thumbnail as={StyledThumbnail} showLatestBadge={showLatestBadge}>
            <ThumbnailMask height={200}>
              <PostLink to={post.fields.url}>
                <Image
                  fluid={post.frontmatter.image.childImageSharp.fluid}
                  alt={post.frontmatter.title}
                />
              </PostLink>
            </ThumbnailMask>
          </Thumbnail>

          <Content>
            <PostLink to={post.fields.url}>
              <PostTitle>{post.frontmatter.title}</PostTitle>
            </PostLink>

            <Box
              as={Text}
              muted
              small
              flex
              alignItems="center"
              marginVertical={0.8}
            >
              <Text inline primary>
                {post.frontmatter.category}
              </Text>
              <Delimiter />
              <Text inline>{post.frontmatter.date}</Text>
              <Delimiter />
              <ViewsCount post={post} />
            </Box>

            <Box>
              <Text small>
                {post.frontmatter.description || (
                  <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                )}
              </Text>
            </Box>
          </Content>
        </>
      )}
    </Composition>
  )
}

export default PostThumbnail
