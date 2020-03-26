import firebase from './firebase'

const { FIREBASE_CLIENT_ID } = process.env

export const createPostRef = (postId: string) => {
  return `/posts/${FIREBASE_CLIENT_ID}/${postId}`
}

export const getPostRef = (postId: string) => {
  return firebase.database().ref(createPostRef(postId))
}
