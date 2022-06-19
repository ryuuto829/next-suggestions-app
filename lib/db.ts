import {
  doc,
  collection,
  setDoc,
  addDoc,
  getDoc,
  increment,
  writeBatch,
  deleteField,
  deleteDoc,
} from 'firebase/firestore'
import Router from 'next/router'

import { User, Post } from '@lib/types'
import { db } from '@lib/firebase'

export const createUser = async (uid: string, data: User) => {
  return await setDoc(doc(db, 'users', uid), { uid, ...data }, { merge: true })
}

export const createPost = async (data: Post) => {
  const postsRef = collection(db, 'posts')
  const postRef = await addDoc(postsRef, data)

  return await setDoc(postRef, { ...data, id: postRef.id })
}

export const addUpvote = async (postID: string, uid: string) => {
  const batch = writeBatch(db)
  const postRef = doc(db, 'posts', postID)
  const upvotesRef = doc(db, 'upvotes', uid)

  batch.update(postRef, { upvoteCount: increment(1) })
  batch.set(upvotesRef, { [postID]: true }, { merge: true })

  await batch.commit()
}

export const removeUpvote = async (postId: string, uid: string) => {
  const batch = writeBatch(db)
  const postRef = doc(db, 'posts', postId)
  const upvotesRef = doc(db, 'upvotes', uid)

  batch.update(postRef, { upvoteCount: increment(-1) })
  batch.update(upvotesRef, { [postId]: deleteField() })

  await batch.commit()
}

export const removePost = async (postId: string) => {
  const postRef = doc(db, 'posts', postId)
  await deleteDoc(postRef)

  Router.push('/')
}

export const getUserRole = async (uid: string | undefined) => {
  if (!uid) return null

  const rolesRef = doc(db, 'roles', uid)
  const userRoleSnapshot = await getDoc(rolesRef)

  if (userRoleSnapshot.exists()) {
    return userRoleSnapshot.data()?.role
  }

  return null
}
