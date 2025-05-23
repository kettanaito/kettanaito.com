import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { AnnouncementBanner } from '../components/announcementBanner'

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
        <Component {...pageProps} />
      ) : (
        <>
          <AnnouncementBanner>
            <p>
              Level up your testing skills by learning directly from me!{' '}
              <a
                href="https://www.epicweb.dev/testing"
                className="inline-block text-red-400 hover:underline break-words"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </p>
          </AnnouncementBanner>

          <Header />
          <Component {...pageProps} />
          <Footer />
        </>
      )}
    </>
  )
}
