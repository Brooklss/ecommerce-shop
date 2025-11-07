'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Edit, Crown } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Product } from '@/types/product'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { toggleFavorite } from '@/store/favoritesSlice'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.favorites.products)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const createdProductIds = useAppSelector((state) => state.userProducts.createdProductIds)
  const createdProducts = useAppSelector((state) => state.userProducts.createdProducts)
  const isFavorite = favorites.some((p) => p.id === product.id)
  const isOwned = createdProductIds.includes(product.id) || createdProducts.some(p => p.id === product.id)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleFavorite(product))
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites')
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/product/${product.id}/edit`)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 group">
        <CardHeader className="p-0 relative overflow-hidden">
          <div className="relative w-full h-48 bg-muted">
            {product.thumbnail ? (
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">No Image</p>
                </div>
              </div>
            )}
            {isOwned && (
              <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-lg">
                <Crown className="h-3.5 w-3.5" />
                Your Product
              </div>
            )}
            <div className="absolute top-3 right-3 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg hover:scale-110 transition-transform"
                onClick={handleToggleFavorite}
              >
                <Heart
                  className={cn(
                    'h-5 w-5 transition-colors',
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'
                  )}
                />
              </Button>
              {isAuthenticated && isOwned && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg hover:scale-110 transition-transform"
                  onClick={handleEdit}
                >
                  <Edit className="h-5 w-5 text-blue-600" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-5">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 capitalize font-medium px-2 py-1 bg-muted rounded-md inline-block">
            {product.category}
          </p>
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl font-bold text-primary">${product.price}</span>
            <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950 px-2 py-1 rounded-md">
              <span className="text-sm">⭐</span>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{product.rating}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="p-5 pt-0">
          <Button className="w-full shadow-md hover:shadow-lg transition-all group-hover:scale-105" variant="default">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

