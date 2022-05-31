import { Dialog } from '@headlessui/react'
import { MarkGithubIcon } from '@primer/octicons-react'

export type SigninModalProps = {
  isOpen: boolean
  handleModalClose: () => void
  handleSignInWithGoogle: () => Promise<void>
  handleSignInWithGithub: () => Promise<void>
}

export default function SigninModal({
  isOpen,
  handleModalClose,
  handleSignInWithGoogle,
  handleSignInWithGithub,
}: SigninModalProps) {
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
      <Dialog.Panel className="relative flex flex-col bg-[color:var(--dark-blue-charcoal-color)] max-w-md w-full text-center px-4 py-10 sm:px-8 z-10 divide-y divide-gray-700 m-5">
        <header className="flex flex-col pb-6">
          <Dialog.Title className="text-xl font-bold text-white sm:text-2xl w-full">
            Sign in
          </Dialog.Title>
          <Dialog.Description className="text-sm text-[color:var(--dark-gray-charcoal-color)] w-full mt-5">
            Sign in to suggest new ideas or vote on existing ones.
          </Dialog.Description>

          {/* Modal Close Button */}
          <button
            onClick={handleModalClose}
            className="absolute right-2 top-2 text-[color:var(--dark-gray-charcoal-color)] bg-transparent hover:bg-[color:var(--light-blue-charcoal-color)] rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
          >
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
          </button>
        </header>
        <div className="pt-6">
          {/* Sign in with Google */}
          <button
            className="relative flex justify-center items-center w-full bg-blue-500 border border-blue-500 text-blue-50 rounded-md hover:bg-blue-600 px-4 py-2 text-sm"
            onClick={handleSignInWithGoogle}
          >
            <svg
              className="absolute left-0 ml-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
              width={20}
              height={20}
              fill="currentColor"
            >
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Sign in with GitHub */}
          <button
            className="relative flex justify-center items-center w-full bg-gray-700/50 border border-gray-700 text-blue-50 rounded-md hover:bg-gray-800 px-4 py-2 text-sm mt-2"
            onClick={handleSignInWithGithub}
          >
            <MarkGithubIcon size={20} className="absolute left-0 ml-3" />
            <span>Continue with GitHub</span>
          </button>

          {/* Divider */}
          <div className="relative w-full my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs leading-5">
              <span className="px-2 font-medium text-[color:var(--dark-gray-charcoal-color)] bg-[color:var(--dark-blue-charcoal-color)]">
                Or sign in for testing
              </span>
            </div>
          </div>

          {/* Sign in with a Demo Account */}
          <button
            className="relative flex justify-center items-center w-full bg-[color:var(--blue-charcoal-color)] border border-[color:var(--blue-charcoal-color)] text-gray-200 rounded-md hover:bg-[color:var(--light-blue-charcoal-color)] px-4 py-2 text-sm mt-2"
            onClick={handleSignInWithGoogle}
          >
            <span>Continue with a Demo Account</span>
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}
