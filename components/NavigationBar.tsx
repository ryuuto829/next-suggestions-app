import Image from 'next/image'
import { User } from '@lib/types'

export type NavigationBarProps = {
  user: User
  handleSignInWithGoogle: () => Promise<void>
  handleSignOut: () => Promise<void>
}

export default function NavigationBar({
  user,
  handleSignInWithGoogle,
  handleSignOut,
}: NavigationBarProps) {
  return (
    <div className="absolute top-5 right-5 sm:top-6 sm:right-8">
      {user ? (
        <div className="flex items-center">
          <button onClick={handleSignOut}>Sign out</button>
          <span>{user.name}</span>
          {user.photoURL && <Image src={user.photoURL} alt="User avatar" width={40} height={40} />}
        </div>
      ) : (
        <button
          className="rounded w-full bg-[#242837] hover:bg-[#2b3040] py-1.5 px-3 cursor-pointer text-[#B2B8CD] font-medium text-sm"
          onClick={handleSignInWithGoogle}
        >
          Sign in / Sign up
        </button>
      )}
    </div>
  )
}
