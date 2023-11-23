/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
      base_URL: 'https://api.reblue.id/api'
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'via.placeholder.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'fakestoreapi.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
          },
        ],
      },
}

module.exports = nextConfig
