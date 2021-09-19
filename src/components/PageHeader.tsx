import * as React from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'
import { Container } from './Container'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import LogoIcon from '../images/logo.svg'
import { ThemeSwitch } from './ThemeSwitch'

interface HeaderProps {
  siteTitle?: string
}

function Header({ siteTitle }: HeaderProps): JSX.Element {
  const location = useLocation()
  const isPostDetailPage = location.pathname.startsWith('/blog/')

  return (
    <header className="sticky top-0 z-10 border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <Container className="grid items-center grid-cols-3 py-4 text-gray-500 dark:text-gray-400">
        <div>
          {isPostDetailPage ? (
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 group dark:text-gray-400 hover:text-black dark:hover:text-white"
            >
              <ArrowLeftIcon
                width={14}
                className="transition-transform transform group-hover:-translate-x-1"
              />
              <p className="font-semibold tracking-widest uppercase">Home</p>
            </Link>
          ) : null}
        </div>
        <Link to="/" className="justify-self-center">
          <img
            src={LogoIcon}
            alt={siteTitle}
            className="w-10 transition-transform transform hover:shadow-lg hover:-translate-y-1 active:translate-y-0 active:shadow-md"
          />
        </Link>
        <div className="justify-self-end">
          <ThemeSwitch />
        </div>
      </Container>
    </header>
  )
}

export default Header
