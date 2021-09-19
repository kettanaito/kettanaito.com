import * as React from 'react'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share'

interface ShareComponentProps {
  url: string
}

export function ShareOnFacebook({ url }: ShareComponentProps): JSX.Element {
  return (
    <FacebookShareButton
      url={url}
      aria-label="Share on Facebook"
      className="flex max-w-full"
    >
      <FacebookIcon size={48} />
    </FacebookShareButton>
  )
}

export const ShareOnTwitter: React.FC<
  ShareComponentProps & {
    title: string
    hashtags?: string[]
  }
> = (props) => {
  return (
    <TwitterShareButton
      {...props}
      hashtags={props.hashtags || []}
      aria-label="Share on Twitter"
      className="flex max-w-full"
    >
      <TwitterIcon size={48} />
    </TwitterShareButton>
  )
}

ShareOnTwitter.defaultProps = {
  hashtags: [],
}

export const ShareOnReddit: React.FC<
  ShareComponentProps & {
    title: string
  }
> = ({ url, title }) => {
  return (
    <RedditShareButton
      title={title}
      url={url}
      aria-label="Share on Reddit"
      className="flex max-w-full"
    >
      <RedditIcon size={48} />
    </RedditShareButton>
  )
}
