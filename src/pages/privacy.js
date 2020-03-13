import React from 'react'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Container from '../components/Container'

const PrivacyPolicy = ({ data }) => (
  <Layout>
    <SEO
      title="Privacy policy"
      useTitleTemplate
      description="Open letter regarding privacy on the Redd Developer site."
    />
    <Container paddingVertical={2} paddingVerticalMd={4}>
      <h1>Privacy policy</h1>
      <p>
        As a fellow developer, and as a human being, I value and respect privacy
        on the Internet. I work hard on the content published on this blog, and
        it's important for me to see the your feedback in a form of view
        statistics.
      </p>
      <p>
        This site uses Google Analytics to gather <i>anonymous</i> statistics
        about page visits to produce relevant reports. I later use that
        statistics to evaluate effectiveness of promotion campaigns and content
        relevance to my audience. Thank you for understanding and for your
        contribution to improve my blog!
      </p>

      <h2>Which data is being collected?</h2>
      <ul>
        <li>Amount of page visits</li>
        <li>Country of the visitor</li>
      </ul>

      <blockquote>
        Use VPN or other anonymizers if you don't wish to share the information
        above. I have no issue with it and respect your privacy decisions.
      </blockquote>

      <hr />

      <p>
        By continuing to use this resource you agree to its Privacy Policy.
        Enjoy reading.
      </p>
    </Container>
  </Layout>
)

export default PrivacyPolicy
