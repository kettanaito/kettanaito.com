import path from 'path'
import { GatsbyNode } from 'gatsby'

export const createPages: GatsbyNode['createPages'] = ({
  actions,
  graphql,
}) => {
  const { createPage } = actions
  const singlePostTemplate = path.resolve(
    __dirname,
    '../../src/templates/singlePost.tsx'
  )

  return new Promise((resolve, reject) => {
    resolve(
      graphql<any>(`
        {
          allMdx {
            edges {
              node {
                id
                fields {
                  url
                  slug
                }
                frontmatter {
                  title
                  category
                }
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          console.log(result.errors)
          return reject(result.errors)
        }

        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.url,
            component: singlePostTemplate,
            context: {
              postId: node.id,
              postCategory: node.frontmatter.category,
              slug: node.fields.slug,
              // additional data can be passed via context
            },
          })
        })
      })
    )
  })
}
