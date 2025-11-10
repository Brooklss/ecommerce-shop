'use client'

import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
            <span>by</span>
            <span className="font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Brook
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold">Bcommerce</span> © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  )
}
