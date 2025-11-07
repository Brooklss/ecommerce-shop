'use client'

import { useAppSelector } from '@/store/hooks'
import ProductCard from '@/components/ProductCard'
import { Package, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function MyProductsPage() {
  const router = useRouter()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const user = useAppSelector((state) => state.auth.user)
  const createdProducts = useAppSelector((state) => state.userProducts.createdProducts)

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
            <Package className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold">My Products</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Manage your {createdProducts.length} {createdProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>
        </div>
        <Button 
          onClick={() => router.push('/product/create')}
          size="lg"
          className="shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span className="hidden sm:inline">Create New Product</span>
          <span className="sm:hidden">Create Product</span>
        </Button>
      </div>

      {createdProducts.length === 0 ? (
        <div className="text-center py-12 sm:py-20">
          <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-full w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
            <Package className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 px-4">No products yet</h2>
          <p className="text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto px-4">
            Start building your catalog by creating your first product
          </p>
          <Button 
            onClick={() => router.push('/product/create')}
            size="lg"
            className="shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Your First Product
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border-2 border-blue-200 dark:border-blue-800">
            <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
              <strong>💡 Tip:</strong> Click on any product card to view details. Use the edit button to make changes or delete products you no longer need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {createdProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
