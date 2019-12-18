import { Link } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import Container from './Container'
import Logo from '../images/logo.svg'

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  font-size: 0.85rem;
  z-index: 10;
`

const LogoImage = styled.img`
  display: block;
  margin: 0;
  max-width: 175px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.75;
  }
`

const StyledLink = styled(Link)`
  position: relative;
  padding: 1.2rem 1rem;
  text-decoration: none;

  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    width: 0;
    background-color: red;
    margin: 0 auto;
    transition: width 0.2s ease;
  }

  &:hover {
    text-decoration: none;
  }

  &.active,
  &:hover {
    &:after {
      width: 100%;
    }
  }

  &.active:after {
    height: 2px;
  }
`

const Header = ({ siteTitle }) => (
  <HeaderContainer>
    <Container>
      <Box flex alignItems="center" justifyContent="space-between">
        <Link to="/">
          <LogoImage src={Logo} alt={siteTitle} />
        </Link>
        <StyledLink to="/about" activeClassName="active">
          About
        </StyledLink>
      </Box>
    </Container>
  </HeaderContainer>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
