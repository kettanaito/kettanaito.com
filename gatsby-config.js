require('dotenv').config()

const siteUrl = 'https://redd.one'

module.exports = {
  siteMetadata: {
    siteUrl,
    title: `Redd Developer`,
    description: `Tracking-free place to find technical knowledge about web development.`,
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
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Redd`,
        short_name: `Redd`,
        start_url: `/`,
        background_color: `#d22f2d`,
        theme_color: `#d22f2d`,
        display: `standalone`,
        icon: `src/images/favicons/default-square.png`,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-svgr`,
  ],
}
