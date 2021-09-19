import * as React from 'react'
import { IoLogoTwitter, IoLogoGithub } from 'react-icons/io'
import { Avatar } from './Avatar'
import { ExternalLink } from './ExternalLink'

interface AuthorProps {
  name: string
  description: string
  imageUrl: string
  githubHandle: string
  twitterHandle?: string
}

export function Author({
  name,
  description,
  imageUrl,
  githubHandle,
  twitterHandle,
}: AuthorProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar src={imageUrl} alt={name} size={10} className="shadow-md" />
      <div>
        <p className="font-bold">{name}</p>
        <div className="flex items-center text-sm text-muted">
          <span>{description}</span>
          <span className="mx-3">·</span>
          <div className="flex items-center space-x-2.5">
            <ExternalLink
              to={`https://github.com/${githubHandle}`}
              aria-label="GitHub profile"
              className="hover:text-black dark:hover:text-white"
            >
              <IoLogoGithub role="img" size={20} />
            </ExternalLink>
            {twitterHandle && (
              <ExternalLink
                to="https://twitter.com/kettanaito"
                aria-label="Twitter profile"
                className="hover:text-black dark:hover:text-white"
              >
                <IoLogoTwitter role="img" size={20} />
              </ExternalLink>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
