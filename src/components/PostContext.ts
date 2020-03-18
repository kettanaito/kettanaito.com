import { createContext } from 'react'

export const PostContext = createContext({
  likesCount: 0,
  hasLike: false,
  markLiked: (postId: string) => null,
})
