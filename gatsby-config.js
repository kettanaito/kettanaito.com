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
  ],
}
