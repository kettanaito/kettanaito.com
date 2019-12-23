import React from 'react'
import styled from 'styled-components'
import { Composition } from 'atomic-layout'
import Text from './Text'

const AvatarImage = styled.img`
  border-radius: 50%;
  height: 150px;
  width: 150px;
`

export const TwitterWidget = () => {
  React.useEffect(() => {
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
    <Composition
      templateColsMd="auto 1fr"
      gap={32}
      alignItems="center"
      justifyItemsSmDown="center"
      maxWidthSmDown={500}
      marginHorizontal="auto"
    >
      <a
        href="https://twitter.com/kettanaito"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AvatarImage
          src="https://avatars.io/twitter/kettanaito"
          alt="Artem Zakharchenko"
        />
      </a>
      <div>
        <Text as="p" lead>
          <strong>Artem Zakharchenko</strong>{' '}
          <Text inline muted>
            @kettanaito
          </Text>
        </Text>
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
  )
}
