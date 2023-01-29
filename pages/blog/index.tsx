import { useRef, useState } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { SiRss as RssIcon } from 'react-icons/si'
import { Container, Grid } from '../../components/grid'
import { PageHeader } from '../../components/pageHeader'
import { PostThumbnail } from '../../components/postThumbnail'
import { getAllPosts, Post, sortPostsByDate } from '../../utils/mdx'
import { Seo } from '../../components/seo'

interface Props {
  posts: Array<Post>
  categories: Array<string>
}

export default function Blog({ posts, categories }: Props): JSX.Element {
  // Read the search params of the URL from the Router
  // so that its value is the same across the server and the browser.
  const router = useRouter()
  const search = router.asPath.replace(router.pathname, '')
  const params = new URLSearchParams(search)

  const categorySectionRef = useRef<HTMLDivElement>(null)

  const [categoryFilter, setCategoryFilter] = useState<string>(() => {
    return params.get('category') || ''
  })

  const handleCategoryClick = (slug: string) => {
    return () => {
      setCategoryFilter(slug)

      if (categorySectionRef.current) {
        const categorySectionTop = categorySectionRef.current.offsetTop - 73

        window.scroll({
          top: categorySectionTop,
          // Use the smooth behavior because otherwise
          // this scroll creates a flash on the entire page.
          // Web is a truly strange place.
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <>
      <Seo
        title="Blog - Redd"
        ogTitle="Blog"
        description="I write about topics I wish to hear more about."
        keywords={[
          'blog',
          'posts',
          'redd',
          'kettanaito',
          'writing',
          'engineering',
          'culture',
        ]}
      />

      <Container className="my-20">
        <PageHeader
          title="Blog"
          subtitle="I write about topics I wish to hear more about."
        >
          <ul className="-mr-5 flex items-center gap-2 text-4xl">
            <li>
              <a
                href="/blog/rss.xml"
                target="_blank"
                rel="noreferrer"
                className="inline-block -ml-5 lg:m-0 p-5 hover:text-gray-800"
              >
                <RssIcon />
              </a>
            </li>
          </ul>
        </PageHeader>
        <div ref={categorySectionRef}>
          <section className="sticky top-[73px] my-5 py-5 bg-white text-lg font-medium flex items-center gap-4 z-10 bg-opacity-80 backdrop-blur-md">
            <CategoryLink
              slug=""
              href="/blog"
              isActive={categoryFilter === ''}
              onClick={handleCategoryClick('')}
            >
              All
            </CategoryLink>
            {categories.map((category) => {
              const categorySlug = category.toLowerCase()
              const isActive = categorySlug === categoryFilter

              return (
                <CategoryLink
                  key={category}
                  slug={categorySlug}
                  isActive={isActive}
                  onClick={(slug) => handleCategoryClick(slug)()}
                >
                  {category}
                </CategoryLink>
              )
            })}
          </section>
          <Grid className="gap-y-20">
            {posts.map((post) => {
              const hasMatchingCategory = categoryFilter
                ? post.frontmatter.category.toLowerCase() ===
                  categoryFilter.toLowerCase()
                : true

              if (!hasMatchingCategory) {
                return null
              }

              return (
                <PostThumbnail
                  key={post.id}
                  url={post.url}
                  title={post.frontmatter.title}
                  category={post.frontmatter.category}
                  date={new Date(post.frontmatter.date)}
                  thumbnailSvg={post.thumbnailSvg}
                  className="w-full mx-auto lg:mx-0 lg:col-span-2"
                />
              )
            })}
          </Grid>
        </div>
      </Container>
    </>
  )
}

function CategoryLink({
  slug,
  href,
  children,
  isActive,
  onClick,
}: {
  slug: string
  children?: React.ReactNode
  href?: string
  isActive?: boolean
  onClick?: (slug: string) => void
}): JSX.Element {
  return (
    <Link
      key={slug}
      href={href || `?category=${slug}`}
      className={['relative px-4 py-1 transition-colors duration-500']
        .concat(isActive ? 'text-white' : 'hover:text-gray-500')
        .join(' ')}
      onClick={() => onClick?.(slug)}
      scroll={false}
    >
      {children}
      {isActive ? (
        <motion.div
          layoutId="category-link-underline"
          className="absolute bg-gray-800 rounded-full top-0 left-0 w-full h-full -z-10"
        />
      ) : null}
    </Link>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getAllPosts()
  const categories = Array.from(
    new Set(posts.map((post) => post.frontmatter.category))
  )
  sortPostsByDate(posts)

  return {
    props: {
      posts,
      categories,
    },
  }
}
