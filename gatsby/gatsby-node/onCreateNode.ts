import { GatsbyNode } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  getNode,
  actions,
}) => {
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
