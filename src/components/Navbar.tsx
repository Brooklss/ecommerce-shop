'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, Moon, Sun, ShoppingBag, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { toggleTheme } from '@/store/themeSlice'
import { logout } from '@/store/authSlice'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.favorites.products)
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const user = useAppSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    router.push('/login')
  }

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xl font-bold">eCommerce Shop</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button
                variant={pathname === '/' ? 'default' : 'ghost'}
                size="sm"
              >
                Products
              </Button>
            </Link>

            <Link href="/favorites" className="relative">
              <Button
                variant={pathname === '/favorites' ? 'default' : 'ghost'}
                size="sm"
                className="relative"
              >
                <Heart className="h-4 w-4 mr-2" />
                Favorites
                {favorites.length > 0 && (
                  <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <>
                <Link href="/product/create">
                  <Button variant="outline" size="sm">
                    Create Product
                  </Button>
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user?.username}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            )}

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
          </div>
        </div>
      </div>
    </nav>
  )
}

