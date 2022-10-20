require('dotenv').config()
require('source-map-support').install()
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'ES6',
    esModuleInterop: true,
  },
})

const siteUrl = 'https://redd.one'

module.exports = {
  siteMetadata: {
    siteUrl,
    title: `Redd Developer`,
    description: `Learn the latest trends in web development, as well as the ageless basics, on this clean ad-free personal blog.`,
    author: `@kettanaito`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-136640393-1`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        rehypePlugins: [require('rehype-slug')],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    `gatsby-plugin-anchor-links`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Redd`,
        short_name: `Redd`,
        start_url: `/`,
        background_color: `#D22F2D`,
        theme_color: `#D22F2D`,
        display: `standalone`,
        icon: `src/images/favicons/main.png`,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-svgr`,
    {
      // Note: The setup for this plugin is simplified in later versions.
      // Consider revisiting when updating Gatsby.
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: `${siteUrl} RSS Feed`,
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: '^/blog/',
            // optional configuration to specify external rss feed, such as feedburner
            // link: 'https://feeds.feedburner.com/gatsby/blog',
          },
        ],
      },
    },
  ],
}
