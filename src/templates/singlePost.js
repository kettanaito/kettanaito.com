import React, { useEffect } from 'react'
import styled from 'styled-components'
import { graphql, navigate } from 'gatsby'
import Image from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
import AtomicLayout, { Only, Box } from 'atomic-layout'

import Layout from '../components/layout'
import MdxProvider from '../components/mdx/MdxProvider'
import PostList from '../components/PostList'
import Share from '../components/Share'
import Seo from '../components/seo'
import Text from '../components/Text'
import { TwitterWidget } from '../components/TwitterWidget'

const PostTitle = styled.h1`
  @media (min-width: ${AtomicLayout.breakpoints.sm.minWidth}) {
    text-align: center;
  }
`

const PostImage = styled(Image)`
  border-radius: 3px;
`

const MetaDelimiter = () => (
  <Box as="span" paddingHorizontal={0.8} paddingHorizontalMd={1.5}>
    ·
  </Box>
)

function BlogPost(props) {
  const { location, data } = props
  const { post, similarPosts } = data

  useEffect(() => {
    if (post.id != null) {
      trackCustomEvent({
        category: 'post',
        action: 'view',
        value: post.id,
      })
    }
  }, [post.id])

  if (!data.post) {
    navigate('/404')
    return null
  }

  const { frontmatter, timeToRead } = post
  const { draft, date, category } = frontmatter

  const readTimeLabel = timeToRead > 1 ? 'minutes' : 'minute'

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
            flexDirection="column"
            alignItems="center"
            marginBottom={2.5}
            marginBottomMd={3.5}
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
              <Box flex>
                <Text primary>{category}</Text>
                <MetaDelimiter />
                <Text>{date}</Text>
              </Box>
              <Box flex>
                <Only as={MetaDelimiter} from="sm" />
                <Text>
                  {timeToRead} {readTimeLabel} read
                </Text>
              </Box>
            </Box>
          </Box>

          <PostImage
            fluid={frontmatter.image.childImageSharp.fluid}
            alt={frontmatter.title}
          />

          {/* Post content */}
          <Box as="article" data-post-id={post.id}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </Box>

          {/* Social sharing */}
          <Box paddingVertical={1}>
            <Share
              title={frontmatter.title}
              url={location.origin + location.pathname}
              text={frontmatter.socialShareText}
            />
          </Box>

          <Box marginVertical={4}>
            <TwitterWidget />
          </Box>

          {/* Similar posts */}
          {similarPosts && (
            <>
              <hr />
              <Box marginTop={1.5}>
                <h3>Posts you may like:</h3>
                <PostList posts={similarPosts.edges} />
              </Box>
            </>
          )}
        </div>
      </Layout>
    </MdxProvider>
  )
}

export const query = graphql`
  query SinglePost($postId: String!, $postCategory: String!) {
    #
    # Single post detail
    #
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
      body
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
