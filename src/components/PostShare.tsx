import * as React from 'react'
import styled, { css } from 'styled-components'
import { HeartIcon } from '@heroicons/react/outline'
import { Container } from './Container'
import { InnerGrid } from './InnerGrid'
import { PostGrid } from './PostGrid'
import { Separator } from './Separator'
import { ShareOnTwitter, ShareOnFacebook, ShareOnReddit } from './SocialLinks'
import { useLikes } from '../hooks/useLikes'

interface PostShareProps {
  id: string
  url: string
  title: string
  hashtags?: string[]
}

const StyledHeartIcon = styled(HeartIcon)<{ isLiked: boolean }>`
  ${({ isLiked }) =>
    isLiked &&
    css`
      animation: pop 1s;
      fill: currentColor;
    `}

  @keyframes pop {
    0% {
      transform: scale(1);
    }
    10% {
      transform: scale(0.85);
    }
    20% {
      transform: scale(1.25);
    }
    30% {
      transform: scale(0.9);
    }
    40% {
      transform: scale(1);
    }
  }
`

const PostLikeButton: React.FC<{ postId: string; postTitle: string }> = ({
  postId,
}) => {
  const { hasLike, addLike } = useLikes(postId)

  return (
    <button
      className="flex items-center justify-center w-full h-12 text-white bg-red-600"
      aria-label="Like this post"
      onClick={addLike}
    >
      <StyledHeartIcon isLiked={hasLike} width={32} stroke="currentColor" />
    </button>
  )
}

export const PostShare: React.FC<PostShareProps> = ({
  id,
  url,
  title,
  hashtags,
}) => {
  return (
    <Container>
      <PostGrid>
        <InnerGrid>
          <Separator />
        </InnerGrid>
        <div className="flex flex-wrap justify-between w-full gap-5 py-16">
          <div className="flex-grow min-w-full sm:min-w-min">
            <PostLikeButton postId={id} postTitle={title} />
          </div>
          <div className="col-span-4 md:col-span-1">
            <ShareOnTwitter url={url} title={title} hashtags={hashtags} />
          </div>
          <div className="col-span-4 md:col-span-1 justify-self-center">
            <ShareOnFacebook url={url} />
          </div>
          <div className="col-span-4 md:col-span-1 justify-self-end">
            <ShareOnReddit url={url} title={title} />
          </div>
        </div>
      </PostGrid>
    </Container>
  )
}
