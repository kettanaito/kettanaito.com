import { useState, useEffect, useCallback, useContext } from 'react'
import { getPostRef } from '../database/postUtils'
import { PostContext } from '../components/PostContext'

export const useLikes = (postId: string) => {
  const { likesCount: initialLikesCount, hasLike, markLiked } = useContext(
    PostContext
  )
  const [postRef, setPostRef] = useState<ReturnType<typeof getPostRef>>(null)
  const [likesCount, setLikesCount] = useState<number>(initialLikesCount)

  useEffect(() => {
    const postRef = getPostRef(postId)
    setPostRef(postRef)

    // Subscribe to likes change
    postRef.child('likes').on('value', (snapshot) => {
      const likesCount = snapshot.val() || 0
      setLikesCount(likesCount)
    })
  }, [postId])

  const addLike = useCallback<() => Promise<void>>(() => {
    if (hasLike) {
      return
    }

    /**
     * Use Firebase transactions to modify concurrently changing data.
     * @see https://firebase.google.com/docs/reference/js/firebase.database.Reference#transaction
     */
    return postRef.transaction(
      (post) => {
        if (!post) {
          post = {
            likes: likesCount,
          }
        }

        post.likes++
        return post
      },
      (error) => {
        if (error) {
          console.error(error)
          return
        }

        markLiked(postId)
      }
    )
  }, [postRef, hasLike, likesCount, postId, markLiked])

  return { hasLike, likesCount, addLike }
}
