# eCommerce Shop

A modern eCommerce application built with Next.js, TypeScript, Tailwind CSS, Shadcn UI, and Redux Toolkit. This project demonstrates real-world frontend development skills including CRUD operations, state management, API integration, and responsive design.

## Features

### Core Features
- ✅ **Product Listing Page** - Display products with pagination, search, and favorite functionality
- ✅ **Product Details Page** - View detailed product information
- ✅ **Favorites Page** - Manage favorite products using Redux
- ✅ **Create Product** - Add new products to the store
- ✅ **Edit Product** - Update existing product information
- ✅ **Delete Product** - Remove products with confirmation dialog
- ✅ **Search Functionality** - Search products by name
- ✅ **Infinite Scroll Pagination** - Load more products on scroll

### Bonus Features
- ✅ **Toast Notifications** - User feedback using Sonner
- ✅ **Loading States** - Proper loading indicators throughout the app
- ✅ **Error Handling** - Comprehensive error handling with user-friendly messages
- ✅ **Responsive Design** - Mobile-first responsive layout
- ✅ **Dark Mode Toggle** - Switch between light and dark themes using Redux
- ✅ **Mock Authentication** - Login page with persistent authentication state

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI primitives)
- **State Management**: Redux Toolkit
- **API Client**: Axios
- **Notifications**: Sonner
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "eCommerce Shop"
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Product listing page
│   ├── favorites/         # Favorites page
│   ├── login/             # Login page
│   └── product/
│       ├── [id]/          # Product details page
│       ├── [id]/edit/     # Edit product page
│       └── create/        # Create product page
├── components/
│   ├── ui/                # Shadcn UI components
│   ├── Navbar.tsx         # Navigation bar
│   ├── ProductCard.tsx    # Product card component
│   ├── ProductForm.tsx    # Product create/edit form
│   ├── ThemeProvider.tsx  # Theme initialization
│   └── AuthInitializer.tsx # Auth state initialization
├── lib/
│   ├── api.ts             # API service layer (DummyJSON)
│   └── utils.ts           # Utility functions
├── store/
│   ├── store.ts           # Redux store configuration
│   ├── hooks.ts           # Typed Redux hooks
│   ├── favoritesSlice.ts  # Favorites state management
│   ├── themeSlice.ts      # Theme state management
│   └── authSlice.ts       # Authentication state management
├── types/
│   ├── product.ts         # Product type definitions
│   └── auth.ts            # Auth type definitions
└── providers/
    └── ReduxProvider.tsx  # Redux provider wrapper
```

## API Integration

This project uses the [DummyJSON API](https://dummyjson.com/docs/products) for product data:

- `GET /products` - Get all products (with pagination)
- `GET /products/search?q=query` - Search products
- `GET /products/:id` - Get product by ID
- `POST /products/add` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

## Usage

### Viewing Products
- Navigate to the home page to see all products
- Use the search bar to find specific products
- Scroll down to load more products automatically

### Managing Favorites
- Click the heart icon on any product card to add/remove from favorites
- View all favorites on the Favorites page

### Creating/Editing Products
1. Log in using the Login page (any credentials work for demo)
2. Click "Create Product" in the navbar to add a new product
3. Click "Edit" on any product detail page to modify a product
4. Click "Delete" to remove a product (confirmation required)

### Dark Mode
- Click the moon/sun icon in the navbar to toggle dark mode
- Theme preference is saved in localStorage

## Key Implementation Details

### State Management
- **Favorites**: Managed with Redux Toolkit, persisted in memory
- **Theme**: Managed with Redux Toolkit, persisted in localStorage
- **Authentication**: Managed with Redux Toolkit, persisted in localStorage

### API Service
- Centralized API service using Axios
- Error handling with try-catch blocks
- Type-safe API responses

### UI Components
- Built with Shadcn UI for consistency
- Fully responsive design
- Accessible components using Radix UI primitives

### Performance
- Image optimization with Next.js Image component
- Infinite scroll pagination for better performance
- Optimistic UI updates where appropriate

## Build for Production

```bash
npm run build
npm start
```

## Future Enhancements

- [ ] Shopping cart functionality
- [ ] User reviews and ratings
- [ ] Product filtering by category
- [ ] Advanced search with filters
- [ ] Product image upload
- [ ] Order management
- [ ] Payment integration

## License

This project is for educational purposes.

## Acknowledgments

- [DummyJSON](https://dummyjson.com) for providing the free API
- [Shadcn UI](https://ui.shadcn.com) for the component library
- [Next.js](https://nextjs.org) for the framework

