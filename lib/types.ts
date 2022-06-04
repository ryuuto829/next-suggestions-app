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
} | null

export type CreateAuthContext = ReturnType<typeof useProvideAuth> | undefined

/**
 * Suggestion posts
 */
export type Post = {
  id: string
  authorId: string
  autor: string
  title: string
  content: string
  status: 'active' | 'archived'
  createdAt: string
  topic: string
  comments: Comment[]
}

export type Comment = {
  content: string
  author: string
  authorId: string
  createdAt: Date
}
