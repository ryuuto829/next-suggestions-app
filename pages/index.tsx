import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { compareDesc, parseISO } from 'date-fns'
import { FieldValues } from 'react-hook-form'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { collection, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'

import { db } from '@lib/firebase'
import { useAuth } from '@lib/auth'
import { createPost, addUpvote, removeUpvote } from '@lib/db'

import SortingSelect from '@components/SortingSelect'
import NavigationBar from '@components/NavigationBar'
import SigninModal from '@components/SigninModal'
import SuggestionModal from '@components/SuggestionModal'
import PostModal from '@components/PostModal'
import ModalDialog from '@components/ModalDialog'
import Suggestion from '@components/Suggestion'
import { EmptyPosts, EmptyNavigationBar } from '@components/EmptyNavigationBar'
import { Post, Upvotes, SortingName } from '@lib/types'

export default function Home() {
  const router = useRouter()
  const { user, loading, signInWithGoogle, signInWithGithub, signInWithDemo } = useAuth()
  const [sorting, setSorting] = useState<SortingName>('Recent')
  const [upvotesData] = useDocument(user ? doc(db, 'upvotes', user?.uid) : null)
  const [postsData] = useCollection(collection(db, 'posts'))

  const upvotes = upvotesData?.data() as Upvotes

  const posts = useMemo<Post[] | undefined | null>(() => {
    if (!postsData) return null

    const posts = postsData.docs.map((doc) => doc.data()) as Post[]

    switch (sorting) {
      case 'Recent':
        return posts.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))

      case 'Most voted':
        return posts.sort((a, b) => b.upvoteCount - a.upvoteCount)
    }
  }, [postsData, sorting])

  const isLogin = router.query.login === ''
  const isNewPost = router.query['new-post'] === ''
  const isPostView = router.query.post !== undefined
  const currentPost = router.query.post as string | undefined

  const postTitle = isPostView
    ? posts?.find((post) => post.id === router.query.post)?.title || null
    : null
  const loginTitle = isLogin ? 'Sign in' : null
  const newPostTitle = isNewPost ? 'Make a suggestion' : null

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

  const handleModalClose = () => {
    router.push('/')
  }

  const handleFormSubmit = async (data: FieldValues) => {
    if (!user) return

    const newSuggestion = {
      id: '',
      author: user.name,
      authorId: user.uid,
      authorPhotoURL: user.photoURL,
      title: data.title,
      topic: data.topic,
      content: data.content.replace('\n', '\n\n'),
      createdAt: new Date().toISOString(),
      upvoteCount: 0,
      comments: [],
      status: 'active',
    } as Post

    await createPost(newSuggestion)

    handleModalClose()
    toast('A new suggestion added!', { theme: 'dark' })
  }

  const handleUpvotes = async (isUpvoted: boolean, postID: string) => {
    if (!user) {
      return router.push('/?login', '/login')
    }

    if (isUpvoted) {
      await removeUpvote(postID, user.uid)
    } else {
      await addUpvote(postID, user.uid)
    }
  }

  return (
    <>
      <NextSeo
        title={postTitle || loginTitle || newPostTitle || ''}
        titleTemplate="%s | Next Suggestions App"
      />

      {loading ? <EmptyNavigationBar /> : <NavigationBar />}

      {isLogin && (
        <ModalDialog isOpen={isLogin && !loading} handleModalClose={handleModalClose}>
          <SigninModal
            handleSignInWithGoogle={() => signInWithGoogle('/')}
            handleSignInWithGithub={() => signInWithGithub('/')}
            handleSignInWithDemo={() => signInWithDemo('/')}
          />
        </ModalDialog>
      )}

      {isNewPost && (
        <ModalDialog
          isOpen={isNewPost && !loading}
          handleModalClose={handleModalClose}
          windowSize="wide"
        >
          <SuggestionModal handleFormSubmit={handleFormSubmit} />
        </ModalDialog>
      )}

      {isPostView && posts && (
        <ModalDialog
          isOpen={isPostView && !loading}
          handleModalClose={handleModalClose}
          windowSize="wide"
        >
          <PostModal
            post={posts && posts.find((post) => post.id === router.query.post)}
            handleUpvotes={handleUpvotes}
            isUpvoted={upvotes && currentPost ? upvotes[currentPost] : false}
          />
        </ModalDialog>
      )}

      <div className="pt-0 sm:pt-32">
        <main className="bg-[color:var(--dark-blue-charcoal-color)] max-w-2xl mx-auto rounded sm:min-h-full min-h-screen">
          <header className="sm:px-16 sm:py-12 px-5 pt-20 pb-11">
            <h1 className="text-xl">📝 Next Suggestions App</h1>
            <p className="text-sm text-gray-200 mt-2">
              Let us know how we can improve. Vote on existing ideas or suggest new ones.
            </p>
          </header>
          <div className="flex justify-between items-center sticky top-0 left-0 sm:px-16 px-5 py-3 bg-[color:var(--blue-charcoal-color)] border border-gray-500/10">
            <SortingSelect sorting={sorting} handleSorting={setSorting} />
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
            {posts ? (
              posts.length !== 0 ? (
                posts.map((post) => (
                  <Suggestion
                    key={post.id}
                    post={post}
                    handleUpvotes={handleUpvotes}
                    isUpvoted={upvotes ? upvotes[post.id] : false}
                  />
                ))
              ) : (
                <div className="text-[color:var(--dark-gray-charcoal-color)] text-center py-8">
                  Be first to add a new suggestion!
                </div>
              )
            ) : (
              <EmptyPosts />
            )}
          </div>
        </main>
      </div>
    </>
  )
}
