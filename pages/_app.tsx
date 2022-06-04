import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

import '@styles/globals.css'
import { AuthProvider } from '@lib/auth'
import SEO from '../next-seo.config'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </AuthProvider>
  )
}
