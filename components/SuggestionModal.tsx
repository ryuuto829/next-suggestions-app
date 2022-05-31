import { Dialog } from '@headlessui/react'
import { useForm } from 'react-hook-form'

export type SuggestionModalProps = {}

export default function SuggestionForm({}: SuggestionModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)
  // console.log(errors)

  return (
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
  )
}
