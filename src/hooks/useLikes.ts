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
      getLikesCount()
    },
    [postId]
  )

  const addLike = useCallback<() => Promise<void>>(() => {
    if (hasLike) {
      return
    }

    const nextLikesCount = likesCount + 1

    return postRef
      .update({
        likes: nextLikesCount,
      })
      .then(() => {
        setLikesCount(nextLikesCount)
        markLiked(postId)
      })
  }, [postRef, hasLike, likesCount, postId, markLiked])

  return { hasLike, likesCount, addLike }
}
