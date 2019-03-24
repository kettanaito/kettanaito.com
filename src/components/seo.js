import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, withPrefix } from 'gatsby'
import { Location } from '@reach/router'
import DefaultImage from '../images/redd-thumbnail.jpg'

function SEO({
  type,
  isDraft,
  title,
  description,
  lang,
  meta,
  image,
  keywords,
}) {
  return (
    <Location>
      {({ location }) => (
        <StaticQuery
          query={detailsQuery}
          render={data => {
            const metaDescription =
              description || data.site.siteMetadata.description
            const twitterCard =
              type === 'website' ? 'summary' : 'summary_large_image'

            return (
              <Helmet
                htmlAttributes={{
                  lang,
                }}
                title={title}
                titleTemplate={`%s | ${data.site.siteMetadata.title}`}
              >
                {/* General */}
                <meta name="description" content={metaDescription} />
                {keywords && keywords.length > 0 && (
                  <meta name="keywords" content={keywords.join()} />
                )}
                {isDraft && <meta name="robots" content="noindex,nofollow" />}

                {/* OpenGraph */}
                <meta property="og:type" content={type} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={metaDescription} />
                <meta
                  property="og:image"
                  content={`https://redd.one${image}`}
                />

                {/* Twitter */}
                <meta name="twitter:card" content={twitterCard} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={metaDescription} />
                <meta
                  name="twitter:image"
                  content={`https://redd.one${image}`}
                />
                <meta
                  name="twitter:creator"
                  content={data.site.siteMetadata.author}
                />

                {meta}
              </Helmet>
            )
          }}
        />
      )}
    </Location>
  )
}

SEO.defaultProps = {
  isDraft: false,
  lang: `en`,
  meta: [],
  keywords: [],
  type: 'website',
  image: withPrefix('/images/redd-thumbnail.jpg'),
}

SEO.propTypes = {
  isDraft: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
