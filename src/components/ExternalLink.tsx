import React from 'react'
import styled from 'styled-components'

const StyledLink = styled.a<{ focusSize: number }>`
  display: inline-flex;
  padding: ${({ focusSize }) => focusSize}rem;
`

type ExternalLinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  to: string
  focusSize?: number
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  to,
  focusSize,
  children,
  ...anchorProps
}) => {
  return (
    <StyledLink
      {...anchorProps}
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
  focusSize: 1,
}
