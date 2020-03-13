import React from 'react'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Container from '../components/Container'
import { PostGrid } from '../components/PostGrid'

const PrivacyPolicy = ({ data }) => (
  <Layout>
    <SEO
      title="Privacy policy"
      useTitleTemplate
      description="Open letter regarding privacy on the Redd Developer site."
    />
    <Container paddingVertical={2} paddingVerticalMd={4}>
      <PostGrid>
        <h1>Privacy policy</h1>
        <p>
          As a fellow developer, and as a human being, I value and respect
          privacy on the Internet. I work hard on the content published on this
          blog, and it's important for me to see which topics you like, and what
          needs improvement. To do so, this website uses Google Analytics to
          gather <em>anonymous</em> statistics about your usage of the website.
        </p>

        <h2>What data is being collected?</h2>
        <p>During the usage of this website the following data is collected:</p>
        <ul>
          <li>Amount of page visits</li>
          <li>Country of the visitor</li>
        </ul>

        <blockquote>
          Use VPN or other anonymizers if you don't wish to share the
          information above. I have no issue with it and respect your privacy
          decisions.
        </blockquote>

        <hr />

        <p>By using this resource you agree to its Privacy Policy.</p>
      </PostGrid>
    </Container>
  </Layout>
)

export default PrivacyPolicy
