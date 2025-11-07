'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, Moon, Sun, ShoppingBag, User, LogOut, Package, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { toggleTheme } from '@/store/themeSlice'
import { logout } from '@/store/authSlice'
import { clearCreatedProducts } from '@/store/userProductsSlice'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.favorites.products)
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const user = useAppSelector((state) => state.auth.user)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearCreatedProducts())
    setMobileMenuOpen(false)
    router.push('/login')
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group" onClick={() => setMobileMenuOpen(false)}>
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              eCommerce
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link href="/">
              <Button
                variant={pathname === '/' ? 'default' : 'ghost'}
                size="sm"
                className="font-medium"
              >
                Products
              </Button>
            </Link>

            {isAuthenticated && (
              <Link href="/my-products">
                <Button
                  variant={pathname === '/my-products' ? 'default' : 'ghost'}
                  size="sm"
                  className="font-medium"
                >
                  <Package className="h-4 w-4 mr-2" />
                  My Products
                </Button>
              </Link>
            )}

            <Link href="/favorites" className="relative">
              <Button
                variant={pathname === '/favorites' ? 'default' : 'ghost'}
                size="sm"
                className="relative font-medium"
              >
                <Heart className="h-4 w-4 mr-2" />
                Favorites
                {favorites.length > 0 && (
                  <span className="ml-2 rounded-full bg-red-500 text-white px-2 py-0.5 text-xs font-bold shadow-lg">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <>
                <Link href="/product/create">
                  <Button variant="outline" size="sm" className="font-medium shadow-sm hover:shadow-md transition-shadow">
                    Create Product
                  </Button>
                </Link>
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-primary/10 rounded-lg">
                  <div className="p-1 bg-primary/20 rounded-full">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold">{user?.username}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm" className="font-medium shadow-sm hover:shadow-md transition-shadow">
                  Login
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleTheme())}
              className="ml-2"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleTheme())}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t py-4 space-y-2 animate-in slide-in-from-top-2">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant={pathname === '/' ? 'default' : 'ghost'}
                className="w-full justify-start font-medium"
              >
                Products
              </Button>
            </Link>

            {isAuthenticated && (
              <Link href="/my-products" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={pathname === '/my-products' ? 'default' : 'ghost'}
                  className="w-full justify-start font-medium"
                >
                  <Package className="h-4 w-4 mr-2" />
                  My Products
                </Button>
              </Link>
            )}

            <Link href="/favorites" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant={pathname === '/favorites' ? 'default' : 'ghost'}
                className="w-full justify-start font-medium relative"
              >
                <Heart className="h-4 w-4 mr-2" />
                Favorites
                {favorites.length > 0 && (
                  <span className="ml-2 rounded-full bg-red-500 text-white px-2 py-0.5 text-xs font-bold">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <>
                <Link href="/product/create" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start font-medium">
                    Create Product
                  </Button>
                </Link>
                <div className="flex items-center space-x-2 px-4 py-3 bg-primary/10 rounded-lg">
                  <div className="p-1 bg-primary/20 rounded-full">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold">{user?.username}</span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout} 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start font-medium">
                  Login
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

