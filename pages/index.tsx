import { GetStaticProps } from 'next'
import Link from 'next/link'
import {
  SiTwitter as TwitterIcon,
  SiGithub as GitHubIcon,
  SiYoutube as YouTubeIcon,
} from 'react-icons/si'
import { HiPlay as PlayIcon } from 'react-icons/hi'
import socialLinks from '../content/static/social-links.json'
import conferenceTalks from '../content/static/talks.json'
import { Container, Grid } from '../components/grid'
import { PageHeader } from '../components/pageHeader'
import { PostThumbnail } from '../components/postThumbnail'
import { getPostContent, Post, sortPostsByDate } from '../utils/mdx'
import { TwitterFollowBlock } from '../components/twitterFollowBlock'
import Image from 'next/image'
import { Seo } from '../components/seo'

interface Props {
  featuredPosts: Array<Post>
}

export default function About({ featuredPosts }: Props): JSX.Element {
  return (
    <>
      <Seo
        title="Redd"
        description="Artem Zakharchenko's personal blog."
        keywords={[
          'redd',
          'kettanaito',
          'blog',
          'engineering',
          'articles',
          'learning',
        ]}
      />

      <Container className="my-20 lg:my-32">
        <PageHeader
          title={
            <>
              Hi! 👋 My name is <span className="text-[#F04444]">Artem</span>{' '}
              and I am a software engineer.
            </>
          }
        >
          <ul className="-mr-5 flex items-center gap-2 text-4xl">
            <li>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="inline-block p-5 hover:text-gray-800"
              >
                <TwitterIcon />
              </a>
            </li>
            <li>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="inline-block p-5 hover:text-gray-800"
              >
                <GitHubIcon />
              </a>
            </li>
            <li>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="inline-block p-5 hover:text-gray-800"
              >
                <YouTubeIcon />
              </a>
            </li>
          </ul>
        </PageHeader>
        <main>
          <Grid className="my-20 lg:my-32 gap-y-20 text-xl">
            <div className="col-span-3">
              <h2 className="mt-8">How it started</h2>
              <p className="leading-8">
                I was born in 1994 in a small town in eastern Ukraine. Unable to
                decide whom I wanted to be more—an astronaut or a
                drummer—I&apos;ve slowly found myself in the grasp of graphic
                design. But the main reason I began learning it was so I would
                have a nice visual presentation for the &quot;awesome&quot; HTML
                sites I was building at the time.
              </p>
              <p className="leading-8">
                I graduated from a medical university and moved to the Czech
                Republic to pursue a doctor&apos;s career. But life had
                different plans for me, and so it led me down the path of
                software engineering so I could affect the lives of thousands of
                other developers through the projects I would build.
              </p>
            </div>
            <div className="col-span-3">
              <div className="bg-gradient-to-t from-transparent to-gray-100 p-8 rounded-xl">
                <h2 className="mt-0">How it&apos;s going</h2>
                <div className="leading-8">
                  <p>
                    Over the past decade I&apos;ve been working as a software
                    engineer in digital agencies, large corporations, and
                    startups of various stages of acquisition. I&apos;ve learned
                    and taught, broken and fixed, but most importantly, had a
                    chance to meet so many wonderful people along my journey.
                  </p>
                  <p>
                    Now, I&apos;m a{' '}
                    <strong>
                      Software Engineer at{' '}
                      <span className="whitespace-nowrap">
                        <img
                          src="/logo/codesandbox.png"
                          alt="CodeSandbox"
                          className="inline align-baseline -mb-[0.5ch] ml-1 h-7 w-7 rounded-md"
                        />{' '}
                        CodeSandbox
                      </span>
                    </strong>{' '}
                    working on pushing the boundaries of remote web development
                    further in our{' '}
                    <a
                      href="https://codesandbox.io"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 underline hover:text-black"
                    >
                      new editor experience
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </Grid>

          <hr />

          {/* My writing */}
          <section className="my-20 lg:my-32">
            <header className="text-xl">
              <Grid>
                <div className="col-span-3">
                  <h2 className="mt-0">Writing</h2>
                  <p className="leading-8">
                    I created this website to be a personal space where I could
                    write about the things I would like to read myself. I draw
                    topics from my experiences and my struggles so we could
                    learn together.
                  </p>
                </div>
              </Grid>
            </header>
            <Grid className="my-16 gap-y-20 justify-center sm:justify-start">
              {featuredPosts.map((post) => {
                return (
                  <PostThumbnail
                    key={post.id}
                    title={post.frontmatter.title}
                    category={post.frontmatter.category}
                    thumbnailSvg={post.thumbnailSvg}
                    url={post.url}
                    date={new Date(post.frontmatter.date)}
                    className="col-span-1 lg:col-span-2"
                  />
                )
              })}
            </Grid>
            <footer className="text-center mt-16">
              <Link href="/blog" className="button px-14 py-2" scroll={false}>
                See more posts
              </Link>
            </footer>
          </section>

          <hr />

          {/* Open source */}
          <section className="my-20 lg:my-32">
            <header className="text-xl">
              <Grid>
                <div className="col-span-3">
                  <h2 className="mt-0">Open source</h2>
                  <p className="leading-8">
                    Open source plays a tremendous part in my engineering
                    journey. This is my primary way of learning and I&apos;m
                    truly humbled to have influenced so many people with my
                    projects. Here are just a few of them.
                  </p>
                </div>
              </Grid>
            </header>

            <Grid className="my-20 text-lg">
              <div className="col-span-3">
                <article className="flex flex-col sm:flex-row gap-7 bg-gradient-to-t from-transparent to-orange-50 rounded-xl p-10">
                  <img
                    src="/logo/msw.svg"
                    alt="Mock Service Worker"
                    className="w-14 h-14 rounded-lg shadow-xl shadow-orange-300 self-center sm:self-start"
                  />
                  <div>
                    <h3 className="mt-0">Mock Service Worker</h3>
                    <p className="text-gray-500">
                      Seamless API mocking library for browser and Node.js.
                    </p>
                    <p className="space-x-5 font-medium text-gray-500">
                      <a
                        href="https://github.com/mswjs/msw"
                        target="_blank"
                        rel="noreferrer"
                        className="button px-8 py-1.5"
                      >
                        <GitHubIcon className="inline -mt-1 mr-2" />
                        GitHub
                      </a>
                      <a
                        href="https://mswjs.io"
                        target="_blank"
                        rel="noreferrer"
                        className="text-black hover:underline"
                      >
                        Website
                      </a>
                    </p>
                  </div>
                </article>
              </div>
              <div className="col-span-3">
                <article className="flex gap-7 flex-col sm:flex-row bg-gradient-to-t from-transparent to-green-50 rounded-xl p-10">
                  <img
                    src="/logo/package.svg"
                    alt="Deferred Promise"
                    className="w-14 h-14 rounded-lg shadow-xl shadow-green-200 self-center sm:self-start"
                  />
                  <div>
                    <h3 className="mt-0">Deferred Promise</h3>
                    <p className="text-gray-500">
                      Type-safe A+ Promise implementation with deferred
                      resolution.
                    </p>
                    <p className="space-x-5 font-medium text-gray-500">
                      <a
                        href="https://github.com/open-draft/deferred-promise"
                        target="_blank"
                        rel="noreferrer"
                        className="button px-8 py-1.5"
                      >
                        <GitHubIcon className="inline -mt-1 mr-2" />
                        GitHub
                      </a>
                    </p>
                  </div>
                </article>
              </div>
            </Grid>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 my-20">
              <OpenSourceProject
                title="Naming Cheatsheet"
                description="Language-agnostic variable naming guidelines."
                url="https://github.com/kettanaito/naming-cheatsheet"
              />
              <OpenSourceProject
                title="Release"
                description="Predictable release automation."
                url="https://github.com/ossjs/release"
              />
              <OpenSourceProject
                title="Dotalias"
                description="Single source of truth for path alias configuration."
                url="https://github.com/open-draft/dotalias"
              />
              <OpenSourceProject
                title="Until"
                description="Error-first handling of async/await without try/catch."
                url="https://github.com/open-draft/until"
              />
            </div>

            <footer className="text-center">
              <a
                href="https://github.com/kettanaito"
                target="_blank"
                rel="noreferrer"
                className="button px-14 py-2"
              >
                View more on GitHub
              </a>
            </footer>
          </section>

          <hr />

          {/* My talks */}
          <section className="my-20 lg:my-32">
            <header className="text-xl">
              <Grid>
                <div className="col-span-3">
                  <h2 className="mt-0">Speaking</h2>
                  <p className="leading-8">
                    I&apos;ve been priveleged to speak at a number of events
                    around the globe. From cozy meetups to large international
                    conferences, I speak about the topics that interest me,
                    sharing my knowledge with others.
                  </p>
                </div>
              </Grid>
            </header>
            <Grid className="my-16">
              <div className="col-span-full lg:col-span-4">
                <article>
                  <div className="relative rounded-tr-xl rounded-tl-xl overflow-hidden">
                    <Image
                      src="/talk-test-complexity.jpg"
                      alt="Dissecting Complexity in Tests"
                      width={1456 / 2}
                      height={956 / 2}
                      className="my-0"
                    />
                    <a
                      href={conferenceTalks[0].watchUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute group top-0 left-0 h-full w-full bg-slate-500 bg-opacity-70 flex items-center justify-center"
                    >
                      <span className="inline-block rounded-full bg-white px-4 py-2 font-bold shadow-xl group-hover:bg-slate-200">
                        <PlayIcon
                          size={20}
                          className="inline -mb-1 mr-1 align-baseline"
                        />
                        Watch
                      </span>
                    </a>
                  </div>
                  <div className="p-8 bg-slate-100 rounded-bl-xl rounded-br-xl">
                    <h3 className="mt-0 mb-1">{conferenceTalks[0].name}</h3>
                    <p className="inline-block font-mono font-medium text-gray-500">
                      {conferenceTalks[0].venue}
                    </p>
                    <p className="mt-5 text-lg font-medium">
                      {conferenceTalks[0].description}
                    </p>
                  </div>
                </article>
              </div>
              <div className="col-span-full lg:col-span-2">
                <p className="my-10 mb-0 uppercase text-sm font-bold text-gray-500 tracking-widest">
                  Past talks
                </p>
                {conferenceTalks.slice(1).map((talk, index, all) => (
                  <article
                    key={talk.name}
                    className={['block group py-8']
                      .concat(
                        index < all.length - 1
                          ? 'border-b border-slate-200'
                          : ''
                      )
                      .join(' ')}
                  >
                    <h3 className="my-0 text-xl font-semibold">{talk.name}</h3>
                    <p className="inline-block font-mono text-sm font-medium text-gray-500">
                      {talk.venue}
                    </p>
                    <p className="mt-5 text-lg font-medium">
                      {talk.description}
                    </p>
                    <p>
                      <a
                        href={talk.watchUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block font-bold bg-slate-100 rounded-full px-4 py-2 hover:bg-slate-200"
                      >
                        <PlayIcon
                          size={20}
                          className="inline -mb-1 mr-1 align-baseline"
                        />
                        Watch
                      </a>
                    </p>
                  </article>
                ))}
              </div>
            </Grid>
            <footer className="flex flex-col lg:flex-row items-center justify-center gap-4">
              <p className="text-xl text-gray-500 font-medium">
                Would like for me to speak at your event?
              </p>
              <a
                href="https://twitter.com/kettanaito"
                target="_blank"
                rel="noreferrer"
                className="button px-14 py-2"
              >
                Let&apos;s talk!
              </a>
            </footer>
          </section>

          {/* Follow on Twitter */}
          <TwitterFollowBlock className="my-20 lg:my-32" />
        </main>
      </Container>
    </>
  )
}

function OpenSourceProject({
  title,
  description,
  url,
}: {
  title: string
  description: string
  url: string
}) {
  return (
    <article>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="block bg-gradient-to-t from-transparent to-gray-100 px-5 py-4 rounded-xl hover:to-gray-200"
      >
        <h3 className="my-0 mb-2 text-lg">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </a>
    </article>
  )
}

function _OpenSourceProject({
  href,
  title,
  text,
  imageUrl,
}: {
  href: string
  title: string
  text: string
  imageUrl: string
}): JSX.Element {
  return (
    <a href={href} className="flex gap-4 py-8">
      <img
        src={imageUrl}
        className="w-12 h-12 rounded-lg flex-shrink-0 transition"
        alt={title}
      />
      <div>
        <h3 className="mt-0 mb-1 text-xl font-semibold">{title}</h3>
        <p className="text-gray-500">{text}</p>
      </div>
    </a>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const featuredPostsSlugs = [
    'the-dark-side-of-open-source',
    'debounce-vs-throttle',
    'thinking-in-functions',
  ]
  const featuredPosts = await Promise.all(
    featuredPostsSlugs.map(getPostContent)
  )
  sortPostsByDate(featuredPosts)

  return {
    props: {
      featuredPosts,
    },
  }
}
