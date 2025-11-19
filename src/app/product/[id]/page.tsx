'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Heart, Star, ShoppingBag, Edit, Trash2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { toggleFavorite } from '@/store/favoritesSlice'
import { productApi } from '@/lib/api'
import { Product } from '@/types/product'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
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
  const isFavorite = favorites.some((p) => p.id === id)

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const data = await productApi.getProductById(id)
      setProduct(data)
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error('Failed to load product')
    } finally {
      setLoading(false)
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
      await productApi.deleteProduct(id)
      toast.success('Product deleted successfully')
      router.push('/')
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
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full h-96 bg-muted rounded-lg">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </CardContent>
          </Card>

          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {product.images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative w-full h-24 bg-muted rounded-lg">
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
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-muted-foreground capitalize">{product.category}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleFavorite}
            >
              <Heart
                className={cn(
                  'h-6 w-6',
                  isFavorite ? 'fill-red-500 text-red-500' : ''
                )}
              />
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-bold">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-lg text-muted-foreground line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
            {product.discountPercentage > 0 && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                {product.discountPercentage}% off
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
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
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1" size="lg">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            {isAuthenticated && (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => router.push(`/product/${id}/edit`)}
                >
                  <Edit className="h-5 w-5 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

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

