import { Link } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Container from './Container'
import Logo from '../images/logo.svg'

const HeaderContainer = styled.header`
  padding: 1rem 0;
  background-color: #fff;
`

const LogoImage = styled.img`
  display: block;
  margin: 0;
  max-width: 150px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }
`

const Header = ({ siteTitle }) => (
  <HeaderContainer>
    <Container>
      <Link to="/">
        <LogoImage src={Logo} alt={siteTitle} />
      </Link>
    </Container>
  </HeaderContainer>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
