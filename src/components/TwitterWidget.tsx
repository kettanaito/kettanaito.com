import React, { useEffect } from 'react'
import { Composition } from 'atomic-layout'
import { Container } from './Container'
import { PostGrid } from './PostGrid'
import { Text } from './Text'
import { Avatar } from './Avatar'

export const TwitterWidget = () => {
  useEffect(() => {
    const anchor = document.createElement('a')
    anchor.setAttribute('class', 'twitter-follow-button')
    anchor.setAttribute('data-chrome', 'noheader nofooter noborders')
    anchor.setAttribute(
      'href',
      'https://twitter.com/kettanaito?ref_src=twsrc%5Etfw'
    )
    anchor.setAttribute('data-size', 'large')
    anchor.setAttribute('data-show-screen-name', 'false')
    document.getElementsByClassName('twitter-embed')[0].appendChild(anchor)

    const script = document.createElement('script')
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    document.getElementsByClassName('twitter-embed')[0].appendChild(script)
  }, [])

  return (
    <Container>
      <PostGrid>
        <Composition
          templateColsMd="auto 1fr"
          gap={2}
          alignItems="start"
          justifyItemsSmDown="center"
          maxWidthSmDown="500px"
          marginHorizontal="auto"
        >
          <a
            href="https://twitter.com/kettanaito"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Avatar
              src="/images/authors/kettanaito.jpg"
              alt="Artem Zakharchenko"
              size={100}
            />
          </a>
          <div>
            <Text sizeVariant="lead" marginBottom={0}>
              <strong>Artem Zakharchenko</strong>
            </Text>
            <Text colorVariant="muted">@kettanaito</Text>
            <p>
              Hi! My name is Artem and I am a Full-stack JavaScript engineer,
              rock-n-roll musician and medical doctor.
            </p>
            <p>
              If you like my material, please consider{' '}
              <strong>following me on Twitter</strong> to get notified when new
              posts are published, ask me a question and stay in touch.
            </p>

            <div className="twitter-embed" />
          </div>
        </Composition>
      </PostGrid>
    </Container>
  )
}
