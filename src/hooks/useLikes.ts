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

    postRef.child('likes').on('value', (snapshot) => {
      // Subscribe to likes change
      setLikesCount(snapshot.val() || 0)
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

        if (!post.likes) {
          post.likes = likesCount
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
