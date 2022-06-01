import { ReactNode } from 'react'
import { Dialog } from '@headlessui/react'

export type ModalDialogProps = {
  isOpen: boolean
  handleModalClose: () => void
  children?: ReactNode
  windowSize?: 'wide'
}

export const CloseIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    ></path>
  </svg>
)

export default function ModalDialog({
  isOpen,
  handleModalClose,
  windowSize,
  children,
}: ModalDialogProps) {
  return (
    <Dialog
      as="div"
      open={isOpen}
      onClose={handleModalClose}
      className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
    >
      {/* Modal overlay */}
      <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />

      {/* Modal content with close button */}
      <Dialog.Panel
        className={`relative flex flex-col bg-[color:var(--dark-blue-charcoal-color)] ${
          windowSize === 'wide' ? 'max-w-2xl' : 'max-w-md'
        } w-full text-center px-4 py-10 sm:px-8 z-10 m-5 rounded-md`}
      >
        <button
          onClick={handleModalClose}
          className="absolute right-2 top-2 text-[color:var(--dark-gray-charcoal-color)] bg-transparent hover:bg-[color:var(--light-blue-charcoal-color)] rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
        >
          <CloseIcon />
        </button>

        {children}
      </Dialog.Panel>
    </Dialog>
  )
}
