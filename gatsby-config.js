const siteUrl = 'https://redd.one'

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
} = process.env

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
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-136640393-1',
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
        name: 'posts',
        path: `${__dirname}/content/posts/`,
      },
    },
    {
      resolve: 'gatsby-mdx',
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
    'gatsby-plugin-styled-components',
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-firebase`,
      credentials: {
        /**
         * @TODO Finish this config.
         */
        apiKey: FIREBASE_API_KEY,
        authDomain: FIREBASE_AUTH_DOMAIN,
        databaseURL: 'YOUR_GATSBY_FIREBASE_DATABASE_URL',
        projectId: FIREBASE_PROJECT_ID,
        storageBucket: 'YOUR_GATSBY_FIREBASE_STORAGE_BUCKET',
        messagingSenderId: 'YOUR_GATSBY_FIREBASE_MESSAGING_SENDER_ID',
        appId: 'YOUR_GATSBY_FIREBASE_APP_ID',
        measurementId: 'YOUR_GATSBY_FIREBASE_MEASUREMENT_ID',
      },
    },
  ],
}
