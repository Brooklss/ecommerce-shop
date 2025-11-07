# Deploy to Vercel (Recommended)

## Why Vercel?
- **Made for Next.js** - Full support for dynamic routes, API routes, SSR
- **Free tier** - Perfect for personal projects
- **Zero configuration** - Works out of the box
- **Automatic deployments** - Every git push auto-deploys

## Quick Deploy (2 minutes)

### Option 1: Deploy with CLI
```bash
npm install -g vercel
vercel login
vercel
```

### Option 2: Deploy with GitHub (Easiest)
1. Go to https://vercel.com
2. Click "Sign Up" and choose "Continue with GitHub"
3. Click "Import Project"
4. Select your `ecommerce-shop` repository
5. Click "Deploy"
6. Done! Your app will be live at `your-project.vercel.app`

## Configuration

Before deploying, update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove basePath and assetPrefix for Vercel
  // basePath: '/ecommerce-shop',
  // assetPrefix: '/ecommerce-shop/',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
    ],
  },
}

module.exports = nextConfig
```

## Automatic Deployments
- Every push to `main` branch auto-deploys to production
- Pull requests get preview URLs
- No build configuration needed

## Environment Variables (if needed later)
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add any API keys or secrets

## Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

---

**Note**: Vercel is THE recommended platform for Next.js apps. GitHub Pages only supports static sites, which doesn't work well with dynamic routing.
