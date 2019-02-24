import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Composition, Only } from 'atomic-layout'

import Text from './Text'

const postMobile = `
  thumbnail preview
  thumbnail stats
`

const postTablet = `
  thumbnail
  preview
  stats
`

const Wrapper = styled.article`
  background-color: #fff;
`

const PostThumbnail = props => {
  const { node } = props

  return (
    <Wrapper>
      <Composition
        template={postMobile}
        templateMd={postTablet}
        templateRowsMd="200px 1fr auto"
        padding={32}
        gutter={16}
        gutterMd={32}
        height="100%"
      >
        {({ Thumbnail, Preview, Stats }) => (
          <>
            <Thumbnail
              as="img"
              src={node.frontmatter.thumbnail}
              alt={node.frontmatter.title}
            />
            <Preview>
              <Link to={node.fields.url}>
                <h2>{node.frontmatter.title}</h2>
              </Link>
              <Text small muted>
                {node.frontmatter.date} · {node.timeToRead} minute(s) read
              </Text>
              <Only from="md">
                {node.frontmatter.description || (
                  <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                )}
              </Only>
            </Preview>
            <Stats as="footer" align="center">
              <Text small muted>
                Stats here
              </Text>
            </Stats>
          </>
        )}
      </Composition>
    </Wrapper>
  )
}

export default PostThumbnail
