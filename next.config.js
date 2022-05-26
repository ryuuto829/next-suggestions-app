/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/?login=true',
        permanent: true,
      },
      {
        source: '/new-post',
        destination: '/?new-post=true',
        permanent: true,
      },
      {
        source: '/post/:id',
        destination: '/?post=:id',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
