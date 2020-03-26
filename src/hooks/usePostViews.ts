import { useEffect } from 'react'
import { getPostRef } from '../database/postUtils'

export const usePostViews = (postId: string, postTitle: string) => {
  useEffect(() => {
    async function incrementViews() {
      const postRef = getPostRef(postId)

      postRef
        .transaction((post) => {
          if (!post) {
            post = {
              title: postTitle,
              views: 0,
            }
          }

          if (!post.title) {
            post.title = postTitle
          }

          if (!post.views) {
            post.views = 0
          }

          post.views++
          return post
        })
        .catch(console.error)
    }

    incrementViews()
  }, [postId])
}
