import React, { useEffect } from 'react'
import { graphql, navigate } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
import { useTheme } from 'styled-components'
import { HeartIcon } from '@heroicons/react/outline'

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
import { usePostViews } from '../hooks/usePostViews'
import { Author } from '../components/Author'

const Heart = (props) => {
  return <HeartIcon width="1.25em" {...props} />
}

const PostHeader = ({ post }): JSX.Element => {
  const { frontmatter, timeToRead } = post
  const theme = useTheme()
  const { likesCount, hasLike, addLike } = useLikes(frontmatter.id)

  return (
    <header className="mb-16">
      <CategoryName className="block mb-10 text-red-600 md:text-center">
        {frontmatter.category}
      </CategoryName>

      <h1 className="mb-5 text-6xl font-black tracking-tight md:text-center">
        {frontmatter.title}
      </h1>

      <div className="flex items-center space-x-3 font-semibold text-gray-500 dark:text-gray-400 md:space-x-5 md:justify-center">
        <Label>{frontmatter.date}</Label>
        <span className="text-sm select-none text-muted">{'/'}</span>
        <Label>{timeToRead} min. read</Label>
        <span className="text-sm select-none text-muted">{'/'}</span>
        <div className="flex items-center">
          {likesCount > 0 ? <span className="mr-1">{likesCount}</span> : null}
          {hasLike ? (
            <Heart stroke={theme.colors.primary} fill="text-red-200" />
          ) : (
            <GhostButton aria-label="Like this post" onClick={addLike}>
              <Heart stroke={theme.colors.primary} />
            </GhostButton>
          )}
        </div>
      </div>

      <div className="flex mt-16 md:justify-center">
        <Author
          name="Artem Zakharchenko"
          imageUrl="https://github.com/kettanaito.png"
          description="Software engineer"
          githubHandle="kettanaito"
          twitterHandle="kettanaito"
        />
      </div>
    </header>
  )
}

function PostDetail({ location, data }) {
  const { site, post, similarPosts } = data
  const { frontmatter } = post

  usePostViews(frontmatter.id, frontmatter.title)

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
          <Container className="py-20">
            <PostGrid>
              <PostHeader post={post} />

              <div className="mb-16">
                <Thumbnail
                  fluid={frontmatter.image.childImageSharp.fluid}
                  alt={frontmatter.title}
                />
              </div>

              {/* Post content */}
              <InnerGrid className="leading-7 prose content max-w-none prose-red dark:text-gray-300">
                <MDXRenderer>{post.body}</MDXRenderer>
              </InnerGrid>
            </PostGrid>
          </Container>

          {/* Social sharing */}
          <PostShare
            id={frontmatter.id}
            url={location.href}
            title={`"${frontmatter.title}" by ${site.siteMetadata.author}`}
            hashtags={frontmatter.hashtags}
          />

          <TwitterWidget />

          {/* Similar posts */}
          {similarPosts?.edges?.length > 0 && (
            <>
              <Separator />
              <Container className="py-20">
                <h2 className="mt-0 font-extrabold text-center mb-14">
                  Articles You May Enjoy
                </h2>
                <PostList posts={similarPosts.edges} />
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
