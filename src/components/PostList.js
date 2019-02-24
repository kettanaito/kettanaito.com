import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { Composition } from 'atomic-layout'

import PostThumbnail from './PostThumbnail'

const postsQuery = graphql`
  query ListQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          fields {
            url
          }
          timeToRead
          frontmatter {
            title
            description
            date(formatString: "MMMM DD, YYYY")
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
        const { allMarkdownRemark: postList } = data

        return (
          <>
            <Composition
              // templateCols="repeat(auto-fit, 400px)"
              templateColsMd="repeat(2, 1fr)"
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
