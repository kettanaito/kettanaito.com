import React from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'
import styled from 'styled-components'
import { Composition, Box } from 'atomic-layout'
import Container from './Container'
import { CategoryName } from './CategoryName'
import { ReactComponent as ArrowLeft } from 'heroicons/dist/outline-md/md-arrow-left.svg'
import LogoIcon from '../images/logo.svg'
import { ThemeSwitch } from './ThemeSwitch'

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.grayDim};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayGhost};
  color: ${({ theme }) => theme.styles.header.color};
  z-index: 10;

  a {
    color: ${({ theme }) => theme.styles.header.linkColor};
    text-decoration: none;
  }

  ${CategoryName} {
    color: inherit;
  }
`

const NavBackLink = styled(Link)`
  svg {
    fill: currentColor;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(-5px);
  }
`

const LogoImage = styled.img`
  display: block;
  margin: 0;
  height: auto;
  width: 48px;
  transition: opacity 0.2s;
  user-select: none;

  &:hover {
    opacity: 0.75;
  }
`

interface HeaderProps {
  siteTitle?: string
}

const Header: React.FC<HeaderProps> = ({ siteTitle }) => {
  const location = useLocation()
  const isPostPage = location.pathname.startsWith('/blog/')

  return (
    <HeaderContainer>
      <Container>
        <Composition
          templateCols="repeat(3, 1fr)"
          alignItems="center"
          justifyContent="space-between"
          paddingVertical={1}
        >
          <Box flex alignItems="center">
            {isPostPage && (
              <Composition
                as={NavBackLink}
                to="/"
                inline
                templateCols="auto 1fr"
                alignItems="center"
                gap={0.5}
              >
                <ArrowLeft width={16} />
                <CategoryName>Back</CategoryName>
              </Composition>
            )}
          </Box>
          <Box justify="center">
            <Link to="/">
              <LogoImage src={LogoIcon} alt={siteTitle} />
            </Link>
          </Box>
          <Box flex justify="flex-end">
            <ThemeSwitch />
          </Box>
        </Composition>
      </Container>
    </HeaderContainer>
  )
}

export default Header
