import { existsSync } from 'fs'
import * as fs from 'fs/promises'
import * as path from 'path'
import { invariant } from 'outvariant'
import glob from 'glob'
import { bundleMDX } from 'mdx-bundler'
import svgo from 'svgo'

const POSTS_PATH = path.resolve(process.cwd(), 'content/blog')
const IMAGE_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.svg',
] as const

function createPostUrl(slug: string): string {
  return `/blog/${slug}`
}

export async function getAllPaths(): Promise<
  Array<{ slug: string; path: string }>
> {
  const postPaths = glob.sync(`${POSTS_PATH}/**/*.mdx`)

  return postPaths.map((postPath) => {
    const relativePath = path.relative(POSTS_PATH, postPath)
    const slug = relativePath.replace(/(index)?\.mdx$/, '').replace(/\/$/, '')

    return {
      slug,
      path: createPostUrl(slug),
    }
  })
}

export interface Post {
  id: string
  code: string
  slug: string
  url: string
  thumbnailSvg: string
  frontmatter: {
    title: string
    description: string
    category: string
    date: string
    keywords?: Array<string>
    hashtags?: Array<string>
  }
}

export async function getPostContent(slug: string): Promise<Post> {
  const filePath = [
    path.resolve(POSTS_PATH, `${slug}.mdx`),
    path.resolve(POSTS_PATH, `${slug}/index.mdx`),
  ].find((path) => existsSync(path))

  invariant(
    filePath,
    'Failed to get post content for slug "%s": no post found',
    slug
  )

  const id = Math.random().toString(32).slice(2, 9)
  const postDir = path.dirname(filePath)
  const postUrl = createPostUrl(slug)
  const fileContent = await fs.readFile(filePath, 'utf8')

  /**
   * Support nested imports in MDX files.
   * Consider:
   * - index.mdx
   * - components/Foo.tsx
   * - components/Bar.tsx
   * Now, if Foo imports Bar, then mdx-bundler will not compile
   * Bar in any way, causing its raw TypeScript and JSX syntax to remain.
   * This fails all the further processing.
   * @see https://github.com/kentcdodds/mdx-bundler/issues/53
   */
  const childComponents = glob.sync('components/**/*.{js,jsx,ts,tsx}', {
    cwd: postDir,
  })
  const childFiles = await Promise.all(
    childComponents.map(async (filePath) => {
      return [
        filePath,
        await fs.readFile(path.resolve(postDir, filePath), 'utf8'),
      ]
    })
  )
  const mdxFiles = Object.fromEntries(childFiles)

  // Thumbnail
  const thumbnailSvgPath = path.resolve(postDir, 'thumbnail.svg')
  const rawThumbnailSvg = await fs.readFile(thumbnailSvgPath, 'utf8')
  const thumbnailSvg = svgo.optimize(rawThumbnailSvg, {
    path: thumbnailSvgPath,
    plugins: [
      'removeDimensions',
      'removeComments',
      'removeTitle',
      {
        name: 'prefixIds',
        params: {
          prefix: id,
        },
      },
    ],
  }).data

  const remarkGfm = await import('remark-gfm').then((x) => x.default)
  const remarkMdxImages = await import('remark-mdx-images').then(
    (x) => x.default
  )
  const { code, frontmatter, errors } = await bundleMDX({
    source: fileContent,
    cwd: postDir,
    files: mdxFiles,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkMdxImages,
      ]
      return options
    },
    esbuildOptions(options) {
      options.outdir = path.resolve(process.cwd(), 'public/blog', slug)

      /**
       * Fxies "process is not defined" error.
       * @see https://github.com/kentcdodds/mdx-bundler/issues/165
       */
      options.define = {
        'process.env': JSON.stringify(process.env),
      }

      IMAGE_EXTENSIONS.forEach((extension) => {
        options.loader = {
          ...options.loader,
          '.css': 'file',
          [extension]: 'file',
        }
      })

      options.publicPath = `${postUrl}/`
      options.write = true
      /**
       * Fixes the "Transforming const to the configured target environment ("es5") is not supported yet" error.
       * @see https://github.com/kentcdodds/mdx-bundler/issues/138
       */
      options.target = ['es6']
      options.platform = 'node'

      return options
    },
  })

  if (errors.length > 0) {
    console.error('Bundling MDX at "%s" failed.', filePath)
    errors.forEach((message) => console.error(message))
  }

  return {
    id,
    code,
    slug,
    url: postUrl,
    thumbnailSvg,
    frontmatter: {
      ...frontmatter,
      date: frontmatter.date.toISOString(),
    } as any,
  }
}

export async function getAllPosts(): Promise<Array<Post>> {
  const paths = await getAllPaths()
  return Promise.all(paths.map((path) => getPostContent(path.slug)))
}

export function sortPostsByDate(posts: Array<Post>): void {
  posts.sort((left, right) => {
    const leftDate = new Date(left.frontmatter.date)
    const rightDate = new Date(right.frontmatter.date)

    return rightDate.getTime() - leftDate.getTime()
  })
}

export async function getRecommendedPosts(
  post: Post,
  maxCount: number
): Promise<Array<Post>> {
  const allPosts = await getAllPosts()
  const allCategories = Array.from(
    allPosts.reduce((categories, otherPost) => {
      return categories.add(otherPost.frontmatter.category)
    }, new Set<string>())
  )
  const otherCategories = allCategories.filter((category) => {
    return category !== post.frontmatter.category
  })

  const recommendedPosts = allPosts
    .filter((otherPost) => {
      const hasSameCategory =
        otherPost.frontmatter.category === post.frontmatter.category
      const uniquePost = otherPost.frontmatter.title !== post.frontmatter.title

      return hasSameCategory && uniquePost
    })
    .map((otherPost) => {
      const keywordsIntersection = post.frontmatter.keywords?.filter(
        (keyword) => {
          return otherPost.frontmatter.keywords?.includes(keyword)
        }
      )

      return {
        post: otherPost,
        score: keywordsIntersection?.length ?? 0,
      }
    })

    .sort((left, right) => {
      return right.score - left.score
    })
    .map(({ post }) => post)

  let result: Array<Post> = []

  const recommendedFromAnotherCategory =
    otherCategories.length > 0
      ? allPosts.find((otherPost) => {
          return otherPost.frontmatter.category === otherCategories[0]
        })
      : undefined

  if (recommendedFromAnotherCategory) {
    result = [
      ...recommendedPosts.slice(0, maxCount - 1),
      recommendedFromAnotherCategory,
    ]
  }

  sortPostsByDate(result)

  return result.slice(0, maxCount)
}
