'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice'
import { toast } from 'sonner'

export default function CartPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart.items)
  const total = useAppSelector((state) => state.cart.total)

  const handleRemove = (productId: number, title: string) => {
    dispatch(removeFromCart(productId))
    toast.success(`Removed ${title} from cart`)
  }

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    dispatch(updateQuantity({ productId, quantity: newQuantity }))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    toast.success('Cart cleared')
  }

  const handleCheckout = () => {
    toast.success('Checkout feature coming soon!')
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven&apos;t added anything to your cart yet
          </p>
          <Button onClick={() => router.push('/')} size="lg">
            Start Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Continue Shopping
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700"
            >
              Clear Cart
            </Button>
          </div>

          {cart.map(({ product, quantity }) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    {product.thumbnail ? (
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                        <ShoppingBag className="h-8 w-8 text-primary" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 
                          className="font-semibold text-lg truncate cursor-pointer hover:text-primary"
                          onClick={() => router.push(`/product/${product.id}`)}
                        >
                          {product.title}
                        </h3>
                        <p className="text-sm text-muted-foreground capitalize">
                          {product.category}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemove(product.id, product.title)}
                        className="flex-shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleUpdateQuantity(product.id, quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-semibold w-8 text-center">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleUpdateQuantity(product.id, quantity + 1)}
                          disabled={quantity >= product.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        {quantity >= product.stock && (
                          <span className="text-xs text-red-600 ml-2">
                            Max stock reached
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">
                          ${(product.price * quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ${product.price} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(total * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold">
                    ${(total * 1.1).toFixed(2)}
                  </span>
                </div>
                <Button 
                  className="w-full h-12 text-lg font-semibold" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>

              <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <ShoppingBag className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Free shipping on all orders</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Easy returns within 30 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
