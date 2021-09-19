import * as React from 'react'
import { graphql } from 'gatsby'

import { PostItem } from './PostItem'

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

export function PostList({ posts }) {
  return (
    <div className="grid max-w-lg mx-auto md:grid-cols-2 lg:grid-cols-3 gap-x-6 xl:gap-x-10 gap-y-20 md:max-w-full">
      {posts.map(({ node }) => (
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
    </div>
  )
}
