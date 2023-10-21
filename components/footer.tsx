import Link from 'next/link'
import socialLinks from '../content/static/social-links.json'
import { Container, Grid } from './grid'

export function Footer(): JSX.Element {
  return (
    <footer className="py-20 lg:py-32 font-medium text-gray-500 border-t">
      <Container>
        <Grid>
          <div className="col-span-2 lg:col-span-3">
            <p>© {new Date().getFullYear()} Artem Zakharchenko.</p>
            <p className="mt-1 text-sm">
              All content of this website is distributed under the{' '}
              <a
                href="https://creativecommons.org/licenses/by-nc/4.0/"
                target="_blank"
                rel="noreferrer"
                className="text-black underline hover:text-gray-500"
              >
                CC BY-NC license
              </a>
              .
            </p>
          </div>
          <ul className="lg:col-start-5 space-y-1 lg:text-right">
            <li>
              <Link
                href="/"
                className="py-1 inline-block hover:text-black hover:underline"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="py-1 inline-block hover:text-black hover:underline"
              >
                Blog
              </Link>
            </li>
            <li>
              <a
                href="/blog/rss.xml"
                target="_blank"
                rel="noreferrer"
                className="py-1 inline-block hover:text-black hover:underline"
              >
                RSS
              </a>
            </li>
          </ul>
          <ul className="space-y-1 lg:text-right">
            <li>
              <a
                href={socialLinks.discord}
                target="_blank"
                rel="noreferrer"
                className="py-1 inline-block hover:text-black hover:underline"
              >
                Discord
              </a>
            </li>
            <li>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="py-1 inline-block hover:text-black hover:underline"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="py-1 inline-block hover:text-black hover:underline"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="py-1 inline-block hover:text-black hover:underline"
              >
                YouTube
              </a>
            </li>
          </ul>
        </Grid>
      </Container>
    </footer>
  )
}
