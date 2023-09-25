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
        ],
      },
}

module.exports = nextConfig
