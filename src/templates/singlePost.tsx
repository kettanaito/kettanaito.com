import React, { useEffect } from 'react'
import { graphql, navigate } from 'gatsby'
import Image from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
import styled from 'styled-components'
import AtomicLayout, { Box } from 'atomic-layout'

import Layout from '../components/layout'
import { MdxProvider } from '../components/MdxProvider'
import PostList from '../components/PostList'
import Share from '../components/Share'
import Seo from '../components/seo'
import { TwitterWidget } from '../components/TwitterWidget'
import { CategoryName } from '../components/CategoryName'
import { Label } from '../components/Label'
import { Thumbnail } from '../components/Thumbnail'
import { InnerGrid } from '../components/InnerGrid'

const PostTitle = styled.h1`
  @media (min-width: ${AtomicLayout.breakpoints.sm.minWidth}) {
    text-align: center;
  }
`

const MetaInfo = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.colors.gray};
`

const MetaInfoItem = styled.li`
  &:not(:last-child):after {
    content: '/';
    margin: 0 1rem;
    font-weight: 500;
    opacity: 0.5;
  }
`

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
            <Box
              flex
              as={CategoryName}
              justifyContent="center"
              marginBottom={3}
            >
              {category}
            </Box>
            <PostTitle>{frontmatter.title}</PostTitle>

            <MetaInfo>
              <MetaInfoItem>
                <Label>{date}</Label>
              </MetaInfoItem>
              <MetaInfoItem>
                <Label>{timeToRead} min. read</Label>
              </MetaInfoItem>
            </MetaInfo>
          </Box>

          <Thumbnail
            as={Image}
            fluid={frontmatter.image.childImageSharp.fluid}
            alt={frontmatter.title}
          />

          {/* Post content */}
          <Box as={InnerGrid} data-post-id={post.id}>
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
