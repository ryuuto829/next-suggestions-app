import { useProvideAuth } from '@lib/auth'

/**
 * User authentication
 */

export type User = {
  uid: string
  email: string | null
  name: string | null
  provider: string
  photoURL: string | null
  role: 'admin' | 'test' | null
} | null

export type CreateAuthContext = ReturnType<typeof useProvideAuth> | undefined

/**
 * Suggestion post & upvotes
 */

export type Post = {
  id: string
  authorId: string
  author: string
  authorPhotoURL: string
  title: string
  content: string
  status: 'active' | 'archived'
  createdAt: string
  topic: string
  upvoteCount: number
}

export type Upvotes = { [uid: string]: true }[] | undefined

/**
 * Other
 */

export type SortingName = 'Recent' | 'Most voted'
