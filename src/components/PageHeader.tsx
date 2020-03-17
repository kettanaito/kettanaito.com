import React from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'
import styled from 'styled-components'
import { Composition, Box } from 'atomic-layout'
import Container from './Container'
import { CategoryName } from './CategoryName'
import { ReactComponent as ArrowLeft } from 'heroicons/dist/outline-md/md-arrow-left.svg'
import LogoIcon from '../images/logo-2.svg'

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.grayDim};
  border-bottom: 1px solid #e8ecf3;
  color: ${({ theme }) => theme.colors.gray};
  z-index: 10;
`

const NavBackLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  svg {
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
          padding={1}
        >
          <div>
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
                <CategoryName color="gray">All posts</CategoryName>
              </Composition>
            )}
          </div>
          <Box justify="center">
            <Link to="/">
              <LogoImage src={LogoIcon} alt={siteTitle} />
            </Link>
          </Box>
          <div />
        </Composition>
      </Container>
    </HeaderContainer>
  )
}

export default Header
