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
    date(formatString: "MMMM DD, YYYY")
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

const PostList = ({ posts, postTemplate: PostTemplate = PostThumbnail, ...restProps }) => {
  return (
    <Composition
      templateColsMd="repeat(2, 1fr)"
      templateColsXxl="repeat(3, 1fr)"
      justifyContent="center"
      gutter={32}
      maxWidth="100%"
      {...restProps}
    >
      {posts.map(({ node }) => (
        <PostTemplate key={node.id} post={node} />
      ))}
    </Composition>
  )
}

export default PostList
