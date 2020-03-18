import firebase from './firebase'

export const createPostRef = (postId: string) => {
  return `/posts/${process.env.FIREBASE_CLIENT_ID}/${postId}`
}

export const getPostRef = (postId: string) => {
  return firebase.database().ref(createPostRef(postId))
}

export const getPostLikes = async (postId: string): Promise<number> => {
  const postRef = getPostRef(postId)

  return new Promise((resolve, reject) => {
    postRef.child('likes').once(
      'value',
      (snapshot) => {
        const likesCount = snapshot.val() || 0
        resolve(likesCount)
      },
      reject
    )
  })
}
