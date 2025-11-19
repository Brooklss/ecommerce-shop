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
      <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 border-2 border-border/50 hover:border-primary/60 group bg-gradient-to-br from-card to-card/95 dark:from-card dark:to-card/90 overflow-hidden">
        <CardHeader className="p-0 relative overflow-hidden rounded-t-lg">
          <div className="relative w-full h-48 bg-gradient-to-br from-muted via-muted/80 to-muted/60">
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
              <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-xl border border-amber-300/30 backdrop-blur-sm animate-pulse">
                <Crown className="h-3.5 w-3.5" />
                Your Product
              </div>
            )}
            <div className="absolute top-3 right-3 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/95 hover:bg-white dark:bg-slate-900/95 dark:hover:bg-slate-900 backdrop-blur-md shadow-xl hover:shadow-2xl hover:scale-110 transition-all border border-white/20 dark:border-white/10"
                onClick={handleToggleFavorite}
              >
                <Heart
                  className={cn(
                    'h-5 w-5 transition-all',
                    isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-700 dark:text-gray-300'
                  )}
                />
              </Button>
              {isAuthenticated && isOwned && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/95 hover:bg-white dark:bg-slate-900/95 dark:hover:bg-slate-900 backdrop-blur-md shadow-xl hover:shadow-2xl hover:scale-110 transition-all border border-white/20 dark:border-white/10"
                  onClick={handleEdit}
                >
                  <Edit className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-5">
          <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-4 capitalize font-semibold px-3 py-1.5 bg-gradient-to-r from-primary/10 to-emerald-500/10 dark:from-primary/20 dark:to-emerald-500/20 rounded-lg inline-block border border-primary/20 dark:border-primary/30">
            {product.category}
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">${product.price}</span>
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 px-3 py-1.5 rounded-lg border border-amber-200/50 dark:border-amber-500/30 shadow-sm">
              <span className="text-sm">⭐</span>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{product.rating}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="p-5 pt-0">
          <Button className="w-full shadow-lg hover:shadow-xl transition-all group-hover:scale-105 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white font-semibold" variant="default">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

