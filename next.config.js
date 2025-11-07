/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
    ],
  },
  // For Vercel deployment (recommended): Comment out basePath and assetPrefix
  // For GitHub Pages: Uncomment the lines below
  // basePath: '/ecommerce-shop',
  // assetPrefix: '/ecommerce-shop/',
}

module.exports = nextConfig

