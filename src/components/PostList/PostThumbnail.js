import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Box, Composition } from 'atomic-layout'

import Text from '../Text'

const postTemplate = `
  thumbnail
  title
  preview
`

export const Wrapper = styled.article`
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
`

const ThumbnailMask = styled.div`
  overflow: hidden;
  width: 100%;
  object-fit: ;
`

const PostLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`

const PostTitle = styled.h2`
  margin: 0;
`

const PostThumbnail = props => {
  const { node } = props

  return (
    <Wrapper>
      <Composition
        template={postTemplate}
        templateRows="250px auto 1fr"
        gutter={16}
        gutterMd={24}
        height="100%"
        maxWidthSmDown={400}
      >
        {({ Thumbnail, Title, Preview }) => (
          <>
            <ThumbnailMask height={200}>
              <PostLink to={node.fields.url}>
                <Thumbnail
                  as="img"
                  src={node.frontmatter.thumbnail}
                  alt={node.frontmatter.title}
                />
              </PostLink>
            </ThumbnailMask>
            <Title paddingHorizontal={16} paddingHorizontalMd={32}>
              <Box marginBottom={10}>
                <Text primary small>
                  {node.frontmatter.category}
                </Text>
                <Text small muted>
                  {' '}
                  · {node.frontmatter.date}
                </Text>
              </Box>
              <PostLink to={node.fields.url}>
                <PostTitle>{node.frontmatter.title}</PostTitle>
              </PostLink>
            </Title>
            <Preview
              paddingHorizontal={16}
              paddingHorizontalMd={32}
              paddingBottom={32}
            >
              <Text small>
                {node.frontmatter.description || (
                  <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                )}
              </Text>
            </Preview>
          </>
        )}
      </Composition>
    </Wrapper>
  )
}

export default PostThumbnail
