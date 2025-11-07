# GitHub Pages Deployment Guide

## Step 1: Repository Settings

1. Go to your GitHub repository: `https://github.com/Brooklss/ecommerce-shop`
2. Click **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar under "Code and automation")
4. Under **Source**, select **GitHub Actions** (NOT "Deploy from a branch")

## Step 2: Build Locally (Test)

```bash
# Make sure your code works locally
npm run dev

# Build the static export
npm run build

# Check the out folder was created
ls out
```

You should see files in the `out` folder including `index.html`

## Step 3: Push to GitHub

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

## Step 4: Wait for Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You should see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to complete (usually 2-3 minutes)
4. Once green (✓), your site is live!

## Step 5: Access Your Site

Your site will be available at:
```
https://brooklss.github.io/ecommerce-shop/
```

## Troubleshooting

### 404 Error: "File not found"

**Cause**: GitHub Pages source is set to "Deploy from a branch" instead of "GitHub Actions"

**Fix**:
1. Go to Settings → Pages
2. Under "Build and deployment"
3. Source: Select **GitHub Actions**
4. Save and redeploy

### Workflow Not Running

**Cause**: GitHub Actions might be disabled

**Fix**:
1. Go to Settings → Actions → General
2. Enable "Allow all actions and reusable workflows"
3. Push a new commit to trigger deployment

### CSS/JS Not Loading

**Cause**: Incorrect basePath configuration

**Fix**:
Check `next.config.js`:
- If deploying to `username.github.io/ecommerce-shop/` → use `basePath: '/ecommerce-shop'`
- If deploying to `username.github.io/` → remove basePath

### Images Not Loading

**Cause**: Using Next.js Image optimization (not supported in static export)

**Fix**: Already configured with `images: { unoptimized: true }`

### Site Shows Old Version

**Fix**:
1. Clear your browser cache (Ctrl + Shift + R)
2. Check Actions tab to ensure latest deployment succeeded
3. Wait 1-2 minutes for CDN to update

## Verify Deployment

Check these files exist in your repository:
- ✅ `.github/workflows/deploy.yml` (GitHub Actions workflow)
- ✅ `.nojekyll` (Disables Jekyll)
- ✅ `public/.nojekyll` (Copied to out folder)
- ✅ `next.config.js` (Has `output: 'export'`)

## Local Development vs Production

- **Development** (`npm run dev`): 
  - Uses Next.js server
  - Hot reload
  - No basePath

- **Production** (`npm run build`):
  - Static HTML/CSS/JS files in `out` folder
  - Uses basePath `/ecommerce-shop`
  - No server-side features

## Alternative: Deploy to Vercel (Recommended)

For full Next.js features (no static export limitations):

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy (automatic!)
4. Get a `.vercel.app` domain

Vercel supports all Next.js features including:
- Server-side rendering
- API routes
- Image optimization
- Incremental Static Regeneration
