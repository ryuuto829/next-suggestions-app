import Image from 'next/image'
import Link from 'next/link'

import { useAuth } from '@lib/auth'

export default function NavigationBar() {
  const { user, signOut } = useAuth()

  return (
    <div className="absolute top-5 right-5 sm:top-6 sm:right-8">
      {user ? (
        <div className="flex items-center">
          <button
            onClick={signOut}
            className="rounded bg-[color:var(--blue-charcoal-color)] hover:bg-[color:var(--light-blue-charcoal-color)] py-1.5 px-3 cursor-pointer text-[color:var(--dark-gray-charcoal-color)] font-medium text-sm mr-3"
          >
            Sign out
          </button>
          <span className="text-sm font-medium mr-3">{user.name}</span>
          {user.photoURL && (
            <Image
              src={user.photoURL}
              alt="User avatar"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
          )}
        </div>
      ) : (
        <>
          <Link href="/?login=true" as="/login">
            <button className="rounded w-full bg-[color:var(--blue-charcoal-color)] hover:bg-[color:var(--light-blue-charcoal-color)] py-1.5 px-3 cursor-pointer text-[color:var(--dark-gray-charcoal-color)] font-medium text-sm">
              Sign in
            </button>
          </Link>
        </>
      )}
    </div>
  )
}
