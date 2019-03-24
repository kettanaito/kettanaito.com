import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { Box } from 'atomic-layout'

import Layout from '../components/layout'
import MdxProvider from '../components/mdx/MdxProvider'
import Share from '../components/Share'
import Seo from '../components/seo'
import Text from '../components/Text'

const PostTitle = styled.h1`
  @media (min-width: 576px) {
    text-align: center;
  }
`

const MetaDelimiter = () => (
  <Box as="span" paddingHorizontal={10} paddingHorizontalMd={16}>
    ·
  </Box>
)

function BlogPost(props) {
  const { location, data } = props
  const { post } = data
  const { frontmatter, timeToRead } = post
  const { draft, date, category } = frontmatter

  return (
    <MdxProvider>
      <Layout>
        <Seo
          type="article"
          title={frontmatter.title}
          description={frontmatter.description}
          keywords={frontmatter.keywords}
          image={frontmatter.image.childImageSharp.ogImage.src}
          meta={
            // Exclude drafts from being indexed by search engines
            draft && {
              name: 'robots',
              content: 'noindex,nofollow',
            }
          }
        />
        <div>
          <Box
            as="header"
            flex
            flexDirection="column"
            alignItems="center"
            marginBottom={32}
            marginBottomMd={64}
          >
            <PostTitle>{frontmatter.title}</PostTitle>
            <Box as="p" flex alignItems="center">
              <Text primary>{category}</Text>
              <Box as={Text} muted flex alignItems="center">
                <MetaDelimiter />
                {date}
                <MetaDelimiter />
                {timeToRead} minutes(s) read
              </Box>
            </Box>
          </Box>

          <Image
            fluid={frontmatter.image.childImageSharp.fluid}
            alt={frontmatter.title}
          />

          <Box as="article" padding={16} paddingMd={32}>
            <MDXRenderer>{post.code.body}</MDXRenderer>
          </Box>

          <Box paddingTop={32} paddingHorizontal={16} paddingHorizontalMd={32}>
            <Share title={frontmatter.title} url={location.href} />
          </Box>
        </div>
      </Layout>
    </MdxProvider>
  )
}

export const query = graphql`
  query SinglePostQuery($slug: String!) {
    post: mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
        category
        image {
          childImageSharp {
            fluid(maxWidth: 786, quality: 95) {
              ...GatsbyImageSharpFluid
            }
            ogImage: fluid(maxWidth: 1200, quality: 95) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      timeToRead
      code {
        body
      }
    }
  }
`

export default BlogPost
