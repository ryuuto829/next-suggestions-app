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
