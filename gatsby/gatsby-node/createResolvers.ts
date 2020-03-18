import { GatsbyNode } from 'gatsby'
import { getPostLikes } from '../../src/database/postUtils'

export const createResolvers: GatsbyNode['createResolvers'] = ({
  createResolvers,
}) => {
  const resolvers = {
    MdxFrontmatter: {
      likesCount: {
        type: 'Int',
        resolve(source) {
          if (!source.id) {
            throw new Error(
              `Cannot resolve "likesCount" field for a post without "id"`
            )
          }

          console.log('fetching likes for %s', source.id)
          return getPostLikes(source.id)
        },
      },
    },
  }

  return createResolvers(resolvers)
}
