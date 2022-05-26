import { useState, useEffect, createContext, ReactNode, useContext } from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth'

import { auth } from '@lib/firebase'
import { User, CreateAuthContext } from '@lib/types'

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
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  const handleUser = async (userRaw: FirebaseUser | null) => {
    if (userRaw) {
      const user = formatUser(userRaw)

      setUser(user)
      setLoading(false)

      return user
    } else {
      setUser(null)
      setLoading(false)

      return null
    }
  }

  const formatUser = (user: FirebaseUser) => ({
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoURL: user.photoURL,
  })

  useEffect(() => {
    // Persist the current user
    const unsubscribe = onAuthStateChanged(auth, handleUser)

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    setLoading(true)
    const googleProvider = new GoogleAuthProvider()

    const response = await signInWithPopup(auth, googleProvider)
    await handleUser(response.user)
  }

  const signOut = async () => {
    setLoading(true)
    await auth.signOut()
    await handleUser(null)
  }

  return { user, loading, signInWithGoogle, signOut }
}
