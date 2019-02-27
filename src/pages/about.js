import React from 'react'
import styled from 'styled-components'
import { Composition } from 'atomic-layout'

import Layout from '../components/layout'
import SEO from '../components/seo'

const AvatarImage = styled.img`
  margin-right: 1rem;
  display: inline-block;
  border-radius: 50%;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`

const About = () => (
  <Layout>
    <SEO title="About" />
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
          <Avatar
            as={AvatarImage}
            src="https://avatars3.githubusercontent.com/u/14984911?v=4"
            alt="My photo"
            size={125}
          />
          <Content as="p">
            <span role="img" aria-label="Waving hand">
              👋
            </span>
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
