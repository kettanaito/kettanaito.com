import * as path from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import find from 'find-process'
import { chromium } from 'playwright'
import * as mdxUtils from '../utils/mdx.js'

const { getAllPosts } = mdxUtils

const dirname = path.dirname(fileURLToPath(import.meta.url))

const APP_PORT = 3000

async function generateOgImages(): Promise<void> {
  const killApp = await serveApp()

  const browser = await chromium.launch()
  const context = await browser.newContext({
    baseURL: `http://localhost:${APP_PORT}`,
    reducedMotion: 'reduce',
  })
  const allPosts = await getAllPosts()

  await Promise.all(
    allPosts.map(async (post) => {
      const page = await context.newPage()
      await page.goto(`${post.url}/og`, {
        waitUntil: 'networkidle',
      })
      await page.setViewportSize({ width: 1200, height: 630 })

      const postHeader = page.locator('#og-image')
      await postHeader.isVisible()

      await postHeader.screenshot({
        animations: 'disabled',
        path: path.resolve(dirname, '../public/blog', `${post.slug}.jpg`),
        scale: 'css',
        type: 'jpeg',
        quality: 100,
      })

      console.log('OK "%s"', post.url)
    })
  )

  killApp()
  process.exit(0)
}

async function serveApp(): Promise<() => void> {
  const appProcesses = await find('port', APP_PORT)

  if (appProcesses.length > 0) {
    console.log(
      'The application is already running at %d, reusing...',
      APP_PORT
    )
    return () => {}
  }

  console.log('No application found at port %d, running...', APP_PORT)

  const appProcess = exec('pnpm dev', (error) => {
    if (error) {
      console.error('Failed to serve the app')
      console.error(error)
      return
    }

    console.log('Successfully spawned application at %d!', APP_PORT)
  })

  return () => {
    appProcess.kill('SIGTERM')
  }
}

generateOgImages()
