'use client'

import { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { Product } from '@/types/product'
import { productApi } from '@/lib/api'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Package, Plus, Loader2 } from 'lucide-react'

export default function MyProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const createdProductIds = useAppSelector((state) => state.userProducts.createdProductIds)
  const createdProducts = useAppSelector((state) => state.userProducts.createdProducts)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    const fetchProducts = async () => {
      try {
        setLoading(true)
        // Fetch all products to find the ones created by user
        const response = await productApi.getProducts(100, 0)
        const userProducts = response.products.filter(p => 
          createdProductIds.includes(p.id)
        )
        
        // Combine with locally stored created products
        const allUserProducts = [
          ...userProducts,
          ...createdProducts.filter(cp => !userProducts.some(p => p.id === cp.id))
        ]
        
        setProducts(allUserProducts)
      } catch (error) {
        console.error('Error fetching user products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [isAuthenticated, createdProductIds, createdProducts, router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Package className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">My Products</h1>
            <p className="text-muted-foreground">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>
        </div>
        
        <Button onClick={() => router.push('/product/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Product
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <Package className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">No products yet</h2>
          <p className="text-muted-foreground mb-8">
            Create your first product to get started!
          </p>
          <Button onClick={() => router.push('/product/create')} size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Create Product
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
