import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import PostList from '../components/PostList'

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO
        title="Blog"
        useTitleTemplate
        keywords={['redd', 'developer', 'technology', 'javascript', 'react']}
      />
      <PostList posts={data.postList.edges} />
    </Layout>
  )
}

export const query = graphql`
query ListQuery {
  postList: allMdx(
    filter: {
      frontmatter: {
        draft: { ne: true }
      }
    }
    sort: {
      order: DESC
      fields: [frontmatter___date]
    }
  ) {
    edges {
      node {
        ...PostPreview
      }
    }
  }
}
`

export default IndexPage
