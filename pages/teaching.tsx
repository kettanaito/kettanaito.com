import { Container, Grid } from '../components/grid'
import { PageHeader } from '../components/pageHeader'
import { Seo } from '../components/seo'

export default function TeachingPage() {
  return (
    <>
      <Seo
        title="Teaching - kettanaito.com"
        ogTitle="Teaching"
        description="I like to teach you complex things in a simple way."
        keywords={['teaching', 'workshops', 'courses', 'kettanaito']}
      />

      <Container className="my-20">
        <PageHeader
          title="Teaching"
          subtitle="I like to teach you complex things in a simple way."
        />

        {/* Workshops */}
        <Grid className="my-20 lg:my-32 gap-y-20 text-xl">
          <div className="col-span-3">
            <h2 className="mt-8">Workshops</h2>
            <p className="leading-8">
              Brew yourself some coffee or tea, and prepare to learn by solving
              real-world problems hands-on. Your own pace, my experience, our
              workshop.
            </p>
          </div>
        </Grid>
        <Grid>
          <LearningItem
            title="React Component Testing with Vitest"
            url="https://www.epicweb.dev/workshops/react-component-testing-with-vitest"
            imageUrl="https://www.epicweb.dev/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fi1a93n76%2Fproduction%2F9f00d7d39998aaae0b2d0307562e42db82df6697-1200x1200.png&w=640&q=80"
            summary="Explore how to migrate from JSDOM to Vitest Browser Mode and rediscover updated best practices of React component testing."
            platformName="epicweb"
            className="lg:col-span-2 w-full mx-auto"
          />
          <LearningItem
            title="Mocking Techniques in Vitest"
            url="https://epicweb.dev/workshops/mocking-techniques-in-vitest"
            imageUrl="https://www.epicweb.dev/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fi1a93n76%2Fproduction%2F4a502c2a85828d8dfc0be93302167671b2c4ea8e-1200x1200.png&w=640&q=80"
            summary="Learn how to mock anything: from functions and globals, to date and time and the network."
            platformName="epicweb"
            className="lg:col-span-2 w-full mx-auto"
          />
          <LearningItem
            title="Testing Fundamentals"
            url="https://epicweb.dev/workshops/testing-fundamentals"
            imageUrl="https://www.epicweb.dev/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fi1a93n76%2Fproduction%2F6609bf0bf84c5870898f457e067e725ce5662c84-1000x1000.png&w=640&q=80"
            summary="Get started with automated testing by building your own testing framework from scratch."
            platformName="epicweb"
            className="lg:col-span-2 w-full mx-auto"
          />
        </Grid>

        <hr />

        {/* Courses */}
        <Grid className="my-20 lg:my-32 gap-y-20 text-xl">
          <div className="col-span-3">
            <h2 className="mt-0">Courses</h2>
            <p className="leading-8">
              A burst of knowledge. Follow along or watch at your convenience.
            </p>
          </div>
        </Grid>
        <Grid>
          <LearningItem
            title="Mocking WebSocket APIs with Mock Service Worker"
            url="https://egghead.io/courses/mocking-websocket-apis-with-mock-service-worker-9933b7f5"
            imageUrl="https://egghead.io/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdg3gyk0gu%2Fimage%2Fupload%2Fv1732122601%2Fmsw-logo-badge.png&w=640&q=80"
            summary="Explore WebSocket mocking by building and testing a chat application."
            platformName="egghead"
            className="lg:col-span-2 w-full mx-auto"
          />
          <LearningItem
            title="Mocking REST and GraphQL APIs with Mock Service Worker"
            url="https://egghead.io/courses/mock-rest-and-graphql-apis-with-mock-service-worker-8d471ece"
            imageUrl="https://egghead.io/_next/image?url=https%3A%2F%2Fd2eip9sf3oo6c2.cloudfront.net%2Fplaylists%2Fsquare_covers%2F001%2F143%2F364%2Ffull%2Fegh_mswjs_2000.png&w=640&q=80"
            summary="Understand API mocking by building a movie streaming platform completely mock-first."
            platformName="egghead"
            className="lg:col-span-2 w-full mx-auto"
          />
        </Grid>
      </Container>
    </>
  )
}

function LearningItem({
  title,
  url,
  imageUrl,
  summary,
  platformName,
  className,
}: {
  title: string
  url: string
  imageUrl: string
  summary: string
  platformName: string
  className?: string
}) {
  return (
    <article
      className={['group inline-block max-w-md', className]
        .filter(Boolean)
        .join(' ')}
    >
      <a href={url} target="_blank" rel="noreferrer noopener">
        <figure className="aspect-[3/4] relative flex items-center justify-center overflow-hidden rounded-xl from-gray-800 to-gray-900 bg-gradient-to-tr">
          <img
            src={imageUrl}
            alt={title}
            className="w-64 group-hover:scale-110 group-hover:-translate-y-3 transition"
          />

          <div className="absolute left-5 bottom-5 text-white size-12 bg-gray-900 shadow-xl rounded-md p-2">
            <img src={`/platforms/${platformName}.png`} alt={platformName} />
          </div>
        </figure>
      </a>

      <div className="mt-8">
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="font-bold text-2xl text-pretty hover:underline"
        >
          {title}
        </a>
        <p className="mt-4 text-lg text-gray-500 text-pretty">{summary}</p>
      </div>
    </article>
  )
}
