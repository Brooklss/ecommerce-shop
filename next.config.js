/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
    ],
  },
  // Only use basePath if deploying to a subdirectory like /ecommerce-shop
  // Comment these out if deploying to root domain (username.github.io)
  basePath: '/ecommerce-shop',
  assetPrefix: '/ecommerce-shop/',
}

module.exports = nextConfig

