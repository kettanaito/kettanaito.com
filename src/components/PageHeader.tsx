import { Link } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'
import { Composition, Box } from 'atomic-layout'
import Container from './Container'
import { ReactComponent as Search } from 'heroicons/dist/outline-md/md-search.svg'
import Logo from '../images/logo-2.svg'

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.grayLight};
  border-bottom: 1px solid #e8ecf3;
  font-size: 0.85rem;
  z-index: 10;
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

const Header = ({ siteTitle }) => {
  const theme = useTheme()

  return (
    <HeaderContainer>
      <Container>
        <Composition
          templateCols="repeat(3, 1fr)"
          alignItems="center"
          justifyContent="space-between"
          padding={1.2}
        >
          <div />
          <Box justify="center">
            <Link to="/">
              <LogoImage src={Logo} alt={siteTitle} />
            </Link>
          </Box>
          <Box flex justify="flex-end">
            <Search stroke={theme.colors.gray} width={24} />
          </Box>
        </Composition>
      </Container>
    </HeaderContainer>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
