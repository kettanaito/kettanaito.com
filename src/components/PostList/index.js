import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Composition } from 'atomic-layout'

import PostThumbnail from './PostThumbnail'
import PostThumbnailMinimal from './PostThumbnailMinimal'

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
  const compositionProps =
    variant === 'minimal'
      ? {
          templateCols: '1fr',
          templateColsMd: '1fr',
          justifyItems: 'center',
        }
      : {
          templateColsMd: 'repeat(2, 1fr)',
        }

  const PostTemplate =
    variant === 'minimal' ? PostThumbnailMinimal : PostThumbnail

  return (
    <Composition
      {...compositionProps}
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

PostList.propTypes = {
  variant: PropTypes.oneOf(['full', 'minimal']).isRequired,
}

PostList.defaultProps = {
  variant: 'full',
}

export default PostList
