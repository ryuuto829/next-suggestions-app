import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ChevronUpIcon, CommentIcon } from '@primer/octicons-react'

import SortingSelect from '@components/SortingSelect'
import FilterMenu from '@components/FilterMenu'
import NavigationBar from '@components/NavigationBar'
import SigninModal from '@components/SigninModal'
import SuggestionModal from '@components/SuggestionModal'
import PostModal from '@components/PostModal'
import { useAuth } from '@lib/auth'
import { decorateLink } from '@utils/decorateLink'

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
  const { user, loading, signInWithGoogle } = useAuth()

  const isLogin = router.query.login === ''
  const isNewPost = router.query['new-post'] === ''
  const isPostView = router.query.post !== undefined

  const handleModalClose = () => {
    router.push('/')
  }

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle('/')
    handleModalClose()
  }

  const handleRouteChange = () => {
    // 1. Redirect user to the main route if authenticated
    if (isLogin && user) {
      return router.push('/')
    }

    // 2. Redirect user to the login route if unauthenticated
    if (isNewPost && !user) {
      return router.push('/?login', '/login')
    }

    // 3. Replace url pathname with custom link decorator that uses no query, like: '?post=1' -> '/post/1'
    if (isLogin || isNewPost || isPostView) {
      return router.replace(router.asPath, decorateLink(router.asPath, router.query), {
        shallow: true,
      })
    }
  }

  useEffect(() => {
    if (loading) return

    handleRouteChange()
  }, [user, loading])

  return (
    <>
      {!loading && (
        <>
          <SigninModal
            isOpen={isLogin}
            handleModalClose={handleModalClose}
            handleSignInWithGoogle={handleSignInWithGoogle}
          />
          <SuggestionModal isOpen={isNewPost} handleModalClose={handleModalClose} />
          <PostModal isOpen={isPostView} handleModalClose={handleModalClose} />
          <NavigationBar />
        </>
      )}

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
              <Link href={user ? '/?new-post' : '/?login'} as={user ? '/new-post' : '/login'}>
                <button className="bg-[color:var(--purple-color)] py-2 px-4 rounded text-sm w-full hover:bg-[#453fc0]">
                  Make suggestion
                </button>
              </Link>
            </div>
          </div>
          <div className="px-5 sm:px-16 sm:py-8 py-6">
            {posts &&
              posts.map((post) => (
                <div
                  key={post.id}
                  className="flex sm:items-center items-start justify-between sm:flex-row flex-col py-4"
                >
                  <Link href={`/?post=${post.id}`} as={`/post/${post.id}`}>
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
