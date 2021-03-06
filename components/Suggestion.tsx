import Link from 'next/link'
import { ChevronUpIcon } from '@primer/octicons-react'

import { Post } from '@lib/types'

export type SuggestionProps = {
  post: Post
  isUpvoted: boolean
  handleUpvotes: (a: boolean, b: string) => void
}

export default function Suggestion({ post, isUpvoted, handleUpvotes }: SuggestionProps) {
  return (
    <div
      key={post.id}
      className="flex sm:items-center items-start justify-between sm:flex-row flex-col py-4"
    >
      <Link href={`/?post=${post.id}`} as={`/post/${post.id}`}>
        <div className="cursor-pointer w-full mr-2">
          <div className="flex items-center">
            <h2 className="font-medium line-clamp-2">{post.title}</h2>
          </div>
          <span className="text-sm text-gray-200 mt-2 block line-clamp-2">{post.content}</span>
          <div className="flex items-center mt-2.5">
            {post.topic !== '-' && (
              <span className="text-xs px-2 py-1 bg-[color:var(--blue-charcoal-color)] rounded mr-4">
                {post.topic}
              </span>
            )}
          </div>
        </div>
      </Link>
      <button
        className={`flex items-center text-gray-200 bg-[color:var(--blue-charcoal-color)] hover:bg-[color:var(--light-blue-charcoal-color)] rounded py-2 px-4 mt-3 sm:mt-0 ${
          isUpvoted && 'border-l-4 border-[color:var(--purple-color)]'
        }`}
        onClick={() => handleUpvotes(isUpvoted, post.id)}
      >
        <ChevronUpIcon size={16} className="mr-2" />
        <span className="text-sm">{post.upvoteCount || 0}</span>
      </button>
    </div>
  )
}
