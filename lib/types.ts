import { useProvideAuth } from '@lib/auth'

export type User = {
  uid: string
  email: string | null
  name: string | null
  provider: string
  photoURL: string | null
  token: UserToken
}

export type UserToken = string | null

export type CreateAuthContext = ReturnType<typeof useProvideAuth> | undefined
