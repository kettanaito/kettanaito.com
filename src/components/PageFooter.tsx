import * as React from 'react'
import { Link } from 'gatsby'

import { Container } from './Container'
import { ExternalLink } from './ExternalLink'

function Delimiter(): JSX.Element {
  return <span className="inline-block mx-2 select-none">·</span>
}

function FooterLink(
  props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
): JSX.Element {
  return <a className="text-black dark:text-white" {...props} />
}

const Footer = (): JSX.Element => {
  return (
    <footer>
      <Container>
        <div className="grid items-start gap-4 py-8 border-t text-muted dark:border-gray-700 lg:grid-cols-2">
          <div>
            <p className="mb-1 font-semibold">
              © {new Date().getFullYear()} Redd Developer.
            </p>
            <p>
              Made by{' '}
              <ExternalLink
                className="text-black dark:text-white"
                to="https://github.com/kettanaito"
              >
                kettanaito
              </ExternalLink>
              . Built with
              {` `}
              <ExternalLink
                className="text-black dark:text-white"
                to="https://www.gatsbyjs.org"
              >
                Gatsby
              </ExternalLink>{' '}
              on{' '}
              <ExternalLink
                className="text-black dark:text-white"
                to="https://www.netlify.com/"
              >
                Netlify
              </ExternalLink>
              .
            </p>
          </div>

          <p className="lg:justify-self-end">
            Licensed under{' '}
            <FooterLink
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              rel="noopener noreferrer"
              target="_blank"
            >
              CC BY-NC
            </FooterLink>
            <Delimiter />
            <Link className="text-black dark:text-white" to="/privacy">
              Privacy policy
            </Link>
            <Delimiter />
            <FooterLink
              href="https://github.com/Redd-Developer/redd.one"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </FooterLink>
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
