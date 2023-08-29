import Link from 'next/link'
import { Container } from './grid'
import { NavLink } from './navLink'

export function Header(): JSX.Element {
  return (
    <header className="sticky h-18 top-0 border-b border-gray-200 py-4 bg-gray-100 bg-opacity-80 backdrop-blur-md font-medium z-10">
      <Container className="flex items-center justify-between gap-10">
        <Link href="/">
          <img
            src="/favicon.svg"
            alt="Redd logo"
            className="inline-block h-10 rounded-sm hover:opacity-80"
          />
        </Link>
        <nav className="-mr-3">
          <ul className="flex items-center gap-3">
            <li>
              <NavLink
                href="/"
                className="p-3 text-gray-500 hover:text-black"
                activeClassName="text-gray-900"
                exact={true}
              >
                About me
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/blog"
                className="p-3 text-gray-500 hover:text-black"
                activeClassName="text-gray-900"
              >
                Blog
              </NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}
