import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { Composition } from 'atomic-layout'

import PostThumbnail from './PostThumbnail'

const postsQuery = graphql`
  query ListQuery {
    postList: allMdx(
      filter: { frontmatter: { draft: { ne: true } } }
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
            image {
              childImageSharp {
                fluid(maxWidth: 500, quality: 95) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
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
              templateColsXxl="repeat(3, 1fr)"
              justifyContent="center"
              gutter={32}
              maxWidth="100%"
            >
              {postList.edges.map(({ node }, index) => (
                <PostThumbnail key={node.id} post={node} />
              ))}
            </Composition>
          </>
        )
      }}
    </StaticQuery>
  )
}

export default PostList
