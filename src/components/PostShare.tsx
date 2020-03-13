import React from 'react'
import styled from 'styled-components'
import { Composition } from 'atomic-layout'
import { ReactComponent as Heart } from 'heroicons/dist/outline-md/md-heart.svg'
import Container from './Container'
import { InnerGrid } from './InnerGrid'
import { PostGrid } from './PostGrid'
import { Separator } from './Separator'
import { ShareInTwitter, ShareInFacebook, ShareInReddit } from './SocialLinks'

interface PostShareProps {
  url: string
  title: string
}

const LikeButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const PostShare: React.FC<PostShareProps> = ({ url, title }) => {
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
          <LikeButton>
            <Heart width={32} stroke="currentColor" />
          </LikeButton>
          <ShareInTwitter url={url} title={title} />
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
