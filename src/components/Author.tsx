import React from 'react'
import styled from 'styled-components'
import { Box, Composition } from 'atomic-layout'
import { IoLogoTwitter, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io'
import { Avatar } from './Avatar'
import { ExternalLink } from './ExternalLink'

interface AuthorProps {
  name: string
  description: string
  imageUrl: string
  githubHandle: string
  twitterHandle?: string
  imageSize?: number
}

const AuthorContainer = styled.div`
  a {
    color: ${({ theme }) => theme.colors.gray};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.grayDark};
  }
`

const AvatarConatiner = styled.div`
  position: relative;
`

const AuthorName = styled.p`
  margin: 0;
  font-weight: bold;
`

const AuthorDescription = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 14px;
  line-height: 1.25;
`

export const Author: React.FC<AuthorProps> = ({
  name,
  description,
  imageUrl,
  githubHandle,
  twitterHandle,
  imageSize,
}) => {
  return (
    <Composition
      as={AuthorContainer}
      templateCols="auto 1fr"
      alignItems="center"
      gap={12 / 16}
    >
      <AvatarConatiner>
        <Avatar src={imageUrl} alt={name} size={imageSize} />
        {/* <StyledHalfCircle as={HalfCircle} height={imageSize} /> */}
      </AvatarConatiner>
      <div>
        <AuthorName>{name}</AuthorName>
        <Box as={AuthorDescription} flex alignItems="center" marginTop="-6px">
          <span>{description}</span>
          <Box as="span" marginLeft={1} marginRight={0.25}>
            ·
          </Box>
          <Box flex alignItems="center">
            {twitterHandle && (
              <Box flex>
                <ExternalLink
                  to="https://twitter.com/kettanaito"
                  focusSize={0.75}
                  aria-label="Twitter profile"
                >
                  <IoLogoTwitter role="img" size={20} />
                </ExternalLink>
              </Box>
            )}
            <Box flex>
              <ExternalLink
                to={`https://github.com/${githubHandle}`}
                focusSize={0.75}
                aria-label="GitHub profile"
              >
                <IoLogoGithub role="img" size={20} />
              </ExternalLink>
            </Box>
          </Box>
        </Box>
      </div>
    </Composition>
  )
}
