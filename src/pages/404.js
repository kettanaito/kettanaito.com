import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import PostList from '../components/PostList'

const NotFoundPage = ({ data }) => (
  <Layout>
    <SEO title="Page not found" useTitleTemplate />
    <h1>Page not found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>

    <hr />

    <h2>Read latest posts</h2>
    <PostList posts={data.latestPosts.edges} variant="minimal" />
  </Layout>
)

export const query = graphql`
query PageQuery {
  latestPosts: allMdx(
    limit: 3
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

export default NotFoundPage
