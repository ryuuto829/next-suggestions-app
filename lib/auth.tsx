import { useState, useEffect, createContext, ReactNode, useContext } from 'react'
import Router from 'next/router'
import {
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth'

import { User, CreateAuthContext } from '@lib/types'
import { auth, providers } from '@lib/firebase'
import { createUser, getUserRole } from '@lib/db'

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
      const user = await formatUser(userRaw)

      await createUser(user.uid, user)

      setUser(user)
      setLoading(false)

      return user
    } else {
      setUser(null)
      setLoading(false)

      return null
    }
  }

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

    try {
      const response = await signInWithPopup(auth, providers.googleProvider)
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

    try {
      const response = await signInWithPopup(auth, providers.githubProvider)
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

  const signInWithDemo = async (redirect?: string) => {
    setLoading(true)

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        'testuser@example.com',
        'suggest1ons1234',
      )

      await updateProfile(response.user, { displayName: 'Jane Q. User', photoURL: null })
      await handleUser(response.user)
    } catch (error) {
      handleUser(null)
    }

    if (redirect) {
      Router.push(redirect)
    }
  }

  return { user, loading, signInWithGoogle, signInWithGithub, signOut, signInWithDemo }
}

const formatUser = async (user: FirebaseUser) => {
  const uid = auth.currentUser?.uid

  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoURL: user.photoURL,
    role: await getUserRole(uid),
  }
}
