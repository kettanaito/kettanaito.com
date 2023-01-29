import { invariant } from 'outvariant'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPaths, getPostContent, Post } from '../../../utils/mdx'
import { PostTitle } from '../../../components/post/postTitle'
import { PostMeta } from '../../../components/post/postMeta'

interface PageProps {
  hideLayout: true
  post: Post
}

export default function PostOgImage({ post }: PageProps): JSX.Element {
  return (
    <div
      id="og-image"
      style={{ width: 1200, height: 630 }}
      className="overflow-hidden"
    >
      <div className="bg-gradient-to-t from-transparent to-gray-100 h-full">
        <div className="py-10 relative flex items-center justify-center max-w-3xl mx-auto h-full">
          <div
            className="pattern -left-16 -translate-x-full opacity-20 w-[300px]"
            style={{ top: '20%', bottom: '20%' }}
          />
          <div
            className="pattern -right-16 translate-x-full opacity-20 w-[300px]"
            style={{ top: '20%', bottom: '20%' }}
          />
          <div className="grid grid-cols-1 grid-rows-[330px_1fr] h-full">
            <div className="relative h-full">
              <div
                className="absolute top-0 left-0 right-0 w-60 mx-auto drop-shadow-2xl"
                dangerouslySetInnerHTML={{ __html: post.thumbnailSvg }}
              />
            </div>
            <div className="text-center">
              <PostMeta
                category={post.frontmatter.category}
                publishedAt={post.frontmatter.date}
              />
              <PostTitle title={post.frontmatter.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
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

  return {
    props: {
      hideLayout: true,
      post,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postPaths = await getAllPaths()

  return {
    paths: postPaths.map((post) => `${post.path}/og`),
    fallback: false,
  }
}
