import React from 'react'
import { graphql } from 'gatsby'
import { Box } from 'atomic-layout'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Text from '../components/Text'
import { Wrapper as ContentWrapper } from '../components/PostThumbnail'

function BlogPost(props) {
  const { markdownRemark: post } = props.data
  const { frontmatter, timeToRead } = post
  const { date, category } = frontmatter

  return (
    <Layout>
      <Seo
        title={frontmatter.title}
        description={frontmatter.description}
        keywords={frontmatter.keywords}
      />
      <ContentWrapper>
        <Box padding={16} paddingMd={32}>
          <h1>{frontmatter.title}</h1>
          <Text as="p">
            <Text primary>{category}</Text>
            <Text muted>
              {' '}
              · {date} · {timeToRead} minutes(s) read
            </Text>
          </Text>
          <hr />
          <article dangerouslySetInnerHTML={{ __html: post.html }} />
        </Box>
      </ContentWrapper>
    </Layout>
  )
}

export const query = graphql`
  query SinglePostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
        category
      }
      timeToRead
    }
  }
`

export default BlogPost
