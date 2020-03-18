import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import DefaultImage from '../images/redd-thumbnail.jpg'

function SEO({
  type,
  isDraft,
  title,
  useTitleTemplate,
  description,
  image,
  lang,
  meta,
  keywords,
}) {
  return (
    <StaticQuery query={detailsQuery}>
      {(data) => {
        const titleTemplate = `%s | ${data.site.siteMetadata.title}`
        const metaDescription =
          description || data.site.siteMetadata.description
        const twitterCard =
          type === 'website' ? 'summary' : 'summary_large_image'
        const imageFullUrl =
          process.env.ENV_NAME === 'dev'
            ? image
            : data
            ? data.site.siteMetadata.siteUrl + image
            : image
        const ogTitle = useTitleTemplate
          ? titleTemplate.replace(/%s/, title)
          : title

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={titleTemplate}
          >
            {/* General */}
            <meta name="description" content={metaDescription} />
            {keywords && keywords.length > 0 && (
              <meta name="keywords" content={keywords.join()} />
            )}
            {isDraft && <meta name="robots" content="noindex,nofollow" />}

            {/* OpenGraph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={ogTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={imageFullUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={ogTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={imageFullUrl} />
            <meta
              name="twitter:creator"
              content={data.site.siteMetadata.author}
            />

            {meta}
          </Helmet>
        )
      }}
    </StaticQuery>
  )
}

SEO.defaultProps = {
  isDraft: false,
  type: 'website',
  lang: 'en',
  meta: [],
  useTitleTemplate: false,
  keywords: [],
  image: DefaultImage,
}

SEO.propTypes = {
  isDraft: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  useTitleTemplate: PropTypes.bool.isRequired,
  image: PropTypes.string,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        siteUrl
        title
        description
        author
      }
    }
  }
`
