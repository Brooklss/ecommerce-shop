'use client'

import { useAppSelector } from '@/store/hooks'
import ProductCard from '@/components/ProductCard'
import { Heart } from 'lucide-react'

export default function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites.products)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Heart className="h-6 w-6 fill-red-500 text-red-500" />
        <h1 className="text-3xl font-bold">Favorites</h1>
        <span className="text-muted-foreground">({favorites.length})</span>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-lg">
            No favorite products yet
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Start adding products to your favorites
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

