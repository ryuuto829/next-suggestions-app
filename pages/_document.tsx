import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-[#1B1F2A] text-white relative min-h-screen h-full p-0 m-0">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}