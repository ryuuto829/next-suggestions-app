import { compareDesc, parseISO } from 'date-fns'
import { doc, collection, setDoc, addDoc, getDocs, query, where } from 'firebase/firestore'

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
  return await addDoc(collection(db, 'posts'), data)
}
