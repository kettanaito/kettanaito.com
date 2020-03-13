import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { Composition } from 'atomic-layout'
import Container from './Container'
import Text from './Text'
import { ShareInFacebook, ShareInTwitter, ShareInReddit } from './SocialLinks'

const GET_WEBSITE_DETAILS = graphql`
  query GetWebsiteDetails {
    site {
      siteMetadata {
        siteUrl
        title
        author
      }
    }
  }
`

const PageShareContainer = styled.section`
  border-top: 1px solid #e9ecf3;
`

const Heading = styled.h2`
  margin-top: 0;
`

interface PageShareProps {
  url: string
}

export const PageShare: React.FC<PageShareProps> = ({ url }) => {
  const data = useStaticQuery(GET_WEBSITE_DETAILS)
  const { siteUrl, title, author } = data.site.siteMetadata

  return (
    <PageShareContainer>
      <Container>
        <Composition
          templateColsMd="repeat(2, 1fr)"
          alignItems="center"
          paddingVertical={5}
          gap={4}
        >
          <div>
            <Heading>Enjoyed reading?</Heading>
            <Text lead>
              This is an uncommercial blog. The only goal it has is spreading
              knowledge. Please, consider sharing this with your friends.{' '}
              <strong>Thank you</strong>.
            </Text>
          </div>
          <Composition
            inline
            templateCols="repeat(3, 64px)"
            gap={1.5}
            justifyContent="flex-end"
            justifyMdDown="center"
          >
            <ShareInTwitter
              url={siteUrl}
              title={`So I've found this blog and it's awesome! Check out Redd Developer by ${author}`}
              hashtags={['redd', 'blog', 'javascript', 'programming']}
            />
            <ShareInFacebook url={siteUrl} />
            <ShareInReddit url={siteUrl} title={title} />
          </Composition>
        </Composition>
      </Container>
    </PageShareContainer>
  )
}
