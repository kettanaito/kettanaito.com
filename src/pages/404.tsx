import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Box } from 'atomic-layout'

import Layout from '../components/layout'
import Text from '../components/Text'
import Container from '../components/Container'
import { SEO } from '../components/seo'
import PostList from '../components/PostList'
import { Separator } from '../components/Separator'
import { Link } from '../components/mdx/Link'

const NotFoundPage: React.FC<PageProps<{ latestPosts: any }>> = ({
  data,
  location,
}) => {
  const { pathname } = location

  return (
    <Layout>
      <SEO title="Page not found" useTitleTemplate />
      <Container paddingVertical={4}>
        <Box marginBottom={4}>
          <h1>Page not found</h1>
          <Text lead>
            It appears that <code>{location.pathname}</code> page does not
            exist.
          </Text>
          <Text>
            If you were following a link and ended up here, please{' '}
            <Link
              href={`https://github.com/Redd-Developer/redd.one/issues/new?title=Page "${pathname}" not found&body=I tried to access the page at "${pathname}", but landed on 404 page. Could you please look into this?`}
            >
              let me know
            </Link>
            . Meanwhile, take a look at the latest posts, I'm sure you will like
            the one in the middle!
          </Text>
        </Box>

        <Separator />

        <Box as="h2" flex justifyContent="center">
          Read The Latest Articles
        </Box>
        <Box marginTop={3}>
          <PostList posts={data.latestPosts.edges} />
        </Box>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query PageQuery {
    latestPosts: allMdx(
      limit: 3
      filter: { frontmatter: { date: { ne: null } } }
      sort: { order: DESC, fields: [frontmatter___date] }
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
