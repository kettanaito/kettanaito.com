import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import DefaultImage from '../images/redd-thumbnail.jpg'

console.log({ DefaultImage })

function SEO({ type, title, description, lang, meta, image, keywords }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        const canonicalUrl = window.location.origin + window.location.pathname

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: 'og:url',
                content: canonicalUrl,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: type,
              },
              image && {
                property: 'og:image',
                content: image,
              },
              /* Twitter */
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              image && {
                name: 'twitter:image',
                content: image,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
              keywords.length > 0 && {
                name: `keywords`,
                content: keywords.join(`, `),
              },
            ]
              .filter(Boolean)
              .concat(meta)}
            link={[
              {
                rel: 'canonical',
                href: canonicalUrl,
              },
            ]}
          />
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  type: 'website',
  image: DefaultImage,
}

SEO.propTypes = {
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
