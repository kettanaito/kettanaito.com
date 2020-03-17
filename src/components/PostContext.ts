import { createContext } from 'react'

export const PostContext = createContext({
  hasLike: false,
  markLiked: (postId: string) => null,
})
