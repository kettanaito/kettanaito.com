import React from 'react'
import styled from 'styled-components'
import { graphql, navigate } from 'gatsby'
import Image from 'gatsby-image'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import AtomicLayout, { Only, Box } from 'atomic-layout'

import Layout from '../components/layout'
import MdxProvider from '../components/mdx/MdxProvider'
import PostList from '../components/PostList'
import Share from '../components/Share'
import Seo from '../components/seo'
import Text from '../components/Text'

const PostTitle = styled.h1`
  @media (min-width: ${AtomicLayout.breakpoints.sm.minWidth}) {
    text-align: center;
  }
`

const MetaDelimiter = () => (
  <Box as="span" paddingHorizontal={10} paddingHorizontalMd={16}>
    ·
  </Box>
)

function BlogPost(props) {
  const { location, data } = props
  const { post, similarPosts } = data

  if (!data.post) {
    navigate('/404')
    return null
  }

  const { frontmatter, timeToRead } = post
  const { draft, date, category } = frontmatter

  return (
    <MdxProvider>
      <Layout>
        <Seo
          isDraft={draft}
          type="article"
          title={frontmatter.title}
          description={frontmatter.description}
          keywords={frontmatter.keywords}
          image={frontmatter.image.childImageSharp.ogImage.src}
        />
        <div>
          <Box
            as="header"
            // flex
            flexDirection="column"
            alignItems="center"
            marginBottom={32}
            marginBottomMd={64}
          >
            <PostTitle>{frontmatter.title}</PostTitle>
            <Box
              as="p"
              flex
              flexDirection="column"
              flexDirectionSm="row"
              justifyContent="center"
              justifyContentXsDown="start"
              width="100%"
            >
              <Text primary>{category}</Text>
              <Only as={MetaDelimiter} from="sm" />
              <Box flex>
                <Text>{date}</Text>
                <MetaDelimiter />
                <Text>{timeToRead} minute(s) read</Text>
              </Box>
            </Box>
          </Box>

          <Image
            fluid={frontmatter.image.childImageSharp.fluid}
            alt={frontmatter.title}
          />

          {/* Post content */}
          <Box as="article">
            <MDXRenderer>{post.code.body}</MDXRenderer>
          </Box>

          {/* Social sharing */}
          <Box paddingTop={32} paddingBottom={16}>
            <Share
              title={frontmatter.title}
              url={location.origin + location.pathname}
              text={frontmatter.socialShareText}
            />
          </Box>

          {/* Similar posts */}
          {similarPosts && (
            <>
              <hr />
              <PostList posts={similarPosts.edges} />
            </>
          )}
        </div>
      </Layout>
    </MdxProvider>
  )
}

export const query = graphql`
  query SinglePost($postId: String!, $postCategory: String!) {
    post: mdx(id: { eq: $postId }, frontmatter: { date: { ne: null } }) {
      id
      frontmatter {
        title
        description
        keywords
        date(formatString: "MMMM D, YYYY")
        category
        image {
          childImageSharp {
            fluid(maxWidth: 786, quality: 95) {
              ...GatsbyImageSharpFluid
            }
            ogImage: fluid(maxWidth: 1200, quality: 95) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      timeToRead
      code {
        body
      }
    }

    #
    # Similar posts
    #
    similarPosts: allMdx(
      limit: 3
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        id: { ne: $postId }
        frontmatter: { date: { ne: null }, category: { eq: $postCategory } }
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

export default BlogPost
