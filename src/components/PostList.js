import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { Composition } from 'atomic-layout'

import PostThumbnail from './PostThumbnail'

const postsQuery = graphql`
  query ListQuery {
    postList: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          fields {
            url
          }
          frontmatter {
            title
            description
            date(formatString: "MMMM DD, YYYY")
            category
            thumbnail
          }
        }
      }
    }
  }
`

const PostList = props => {
  return (
    <StaticQuery query={postsQuery}>
      {data => {
        const { postList } = data

        return (
          <>
            <Composition
              templateColsMd="repeat(2, 1fr)"
              templateColsXl="repeat(3, 1fr)"
              justifyContent="center"
              gutter={32}
              maxWidth="100%"
            >
              {postList.edges.map(({ node }, index) => (
                <PostThumbnail key={node.id} node={node} />
              ))}
            </Composition>
          </>
        )
      }}
    </StaticQuery>
  )
}

export default PostList
