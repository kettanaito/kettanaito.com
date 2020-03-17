import React from 'react'
import styled, { css } from 'styled-components'
import { Composition } from 'atomic-layout'
import { ReactComponent as Heart } from 'heroicons/dist/outline-md/md-heart.svg'
import Container from './Container'
import { InnerGrid } from './InnerGrid'
import { PostGrid } from './PostGrid'
import { Separator } from './Separator'
import { ShareInTwitter, ShareInFacebook, ShareInReddit } from './SocialLinks'
import { useLikes } from '../hooks/useLikes'

interface PostShareProps {
  id: string
  url: string
  title: string
  hashtags?: string[]
}

const LikeButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`

const HeartIcon = styled(Heart)<{ isLiked: boolean }>`
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

const PostLikeButton: React.FC<{ postId: string }> = ({ postId }) => {
  const { hasLike, addLike } = useLikes(postId)

  return (
    <LikeButton onClick={addLike}>
      <HeartIcon isLiked={hasLike} width={32} stroke="currentColor" />
    </LikeButton>
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
        <Composition
          templateCols="1fr repeat(3, auto)"
          gap={1.5}
          paddingVertical={2}
          paddingVerticalMd={4}
        >
          <PostLikeButton postId={id} />
          <ShareInTwitter url={url} title={title} hashtags={hashtags} />
          <ShareInFacebook url={url} />
          <ShareInReddit url={url} title={title} />
        </Composition>
        <InnerGrid>
          <Separator />
        </InnerGrid>
      </PostGrid>
    </Container>
  )
}
