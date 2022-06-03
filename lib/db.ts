import { doc, collection, setDoc, getDocs, query, where } from 'firebase/firestore'

import { db } from '@lib/firebase'
import { User, Post } from '@lib/types'

export const createUser = async (uid: string, data: User) => {
  await setDoc(doc(db, 'users', uid), { uid, ...data }, { merge: true })
}

export const getAllPosts = async () => {
  const querySnapshot = query(collection(db, 'posts'), where('status', '==', 'active'))
  const snapshot = await getDocs(querySnapshot)

  const posts = [] as Post[]

  snapshot.forEach((post) => {
    const postData = post.data() as Post
    posts.push({ id: post.id, ...postData })
  })

  return posts
}
