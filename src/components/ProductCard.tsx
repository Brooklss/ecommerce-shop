'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Product } from '@/types/product'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { toggleFavorite } from '@/store/favoritesSlice'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.favorites.products)
  const isFavorite = favorites.some((p) => p.id === product.id)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleFavorite(product))
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites')
  }

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
        <CardHeader className="p-0 relative">
          <div className="relative w-full h-48 bg-muted">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover rounded-t-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 hover:bg-background"
              onClick={handleToggleFavorite}
            >
              <Heart
                className={cn(
                  'h-5 w-5',
                  isFavorite ? 'fill-red-500 text-red-500' : ''
                )}
              />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {product.category}
          </p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold">${product.price}</span>
            <div className="flex items-center gap-1">
              <span className="text-sm">⭐</span>
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" variant="outline">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

