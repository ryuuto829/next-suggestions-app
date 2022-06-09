import { Dialog } from '@headlessui/react'
import { ChevronUpIcon } from '@primer/octicons-react'

import { Post } from '@lib/types'

export type PostModalProps = {
  post: Post | undefined
}

export default function PostModal({ post }: PostModalProps) {
  if (!post) {
    return <div>No post found</div>
  }

  return (
    <>
      <Dialog.Title className="text-xl text-left">{post.title}</Dialog.Title>
      <div className="flex text-left mt-6">
        <span className="w-24 sm:w-36 text-sm text-[color:var(--dark-gray-charcoal-color)]">
          Category
        </span>

        {post.topic === '-' ? (
          <span className="text-sm">none</span>
        ) : (
          <span className="text-xs px-2 py-1 bg-[color:var(--blue-charcoal-color)] rounded mr-4">
            {post.topic}
          </span>
        )}
      </div>

      <div className="mt-6 text-left text-gray-400">{post.content}</div>

      <div className="flex justify-between items-center sticky top-0 left-0 sm:px-16 px-5 py-3 bg-[color:var(--blue-charcoal-color)] border border-gray-500/10 mt-12">
        <div className="flex justify-between items-center"></div>
        <div className="fixed bottom-0 left-0 w-full p-5 sm:p-0 sm:static sm:w-auto">
          <button className="bg-[color:var(--purple-color)] py-2 px-4 rounded text-sm w-full hover:bg-[#453fc0]">
            <ChevronUpIcon size={16} className="mr-2" />
            <span className="mr-2">Upvote</span>
            <span>0</span>
          </button>
        </div>
      </div>
    </>
  )
}
