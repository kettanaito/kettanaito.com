import React from 'react'
import { graphql } from 'gatsby'
import { Composition } from 'atomic-layout'

import PostThumbnail from './PostThumbnail'

export const PostPreviewFragment = graphql`
  fragment PostPreview on Mdx {
    id
    fields {
      url
    }
    frontmatter {
      title
      description
      date(formatString: "MMMM D, YYYY")
      category
      image {
        childImageSharp {
          fluid(maxWidth: 500, quality: 95) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

const PostList = ({ posts, showLatestBadge, ...restProps }) => {
  return (
    <Composition
      templateCols="1fr"
      justifyContent="center"
      gutter={48}
      maxWidth="100%"
      {...restProps}
    >
      {posts.map(({ node }, index) => (
        <PostThumbnail
          key={node.id}
          post={node}
          showLatestBadge={index === 0 && showLatestBadge}
        />
      ))}
    </Composition>
  )
}

export default PostList
