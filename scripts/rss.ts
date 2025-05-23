import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import RSS from 'rss'
import * as mdxUtils from '../utils/mdx.js'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const packageJson = require('../package.json')

const { getAllPosts } = mdxUtils

const dirname = path.dirname(fileURLToPath(import.meta.url))

const siteUrl = packageJson.homepage

async function generateFeed() {
  const feed = new RSS({
    title: 'kettanaito.com',
    description: `Artem Zakharchenko's blog`,
    ttl: 40,
    language: 'en-us',
    site_url: siteUrl,
    feed_url: new URL('/rss.xml', siteUrl).toString(),
    pubDate: new Date(),
    copyright: `All rights reserved © ${new Date().getFullYear()} ${
      packageJson.author.name
    }`,
  })

  // Populate the RSS feed with posts.
  const allPosts = await getAllPosts()
  for (const post of allPosts) {
    if (post.frontmatter.draft) {
      continue
    }

    const postUrl = new URL(post.url, siteUrl).toString()

    feed.item({
      url: postUrl,
      guid: postUrl,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      date: post.frontmatter.date,
      categories: [post.frontmatter.category],
    })
  }

  return feed
}

async function emitFeedFile() {
  const feed = await generateFeed()
  const xml = feed.xml({ indent: true })

  fs.writeFileSync(path.join(dirname, '../public/blog/rss.xml'), xml)
  console.log('Successfully generated the RSS feed!')
}

emitFeedFile()
