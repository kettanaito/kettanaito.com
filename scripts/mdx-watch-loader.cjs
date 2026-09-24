// @ts-check
const path = require('path')
const fs = require('fs')
const { createHash } = require('crypto')
const glob = require('glob')

/**
 * Development-only webpack loader that makes the server bundle
 * of the blog pages depend on the MDX content directory.
 *
 * Posts are read from the file system in `getStaticProps`, so webpack
 * doesn't know about them and editing an MDX file does nothing.
 * This loader:
 * 1. Registers the content directory as a context dependency so webpack
 *    rebuilds this module whenever any file in there changes.
 * 2. Stamps a hash of the content files into the module so its hash
 *    actually changes. Next.js then detects a "server-only change" for
 *    the page and refetches its props in place, without reloading.
 *
 * @this {import('webpack').LoaderContext<{ contentDir: string }>}
 * @param {string} source
 */
module.exports = function mdxWatchLoader(source) {
  const { contentDir } = this.getOptions()

  this.addContextDependency(contentDir)

  const hash = createHash('sha1')
  const contentFiles = glob.sync('**/*', { cwd: contentDir, nodir: true })

  contentFiles.sort().forEach((relativePath) => {
    const stats = fs.statSync(path.join(contentDir, relativePath))
    hash.update(`${relativePath}:${stats.mtimeMs}:${stats.size}\n`)
  })

  return `${source}\nexport const contentHash = '${hash.digest('hex')}'\n`
}
