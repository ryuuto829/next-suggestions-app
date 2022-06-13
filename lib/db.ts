import { compareDesc, parseISO } from 'date-fns'
import {
  doc,
  collection,
  setDoc,
  addDoc,
  getDocs,
  query,
  where,
  increment,
  writeBatch,
  deleteField,
} from 'firebase/firestore'

import { User, Post } from '@lib/types'
import { db } from '@lib/firebase'

export const createUser = async (uid: string, data: User) => {
  return await setDoc(doc(db, 'users', uid), { uid, ...data }, { merge: true })
}

export const getAllPosts = async () => {
  try {
    const querySnapshot = query(collection(db, 'posts'), where('status', '==', 'active'))
    const snapshot = await getDocs(querySnapshot)

    const posts = [] as Post[]

    snapshot.forEach((post) => {
      const postData = post.data() as Post
      posts.push({ ...postData, id: post.id })
    })

    posts.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))

    return { posts }
  } catch (error) {
    return { error }
  }
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
