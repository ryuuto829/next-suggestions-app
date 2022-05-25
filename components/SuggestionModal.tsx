import { Dialog } from '@headlessui/react'
import { useForm } from 'react-hook-form'

export type SuggestionModalProps = {
  isOpen: boolean
  handleModalClose: () => void
}

export default function SuggestionForm({ isOpen, handleModalClose }: SuggestionModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)
  // console.log(errors)

  return (
    <Dialog
      as="div"
      open={isOpen}
      onClose={handleModalClose}
      className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
    >
      {/* Modal overlay */}
      <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
      {/* Modal content */}
      <Dialog.Panel className="flex flex-col bg-[color:var(--dark-blue-charcoal-color)] max-w-md w-full text-center px-4 py-10 sm:px-8 z-10 divide-y divide-gray-700 m-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Title"
            className="bg-transparent"
            {...register('Title', { required: true, max: 150, min: 2, maxLength: 150 })}
          />
          <select {...register('Category', { required: true })} className="bg-transparent">
            <option value="option1">option1</option>
          </select>
          <textarea
            {...register('Content', { max: 1000, maxLength: 1000 })}
            className="bg-transparent"
          />
          <input type="submit" />
        </form>
      </Dialog.Panel>
    </Dialog>
  )
}
