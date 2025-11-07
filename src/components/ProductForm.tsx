'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { productApi } from '@/lib/api'
import { Product } from '@/types/product'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addCreatedProduct, updateCreatedProduct } from '@/store/userProductsSlice'

interface ProductFormProps {
  productId?: number
  onSuccess?: () => void
}

export default function ProductForm({ productId, onSuccess }: ProductFormProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const createdProducts = useAppSelector((state) => state.userProducts.createdProducts)
  const createdProductIds = useAppSelector((state) => state.userProducts.createdProductIds)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(!!productId)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    brand: '',
    category: '',
  })

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to create or edit products')
      router.push('/login')
      return
    }

    if (productId) {
      // Check if user owns this product
      const isOwned = createdProductIds.includes(productId) || createdProducts.some(p => p.id === productId)
      if (!isOwned) {
        toast.error('You can only edit your own products. This product belongs to the store.')
        router.push('/')
        return
      }
      fetchProduct()
    }
  }, [productId, isAuthenticated, createdProductIds, createdProducts])

  const fetchProduct = async () => {
    try {
      setFetching(true)
      // First check if it's a locally created product
      const localProduct = createdProducts.find(p => p.id === productId)
      let product
      if (localProduct) {
        product = localProduct
      } else {
        // Otherwise fetch from API
        product = await productApi.getProductById(productId!)
      }
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
        brand: product.brand || '',
        category: product.category,
      })
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error('Failed to load product')
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)

      const productData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        brand: formData.brand,
        category: formData.category,
      }

      if (productId) {
        console.log('Updating product:', productId, productData)
        const updatedProduct = await productApi.updateProduct(productId, productData)
        console.log('API response:', updatedProduct)
        
        // Ensure the updated product has proper structure with the correct ID
        const productWithDefaults = {
          ...updatedProduct,
          id: productId, // Ensure ID is preserved
          thumbnail: updatedProduct.thumbnail || '',
          images: updatedProduct.images || [],
          rating: updatedProduct.rating || 0,
          discountPercentage: updatedProduct.discountPercentage || 0,
        }
        console.log('Dispatching update:', productWithDefaults)
        dispatch(updateCreatedProduct(productWithDefaults))
        toast.success('Product updated successfully')
      } else {
        console.log('Creating product:', productData)
        const newProduct = await productApi.createProduct(productData)
        console.log('API response:', newProduct)
        
        // Ensure the new product has proper structure
        const productWithDefaults = {
          ...newProduct,
          thumbnail: newProduct.thumbnail || '',
          images: newProduct.images || [],
          rating: newProduct.rating || 0,
          discountPercentage: newProduct.discountPercentage || 0,
        }
        console.log('Dispatching add:', productWithDefaults)
        dispatch(addCreatedProduct(productWithDefaults))
        toast.success('Product created successfully')
      }

      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/')
      }
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error(`Failed to ${productId ? 'update' : 'create'} product`)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-2xl border-2">
      <CardHeader className="pb-4 sm:pb-6">
        <CardTitle className="text-2xl sm:text-3xl font-bold">
          {productId ? 'Edit Product' : 'Create New Product'}
        </CardTitle>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          {productId ? 'Update your product information' : 'Fill in the details to add a new product'}
        </p>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <Label htmlFor="title" className="text-base font-semibold">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="mt-2 h-11"
              placeholder="Enter product title"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-base font-semibold">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows={4}
              className="mt-2"
              placeholder="Describe your product"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-sm sm:text-base font-semibold">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
                className="mt-2 h-11"
                placeholder="0.00"
              />
            </div>

            <div>
              <Label htmlFor="stock" className="text-sm sm:text-base font-semibold">Stock *</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                required
                className="mt-2 h-11"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="brand" className="text-sm sm:text-base font-semibold">Brand</Label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              className="mt-2 h-11"
              placeholder="Enter brand name (optional)"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-sm sm:text-base font-semibold">Category *</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
              className="mt-2 h-11"
              placeholder="e.g., electronics, clothing, etc."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
            <Button 
              type="submit" 
              disabled={loading} 
              className="flex-1 h-11 sm:h-12 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                  {productId ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                productId ? 'Update Product' : 'Create Product'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="h-11 sm:h-12 px-6 sm:px-8 font-semibold shadow-md"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

