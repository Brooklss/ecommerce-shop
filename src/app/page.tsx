'use client'

import { useEffect, useState, useRef } from 'react'
import { Product } from '@/types/product'
import { productApi } from '@/lib/api'
import ProductCard from '@/components/ProductCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Loader2, Package, Heart, TrendingUp, Filter } from 'lucide-react'
import { toast } from 'sonner'
import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'

export default function Home() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [skip, setSkip] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSearchQuery, setActiveSearchQuery] = useState('')
  const [searchMode, setSearchMode] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [categoryMode, setCategoryMode] = useState(false)
  const fetchingRef = useRef(false)

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const user = useAppSelector((state) => state.auth.user)
  const favorites = useAppSelector((state) => state.favorites.products)
  const createdProductIds = useAppSelector((state) => state.userProducts.createdProductIds)
  const createdProducts = useAppSelector((state) => state.userProducts.createdProducts)

  const limit = 10

  useEffect(() => {
    // Fetch categories on mount
    const fetchCategories = async () => {
      try {
        const cats = await productApi.getCategories()
        // Filter and ensure all categories are strings
        const validCats = cats.filter(cat => typeof cat === 'string' || cat)
          .map(cat => String(cat))
        setCategories(validCats)
      } catch (error) {
        console.error('Error fetching categories:', error)
        toast.error('Failed to load categories')
      }
    }
    fetchCategories()
  }, [])

  const fetchProducts = async (skipValue: number, query?: string, category?: string) => {
    if (fetchingRef.current) return
    fetchingRef.current = true

    try {
      if (skipValue === 0) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }

      let response
      if (query && query.trim()) {
        response = await productApi.searchProducts(query)
      } else if (category && category !== 'all') {
        response = await productApi.getProductsByCategory(category)
      } else {
        response = await productApi.getProducts(limit, skipValue)
      }

      if (skipValue === 0) {
        setProducts(response.products)
      } else {
        setProducts(prev => [...prev, ...response.products])
      }

      setHasMore(response.products.length === limit && !query && !category)
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
      setLoadingMore(false)
      fetchingRef.current = false
    }
  }

  // Initial load and search/category filter
  useEffect(() => {
    setSkip(0)
    if (searchMode) {
      fetchProducts(0, activeSearchQuery)
    } else if (categoryMode) {
      fetchProducts(0, undefined, selectedCategory)
    } else {
      fetchProducts(0)
    }
  }, [searchMode, activeSearchQuery, categoryMode, selectedCategory])

  // Load more on scroll
  useEffect(() => {
    if ((!searchMode && !categoryMode) && skip > 0) {
      fetchProducts(skip)
    }
  }, [skip, searchMode, categoryMode])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setActiveSearchQuery(searchQuery)
      setSearchMode(true)
      setCategoryMode(false)
      setSelectedCategory('all')
    } else {
      setActiveSearchQuery('')
      setSearchMode(false)
    }
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setActiveSearchQuery('')
    setSearchMode(false)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    if (value === 'all') {
      setCategoryMode(false)
      setSearchMode(false)
      setActiveSearchQuery('')
      setSearchQuery('')
    } else {
      setCategoryMode(true)
      setSearchMode(false)
      setActiveSearchQuery('')
      setSearchQuery('')
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (searchMode || categoryMode || loadingMore || !hasMore || fetchingRef.current) return

      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        setSkip(prev => prev + limit)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [searchMode, categoryMode, loadingMore, hasMore, limit])

  // Combine API products that match created IDs with locally stored created products
  const myProducts = [
    ...products.filter(p => createdProductIds.includes(p.id)),
    ...createdProducts.filter(cp => !products.some(p => p.id === cp.id))
  ]

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
      {/* User Stats Dashboard for Logged In Users */}
      {isAuthenticated && (
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Welcome back, {user?.username}!
            </span>{' '}
            <span role="img" aria-label="wave">👋</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <Card 
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 cursor-pointer transform hover:scale-105"
              onClick={() => router.push('/my-products')}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">Your Products</p>
                    <p className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">{createdProductIds.length}</p>
                    <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1">Click to manage</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-blue-500/10 rounded-full">
                    <Package className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-950 dark:to-pink-900">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">Favorites</p>
                    <p className="text-3xl sm:text-4xl font-bold text-red-600 dark:text-red-400">{favorites.length}</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-red-500/10 rounded-full">
                    <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">Total Products</p>
                    <p className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400">{products.length}</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-green-500/10 rounded-full">
                    <TrendingUp className="h-8 w-8 sm:h-10 sm:w-10 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Search and Filter Section */}
      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 max-w-5xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base shadow-md border-2 focus:border-primary transition-all"
            />
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full sm:w-[200px] h-11 sm:h-12 shadow-md border-2">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => {
                  const categoryStr = typeof cat === 'string' ? cat : String(cat)
                  const displayName = categoryStr.replace(/-/g, ' ').split(' ').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')
                  return (
                    <SelectItem key={categoryStr} value={categoryStr}>
                      {displayName}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} className="h-11 sm:h-12 px-6 sm:px-8 shadow-md hover:shadow-lg transition-all">
              Search
            </Button>
            {(searchMode || categoryMode) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  handleClearSearch()
                  setSelectedCategory('all')
                  setCategoryMode(false)
                }}
                className="h-11 sm:h-12 shadow-md"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* My Products Section for Logged In Users */}
      {isAuthenticated && myProducts.length > 0 && !searchMode && !categoryMode && (
        <div className="mb-12 sm:mb-16">
          <div 
            className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6 cursor-pointer group w-fit"
            onClick={() => router.push('/my-products')}
          >
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Package className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold group-hover:text-primary transition-colors">My Products</h2>
            <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {myProducts.length}
            </span>
            <span className="hidden sm:inline text-sm text-muted-foreground group-hover:text-primary transition-colors">
              Click to manage →
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {myProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* All Products Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">
            {searchMode 
              ? `Search Results` 
              : categoryMode 
                ? `${selectedCategory.replace(/-/g, ' ').split(' ').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}`
                : isAuthenticated && myProducts.length > 0 
                  ? 'All Products' 
                  : 'Products'}
          </h2>
          {(searchMode || categoryMode) && (
            <p className="text-sm sm:text-base text-muted-foreground">
              {products.length} {products.length === 1 ? 'product' : 'products'} found
            </p>
          )}
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <p className="text-base sm:text-lg text-muted-foreground">No products found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {loadingMore && (
              <div className="flex justify-center mt-6 sm:mt-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}

            {!hasMore && products.length > 0 && !searchMode && !categoryMode && (
              <div className="text-center mt-6 sm:mt-8 text-sm sm:text-base text-muted-foreground">
                No more products to load
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
