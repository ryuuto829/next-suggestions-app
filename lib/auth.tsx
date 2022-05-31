import { useState, useEffect, createContext, ReactNode, useContext } from 'react'
import Router from 'next/router'
import {
  GoogleAuthProvider,
  GithubAuthProvider,
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

  const handleClosedPopup = async (errorCode: string) => {
    if (errorCode === 'auth/popup-closed-by-user') {
      await handleUser(null)
    }
  }

  useEffect(() => {
    // Persist the current user
    const unsubscribe = onAuthStateChanged(auth, handleUser)

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signInWithGoogle = async (redirect?: string) => {
    setLoading(true)
    const googleProvider = new GoogleAuthProvider()

    try {
      const response = await signInWithPopup(auth, googleProvider)
      await handleUser(response.user)
    } catch (error: any) {
      handleClosedPopup(error.code)
    }

    if (redirect) {
      Router.push(redirect)
    }
  }

  const signInWithGithub = async (redirect?: string) => {
    setLoading(true)
    const githubProvider = new GithubAuthProvider()

    try {
      const response = await signInWithPopup(auth, githubProvider)
      await handleUser(response.user)
    } catch (error: any) {
      handleClosedPopup(error.code)
    }

    if (redirect) {
      Router.push(redirect)
    }
  }

  const signOut = async () => {
    Router.push('/')

    await auth.signOut()
    await handleUser(null)
  }

  return { user, loading, signInWithGoogle, signInWithGithub, signOut }
}
