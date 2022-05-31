/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/?login',
        permanent: true,
      },
      {
        source: '/new-post',
        destination: '/?new-post',
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
