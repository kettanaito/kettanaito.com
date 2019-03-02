import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/Seo'
import PostList from '../components/PostList'

const IndexPage = props => {
  return (
    <Layout>
      <SEO
        title="Blog"
        keywords={['redd', 'developer', 'technology', 'javascript', 'react']}
      />
      <PostList />
    </Layout>
  )
}

export default IndexPage
