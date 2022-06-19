const title = 'Next Suggestions App – Let us know how we can improve'
const description = 'Vote on existing ideas or suggest new ones.'

const SEO = {
  title,
  description,
  canonical: 'https://example.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://example.com',
    title,
    description,
    images: [
      {
        url: 'https://example.com/og.png',
        alt: title,
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default SEO
