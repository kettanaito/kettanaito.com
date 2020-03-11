import React, { useMemo } from 'react'
import { Composition } from 'atomic-layout'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import PostList from '../components/PostList'
import { HeroPostItem } from '../components/PostItem'

const IndexPage = ({ data }) => {
  const { edges } = data.postList

  const [firstPost, restPosts] = useMemo(() => {
    return [edges[0], edges.slice(1)]
  }, [edges])

  console.log({ firstPost })

  return (
    <Layout>
      <SEO
        title="Blog"
        useTitleTemplate
        keywords={[
          'redd',
          'developer',
          'technology',
          'javascript',
          'react',
          'programming',
          'blog',
        ]}
      />
      <Composition gap={5}>
        <HeroPostItem
          url={firstPost.node.fields.url}
          title={firstPost.node.frontmatter.title}
          image={firstPost.node.frontmatter.image.childImageSharp.fluid}
          category={firstPost.node.frontmatter.category}
          date={firstPost.node.frontmatter.date}
          excerpt={firstPost.node.frontmatter.description}
        />
        <PostList posts={restPosts} />
      </Composition>
    </Layout>
  )
}

export const query = graphql`
  query ListQuery {
    postList: allMdx(
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

export default IndexPage
