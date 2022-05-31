import { doc, setDoc } from 'firebase/firestore'

import { db } from '@lib/firebase'
import { User } from '@lib/types'

export const createUser = async (uid: string, data: User) => {
  await setDoc(doc(db, 'users', uid), { uid, ...data }, { merge: true })
}
