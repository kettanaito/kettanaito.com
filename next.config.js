const path = require('path')
const { invariant } = require('outvariant')

const { DISCORD_INVITE_URL } = process.env

invariant(
  DISCORD_INVITE_URL,
  'Failed to load: the "DISCORD_INVITE_URL" environment variable is missing'
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { dev, isServer, nextRuntime }) {
    if (dev && isServer && nextRuntime !== 'edge') {
      /**
       * Live-reload blog posts in development.
       * @see ./scripts/mdx-watch-loader.cjs
       */
      config.module.rules.push({
        test: path.resolve(__dirname, 'utils/mdx.ts'),
        use: [
          {
            loader: path.resolve(__dirname, 'scripts/mdx-watch-loader.cjs'),
            options: {
              contentDir: path.resolve(__dirname, 'content/blog'),
            },
          },
        ],
      })
    }

    return config
  },
  async rewrites() {
    return [
      {
        source: '/discord',
        destination: DISCORD_INVITE_URL,
      },
    ]
  },
}

module.exports = nextConfig
