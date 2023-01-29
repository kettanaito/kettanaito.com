import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { TransitionContainer } from '../components/transitionContainer'

async function pruneWorkers() {
  const worker = await navigator.serviceWorker.getRegistration()

  if (worker) {
    await worker.unregister()
    location.reload()
  }
}

/**
 * Prune any residual worker registrations because I used to
 * use Gatsby's PWA plugin and it left a worker behind,
 * loading the stale version of the website.
 */
if (typeof window !== 'undefined') {
  pruneWorkers()
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon-apple-touch.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      {pageProps.hideLayout ? (
        <TransitionContainer>
          <Component {...pageProps} />
        </TransitionContainer>
      ) : (
        <>
          <Header />
          <TransitionContainer>
            <Component {...pageProps} />
          </TransitionContainer>
          <Footer />
        </>
      )}
    </>
  )
}
