import Head from 'next/head'
import { getOrigin } from '../utils/getOrigin'

interface SeoProps {
  title: string
  description: string
  canonicalUrl?: string
  keywords?: Array<string>
  robots?: Array<string>
  ogTitle?: string
  ogImage?: string
}

const DEFAULT_OG_IMAGE_URL = new URL('/og-image.jpg', getOrigin()).href

export function Seo(props: SeoProps): JSX.Element {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="language" content="en" />
      <meta name="description" content={props.description} />

      {props.robots ? (
        <meta name="robots" content={props.robots?.join(', ')} />
      ) : null}

      {props.keywords ? (
        <meta name="keywords" content={props.keywords?.join(', ')} />
      ) : null}

      {props.canonicalUrl ? (
        <meta name="canonical" content={props.canonicalUrl} />
      ) : null}

      {/* OpenGraph */}
      <meta property="og:title" content={props.ogTitle || props.title} />
      <meta property="og:description" content={props.description} />
      <meta
        property="og:image"
        content={props.ogImage || DEFAULT_OG_IMAGE_URL}
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="kettanaito.com" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={props.ogTitle || props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta
        name="twitter:image"
        content={props.ogImage || DEFAULT_OG_IMAGE_URL}
      />
      <meta name="twitter:creator" content="@kettanaito" />
    </Head>
  )
}
