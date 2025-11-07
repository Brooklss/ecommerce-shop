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
  basePath: process.env.NODE_ENV === 'production' ? '/ecommerce-shop' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ecommerce-shop' : '',
}

module.exports = nextConfig

