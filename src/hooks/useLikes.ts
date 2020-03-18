import { useState, useCallback, useContext } from 'react'
import { useFirebase } from 'gatsby-plugin-firebase'
import { PostContext } from '../components/PostContext'

const { GATSBY_FIREBASE_CLIENT_ID } = process.env

export const useLikes = (postId: string) => {
  const { hasLike, markLiked } = useContext(PostContext)
  const [postRef, setPostRef] = useState(null)
  const [likesCount, setLikesCount] = useState<number>(null)

  useFirebase(
    (firebase) => {
      const getLikesCount = async () => {
        const postRef = firebase
          .database()
          .ref(`/posts/${GATSBY_FIREBASE_CLIENT_ID}/${postId}`)
        setPostRef(postRef)

        postRef.child('likes').on('value', (likesSnapshot) => {
          const likesCount = likesSnapshot.val() || 0
          setLikesCount(likesCount)
        })
      }

      // Subscribe to likes count in real time
      getLikesCount()
    },
    [postId]
  )

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
