'use client'

import { useAppSelector } from '@/store/hooks'
import ProductCard from '@/components/ProductCard'
import { Heart } from 'lucide-react'

export default function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites.products)

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="p-2 sm:p-3 bg-red-50 dark:bg-red-950 rounded-xl">
          <Heart className="h-6 w-6 sm:h-8 sm:w-8 fill-red-500 text-red-500" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold">My Favorites</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12 sm:py-20">
          <div className="p-4 sm:p-6 bg-muted/50 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
            <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">No favorites yet</h2>
          <p className="text-sm sm:text-lg text-muted-foreground mb-4 sm:mb-6 px-4">
            Start adding products to your favorites collection
          </p>
          <a href="/">
            <button className="px-5 py-2.5 sm:px-6 sm:py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all">
              Browse Products
            </button>
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

