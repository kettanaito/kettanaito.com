import { useState } from 'react'
import { useFirebase } from 'gatsby-plugin-firebase'

export const useViewsCount = (post, shouldIncrement = false) => {
  const [viewsCount, setViewsCount] = useState(null)
  const [loading, setLoading] = useState(true)

  useFirebase(
    (firebase) => {
      // Forbid views reading and updating during development
      // to prevent distorting the stats while writing a post.
      if (process.env.NODE_ENV !== 'production' || post == null) {
        setLoading(false)
        return
      }

      async function syncViewsCount() {
        const postRef = firebase
          .database()
          .ref(`posts/${process.env.GATSBY_FIREBASE_CLIENT_ID}/${post.id}`)

        const viewsSnapshot = await postRef.child('views').once('value')
        const viewsCount = viewsSnapshot.val() || 0
        const nextViewsCount = viewsCount + Number(shouldIncrement)

        const updatePromise = shouldIncrement
          ? postRef.update({
              title: post.frontmatter.title,
              views: nextViewsCount,
            })
          : Promise.resolve()

        updatePromise.then(() => {
          // Update views count only after successful increment, if applicable.
          setViewsCount(nextViewsCount)
          setLoading(false)
        })
      }

      syncViewsCount()
    },
    [post.id, post.frontmatter]
  )

  return { loading, viewsCount }
}
