/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')
const { createFilePath, createFileNode } = require('gatsby-source-filesystem')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve('src/templates/blogPost.js')

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allMarkdownRemark {
            edges {
              node {
                fields {
                  url
                  slug
                }
                frontmatter {
                  title
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
        const blogTemplate = path.resolve('./src/templates/blogPost.js')

        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.url,
            component: blogTemplate,
            context: {
              slug: node.fields.slug,
            }, // additional data can be passed via context
          })
        })

        return
      })
    )
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const postSlug = createFilePath({ node, getNode, basePath: 'pages' })

    createNodeField({
      node,
      name: 'slug',
      value: postSlug,
    })

    createNodeField({
      node,
      name: 'url',
      value: path.normalize(`posts/${postSlug}`),
    })
  }
}
