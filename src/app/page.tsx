'use client'

import { useEffect, useState, useRef } from 'react'
import { Product } from '@/types/product'
import { productApi } from '@/lib/api'
import ProductCard from '@/components/ProductCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Loader2, Package, Heart, TrendingUp, Filter, ShoppingBag, Sparkles, ArrowRight, Star } from 'lucide-react'
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
  const productsSectionRef = useRef<HTMLDivElement>(null)

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
      // Priority: Search + Category > Search only > Category only > All products
      if (query && query.trim() && category && category !== 'all') {
        // Search within category - get category products then filter by search
        const categoryResponse = await productApi.getProductsByCategory(category)
        const searchResults = categoryResponse.products.filter(p => 
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
        )
        response = { ...categoryResponse, products: searchResults }
      } else if (query && query.trim()) {
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
    if (searchMode && categoryMode) {
      // Both search and category active
      fetchProducts(0, activeSearchQuery, selectedCategory)
    } else if (searchMode) {
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
      // Keep category filter active if selected
    } else {
      setActiveSearchQuery('')
      setSearchMode(false)
    }
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setActiveSearchQuery('')
    setSearchMode(false)
    // Keep category filter if it was active
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    if (value === 'all') {
      setCategoryMode(false)
      // Keep search active if it was active
    } else {
      setCategoryMode(true)
      // Keep search active if it was active
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

  const scrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  if (loading && products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-amber-100/60 to-orange-100/40 dark:from-primary/15 dark:via-amber-500/10 dark:to-orange-500/10 min-h-[calc(100vh-4rem)] flex items-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
        <div className="absolute -top-16 -left-10 w-64 h-64 bg-primary/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-300/30 dark:bg-amber-500/20 blur-3xl rounded-full"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-white/5 border border-primary/20 mb-2 animate-in fade-in slide-in-from-top-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Crafted for a Luxe Shopping Story</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-in fade-in slide-in-from-bottom-4 delay-150">
                <span className="bg-gradient-to-r from-primary via-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Discover, Curate, Indulge.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl animate-in fade-in slide-in-from-bottom-4 delay-300">
                Bcommerce blends immersive storytelling with powerful commerce tools so you can explore
                vibrant collections, manage your own storefront, and shop securely from anywhere.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-4 delay-500">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                  onClick={scrollToProducts}
                >
                  Browse Collections
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                {!isAuthenticated && (
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 py-6 rounded-full border-2 hover:bg-primary/5"
                    onClick={() => router.push('/login')}
                  >
                    Launch Dashboard
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 animate-in fade-in slide-in-from-bottom-4 delay-700">
                <div>
                  <p className="text-3xl font-bold text-primary">{products.length}+</p>
                  <p className="text-sm text-muted-foreground">Products</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">{categories.length}+</p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-muted-foreground">Support</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">100%</p>
                  <p className="text-sm text-muted-foreground">Secure</p>
                </div>
              </div>
            </div>

            <div className="relative animate-in fade-in slide-in-from-bottom-4 delay-500">
              <div className="absolute -top-10 -left-4 w-36 h-36 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-amber-950/50 dark:via-orange-950/50 dark:to-amber-900/50 rounded-3xl border-2 border-amber-200/50 dark:border-amber-500/30 backdrop-blur-xl shadow-[0_20px_60px_rgba(245,158,11,0.3)] p-5 animate-float z-20 hover:shadow-[0_25px_70px_rgba(245,158,11,0.4)] transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide">Trending</span>
                  <div className="p-1.5 rounded-lg bg-amber-400/20 dark:bg-amber-500/30">
                    <Star className="h-4 w-4 text-amber-600 dark:text-amber-400 fill-amber-500 dark:fill-amber-400" />
                  </div>
                </div>
                <p className="text-base font-bold text-foreground mb-1">Editors' Luxe Picks</p>
                <p className="text-xs text-muted-foreground font-medium">Curated daily</p>
              </div>

              <div className="bg-gradient-to-br from-white/90 via-white/80 to-white/70 dark:from-slate-900/90 dark:via-slate-800/80 dark:to-slate-900/70 border-2 border-white/60 dark:border-white/20 backdrop-blur-2xl rounded-[32px] p-8 shadow-[0_30px_80px_rgba(15,118,110,0.2)] dark:shadow-[0_30px_80px_rgba(15,118,110,0.3)] relative z-10 hover:shadow-[0_40px_100px_rgba(15,118,110,0.25)] dark:hover:shadow-[0_40px_100px_rgba(15,118,110,0.4)] transition-all duration-300">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-primary/10 dark:border-primary/20">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Live Insights</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-primary via-emerald-500 to-primary bg-clip-text text-transparent">Marketplace Pulse</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 via-emerald-500/20 to-primary/20 dark:from-primary/30 dark:via-emerald-500/30 dark:to-primary/30 border border-primary/30 dark:border-primary/40 shadow-lg">
                    <TrendingUp className="h-6 w-6 text-primary dark:text-emerald-400" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-50/50 to-primary/10 dark:from-emerald-950/30 dark:to-primary/20 border border-emerald-200/30 dark:border-emerald-500/20 hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <div className="p-3.5 rounded-xl bg-gradient-to-br from-primary via-emerald-500 to-emerald-400 text-white shadow-lg group-hover:scale-110 transition-transform">
                        <ShoppingBag className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">New Launches</p>
                        <p className="text-xs text-muted-foreground font-medium">Fresh arrivals weekly</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">+28%</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-orange-50/50 to-amber-50/50 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-200/30 dark:border-orange-500/20 hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 text-white shadow-lg group-hover:scale-110 transition-transform">
                        <Heart className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">Wishlist Saves</p>
                        <p className="text-xs text-muted-foreground font-medium">Loved by shoppers</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">{favorites.length}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-sky-50/50 to-primary/10 dark:from-sky-950/30 dark:to-primary/20 border border-sky-200/30 dark:border-sky-500/20 hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <div className="p-3.5 rounded-xl bg-gradient-to-br from-sky-400 via-primary to-primary text-white shadow-lg group-hover:scale-110 transition-transform">
                        <Package className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">Creator Items</p>
                        <p className="text-xs text-muted-foreground font-medium">Owned by you</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">{createdProductIds.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section ref={productsSectionRef} className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-3 sm:px-4">
      {/* User Stats Dashboard for Logged In Users */}
      {isAuthenticated && (
        <div className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              Welcome back, {user?.username}!
            </span>{' '}
            <span role="img" aria-label="wave">👋</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <Card 
              className="border-2 border-blue-200/50 dark:border-blue-500/30 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 dark:from-blue-950/80 dark:via-sky-950/80 dark:to-blue-900/80 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1 group overflow-hidden relative"
              onClick={() => router.push('/my-products')}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <CardContent className="p-5 sm:p-7 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Your Products</p>
                    <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-sky-600 to-blue-600 dark:from-blue-400 dark:via-sky-400 dark:to-blue-400 bg-clip-text text-transparent mb-2">{createdProductIds.length}</p>
                    <p className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Click to manage →</p>
                  </div>
                  <div className="p-4 sm:p-5 bg-gradient-to-br from-blue-500/20 to-sky-500/20 dark:from-blue-500/30 dark:to-sky-500/30 rounded-2xl border border-blue-300/30 dark:border-blue-500/30 shadow-lg group-hover:scale-110 transition-transform">
                    <Package className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-red-200/50 dark:border-red-500/30 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 dark:from-red-950/80 dark:via-pink-950/80 dark:to-rose-900/80 transform hover:scale-[1.02] hover:-translate-y-1 group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/10 dark:bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <CardContent className="p-5 sm:p-7 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Favorites</p>
                    <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 dark:from-red-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent mb-2">{favorites.length}</p>
                    <p className="text-xs text-red-600/70 dark:text-red-400/70 font-medium">Saved items</p>
                  </div>
                  <div className="p-4 sm:p-5 bg-gradient-to-br from-red-500/20 to-pink-500/20 dark:from-red-500/30 dark:to-pink-500/30 rounded-2xl border border-red-300/30 dark:border-red-500/30 shadow-lg group-hover:scale-110 transition-transform">
                    <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-green-200/50 dark:border-green-500/30 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 dark:from-green-950/80 dark:via-emerald-950/80 dark:to-teal-900/80 transform hover:scale-[1.02] hover:-translate-y-1 group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/10 dark:bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <CardContent className="p-5 sm:p-7 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Total Products</p>
                    <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-2">{products.length}</p>
                    <p className="text-xs text-green-600/70 dark:text-green-400/70 font-medium">Available now</p>
                  </div>
                  <div className="p-4 sm:p-5 bg-gradient-to-br from-green-500/20 to-emerald-500/20 dark:from-green-500/30 dark:to-emerald-500/30 rounded-2xl border border-green-300/30 dark:border-green-500/30 shadow-lg group-hover:scale-110 transition-transform">
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
                      : 'Featured Products'}
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
      </section>
    </div>
  )
}
