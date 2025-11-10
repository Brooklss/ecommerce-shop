'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star, ShoppingBag, Edit, Trash2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { toggleFavorite } from '@/store/favoritesSlice'
import { removeCreatedProduct } from '@/store/userProductsSlice'
import { addToCart } from '@/store/cartSlice'
import { productApi } from '@/lib/api'
import { Product } from '@/types/product'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = parseInt(params.id as string)
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.favorites.products)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const createdProducts = useAppSelector((state) => state.userProducts.createdProducts)
  const createdProductIds = useAppSelector((state) => state.userProducts.createdProductIds)
  const isFavorite = favorites.some((p) => p.id === id)
  const isOwned = createdProductIds.includes(id) || createdProducts.some(p => p.id === id)

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, createdProducts])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      // First check if it's a locally created product
      const localProduct = createdProducts.find(p => p.id === id)
      if (localProduct) {
        setProduct(localProduct)
        // Fetch recommendations from same category
        if (localProduct.category) {
          fetchRecommendations(localProduct.category)
        }
      } else {
        // Otherwise fetch from API
        const data = await productApi.getProductById(id)
        setProduct(data)
        // Fetch recommendations from same category
        if (data.category) {
          fetchRecommendations(data.category)
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const fetchRecommendations = async (category: string) => {
    try {
      const response = await productApi.getProductsByCategory(category)
      // Filter out current product and get 4 random recommendations
      const filtered = response.products.filter(p => p.id !== id)
      const shuffled = filtered.sort(() => 0.5 - Math.random())
      setRecommendedProducts(shuffled.slice(0, 4))
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product))
      toast.success('Added to cart!')
    }
  }

  const handleToggleFavorite = () => {
    if (product) {
      dispatch(toggleFavorite(product))
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites')
    }
  }

  const handleDelete = async () => {
    try {
      setDeleting(true)
      
      // For locally created products, we just remove from store
      // For API products, call the API first
      if (isOwned) {
        try {
          await productApi.deleteProduct(id)
        } catch (error) {
          console.log('API delete failed (expected for local products):', error)
        }
        dispatch(removeCreatedProduct(id))
        toast.success('Product deleted successfully')
        router.push('/')
      } else {
        toast.error('You can only delete your own products')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Failed to delete product')
    } finally {
      setDeleting(false)
      setDeleteDialogOpen(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Product not found</p>
          <Button onClick={() => router.push('/')} className="mt-4">
            Back to Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-4 sm:mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div>
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full h-96 bg-muted rounded-lg">
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover rounded-lg"
                    priority
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <p className="text-lg text-muted-foreground font-medium">No Image Available</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-4">
              {product.images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative w-full h-20 sm:h-24 bg-muted rounded-lg">
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-start justify-between mb-4 gap-2">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-sm sm:text-base text-muted-foreground capitalize">{product.category}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleFavorite}
              className="flex-shrink-0"
            >
              <Heart
                className={cn(
                  'h-5 w-5 sm:h-6 sm:w-6',
                  isFavorite ? 'fill-red-500 text-red-500' : ''
                )}
              />
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl font-bold">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-base sm:text-lg text-muted-foreground line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
            {product.discountPercentage > 0 && (
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-xs sm:text-sm font-semibold">
                {product.discountPercentage}% off
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base mb-4 sm:mb-6">
            <div className="flex items-center">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {product.stock} in stock
            </span>
            {product.brand && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground capitalize">{product.brand}</span>
              </>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Description</h2>
            <p className="text-sm sm:text-base text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button className="flex-1 h-12" size="lg" onClick={handleAddToCart}>
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            {isAuthenticated && isOwned && (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => router.push(`/product/${id}/edit`)}
                  className="h-12"
                >
                  <Edit className="h-5 w-5 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={() => setDeleteDialogOpen(true)}
                  className="h-12"
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">You May Also Like</h2>
            <Link href={`/?category=${product.category}`}>
              <Button variant="ghost" size="sm">
                View All in {product.category}
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedProducts.map((recommendedProduct) => (
              <ProductCard key={recommendedProduct.id} product={recommendedProduct} />
            ))}
          </div>
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{product.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

