import Link from 'next/link'
import { HiArrowCircleLeft as BackIcon } from 'react-icons/hi'
import { Container } from '../components/grid'
import { PageHeader } from '../components/pageHeader'
import { Seo } from '../components/seo'

export default function PageNotFound(): JSX.Element {
  return (
    <>
      <Seo
        title="Page Not Found - kettanaito.com"
        description="There's nothing at this page."
        robots={['noindex', 'nofollow']}
      />
      <Container className="my-32">
        <PageHeader
          title="Page Not Found"
          subtitle="This is awkward. I haven't planned anything for this page, really."
        />
        <Link href="/" className="button">
          <BackIcon className="inline align-baseline -mb-1.5 mr-1.5 text-2xl" />
          Go back Home
        </Link>
      </Container>
    </>
  )
}
