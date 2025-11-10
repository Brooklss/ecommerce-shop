import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/types/product'

interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

const getInitialState = (): CartState => {
  return { items: [], total: 0 }
}

const initialState: CartState = getInitialState()

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.product.id === action.payload.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ product: action.payload, quantity: 1 })
      }
      
      state.total = calculateTotal(state.items)
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items))
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload)
      state.total = calculateTotal(state.items)
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items))
      }
    },
    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const item = state.items.find(item => item.product.id === action.payload.productId)
      if (item) {
        item.quantity = action.payload.quantity
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.product.id !== action.payload.productId)
        }
      }
      state.total = calculateTotal(state.items)
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items))
      }
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart')
      }
    },
    initializeCart: (state) => {
      if (typeof window === 'undefined') return
      
      try {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          state.items = JSON.parse(savedCart)
          state.total = calculateTotal(state.items)
        }
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error)
      }
    },
  },
})

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  initializeCart 
} = cartSlice.actions
export default cartSlice.reducer
