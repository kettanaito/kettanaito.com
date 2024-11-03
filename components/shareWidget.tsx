import { useMemo } from 'react'
import {
  SiX as TwitterIcon,
  SiFacebook as FacebookIcon,
  SiReddit as RedditIcon,
} from 'react-icons/si'
import {
  TwitterShareButton,
  FacebookShareButton,
  RedditShareButton,
} from 'react-share'

const shareButtonStyles = {
  border: undefined,
  color: undefined,
  padding: undefined,
}

interface Props {
  url: string
  title: string
  hashtags?: Array<string>
}

function ShareOnTwitterButton({
  url,
  text,
  hashtags,
  className,
}: {
  url: string
  text: string
  hashtags?: Array<string>
  className?: string
}): JSX.Element {
  return (
    <TwitterShareButton
      url={url}
      title={text}
      hashtags={hashtags}
      aria-label="Share on Twitter"
      className={`block p-4 ${className} hover:text-gray-900`}
      style={shareButtonStyles}
    >
      <TwitterIcon />
    </TwitterShareButton>
  )
}

function ShareOnFacebookButton({
  url,
  text,
  hashtags,
  className,
}: {
  url: string
  text: string
  hashtags?: Array<string>
  className?: string
}): JSX.Element {
  return (
    <FacebookShareButton
      url={url}
      quote={text}
      hashtag={hashtags?.[0]}
      aria-label="Share on Facebook"
      className={`block p-4 ${className} hover:text-gray-900`}
      style={shareButtonStyles}
    >
      <FacebookIcon />
    </FacebookShareButton>
  )
}

function ShareOnRedditButton({
  url,
  text,
}: {
  url: string
  text: string
}): JSX.Element {
  return (
    <RedditShareButton
      url={url}
      title={text}
      aria-label="Share on Reddit"
      className="block p-4 hover:text-gray-900"
      style={shareButtonStyles}
    >
      <RedditIcon />
    </RedditShareButton>
  )
}

function createShareText(title: string): string {
  return `I've just read "${title}" by @kettanaito and you should too!`
}

export function ShareWidget({ url, title, hashtags }: Props): JSX.Element {
  const shareText = useMemo(() => createShareText(title), [title])

  return (
    <ul className="sticky inline-block top-[70vh] lg:top-32 rounded-lg bg-gray-50 text-2xl text-gray-500 opacity-70 transition hover:opacity-100">
      <li>
        <ShareOnTwitterButton
          url={url}
          text={shareText}
          hashtags={hashtags}
          className="border-b border-gray-100"
        />
      </li>
      <li>
        <ShareOnFacebookButton
          url={url}
          text={shareText}
          hashtags={hashtags}
          className="border-b border-gray-100"
        />
      </li>
      <li>
        <ShareOnRedditButton url={url} text={shareText} />
      </li>
    </ul>
  )
}

export function ShareWidgetInline({
  url,
  title,
  hashtags,
}: Props): JSX.Element {
  const shareText = useMemo(() => createShareText(title), [title])

  return (
    <ul className="flex gap-2 items-center justify-end text-2xl text-slate-600 bg-gradient-to-r from-transparent to-slate-100 rounded-lg">
      <li>
        <ShareOnTwitterButton url={url} text={shareText} hashtags={hashtags} />
      </li>
      <li>
        <ShareOnFacebookButton url={url} text={shareText} hashtags={hashtags} />
      </li>
      <li>
        <ShareOnRedditButton url={url} text={shareText} />
      </li>
    </ul>
  )
}
