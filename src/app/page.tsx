'use client'

import { useEffect, useState, useRef } from 'react'
import { Product } from '@/types/product'
import { productApi } from '@/lib/api'
import ProductCard from '@/components/ProductCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [skip, setSkip] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchMode, setSearchMode] = useState(false)
  const fetchingRef = useRef(false)

  const limit = 10

  const fetchProducts = async (skipValue: number, query?: string) => {
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
      } else {
        response = await productApi.getProducts(limit, skipValue)
      }

      if (skipValue === 0) {
        setProducts(response.products)
      } else {
        setProducts(prev => [...prev, ...response.products])
      }

      setHasMore(response.products.length === limit && !query)
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
      setLoadingMore(false)
      fetchingRef.current = false
    }
  }

  // Initial load and search
  useEffect(() => {
    setSkip(0)
    fetchProducts(0, searchMode ? searchQuery : undefined)
  }, [searchMode, searchQuery])

  // Load more on scroll
  useEffect(() => {
    if (!searchMode && skip > 0) {
      fetchProducts(skip)
    }
  }, [skip, searchMode])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchMode(true)
    } else {
      setSearchMode(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (searchMode || loadingMore || !hasMore || fetchingRef.current) return

      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        setSkip(prev => prev + limit)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [searchMode, loadingMore, hasMore, limit])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex gap-4 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {loadingMore && (
            <div className="flex justify-center mt-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}

          {!hasMore && products.length > 0 && !searchMode && (
            <div className="text-center mt-8 text-muted-foreground">
              No more products to load
            </div>
          )}
        </>
      )}
    </div>
  )
}
