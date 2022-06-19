import { useState } from 'react'
import { Dialog, Listbox } from '@headlessui/react'
import { useForm, Controller, FieldValues } from 'react-hook-form'

const menuOptions = [
  { id: 1, name: '💡 Feature Request' },
  { id: 2, name: '📝 Feedback' },
]

type MenuOption = {
  id: number
  name: string
}

export type SuggestionModalProps = {
  handleFormSubmit: (data: FieldValues) => Promise<void>
}

export default function SuggestionModal({ handleFormSubmit }: SuggestionModalProps) {
  const { control, register, handleSubmit } = useForm()
  const [topic, setTopic] = useState(menuOptions[0])

  return (
    <div>
      <Dialog.Title className="text-xl font-bold text-white sm:text-2xl w-full pb-6">
        Make a suggestion
      </Dialog.Title>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col text-left">
        <label htmlFor="title" className="text-sm text-gray-400 font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="A short, descriptive title"
          className="bg-[color:var(--light-blue-charcoal-color)] rounded-md px-3 py-2 border border-gray-700 text-sm focus:border-gray-600 outline-none mt-1"
          {...register('title', { required: true, max: 150, min: 2, maxLength: 150 })}
        />
        <label htmlFor="topic" className="text-sm text-gray-400 font-medium mt-3">
          Topic
        </label>
        <Controller
          name="topic"
          control={control}
          defaultValue={topic.name}
          render={({ field: { onChange, value, ...otherFields } }) => (
            <Listbox
              as="div"
              id="topic"
              value={topic}
              className="mt-1 relative"
              onChange={(post: MenuOption) => {
                onChange(post.name)
                setTopic(post)
              }}
              {...otherFields}
            >
              <Listbox.Button className="bg-[color:var(--light-blue-charcoal-color)] rounded-md border border-gray-700 w-full text-sm px-3 py-2 text-left focus:border-gray-600">
                {topic.name}
              </Listbox.Button>
              <Listbox.Options className="absolute bg-[color:var(--light-blue-charcoal-color)] w-full mt-1 rounded-md px-3 py-2 text-sm border border-gray-700">
                {menuOptions.map((post) => (
                  <Listbox.Option key={post.id} value={post} className="cursor-pointer mt-1">
                    {post.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          )}
        />
        <label htmlFor="content" className="text-sm text-gray-400 font-medium mt-3">
          Details
        </label>
        <textarea
          placeholder="Please include only one suggestion per post"
          className="bg-[color:var(--light-blue-charcoal-color)] mt-1 rounded-md border border-gray-700 outline-none focus:border-gray-600 px-3 py-2 text-sm min-h-[9rem] resize-none"
          {...register('content', { max: 1000, maxLength: 1000 })}
        />
        <div className="flex justify-end">
          <button
            className="bg-[color:var(--purple-color)] py-2 px-4 rounded text-sm w-fit hover:bg-[#453fc0] mt-4"
            onSubmit={handleFormSubmit}
          >
            Create post
          </button>
        </div>
      </form>
    </div>
  )
}
