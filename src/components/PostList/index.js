import React from 'react'
import { graphql } from 'gatsby'
import { Composition } from 'atomic-layout'

import { PostItem } from '../PostItem'

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

const PostList = ({ posts }) => {
  return (
    <Composition
      templateCols="repeat(3, 1fr)"
      justifyContent="center"
      gutter={4}
      maxWidth="100%"
    >
      {posts.map(({ node }, index) => (
        <PostItem
          key={node.id}
          url={node.fields.url}
          title={node.frontmatter.title}
          image={node.frontmatter.image.childImageSharp.fluid}
          category={node.frontmatter.category}
          excerpt={node.frontmatter.description}
          date={node.frontmatter.date}
        />
      ))}
    </Composition>
  )
}

export default PostList
