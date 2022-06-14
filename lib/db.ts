import {
  doc,
  collection,
  setDoc,
  addDoc,
  increment,
  writeBatch,
  deleteField,
} from 'firebase/firestore'

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
