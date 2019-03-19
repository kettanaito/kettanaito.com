import { Link } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import Container from './Container'
import Logo from '../images/logo.svg'

const HeaderContainer = styled.header`
  padding: 1rem 0;
  border-bottom: 1px solid #eaeaea;
  font-size: 0.85rem;
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

const Header = ({ siteTitle }) => (
  <HeaderContainer>
    <Container>
      <Box flex alignItems="center" justifyContent="space-between">
        <Link to="/">
          <LogoImage src={Logo} alt={siteTitle} />
        </Link>
        <Link to="/about">About</Link>
      </Box>
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
