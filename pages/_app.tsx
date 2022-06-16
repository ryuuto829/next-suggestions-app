import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import '@styles/globals.css'
import { AuthProvider } from '@lib/auth'
import SEO from '../next-seo.config'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DefaultSeo {...SEO} />
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
    </AuthProvider>
  )
}
