import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Container } from './Container'
import { ShareOnFacebook, ShareOnTwitter, ShareOnReddit } from './SocialLinks'

const GET_SITE_METADATA = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        siteUrl
        title
        author
      }
    }
  }
`

export function PageShare(): JSX.Element {
  const data = useStaticQuery(GET_SITE_METADATA)
  const { siteUrl, title, author } = data.site.siteMetadata

  return (
    <section className="border-t dark:border-gray-700">
      <Container>
        <div className="grid items-center gap-10 py-20 md:grid-cols-2">
          <aside>
            <h3 className="mt-0">Enjoyed reading?</h3>
            <p className="text-lg text-muted">
              This is an uncommercial blog. The only goal it has is spreading
              knowledge. Please, consider{' '}
              <strong>sharing this with your friends</strong>. Thank you.
            </p>
          </aside>
          <div className="flex items-center gap-4 md:justify-end">
            <ShareOnTwitter
              url={siteUrl}
              title={`Check out the Redd Developer blog by ${author}!`}
              hashtags={['javascript', 'programming', 'blog']}
            />
            <ShareOnFacebook url={siteUrl} />
            <ShareOnReddit url={siteUrl} title={title} />
          </div>
        </div>
      </Container>
    </section>
  )
}
