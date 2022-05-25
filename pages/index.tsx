import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { ChevronUpIcon, CommentIcon } from '@primer/octicons-react'

import SortingSelect from '@components/SortingSelect'
import FilterMenu from '@components/FilterMenu'
import NavigationBar from '@components/NavigationBar'
import SigninModal from '@components/SigninModal'
import SuggestionModal from '@components/SuggestionModal'
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
  const isNewPost = router.asPath === '/new-post'

  const { user, signInWithGoogle, signOut } = useAuth()

  const handleSignIn = async () => {
    router.push('/', '/login', { shallow: true })
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle()
    handleModalClose()
  }

  const handleModalClose = () => {
    router.push('/', '/', { shallow: true })
  }

  const handleNewPost = () => {
    router.push('/', '/new-post', { shallow: true })
  }

  return (
    <>
      <Head>
        <title>{isLogin ? 'Sign in | Next Suggestions App' : 'Next Suggestions App'}</title>
      </Head>

      <SigninModal
        isLogin={isLogin}
        handleModalClose={handleModalClose}
        handleSignInWithGoogle={handleSignInWithGoogle}
      />
      <SuggestionModal isOpen={isNewPost} handleModalClose={handleModalClose} />

      <NavigationBar user={user} handleSignOut={handleSignOut} handleSignIn={handleSignIn} />

      <div className="pt-0 sm:pt-32">
        <main className="bg-[color:var(--dark-blue-charcoal-color)] max-w-2xl mx-auto rounded sm:min-h-full min-h-screen">
          <header className="sm:px-16 sm:py-12 px-5 pt-20 pb-11">
            <h1 className="text-xl">📚 Next Suggestions App</h1>
            <p className="text-sm text-gray-200 mt-2">
              Let us know how we can improve. Vote on existing ideas or suggest new ones.
            </p>
          </header>
          <div className="flex justify-between items-center sticky top-0 left-0 bg-[color:var(--dark-blue-charcoal-color)] sm:px-16 px-5 py-3">
            <div className="flex justify-between items-center">
              <div className="mr-3">
                <SortingSelect />
              </div>
              <FilterMenu />
            </div>
            <div className="fixed bottom-0 left-0 w-full p-5 sm:p-0 sm:static sm:w-auto">
              <button
                onClick={handleNewPost}
                className="bg-[color:var(--purple-color)] py-2 px-4 rounded text-sm w-full hover:bg-[#453fc0]"
              >
                Make suggestion
              </button>
            </div>
          </div>
          <div className="px-5 sm:px-16 sm:py-8 py-6">
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
                        <span className="mx-2 text-[color:var(--dark-gray-charcoal-color)]">{`#${post.id}`}</span>
                      </div>
                      <span className="text-sm text-gray-200 mt-2 block">
                        {post.comments[0].content}
                      </span>
                      <div className="flex items-center mt-2.5">
                        <span className="text-xs px-2 py-1 bg-[color:var(--blue-charcoal-color)] hover:bg-[color:var(--light-blue-charcoal-color)] rounded mr-4">
                          {post.topic}
                        </span>
                        <span className="flex items-center text-[color:var(--dark-gray-charcoal-color)] text-sm">
                          <CommentIcon size={16} className="mr-1" />
                          <span>{post.comments.length}</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                  <button className="flex items-center text-gray-200 bg-[color:var(--blue-charcoal-color)] hover:bg-[color:var(--light-blue-charcoal-color)] rounded py-2 px-4 mt-3 sm:mt-0">
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
