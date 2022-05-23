import { useState, createContext, ReactNode, useContext } from 'react'
import { GoogleAuthProvider, signInWithPopup, User as FirebaseUser } from 'firebase/auth'

import { auth } from '@lib/firebase'
import { User, UserToken, CreateAuthContext } from '@lib/types'

const authContext = createContext<CreateAuthContext>(undefined)

export type AuthProviderProps = {
  children?: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export function useAuth() {
  const context = useContext(authContext)

  if (context === undefined) {
    throw new Error('useAuth must be within AuthProvider')
  }

  return context
}

export function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null)

  const handleUser = async (userResponse: FirebaseUser, token: UserToken) => {
    if (userResponse) {
      const user = formatUser(userResponse, token)
      setUser(user)
    } else {
      setUser(null)
    }
  }

  const formatUser = (user: FirebaseUser, token: UserToken) => ({
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoURL: user.photoURL,
    token,
  })

  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider()

    try {
      const result = await signInWithPopup(auth, googleProvider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken || null

      await handleUser(result.user, token)
    } catch (error) {
      setUser(null)
    }
  }

  return { user, signInWithGoogle }
}
