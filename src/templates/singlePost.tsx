import React, { useEffect } from 'react'
import { graphql, navigate } from 'gatsby'
import Image from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
import styled, { useTheme } from 'styled-components'
import AtomicLayout, { Box, Composition, Only } from 'atomic-layout'
import { ReactComponent as HeartIcon } from 'heroicons/dist/outline-md/md-heart.svg'

import { Layout } from '../components/layout'
import { MdxProvider } from '../components/MdxProvider'
import { Container } from '../components/Container'
import { PostList } from '../components/PostList'
import { SEO } from '../components/seo'
import { TwitterWidget } from '../components/TwitterWidget'
import { CategoryName } from '../components/CategoryName'
import { Label } from '../components/Label'
import { Thumbnail } from '../components/Thumbnail'
import { InnerGrid } from '../components/InnerGrid'
import { PostShare } from '../components/PostShare'
import { PostGrid } from '../components/PostGrid'
import { Separator } from '../components/Separator'
import { useLikes } from '../hooks/useLikes'
import { GhostButton } from '../components/GhostButton'
import { PostContext } from '../components/PostContext'
import { useLocalStorage } from '../hooks/useLocalStorage'

const PostTitle = styled.h1`
  @media (min-width: ${AtomicLayout.breakpoints.sm.minWidth}) {
    text-align: center;
  }
`

const MetaInfo = styled.aside`
  color: ${({ theme }) => theme.colors.gray};
  line-height: 1.2;
  font-weight: 500;
`

const MetaItemDelimiter = styled(Box)`
  opacity: 0.5;

  &:before {
    content: '/';
  }
`

const Heart = (props) => {
  return <HeartIcon width="1.25em" {...props} />
}

const PostHeader = ({ post }) => {
  const { frontmatter, timeToRead } = post
  const theme = useTheme()
  const { likesCount, hasLike, addLike } = useLikes(frontmatter.id)

  return (
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
        marginBottom={2}
        marginBottomMd={3}
      >
        {frontmatter.category}
      </Box>
      <PostTitle>{frontmatter.title}</PostTitle>

      <Composition
        as={MetaInfo}
        alignItems="center"
        justifyContent="center"
        template={`
          date date
          meta likes
          / auto 1fr
        `}
        templateSm="date meta likes"
        gap={0.5}
        gapSm={1}
      >
        {(Areas) => (
          <>
            <Areas.Date>
              <Label>{frontmatter.date}</Label>
            </Areas.Date>
            <Areas.Meta flex alignItems="center">
              <Only as={MetaItemDelimiter} from="sm" marginRight={1} />
              <Label>{timeToRead} min. read</Label>
            </Areas.Meta>
            <Areas.Likes flex alignItems="center">
              <MetaItemDelimiter marginRight={0.5} marginRightSm={1} />
              {likesCount > 0 && <Label marginRight="4px">{likesCount}</Label>}
              {hasLike ? (
                <Heart
                  stroke={theme.colors.primary}
                  fill={theme.colors.primary}
                />
              ) : (
                <GhostButton aria-label="Like this post" onClick={addLike}>
                  <Heart stroke={theme.colors.primary} />
                </GhostButton>
              )}
            </Areas.Likes>
          </>
        )}
      </Composition>
    </Box>
  )
}

function PostDetail({ location, data }) {
  const { site, post, similarPosts } = data
  const { frontmatter } = post

  // Store the post like state in local storage to prevent multiple likes
  const [likeState, setLikeState] = useLocalStorage(`like-${frontmatter.id}`)

  return (
    <MdxProvider>
      <Layout>
        <SEO
          isDraft={frontmatter.draft}
          type="article"
          title={frontmatter.title}
          description={frontmatter.description}
          keywords={frontmatter.keywords}
          image={frontmatter.image.childImageSharp.ogImage.src}
        />
        <PostContext.Provider
          value={{
            likesCount: 0,
            hasLike: likeState === 'true',
            markLiked: () => setLikeState('true'),
          }}
        >
          <Container paddingVertical={2} paddingVerticalMd={4}>
            <PostGrid>
              <PostHeader post={post} />

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
        </PostContext.Provider>
      </Layout>
    </MdxProvider>
  )
}

function SinglePost({ location, data }) {
  const { post } = data

  useEffect(() => {
    if (post.id != null) {
      trackCustomEvent({
        category: 'post',
        action: 'view',
        value: post.id,
      })
    }
  }, [post.id])

  if (!post) {
    navigate('/404')
    return null
  }

  return <PostDetail location={location} data={data} />
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

    # Single post detail
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

    # Similar posts
    # This request can be deferred to client-side where the category is
    # fetched from the "mdx" query.
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

export default SinglePost
