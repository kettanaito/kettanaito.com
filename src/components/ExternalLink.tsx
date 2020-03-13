import React from 'react'
import styled from 'styled-components'

const StyledLink = styled.a<{ focusSize: number }>`
  display: inline-flex;
  padding: ${({ focusSize }) => focusSize}rem;
  margin: 0 -${({ focusSize }) => focusSize / 2}rem;
`

interface ExternalLinkProps {
  to: string
  focusSize?: number
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  to,
  focusSize,
  children,
}) => {
  return (
    <StyledLink
      focusSize={focusSize}
      href={to}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </StyledLink>
  )
}

ExternalLink.defaultProps = {
  focusSize: 0.25,
}
