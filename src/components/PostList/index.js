import React from 'react'
import PropTypes from 'prop-types'
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

const PostList = ({ posts, variant, ...restProps }) => {
  return (
    <Composition
      templateCols="1fr"
      justifyContent="center"
      gutter={48}
      maxWidth="100%"
      {...restProps}
    >
      {posts.map(({ node }) => (
        <PostThumbnail key={node.id} post={node} />
      ))}
    </Composition>
  )
}

PostList.propTypes = {
  variant: PropTypes.oneOf(['full', 'minimal']).isRequired,
}

PostList.defaultProps = {
  variant: 'full',
}

export default PostList
