const { invariant } = require('outvariant')

const { DISCORD_INVITE_URL } = process.env

invariant(
  DISCORD_INVITE_URL,
  'Failed to load: the "DISCORD_INVITE_URL" environment variable is missing'
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
