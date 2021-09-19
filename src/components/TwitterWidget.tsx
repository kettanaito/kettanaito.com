import React, { useEffect } from 'react'
import { Container } from './Container'
import { PostGrid } from './PostGrid'
import { Avatar } from './Avatar'
import { ExternalLink } from './ExternalLink'

export function TwitterWidget(): JSX.Element {
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
    <section className="py-20 border-t bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <Container>
        <PostGrid>
          <div className="grid items-start gap-8 md:grid-flow-col-dense">
            <ExternalLink to="https://twitter.com/kettanaito">
              <Avatar
                src="https://github.com/kettanaito.png"
                alt="Artem Zakharchenko"
                size={32}
                className="rounded-lg shadow-lg"
              />
            </ExternalLink>
            <div>
              <header className="mb-4">
                <p className="text-xl font-bold">Artem Zakharchenko</p>
                <p className="text-muted">@kettanaito</p>
              </header>
              <main>
                <p>
                  Hi! My name is Artem and I am a Full-stack JavaScript
                  engineer, rock-n-roll musician and medical doctor. If you like
                  my material, please consider{' '}
                  <strong>following me on Twitter</strong> to get notified when
                  new posts are published, ask me a question and stay in touch.
                </p>
                <footer className="mt-6">
                  <div className="twitter-embed" />
                </footer>
              </main>
            </div>
          </div>
        </PostGrid>
      </Container>
    </section>
  )
}
