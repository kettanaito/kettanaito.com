import React, { useEffect } from 'react'
import { graphql, navigate } from 'gatsby'
import Image from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
import styled from 'styled-components'
import AtomicLayout, { Box } from 'atomic-layout'

import Layout from '../components/layout'
import { MdxProvider } from '../components/MdxProvider'
import Container from '../components/Container'
import PostList from '../components/PostList'
import Seo from '../components/seo'
import { TwitterWidget } from '../components/TwitterWidget'
import { CategoryName } from '../components/CategoryName'
import { Label } from '../components/Label'
import { Thumbnail } from '../components/Thumbnail'
import { InnerGrid } from '../components/InnerGrid'
import { PostShare } from '../components/PostShare'
import { PostGrid } from '../components/PostGrid'
import { Separator } from '../components/Separator'

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
  const { site, post, similarPosts } = data

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
        <Container paddingVertical={2} paddingVerticalMd={4}>
          <PostGrid>
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
            <Box as={InnerGrid}>
              <MDXRenderer>{post.body}</MDXRenderer>
            </Box>
          </PostGrid>
        </Container>

        {/* Social sharing */}
        <Box marginVertical={1}>
          <PostShare
            id={frontmatter.id}
            url={location.href}
            title={`"${frontmatter.title}" by ${site.siteMetadata.author}`}
            hashtags={frontmatter.hashtags}
          />
        </Box>

        <Box marginVertical={4}>
          <TwitterWidget />
        </Box>

        {/* Similar posts */}
        {similarPosts?.edges?.length > 0 && (
          <>
            <Separator />
            <Container marginVertical={4}>
              <Box as="h3" flex justifyContent="center">
                Articles You May Enjoy
              </Box>
              <Box marginTop={3}>
                <PostList posts={similarPosts.edges} />
              </Box>
            </Container>
          </>
        )}
      </Layout>
    </MdxProvider>
  )
}

export const query = graphql`
  query SinglePost($postId: String!, $postCategory: String!) {
    site {
      siteMetadata {
        siteUrl
        title
        author
      }
    }

    #
    # Single post detail
    #
    post: mdx(id: { eq: $postId }, frontmatter: { date: { ne: null } }) {
      frontmatter {
        id
        title
        description
        keywords
        hashtags
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
