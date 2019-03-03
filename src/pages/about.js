import React from 'react'
import styled from 'styled-components'
import { Composition } from 'atomic-layout'

import AvatarImageSrc from '../images/me-dark.jpg'
import Layout from '../components/layout'
import SEO from '../components/seo'

const AvatarImage = styled.img`
  margin-right: 1rem;
  display: inline-block;
  border-radius: 50%;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
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
      to share knowledge. No disclaimers, no tracking. Blogging as it makes
      sense to me.
    </p>
    <h2>Behind the effort</h2>
    <Composition
      template={`
      avatar
      content
    `}
      templateMd="avatar content"
      gutter={16}
      alignItems="center"
      justifyItems="center"
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
  </Layout>
)

export default About
