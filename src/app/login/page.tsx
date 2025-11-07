'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useAppDispatch } from '@/store/hooks'
import { login } from '@/store/authSlice'
import { toast } from 'sonner'
import { Loader2, ShoppingBag } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)

      // Mock authentication - in a real app, this would call an API
      // For demo purposes, we'll accept any credentials
      if (formData.username && formData.password) {
        dispatch(
          login({
            id: 1,
            username: formData.username,
            email: `${formData.username}@example.com`,
          })
        )
        toast.success('Login successful!')
        router.push('/')
      } else {
        toast.error('Please enter username and password')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md shadow-2xl border-2">
        <CardHeader className="space-y-1 pb-4 sm:pb-6">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="p-3 sm:p-4 bg-primary/10 rounded-full">
              <ShoppingBag className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center text-sm sm:text-base">
            Enter your credentials to access your account
            <br />
            <span className="text-xs text-muted-foreground mt-2 block">
              (Demo: any credentials will work)
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <Label htmlFor="username" className="text-sm sm:text-base font-semibold">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
                placeholder="Enter your username"
                className="mt-2 h-10 sm:h-11"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm sm:text-base font-semibold">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                placeholder="Enter your password"
                className="mt-2 h-10 sm:h-11"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full h-10 sm:h-11 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

