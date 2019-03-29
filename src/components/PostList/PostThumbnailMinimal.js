import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { Box, Composition } from 'atomic-layout'

import Text from '../Text'

const postTemplate = `
  thumbnail
  content
`

const postTemplateInline = `
  thumbnail content
`

const ThumbnailMask = styled.div`
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

const PostThumbnailMinimal = props => {
  const { post } = props

  return (
    <Composition
      template={postTemplate}
      templateMd={postTemplateInline}
      templateColsMd="250px 1fr"
      gutter={16}
      gutterMd={24}
      height="100%"
      maxWidthSmDown={400}
      alignItems="center"
    >
      {({ Thumbnail, Content }) => (
        <>
          <Thumbnail>
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
              <Text primary>
                {post.frontmatter.category}
              </Text>
              <Box as="span" inline marginHorizontal={8}>·</Box>
              <Text>
                {post.frontmatter.date}
              </Text>
            </Box>

            <PostLink to={post.fields.url}>
              <PostTitle>{post.frontmatter.title}</PostTitle>
            </PostLink>

            <Box marginTop={8}>
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

export default PostThumbnailMinimal
