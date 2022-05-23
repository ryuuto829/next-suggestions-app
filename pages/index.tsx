import { useRouter } from 'next/router'
import Link from 'next/link'
import { ChevronUpIcon, CommentIcon } from '@primer/octicons-react'
import { Dialog } from '@headlessui/react'

import SortingSelect from '@components/SortingSelect'
import FilterMenu from '@components/FilterMenu'
import { useAuth } from '@lib/auth'

const posts = [
  {
    id: '1',
    title: 'Issue Title',
    topic: '💡 Feature Request',
    upvotes: 10,
    comments: [
      {
        content: 'Content here. Content here.',
        author: 'Anonymous',
        createdAt: new Date(),
      },
      {
        content: 'Other comment',
        author: 'Anonymous',
        createdAt: new Date(),
      },
    ],
  },
]

export default function Home() {
  const router = useRouter()
  const isLogin = router.asPath === '/login'

  const { signInWithGoogle, user } = useAuth()

  console.log(user)

  const handleButtonClick = () => {
    signInWithGoogle()
    // router.push('/', '/login', { shallow: true })
  }

  const handleDialogClose = () => {
    router.push('/', '/', { shallow: true })
  }

  return (
    <>
      <Dialog as="div" open={isLogin} onClose={handleDialogClose}>
        <Dialog.Panel>Login page</Dialog.Panel>
      </Dialog>

      <div className="pt-0 sm:pt-32">
        <div className="absolute top-5 right-5 sm:top-6 sm:right-8">
          <button
            className="rounded w-full bg-[#242837] hover:bg-[#2b3040] py-1.5 px-3 cursor-pointer text-[#B2B8CD] font-medium text-sm"
            onClick={handleButtonClick}
          >
            Sign in / Sign up
          </button>
        </div>
        <main className="bg-[#1E222E] max-w-2xl mx-auto rounded sm:min-h-full min-h-screen">
          <header className="sm:px-16 sm:py-12 px-5 pt-20 pb-11">
            <h1 className="text-xl">📚 Next Suggestions App</h1>
            <p className="text-sm text-gray-200 mt-2">
              Let us know how we can improve. Vote on existing ideas or suggest new ones.
            </p>
          </header>
          <div className="flex justify-between items-center sticky top-0 left-0 bg-[#1E222E] sm:px-16 px-5 py-3">
            <div className="flex justify-between items-center">
              <div className="mr-3">
                <SortingSelect />
              </div>
              <FilterMenu />
            </div>
            <div className="fixed bottom-0 left-0 w-full p-5 sm:p-0 sm:static sm:w-auto">
              <button className="bg-[#4F46E5] py-2 px-4 rounded text-sm w-full hover:bg-[#453fc0]">
                Make suggestion
              </button>
            </div>
          </div>
          <div className="px-5 sm:px-16 sm:py-12 py-8">
            {posts &&
              posts.map((post) => (
                <div
                  key={post.id}
                  className="flex sm:items-center items-start justify-between sm:flex-row flex-col py-4"
                >
                  <Link href={`/posts/${post.id}`}>
                    <div className="cursor-pointer w-full">
                      <div className="flex items-center">
                        <h2 className="font-medium">{post.title}</h2>
                        <span className="mx-1 text-[#B2B8CD]">{`#${post.id}`}</span>
                      </div>
                      <span className="text-sm text-gray-200 mt-2 block">
                        {post.comments[0].content}
                      </span>
                      <div className="flex items-center mt-2.5">
                        <span className="text-xs px-2 py-1 bg-[#242837] hover:bg-[#2b3040] rounded mr-4">
                          {post.topic}
                        </span>
                        <span className="flex items-center text-gray-200 text-sm">
                          <CommentIcon size={16} className="mr-1" />
                          <span>{post.comments.length}</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                  <button className="flex items-center text-gray-200 bg-[#242837] hover:bg-[#2b3040] rounded py-2 px-4">
                    <ChevronUpIcon size={16} className="mr-2" />
                    <span className="text-sm">{post.upvotes}</span>
                  </button>
                </div>
              ))}
          </div>
        </main>
      </div>
    </>
  )
}
