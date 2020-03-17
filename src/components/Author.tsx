import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Box, Composition } from 'atomic-layout'
import { IoLogoTwitter, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io'
import { Avatar } from './Avatar'
import { ExternalLink } from './ExternalLink'
import { SemanticList } from './SemanticList'
import { ReactComponent as HalfCircle } from '../images/icons/half-circle.svg'

interface AuthorProps {
  name: string
  description: string
  githubHandle: string
  twitterHandle?: string
  linkedInHandle?: string
  imageSize?: number
}

const AvatarConatiner = styled.div`
  position: relative;
`

const StyledHalfCircle = styled.svg`
  position: absolute;
  top: -6px;
  left: -6px;
`

const AuthorName = styled.p`
  margin: 0;
  font-weight: bold;
`

const AuthorDescription = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 14px;
`

export const Author: React.FC<AuthorProps> = ({
  name,
  description,
  githubHandle,
  twitterHandle,
  linkedInHandle,
  imageSize,
}) => {
  const theme = useTheme()

  return (
    <Composition templateCols="auto 1fr" alignItems="center" gap={12 / 16}>
      <AvatarConatiner>
        <Avatar
          src={`https://github.com/${githubHandle}.png`}
          alt={name}
          size={imageSize}
        />
        <StyledHalfCircle as={HalfCircle} height={imageSize} />
      </AvatarConatiner>
      <div>
        <AuthorName>{name}</AuthorName>
        <Box as={AuthorDescription} flex alignItems="center">
          <span>{description}</span>
          <Box as="span" marginHorizontal={0.5}>
            ·
          </Box>
          <Box as={SemanticList} flex alignItems="center">
            {twitterHandle && (
              <li>
                <ExternalLink
                  to="https://twitter.com/kettanaito"
                  focusSize={0.5}
                >
                  <IoLogoTwitter fill={theme.colors.gray} />
                </ExternalLink>
              </li>
            )}
            <li>
              <ExternalLink
                to={`https://github.com/${githubHandle}`}
                focusSize={0.5}
              >
                <IoLogoGithub fill={theme.colors.gray} />
              </ExternalLink>
            </li>
            {linkedInHandle && (
              <li>
                <ExternalLink to={`https://linkedin.com/in/${linkedInHandle}`}>
                  <IoLogoLinkedin fill={theme.colors.gray} size={16} />
                </ExternalLink>
              </li>
            )}
          </Box>
        </Box>
      </div>
    </Composition>
  )
}
