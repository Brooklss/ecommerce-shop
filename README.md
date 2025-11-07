# 🛍️ E-Commerce Shop# eCommerce Shop# eCommerce Shop# 🛍️ eCommerce Shop# eCommerce Shop



A modern, full-featured eCommerce application built with Next.js 14, TypeScript, and Redux Toolkit featuring complete CRUD operations, user authentication, and responsive design.



## ✨ FeaturesA modern eCommerce application built with Next.js, TypeScript, Tailwind CSS, Shadcn UI, and Redux Toolkit.



### Core Features

- 🛍️ **Product Catalog** - Browse products with infinite scroll pagination

- 🔍 **Search & Filter** - Real-time search and category filtering## 🚀 Live DemoA modern eCommerce application built with Next.js, TypeScript, Tailwind CSS, Shadcn UI, and Redux Toolkit.

- ❤️ **Favorites System** - Save favorite products (Redux + localStorage)

- 🌙 **Dark Mode** - Toggle between light and dark themes

- 👤 **User Authentication** - Mock login system with persistent sessions

- 📊 **User Dashboard** - Statistics for logged-in users- **Local**: http://localhost:3000

- 📱 **Fully Responsive** - Mobile, tablet, and desktop optimized

- **GitHub Pages**: https://brooklss.github.io/ecommerce-shop/

### CRUD Operations

- ✅ **Create** - Add new products with validation## 🚀 Live DemoA modern, full-featured eCommerce application built with Next.js 14, TypeScript, and Redux Toolkit. This project demonstrates real-world frontend development skills with complete CRUD operations, state management, and responsive design.A modern eCommerce application built with Next.js, TypeScript, Tailwind CSS, Shadcn UI, and Redux Toolkit. This project demonstrates real-world frontend development skills including CRUD operations, state management, API integration, and responsive design.

- ✅ **Read** - View products with detailed information

- ✅ **Update** - Edit your own products> **Getting 404 Error?** Read the [Deployment Guide](DEPLOYMENT.md)

- ✅ **Delete** - Remove products with confirmation

> 

### UX Enhancements

- 🎨 Gradient backgrounds and modern design> **Quick Fix**: Go to your GitHub repo → Settings → Pages → Source: **"GitHub Actions"**

- ⚡ Loading states and smooth animations

- 🔔 Toast notifications (Sonner)- **Local**: http://localhost:3000

- 🏷️ Product ownership badges (crown icon)

- 🖼️ Placeholder icons for user-created products## ⚠️ IMPORTANT: Product Editing

- ✨ Hover effects and transitions

- **GitHub Pages**: https://brooklss.github.io/ecommerce-shop/

## 🚀 Quick Start

**You can ONLY edit products YOU created!**

### Prerequisites

- Node.js 18+ installed![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)## Features

- npm or yarn package manager

Products from the DummyJSON API (IDs 1-194) belong to the store and cannot be edited.

### Installation

## ⚠️ IMPORTANT: Product Editing

```bash

# Clone the repository### How to Test Edit/Delete:

git clone https://github.com/your-username/ecommerce-shop.git

cd ecommerce-shop1. Login (any username/password works)![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript)



# Install dependencies2. Click **"Create Product"** button

npm install

3. Fill in the form and submit**You can ONLY edit products YOU created!**

# Run development server

npm run dev4. Your product will have a **crown badge** 👑



# Open http://localhost:30005. NOW you can edit/delete it!![Redux](https://img.shields.io/badge/Redux_Toolkit-2.2-purple?style=flat-square&logo=redux)### Core Features

```



## 🛠️ Tech Stack

**Why the error?** You tried editing Product #195 which you don't own.Products from the DummyJSON API (IDs 1-194) cannot be edited because they don't belong to you.

| Technology | Version | Purpose |

|------------|---------|---------|

| **Next.js** | 14.2 | React framework with App Router |

| **TypeScript** | 5.5 | Type safety |## 📦 Installation![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)- ✅ **Product Listing Page** - Display products with pagination, search, and favorite functionality

| **Redux Toolkit** | 2.2 | State management |

| **Tailwind CSS** | 3.4 | Styling |

| **Shadcn UI** | Latest | UI components (Radix UI) |

| **Axios** | 1.7 | HTTP client |```bash### To Test Edit/Delete Features:

| **Sonner** | Latest | Toast notifications |

| **Lucide React** | Latest | Icons |# Clone repository



**API**: DummyJSON (https://dummyjson.com) - Mock REST API for product datagit clone https://github.com/Brooklss/ecommerce-shop.git1. Login (any username/password works)- ✅ **Product Details Page** - View detailed product information



## 📁 Project Structurecd ecommerce-shop



```2. Click "Create Product" button

src/

├── app/                    # Next.js App Router pages# Install dependencies

│   ├── page.tsx           # Home (product listing)

│   ├── favorites/         # Favorites pagenpm install3. Fill in the form and submit## 🌟 Features- ✅ **Favorites Page** - Manage favorite products using Redux

│   ├── login/             # Login page

│   ├── my-products/       # User products management

│   └── product/

│       ├── [id]/          # Product details# Run development server4. Now you can edit/delete that product (it will have a crown badge)

│       │   └── edit/      # Edit product

│       └── create/        # Create productnpm run dev

├── components/

│   ├── ui/                # Shadcn UI components- ✅ **Create Product** - Add new products to the store

│   ├── Navbar.tsx         # Navigation with mobile menu

│   ├── ProductCard.tsx    # Product card component# Open http://localhost:3000

│   ├── ProductForm.tsx    # Create/edit form

│   ├── ThemeProvider.tsx  # Dark mode provider```## 📦 Installation

│   └── AuthInitializer.tsx # Auth state initialization

├── store/                 # Redux Toolkit

│   ├── store.ts           # Store configuration

│   ├── hooks.ts           # Typed hooks## 🏗️ Build & Deploy### Core Features (✅ All Implemented)- ✅ **Edit Product** - Update existing product information

│   ├── authSlice.ts       # Authentication

│   ├── favoritesSlice.ts  # Favorites management

│   ├── themeSlice.ts      # Theme management

│   └── userProductsSlice.ts # User products```bash```bash

├── lib/

│   ├── api.ts             # API client (Axios)# Build for production

│   └── utils.ts           # Utilities

├── types/npm run build# Install dependencies- ✅ **Product Listing Page** - Display products with title, price, rating, category, and image- ✅ **Delete Product** - Remove products with confirmation dialog

│   ├── product.ts         # Product types

│   └── auth.ts            # Auth types

└── providers/

    └── ReduxProvider.tsx  # Redux provider# This creates an 'out' folder with static filesnpm install

```

```

## 🎯 How It Works

- ✅ **Infinite Scroll Pagination** - Automatic loading with `?limit=10&skip=10`- ✅ **Search Functionality** - Search products by name

### Authentication (Mock System)

- Any username/password works for demo purposes### Deploy to GitHub Pages

- Login state persists in localStorage

- Protected routes require authentication# Run development server

- User-specific features unlocked when logged in

See detailed instructions in [DEPLOYMENT.md](DEPLOYMENT.md)

### Product Management

- **View All Products**: API products + your created productsnpm run dev- ✅ **Product Search** - Real-time search without page refresh- ✅ **Infinite Scroll Pagination** - Load more products on scroll

- **Create**: POST to DummyJSON + save to localStorage

- **Edit**: PATCH to API + update localStorage (YOUR products only)**Quick Steps**:

- **Delete**: DELETE from API + remove from localStorage (YOUR products only)

1. Push code to GitHub

### Why localStorage?

DummyJSON is a mock API that doesn't persist data. We use localStorage to simulate a real database for your created products and favorites.2. Go to Settings → Pages



## ⚠️ IMPORTANT: Product Editing3. Source: Select **"GitHub Actions"**# Build for production- ✅ **Category Filter** - Filter products by category dropdown



**You can ONLY edit/delete products YOU created!**4. GitHub Actions will auto-deploy on every push



Products from the DummyJSON API (IDs 1-194) belong to the store and cannot be modified.npm run build



### How to Test Edit/Delete:## ✨ Features

1. **Login** (any username/password)

2. Click **"Create Product"**```- ✅ **Product Details Page** - Detailed info with images, brand, stock, and rating### Bonus Features

3. Fill the form and submit

4. Your product will have a **crown badge** 👑### Core Features

5. Now you can edit/delete it!

- ✅ Product Listing with Infinite Scroll

**Common Error**: "Failed to update product" means you're trying to edit a store product you don't own.

- ✅ Search & Category Filter

## 📦 Deployment

- ✅ Product Detail Pages## ✨ Features- ✅ **Favorites System** - Add/remove products to favorites (Redux + localStorage)- ✅ **Toast Notifications** - User feedback using Sonner

### ⭐ Recommended: Vercel (Best for Next.js)

- ✅ Create Product (with form validation)

Vercel is THE platform for Next.js apps with full support for dynamic routes and SSR.

- ✅ Edit Product (YOUR products only)

#### Quick Deploy

- ✅ Delete Product (with confirmation)

```bash

# Install Vercel CLI- ✅ Favorites System (Redux + localStorage)- ✅ Product Listing with Pagination- ✅ **Create Product** - Form to add new products (POST to `/products/add`)- ✅ **Loading States** - Proper loading indicators throughout the app

npm install -g vercel



# Deploy

vercel login### UI/UX Features- ✅ Search & Category Filter

vercel

```- ✅ Responsive Design (Mobile/Tablet/Desktop)



#### Or Deploy with GitHub (Easiest)- ✅ Dark Mode Toggle- ✅ Product Details Page- ✅ **Edit Product** - Pre-filled form for updating (PUT to `/products/:id`)- ✅ **Error Handling** - Comprehensive error handling with user-friendly messages

1. Go to [vercel.com](https://vercel.com)

2. Sign up with GitHub- ✅ User Dashboard with Statistics

3. Click "Import Project"

4. Select your `ecommerce-shop` repository- ✅ Product Ownership Badges (crown icon)- ✅ Create/Edit/Delete Products (for YOUR products only)

5. Click "Deploy"

6. Done! Live at `your-project.vercel.app`- ✅ Placeholder Images for User Products



**Benefits**:- ✅ Toast Notifications- ✅ Favorites System with Redux- ✅ **Delete Product** - DELETE request with confirmation dialog- ✅ **Responsive Design** - Mobile-first responsive layout

- ✅ Zero configuration

- ✅ Automatic deployments on git push- ✅ Loading States

- ✅ Preview URLs for pull requests

- ✅ Full Next.js support (dynamic routes, SSR)- ✅ Error Handling- ✅ User Authentication (mock)

- ✅ Free tier for personal projects



See [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) for detailed instructions.

### Technical Features- ✅ Dark Mode Toggle- ✅ **Mock Authentication** - Login page to access protected features- ✅ **Dark Mode Toggle** - Switch between light and dark themes using Redux

### ⚠️ GitHub Pages (Limited Support)

- ✅ Redux Toolkit State Management

**Not Recommended**: GitHub Pages only supports static sites. Your app has dynamic routes (`/product/[id]`) that require a Node.js server.

- ✅ localStorage Persistence- ✅ Responsive Design (Mobile/Tablet/Desktop)

**Limitations**:

- ❌ Dynamic routes won't work properly- ✅ TypeScript Type Safety

- ❌ Product detail pages will 404

- ❌ Edit pages will fail- ✅ RESTful API Integration- ✅ Local Storage Persistence- ✅ **Mock Authentication** - Login page with persistent authentication state

- ❌ No server-side features

- ✅ Static Site Generation

If you still want to try GitHub Pages, you'll need to implement fallback routing and static generation, but it's not ideal for this app.

- ✅ GitHub Actions CI/CD- ✅ Placeholder Images for User-Created Products

## 🧪 Available Scripts



```bash

npm run dev          # Start development server (http://localhost:3000)## 🛠️ Tech Stack### Bonus Features (✅ All Implemented)

npm run build        # Build for production

npm start            # Start production server (requires build)

npm run lint         # Run ESLint

```- **Framework**: Next.js 14.2 (App Router)## 🛠️ Tech Stack



## 💡 Key Features Explained- **Language**: TypeScript 5.5



### User Dashboard (Logged-in Users)- **Styling**: Tailwind CSS 3.4- 🎨 **Dark Mode Toggle** - Seamless theme switching with Redux## Tech Stack

- Total products created count

- Total favorites count- **UI**: Shadcn UI (Radix UI primitives)

- Quick access to "My Products"

- Visual statistics cards- **State**: Redux Toolkit 2.2- Next.js 14.2 (App Router)



### Product Ownership Tracking- **HTTP**: Axios 1.7

- Crown badge (👑) on YOUR products

- Quick edit button on product cards- **Icons**: Lucide React- TypeScript 5.5- 🔔 **Toast Notifications** - User feedback with Sonner

- "My Products" section on home page

- Dedicated `/my-products` page- **Notifications**: Sonner



### Mobile Responsiveness- **API**: DummyJSON- Redux Toolkit 2.2

- Hamburger menu on mobile/tablet

- Responsive grid (1-4 columns)

- Touch-friendly buttons

- Optimized layouts for all screen sizes## 🎯 How It Works- Tailwind CSS 3.4- ⚡ **Loading States** - Professional loading indicators everywhere- **Framework**: Next.js 14 with App Router



### State Persistence

- Favorites saved in localStorage

- Theme preference saved### Authentication (Mock System)- Shadcn UI Components

- Login state persisted

- Created products stored locally- Any username/password works for demo



## 🐛 Troubleshooting- State saved in localStorage- DummyJSON API- 🎯 **Error Handling** - Comprehensive error states with user feedback- **Language**: TypeScript



### Build Errors- Login required for create/edit/delete

```bash

# Clear .next folder

rmdir /s .next  # Windows

rm -rf .next    # Mac/Linux### Product Management



# Reinstall dependencies- **View All**: API products + your created products## 🎯 How It Works- 📱 **Responsive Layout** - Mobile-first, fully responsive design- **Styling**: Tailwind CSS

del node_modules -Force  # Windows

rm -rf node_modules      # Mac/Linux- **Create**: POST to DummyJSON API + save locally

npm install

```- **Edit**: PATCH to API + update localStorage (YOUR products only)



### Port Already in Use- **Delete**: DELETE from API + remove from localStorage (YOUR products only)

```bash

# Development will auto-switch to 3001 if 3000 is busy### Authentication- 👤 **User Dashboard** - Statistics for logged-in users- **UI Components**: Shadcn UI (Radix UI primitives)

npm run dev

```### Why Local Storage?



### ESLint ErrorsDummyJSON is a mock API that doesn't persist data. We use localStorage to simulate a real database for your created products.- Mock system: any username/password works

All ESLint errors have been fixed. If you encounter new ones:

```bash

npm run lint

```## 📁 Project Structure- State persists in localStorage- 🏷️ **Product Ownership Tracking** - Visual indicators for user-created products- **State Management**: Redux Toolkit



### Hydration Errors

Fixed! localStorage is only accessed client-side.

```

## 🎓 What You'll Learn

ecommerce-shop/

This project demonstrates:

- ✅ Next.js 14 App Router architecture├── .github/### Product Management- 💾 **State Persistence** - All data persists with localStorage- **API Client**: Axios

- ✅ TypeScript best practices

- ✅ Redux Toolkit state management│   └── workflows/

- ✅ RESTful API integration

- ✅ CRUD operations implementation│       └── deploy.yml          # GitHub Actions deployment- **View**: All products from API + your created products

- ✅ Form validation and error handling

- ✅ Responsive design with Tailwind CSS├── src/

- ✅ Component composition with Shadcn UI

- ✅ Client-side data persistence│   ├── app/                    # Next.js pages- **Create**: Add new products (saved locally)- **Notifications**: Sonner

- ✅ Protected routes and authentication

- ✅ Toast notifications and UX feedback│   │   ├── favorites/



## 📝 API Integration│   │   ├── login/- **Edit**: Only YOUR products (marked with crown badge)



Uses all 8 DummyJSON product endpoints:│   │   ├── my-products/



| Endpoint | Method | Usage |│   │   ├── product/- **Delete**: Only YOUR products (confirmation required)## 🚀 Tech Stack- **Icons**: Lucide React

|----------|--------|-------|

| `/products?limit=10&skip=0` | GET | Product listing with pagination |│   │   │   ├── [id]/

| `/products/search?q=query` | GET | Search functionality |

| `/products/:id` | GET | Product details page |│   │   │   │   ├── page.tsx    # Product detail

| `/products/categories` | GET | Category dropdown |

| `/products/category/:name` | GET | Filter by category |│   │   │   │   └── edit/       # Edit product

| `/products/add` | POST | Create new product |

| `/products/:id` | PUT | Update product |│   │   │   └── create/         # Create product### Why "Failed to update product" Error?

| `/products/:id` | DELETE | Delete product |

│   │   ├── layout.tsx

All implemented in `src/lib/api.ts` using Axios.

│   │   ├── page.tsx            # Home (product listing)You're trying to edit a product you don't own! Only products YOU created can be edited.

## 🔐 Security Notes

│   │   └── globals.css

⚠️ **For Development Only**:

- Mock authentication (not secure)│   ├── components/| Requirement | Implementation |## Getting Started

- No password hashing

- localStorage for sensitive data│   │   ├── ui/                 # Shadcn UI components

- No CSRF protection

│   │   ├── AuthInitializer.tsx## 📁 Project Structure

For production, implement:

- Real authentication (JWT, OAuth)│   │   ├── Navbar.tsx

- Secure backend API

- Database storage│   │   ├── ProductCard.tsx|------------|----------------|

- Proper security measures

│   │   ├── ProductForm.tsx

## 📄 License

│   │   └── ThemeProvider.tsx```

MIT License - Free to use for learning and personal projects.

│   ├── lib/

## 🙏 Acknowledgments

│   │   ├── api.ts              # API clientsrc/| **Framework** | ✅ Next.js 14 with App Router (`/src/app`) |### Prerequisites

- [Next.js](https://nextjs.org/) - React Framework

- [Redux Toolkit](https://redux-toolkit.js.org/) - State Management│   │   └── utils.ts

- [Shadcn UI](https://ui.shadcn.com/) - UI Components

- [DummyJSON](https://dummyjson.com/) - Mock API│   ├── providers/├── app/              # Next.js pages

- [Tailwind CSS](https://tailwindcss.com/) - Styling

- [Sonner](https://sonner.emilkowal.ski/) - Toast Notifications│   │   └── ReduxProvider.tsx



## 👤 Author│   ├── store/                  # Redux├── components/       # React components| **Language** | ✅ TypeScript |



**Brook**│   │   ├── authSlice.ts

- GitHub: [@Brooklss](https://github.com/Brooklss)

│   │   ├── favoritesSlice.ts├── store/            # Redux slices

---

│   │   ├── themeSlice.ts

Built with ❤️ using Next.js, TypeScript, and Redux Toolkit

│   │   ├── userProductsSlice.ts├── lib/              # API & utilities| **Styling** | ✅ Tailwind CSS |- Node.js 18+ 

⭐ **Deploy to Vercel for the best experience!**

│   │   ├── hooks.ts

│   │   └── store.ts└── types/            # TypeScript types

│   └── types/

│       ├── auth.ts```| **UI Components** | ✅ Shadcn UI |- npm or yarn

│       └── product.ts

├── .nojekyll                   # GitHub Pages config

├── DEPLOYMENT.md               # Deployment guide

├── next.config.js              # Next.js config## 🚀 Deployment| **State Management** | ✅ Redux Toolkit |

└── package.json

```



## 🐛 Common IssuesConfigured for GitHub Pages with static export. Push to main branch to auto-deploy.| **API Client** | ✅ Axios |### Installation



### "Failed to update product"

**Cause**: Trying to edit a product you don't own

## 👤 Author| **Notifications** | ✅ Sonner |

**Solution**: Only edit products YOU created (with crown badge)



### GitHub Pages shows 404

**Cause**: Pages source not set to "GitHub Actions"Brook - [@Brooklss](https://github.com/Brooklss)| **API** | ✅ DummyJSON |1. Clone the repository:



**Solution**: 

1. Go to repo Settings → Pages```bash

2. Build and deployment → Source

3. Select **"GitHub Actions"**## 📋 Prerequisitesgit clone <repository-url>

4. Push a commit to trigger deployment

cd "eCommerce Shop"

### Images not loading locally

**Cause**: DummyJSON CDN issues or CORS- **Node.js** 18.0 or higher```



**Solution**: User-created products show placeholder icon (no external images needed)- **npm** or **yarn**



### Port 3000 in use- **Git**2. Install dependencies:

**Solution**: 

```bash```bash

npm run dev -- -p 3001

```## 🛠️ Installation & Setupnpm install



## 📝 Available Scripts```



```bash### 1. Clone the Repository

npm run dev          # Start dev server (localhost:3000)

npm run build        # Build for production (creates 'out' folder)```bash3. Run the development server:

npm start            # Start production server (requires build)

npm run lint         # Run ESLintgit clone https://github.com/Brooklss/ecommerce-shop.git```bash

```

cd ecommerce-shopnpm run dev

## 🚀 Deployment Options

``````

### Option 1: GitHub Pages (Current Setup)

- ✅ Free hosting

- ✅ Auto-deploys on push

- ❌ Static only (no server features)### 2. Install Dependencies4. Open [http://localhost:3000](http://localhost:3000) in your browser.

- See [DEPLOYMENT.md](DEPLOYMENT.md)

```bash

### Option 2: Vercel (Recommended)

- ✅ Full Next.js featuresnpm install## Project Structure

- ✅ Server-side rendering

- ✅ Image optimization```

- ✅ One-click deploy

- Visit [vercel.com](https://vercel.com)```



### Option 3: Netlify### 3. Run Development Serversrc/

- ✅ Static hosting

- ✅ Form handling```bash├── app/                    # Next.js App Router pages

- ✅ Serverless functions

- Visit [netlify.com](https://netlify.com)npm run dev│   ├── layout.tsx         # Root layout with providers



## 🤝 Contributing```│   ├── page.tsx           # Product listing page



This is a portfolio/demo project. Feel free to fork and customize!│   ├── favorites/         # Favorites page



## 📄 LicenseOpen [http://localhost:3000](http://localhost:3000) in your browser.│   ├── login/             # Login page



MIT License - Free to use for learning and portfolio purposes│   └── product/



## 👤 Author### 4. Build for Production│       ├── [id]/          # Product details page



**Brook**```bash│       ├── [id]/edit/     # Edit product page

- GitHub: [@Brooklss](https://github.com/Brooklss)

- Repository: [ecommerce-shop](https://github.com/Brooklss/ecommerce-shop)npm run build│       └── create/        # Create product page



## 🙏 Creditsnpm start├── components/



- [Next.js](https://nextjs.org/)```│   ├── ui/                # Shadcn UI components

- [DummyJSON](https://dummyjson.com/)

- [Shadcn UI](https://ui.shadcn.com/)│   ├── Navbar.tsx         # Navigation bar

- [Tailwind CSS](https://tailwindcss.com/)

- [Redux Toolkit](https://redux-toolkit.js.org/)## 📁 Project Structure│   ├── ProductCard.tsx    # Product card component



---│   ├── ProductForm.tsx    # Product create/edit form



**Note**: This is a demo application. Product data from DummyJSON API is not persistent. User-created products are stored in browser localStorage.```│   ├── ThemeProvider.tsx  # Theme initialization


ecommerce-shop/│   └── AuthInitializer.tsx # Auth state initialization

├── src/├── lib/

│   ├── app/                      # Next.js App Router│   ├── api.ts             # API service layer (DummyJSON)

│   │   ├── page.tsx              # Product listing (/)│   └── utils.ts           # Utility functions

│   │   ├── layout.tsx            # Root layout├── store/

│   │   ├── globals.css           # Global styles│   ├── store.ts           # Redux store configuration

│   │   ├── favorites/│   ├── hooks.ts           # Typed Redux hooks

│   │   │   └── page.tsx          # Favorites page│   ├── favoritesSlice.ts  # Favorites state management

│   │   ├── login/│   ├── themeSlice.ts      # Theme state management

│   │   │   └── page.tsx          # Login page│   └── authSlice.ts       # Authentication state management

│   │   └── product/├── types/

│   │       ├── [id]/│   ├── product.ts         # Product type definitions

│   │       │   ├── page.tsx      # Product details│   └── auth.ts            # Auth type definitions

│   │       │   └── edit/└── providers/

│   │       │       └── page.tsx  # Edit product    └── ReduxProvider.tsx  # Redux provider wrapper

│   │       └── create/```

│   │           └── page.tsx      # Create product

│   ├── components/## API Integration

│   │   ├── Navbar.tsx            # Navigation

│   │   ├── ProductCard.tsx       # Product cardThis project uses the [DummyJSON API](https://dummyjson.com/docs/products) for product data:

│   │   ├── ProductForm.tsx       # Create/Edit form

│   │   ├── AuthInitializer.tsx   # Auth initialization- `GET /products` - Get all products (with pagination)

│   │   ├── ThemeProvider.tsx     # Dark mode- `GET /products/search?q=query` - Search products

│   │   └── ui/                   # Shadcn components- `GET /products/:id` - Get product by ID

│   ├── store/                    # Redux Toolkit- `POST /products/add` - Create new product

│   │   ├── store.ts- `PUT /products/:id` - Update product

│   │   ├── hooks.ts- `DELETE /products/:id` - Delete product

│   │   ├── authSlice.ts

│   │   ├── favoritesSlice.ts## Usage

│   │   ├── themeSlice.ts

│   │   └── userProductsSlice.ts### Viewing Products

│   ├── lib/- Navigate to the home page to see all products

│   │   ├── api.ts                # Axios API client- Use the search bar to find specific products

│   │   └── utils.ts              # Utilities- Scroll down to load more products automatically

│   ├── types/

│   │   ├── product.ts### Managing Favorites

│   │   └── auth.ts- Click the heart icon on any product card to add/remove from favorites

│   └── providers/- View all favorites on the Favorites page

│       └── ReduxProvider.tsx

├── package.json### Creating/Editing Products

├── tsconfig.json1. Log in using the Login page (any credentials work for demo)

├── tailwind.config.ts2. Click "Create Product" in the navbar to add a new product

└── next.config.js3. Click "Edit" on any product detail page to modify a product

```4. Click "Delete" to remove a product (confirmation required)



## 🎯 Features Implementation### Dark Mode

- Click the moon/sun icon in the navbar to toggle dark mode

### 1. Product Listing Page (`/`)- Theme preference is saved in localStorage

✅ **Requirements Met:**

- Fetches from `https://dummyjson.com/products`## Key Implementation Details

- Shows: title, price, rating, category, image

- "Add to Favorite" button (Redux state)### State Management

- Infinite scroll pagination (`?limit=10&skip=10`)- **Favorites**: Managed with Redux Toolkit, persisted in memory

- Search bar (no page refresh)- **Theme**: Managed with Redux Toolkit, persisted in localStorage

- Category filter dropdown- **Authentication**: Managed with Redux Toolkit, persisted in localStorage



✅ **Bonus Implemented:**### API Service

- User statistics dashboard (logged-in users)- Centralized API service using Axios

- "My Products" section- Error handling with try-catch blocks

- Visual "Your Product" badges- Type-safe API responses

- Loading states

- Empty states### UI Components

- Built with Shadcn UI for consistency

### 2. Product Details Page (`/product/[id]`)- Fully responsive design

✅ **Requirements Met:**- Accessible components using Radix UI primitives

- Fetches from `/products/:id`

- Shows: detailed info, price, images, brand, stock, rating### Performance

- Add to favorites- Image optimization with Next.js Image component

- Edit button (logged-in users, owned products)- Infinite scroll pagination for better performance

- Delete button with confirmation- Optimistic UI updates where appropriate



### 3. Favorites Page (`/favorites`)## Build for Production

✅ **Requirements Met:**

- Redux Toolkit manages favorite list```bash

- Add/remove functionalitynpm run build

- Persistent storage (localStorage)npm start

- Shows favorite count```



### 4. Create Product (`/product/create`)## Future Enhancements

✅ **Requirements Met:**

- Form with fields: title, description, price, stock, brand, category- [ ] Shopping cart functionality

- POST to `https://dummyjson.com/products/add`- [ ] User reviews and ratings

- Protected route (requires login)- [ ] Product filtering by category

- Tracks created products- [ ] Advanced search with filters

- Success toast notification- [ ] Product image upload

- [ ] Order management

### 5. Edit Product (`/product/[id]/edit`)- [ ] Payment integration

✅ **Requirements Met:**

- Pre-filled form with existing data## License

- PUT to `https://dummyjson.com/products/:id`

- Protected routeThis project is for educational purposes.

- Only for owned products

## Acknowledgments

### 6. Delete Product

✅ **Requirements Met:**- [DummyJSON](https://dummyjson.com) for providing the free API

- DELETE to `https://dummyjson.com/products/:id`- [Shadcn UI](https://ui.shadcn.com) for the component library

- Confirmation dialog before deletion- [Next.js](https://nextjs.org) for the framework

- Protected feature

- Updates state automatically

### 7. Authentication
✅ **Bonus Implemented:**
- Login page (`/login`)
- Mock authentication (any credentials work)
- Protected routes
- Persistent login state
- User-specific features

## 🔌 API Integration (All 8 Endpoints)

| # | Endpoint | Method | Implementation |
|---|----------|--------|----------------|
| 1 | `/products?limit=10&skip=0` | GET | ✅ Product listing |
| 2 | `/products/search?q=query` | GET | ✅ Search feature |
| 3 | `/products/:id` | GET | ✅ Product details |
| 4 | `/products/categories` | GET | ✅ Category filter |
| 5 | `/products/category/:category` | GET | ✅ Filter by category |
| 6 | `/products/add` | POST | ✅ Create product |
| 7 | `/products/:id` | PUT | ✅ Update product |
| 8 | `/products/:id` | DELETE | ✅ Delete product |

All implemented in `src/lib/api.ts` using Axios.

## 📊 Evaluation Criteria Checklist

### Code Organization
- ✅ Clean folder structure (`/src/app`, `/src/components`, `/src/store`)
- ✅ Reusable components (`ProductCard`, `ProductForm`, UI components)
- ✅ Separation of concerns (API layer, types, utilities)

### React & Hooks
- ✅ Proper use of `useState`, `useEffect`, `useRef`
- ✅ Custom typed Redux hooks (`useAppSelector`, `useAppDispatch`)
- ✅ Optimized re-renders with proper dependencies

### Redux Toolkit
- ✅ Multiple slices (auth, favorites, theme, userProducts)
- ✅ Proper state management
- ✅ localStorage persistence
- ✅ Typed reducers and actions

### Shadcn UI
- ✅ Button, Card, Input, Label, Textarea components
- ✅ Dialog, Select components
- ✅ Consistent styling
- ✅ Accessible components

### Pagination
- ✅ Infinite scroll with `?limit=10&skip=10`
- ✅ Loading states
- ✅ "No more products" indicator

### CRUD Operations
- ✅ **Create**: Form validation, API integration, success feedback
- ✅ **Read**: Product listing, details, search, filter
- ✅ **Update**: Pre-filled forms, proper PUT requests
- ✅ **Delete**: Confirmation dialog, proper DELETE requests

### Error Handling
- ✅ Try-catch blocks for all API calls
- ✅ Toast notifications for errors
- ✅ User-friendly error messages
- ✅ Loading states everywhere

### UI/UX Quality
- ✅ Professional design
- ✅ Smooth animations
- ✅ Hover effects
- ✅ Loading skeletons
- ✅ Empty states
- ✅ Confirmation dialogs

### Responsiveness
- ✅ Mobile-first design
- ✅ Grid layouts (1-4 columns)
- ✅ Flexible navigation
- ✅ Touch-friendly buttons

## 🎨 User Experience Features

### When NOT Logged In:
- Browse all products
- Search and filter
- View product details
- Add to favorites (local storage)

### When Logged In:
- All of the above PLUS:
- User statistics dashboard (products created, favorites count)
- "My Products" section
- Create new products
- Edit your products (quick access via card edit button)
- Delete your products
- Visual "Your Product" badges with crown icon

## 🧪 Testing the Application

### Test Complete CRUD Flow:

1. **CREATE**: 
   ```
   Login → Click "Create Product" → Fill form → Submit
   ```

2. **READ**: 
   ```
   Browse home page → Use search/filter → Click product for details
   ```

3. **UPDATE**:
   ```
   Edit button on your product card → Modify → Save
   ```

4. **DELETE**:
   ```
   Product details → Delete button → Confirm
   ```

### Test User Features:
- Login/Logout
- Add/remove favorites
- Toggle dark mode
- Create multiple products
- View statistics dashboard

## 🐛 Troubleshooting

### SWC Binary Error (Windows)
```bash
npm install @next/swc-win32-x64-msvc --save-dev
```

### Port Already in Use
```bash
npx kill-port 3000
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📈 Future Enhancements

- [ ] Shopping cart
- [ ] Real authentication with JWT
- [ ] Product reviews
- [ ] Order history
- [ ] Payment integration
- [ ] Image upload
- [ ] Advanced filters
- [ ] Wishlist export

## 👨‍💻 Development Best Practices

### Followed:
- ✅ TypeScript for type safety
- ✅ Component-based architecture
- ✅ Reusable custom hooks
- ✅ Centralized API service
- ✅ Error boundaries
- ✅ Loading states
- ✅ Proper state management
- ✅ Responsive design
- ✅ Accessibility (semantic HTML, ARIA labels)

## 📄 License

MIT License - Open source

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [Redux Toolkit](https://redux-toolkit.js.org/) - State Management
- [Shadcn UI](https://ui.shadcn.com/) - UI Components
- [DummyJSON](https://dummyjson.com/) - Mock API
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Sonner](https://sonner.emilkowal.ski/) - Toast Notifications

## 📞 Contact

**Developer**: Brook  
**GitHub**: [@Brooklss](https://github.com/Brooklss)  
**Repository**: [ecommerce-shop](https://github.com/Brooklss/ecommerce-shop)

---

✨ **All Requirements Met** | Built with Next.js 14, TypeScript, Redux Toolkit & Tailwind CSS
