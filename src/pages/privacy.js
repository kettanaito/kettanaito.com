import React from 'react'

import SEO from '../components/seo'
import Layout from '../components/layout'

const PrivacyPolicy = ({ data }) => (
  <Layout>
    <SEO
      title="Privacy policy"
      description="Find out about the mission and the people behind Redd Developer project."
    />
    <h1>Privacy policy</h1>
    <p>
      As a fellow developer, and as a human being, I value and respect privacy
      on the Internet.
    </p>
    <p>
      This site uses Google Analytics to gather <i>anonymous</i> statistics
      about page visits to produce relevant reports. I later use that statistics
      to evaluate effectiveness of promotion campaigns and content relevance to
      my audience. I am thankful for your contribution to improving my blog!
    </p>
  </Layout>
)

export default PrivacyPolicy
