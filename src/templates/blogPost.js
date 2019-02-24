import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Box } from 'atomic-layout'

import Layout from '../components/layout'
import Text from '../components/Text'

const StyledBox = styled(Box)`
  background-color: #fff;
`

function BlogPost(props) {
  const { markdownRemark: post } = props.data
  const { frontmatter, timeToRead } = post
  const { date } = frontmatter

  return (
    <Layout>
      <StyledBox padding={32}>
        <h1>{frontmatter.title}</h1>
        <Text as="p" small muted>
          {date} · {timeToRead} minutes(s) read
        </Text>
        <hr />
        <article dangerouslySetInnerHTML={{ __html: post.html }} />
      </StyledBox>
    </Layout>
  )
}

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
      }
      timeToRead
    }
  }
`

export default BlogPost
