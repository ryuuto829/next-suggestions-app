const title = 'Next Suggestions App – Let us know how we can improve'
const description = 'Vote on existing ideas or suggest new ones.'

const SEO = {
  title,
  description,
  canonical: 'https://next-suggestions-app.vercel.app/',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://next-suggestions-app.vercel.app/',
    title,
    description,
    images: [
      {
        url: 'https://next-suggestions-app.vercel.app/og.png',
        alt: title,
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default SEO
