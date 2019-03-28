/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')
const { createFilePath, createFileNode } = require('gatsby-source-filesystem')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const singlePostTemplate = path.resolve('src/templates/singlePost.js')

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
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
      `).then(result => {
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

        return
      })
    )
  })
}

// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage, deletePage } = actions

//   deletePage(page)
//   createPage({
//     ...page,
//     context: {
//       url: '???'
//     }
//   })
// }

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (['mdx'].includes(node.internal.type.toLowerCase())) {
    const postSlug = createFilePath({
      node,
      getNode,
      basePath: 'pages',
      trailingSlash: false,
    })

    createNodeField({
      node,
      name: 'slug',
      value: postSlug,
    })

    createNodeField({
      node,
      name: 'url',
      value: `blog/${postSlug}`.replace(/\/+/g, '/'),
    })
  }
}
