import React, { useMemo } from 'react'
import { invariant } from 'outvariant'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { getMDXComponent } from 'mdx-bundler/client'
import { motion } from 'framer-motion'
import { SiX as TwitterIcon, SiBluesky as BlueskyIcon } from 'react-icons/si'
import socialLinks from '../../content/static/social-links.json'
import {
  getAllPaths,
  getPostContent,
  getRecommendedPosts,
  Post,
} from '../../utils/mdx'
import { Container, Grid } from '../../components/grid'
import { mdxComponents } from '../../components/mdx'
import { ShareWidget, ShareWidgetInline } from '../../components/shareWidget'
import { PostThumbnail } from '../../components/postThumbnail'
import { TwitterFollowBlock } from '../../components/twitterFollowBlock'
import { Seo } from '../../components/seo'
import { getOrigin } from '../../utils/getOrigin'
import { formatDate } from '../../utils/date'
import { PostTitle } from '../../components/post/postTitle'
import { PostMeta } from '../../components/post/postMeta'

interface PageProps {
  post: Post
  recommendedPosts: Array<Post>
}

export default function BlogPost({
  post,
  recommendedPosts,
}: PageProps): JSX.Element {
  const router = useRouter()
  const Component = useMemo(() => getMDXComponent(post.code), [post.code])

  const publishedAt = formatDate(post.frontmatter.date)
  const canonicalUrl = new URL(router.asPath, getOrigin())
  const ogImageUrl = new URL(`${post.url}.jpg`, getOrigin())

  return (
    <>
      <Seo
        title={`${post.frontmatter.title} - kettanaito.com`}
        ogTitle={post.frontmatter.title}
        ogImage={ogImageUrl.href}
        description={post.frontmatter.description}
        canonicalUrl={canonicalUrl.href}
        keywords={post.frontmatter.keywords}
      />

      <div className="from-white to-gray-100 bg-gradient-to-t">
        <Container className="mb-20 lg:pt-10">
          <div className="relative max-w-3xl mx-auto">
            <div className="hidden lg:block pattern -left-16 -translate-x-full bottom-[25%] opacity-20 w-[300px]" />
            <div className="hidden lg:block pattern -right-16 translate-x-full bottom-[25%] opacity-20 w-[300px]" />
            <motion.div
              initial={{ y: -50, opacity: 0, filter: 'grayscale(100%)' }}
              animate={{ y: 0, opacity: 1, filter: 'grayscale(0%)' }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="w-48 mx-auto pb-5 lg:pb-10 drop-shadow-2xl"
                dangerouslySetInnerHTML={{ __html: post.thumbnailSvg }}
              />
            </motion.div>
            <motion.header
              className="text-center text-xl"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              <PostMeta
                category={post.frontmatter.category}
                publishedAt={publishedAt}
              />
              <PostTitle title={post.frontmatter.title} />

              <div className="inline-grid grid-cols-[2fr_1fr_auto_1fr_2fr] items-center gap-5 text-gray-500 mt-16 font-medium text-2xl">
                <hr className="border border-gray-200" />
                <a
                  href={socialLinks.bluesky}
                  rel="noreferrer"
                  target="_blank"
                  className="p-5 hover:text-black"
                  aria-label='Follow me on "Bluesky"'
                >
                  <BlueskyIcon />
                </a>
                <img
                  src="https://github.com/kettanaito.png"
                  alt="kettanaito's avatar"
                  className="h-12 w-12 rounded-full shadow-lg"
                />
                <a
                  href={socialLinks.twitter}
                  rel="noreferrer"
                  target="_blank"
                  className="p-5 hover:text-black"
                  aria-label='Follow me on "Twitter"'
                >
                  <TwitterIcon />
                </a>
                <hr className="border border-gray-200" />
              </div>
            </motion.header>
          </div>
        </Container>
      </div>
      <motion.div
        className="text-lg mb-20 lg:mb-[7.5rem]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Container className="relative">
          <aside className="hidden lg:block absolute top-0 right-0 pl-5 h-full">
            <ShareWidget
              url={canonicalUrl.href}
              title={post.frontmatter.title}
              hashtags={post.frontmatter.hashtags}
            />
          </aside>
          <main className="post-content max-w-3xl mx-auto">
            <Component components={mdxComponents} />
          </main>
          <aside className="block lg:hidden my-20 max-w-3xl mx-auto text-center">
            <ShareWidgetInline
              url={canonicalUrl.href}
              title={post.frontmatter.title}
              hashtags={post.frontmatter.hashtags}
            />
          </aside>
          <aside className="max-w-3xl mx-auto">
            <TwitterFollowBlock className="my-20" />
          </aside>
        </Container>
      </motion.div>

      <aside className="py-4 bg-gray-50 border-t border-b text-center font-medium">
        <Container>
          <p>
            Liked my writing?{' '}
            <a
              href="https://www.buymeacoffee.com/kettanaito"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:underline hover:text-black"
            >
              Buy me a ☕️ coffee
            </a>
            !
          </p>
        </Container>
      </aside>

      {recommendedPosts?.length ? (
        <section className="my-20">
          <Container>
            <h2>Keep on reading</h2>
            <Grid className="my-10 gap-y-20">
              {recommendedPosts.map((post) => {
                return (
                  <PostThumbnail
                    key={post.slug}
                    url={post.url}
                    title={post.frontmatter.title}
                    category={post.frontmatter.category}
                    date={new Date(post.frontmatter.date)}
                    thumbnailSvg={post.thumbnailSvg}
                    className="w-full col-span-2"
                  />
                )
              })}
            </Grid>
          </Container>
        </section>
      ) : null}
    </>
  )
}

export const getStaticProps: GetStaticProps<
  PageProps,
  { slug: string }
> = async ({ params }) => {
  const slug = params?.slug
  invariant(
    slug,
    'Failed to generate static props for a page: page slug is missing'
  )

  const post = await getPostContent(slug)
  const recommendedPosts = await getRecommendedPosts(post, 3)

  return {
    props: {
      post,
      recommendedPosts,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postPaths = await getAllPaths()

  return {
    paths: postPaths.map((post) => post.path),
    fallback: false,
  }
}
