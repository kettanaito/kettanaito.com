import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { Box } from 'atomic-layout'

import Layout from '../components/layout'
import MdxProvider from '../components/mdx/MdxProvider'
import Share from '../components/Share'
import Seo from '../components/seo'
import Text from '../components/Text'
import { Wrapper as ContentWrapper } from '../components/PostList/PostThumbnail'

function BlogPost(props) {
  const { location, data } = props
  const { mdx: post } = data
  const { frontmatter, timeToRead } = post
  const { draft, date, category } = frontmatter

  return (
    <MdxProvider>
      <Layout>
        <Seo
          title={frontmatter.title}
          description={frontmatter.description}
          keywords={frontmatter.keywords}
          meta={
            draft && {
              name: 'robots',
              content: 'noindex,nofollow',
            }
          }
        />
        <div>
          <ContentWrapper>
            <Image
              fluid={frontmatter.image.childImageSharp.fluid}
              alt={frontmatter.title}
            />
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
              <MDXRenderer>{post.code.body}</MDXRenderer>
              <article dangerouslySetInnerHTML={{ __html: post.html }} />
            </Box>
          </ContentWrapper>
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
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
        category
        image {
          childImageSharp {
            # resize(width: 500, height: 500) {
            #   src
            # }
            fluid(maxWidth: 786) {
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
