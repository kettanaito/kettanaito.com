import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import styled, { css } from 'styled-components'
import { Box, Composition } from 'atomic-layout'

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
        top: -10px;
        left: -10px;
        height: 10px;
        width: 10px;
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

const PostThumbnail = ({ post, showLatestBadge }) => {
  return (
    <Composition
      template={postTemplate}
      templateMd={postTemplateInline}
      templateColsMd="250px 1fr"
      gutter={16}
      gutterMd={24}
      height="100%"
      maxWidthSmDown={400}
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
            <Box as={Text} muted small marginBottom={10}>
              <Text inline primary>
                {post.frontmatter.category}
              </Text>
              <Box as="span" inline marginHorizontal={8}>
                ·
              </Box>
              <Text inline>{post.frontmatter.date}</Text>
            </Box>

            <PostLink to={post.fields.url}>
              <PostTitle>{post.frontmatter.title}</PostTitle>
            </PostLink>

            <Box marginTop={10}>
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
