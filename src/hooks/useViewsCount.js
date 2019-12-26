import { useState } from 'react'
import { useFirebase } from 'gatsby-plugin-firebase'

export const useViewsCount = (post, shouldIncrement = false) => {
  const [viewsCount, setViewsCount] = useState(null)
  const [loading, setLoading] = useState(true)

  useFirebase(
    (firebase) => {
      if (post == null) {
        setLoading(false)
        return
      }

      async function syncViewsCount() {
        const postRef = firebase.database().ref(`posts/${post.id}`)

        const viewsSnapshot = await postRef.child('views').once('value')
        const viewsCount = viewsSnapshot.val() || 0
        const nextViewsCount = viewsCount + Number(shouldIncrement)
        setViewsCount(nextViewsCount)

        if (shouldIncrement) {
          postRef.update({
            title: post.frontmatter.title,
            views: nextViewsCount,
          })
        }

        setLoading(false)
      }

      syncViewsCount()
    },
    [post.id, post.frontmatter]
  )

  return { loading, viewsCount }
}
