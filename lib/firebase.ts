import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

export const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)

export const providers = {
  googleProvider: new GoogleAuthProvider(),
  githubProvider: new GithubAuthProvider(),
}
