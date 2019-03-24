import React from 'react'
import styled from 'styled-components'
import { Box, Composition } from 'atomic-layout'
import { IoLogoTwitter, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io'

import AvatarImageSrc from '../images/me-light.jpg'
import Layout from '../components/layout'
import Text from '../components/Text'
import SEO from '../components/seo'

const AvatarImage = styled.img`
  margin-right: 1rem;
  display: inline-block;
  border-radius: 50%;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`

const ContactsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    margin: 0;
  }
`

const About = ({ data }) => (
  <Layout>
    <SEO
      title="About"
      description="Find out about the mission and the people behind Redd Developer project."
    />
    <h1>About</h1>
    <p>
      This is a personal uncommercial blog on a mission to create a safe place
      to share knowledge. No full-screen disclaimers or ads. Blogging as it
      makes sense to me.
    </p>

    <h2>Behind the effort</h2>
    <Composition
      template={`
      avatar
      content
    `}
      templateMd="avatar content"
      gutter={10}
      alignItems="center"
      justifyItems="center"
      marginBottom={32}
    >
      {({ Avatar, Content }) => (
        <>
          <Avatar>
            <AvatarImage src={AvatarImageSrc} alt="My photo" size={125} />
          </Avatar>
          <Content as="p">
            <span role="img" aria-label="Waving hand">
              👋
            </span>{' '}
            My name is Artem, and I'm a Full-stack developer from Ukraine. I've
            been programming since I was 12, and it has become my occupation a
            few years ago. Now I build applications in React, Redux and GraphQL,
            and indulge vastly in Open Source.
          </Content>
        </>
      )}
    </Composition>

    <h2>Contacts</h2>
    <Composition
      as={ContactsList}
      templateColsSm="repeat(3, 1fr)"
      gutter={16}
      alignItems="center"
    >
      <Box as="li">
        <Box flex alignItems="center">
          <IoLogoGithub size={48} fill="#171515" />
          <Box marginLeft={10}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/kettanaito"
            >
              GitHub
            </a>
            <Text as="p" small muted>
              kettanaito
            </Text>
          </Box>
        </Box>
      </Box>
      <Box as="li">
        <Box flex alignItems="center">
          <IoLogoTwitter size={48} fill="#2AA3EF" />
          <Box marginLeft={10}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/kettanaito"
            >
              Twitter
            </a>
            <Text as="p" small muted>
              @kettanaito
            </Text>
          </Box>
        </Box>
      </Box>
      <Box as="li">
        <Box flex alignItems="center">
          <IoLogoLinkedin size={48} fill="#1074B0" />
          <Box marginLeft={10}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/artem-zakharchenko"
            >
              LinkedIn
            </a>
          </Box>
        </Box>
      </Box>
    </Composition>
  </Layout>
)

export default About
