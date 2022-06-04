import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FieldValues } from 'react-hook-form'

import SortingSelect from '@components/SortingSelect'
import FilterMenu from '@components/FilterMenu'
import NavigationBar from '@components/NavigationBar'
import SigninModal from '@components/SigninModal'
import SuggestionModal from '@components/SuggestionModal'
import PostModal from '@components/PostModal'
import ModalDialog from '@components/ModalDialog'
import EmptyNavigationBar from '@components/EmptyNavigationBar'
import Suggestion from '@components/Suggestion'
import { useAuth } from '@lib/auth'
import { createPost } from '@lib/db'
// import { getAllPosts } from '@lib/db'
import { Post } from '@lib/types'

export type HomeProps = {
  allPosts: Post[]
}

// export async function getStaticProps() {
//   const { posts } = await getAllPosts()

//   return {
//     props: {
//       allPosts: posts,
//     },
//   }
// }

export default function Home({ allPosts }: HomeProps) {
  const router = useRouter()
  const { user, loading, signInWithGoogle, signInWithGithub } = useAuth()

  const isLogin = router.query.login === ''
  const isNewPost = router.query['new-post'] === ''
  const isPostView = router.query.post !== undefined

  const handleModalClose = () => {
    router.push('/')
  }

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle('/')
  }

  const handleSignInWithGithub = async () => {
    await signInWithGithub('/')
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
  }

  useEffect(() => {
    if (loading) return

    handleRouteChange()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading])

  const handleFormSubmit = async (data: FieldValues) => {
    if (!user) return

    const newSuggestion = {
      id: '1',
      autor: user.name,
      authorId: user.uid,
      title: data.title,
      topic: data.topic,
      content: data.content.replace('\n', '\n\n'),
      createdAt: new Date().toISOString(),
      comments: [],
      status: 'active',
    } as Post

    await createPost(newSuggestion)
    handleModalClose()
  }

  return (
    <>
      {loading ? <EmptyNavigationBar /> : <NavigationBar />}

      {!loading && (
        <>
          <ModalDialog isOpen={isLogin} handleModalClose={handleModalClose}>
            <SigninModal
              handleSignInWithGoogle={handleSignInWithGoogle}
              handleSignInWithGithub={handleSignInWithGithub}
            />
          </ModalDialog>
          <ModalDialog isOpen={isNewPost} handleModalClose={handleModalClose} windowSize="wide">
            <SuggestionModal handleFormSubmit={handleFormSubmit} />
          </ModalDialog>
          <ModalDialog isOpen={isPostView} handleModalClose={handleModalClose} windowSize="wide">
            <PostModal />
          </ModalDialog>
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
                <button
                  className={`bg-[color:var(--purple-color)] py-2 px-4 rounded text-sm w-full hover:bg-[#453fc0] ${
                    loading ? 'pointer-events-none hover:cursor-not-allowed' : ''
                  }`}
                  disabled={loading}
                >
                  Make suggestion
                </button>
              </Link>
            </div>
          </div>
          <div className="px-5 sm:px-16 sm:py-8 py-6">
            {allPosts && allPosts.map((post) => <Suggestion key={post.id} post={post} />)}
          </div>
        </main>
      </div>
    </>
  )
}
