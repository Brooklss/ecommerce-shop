import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/types/product'

interface UserProductsState {
  createdProductIds: number[]
  createdProducts: Product[]
}

const getInitialState = (): UserProductsState => {
  // Always return default state for server-side rendering
  // State will be hydrated from localStorage in initializeUserProducts action
  return { createdProductIds: [], createdProducts: [] }
}

const initialState: UserProductsState = getInitialState()

const userProductsSlice = createSlice({
  name: 'userProducts',
  initialState,
  reducers: {
    addCreatedProduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload
      const existingIndex = state.createdProducts.findIndex(p => p.id === product.id)
      
      if (existingIndex !== -1) {
        // Update existing product
        state.createdProducts[existingIndex] = product
      } else {
        // Add new product
        state.createdProductIds.push(product.id)
        state.createdProducts.push(product)
      }
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('userCreatedProducts', JSON.stringify(state.createdProductIds))
        localStorage.setItem('userCreatedProductsData', JSON.stringify(state.createdProducts))
      }
    },
    updateCreatedProduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload
      const index = state.createdProducts.findIndex(p => p.id === product.id)
      if (index !== -1) {
        // Update existing product
        state.createdProducts[index] = product
      } else {
        // Product not found, add it (fallback for edge cases)
        if (!state.createdProductIds.includes(product.id)) {
          state.createdProductIds.push(product.id)
        }
        state.createdProducts.push(product)
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('userCreatedProducts', JSON.stringify(state.createdProductIds))
        localStorage.setItem('userCreatedProductsData', JSON.stringify(state.createdProducts))
      }
    },
    removeCreatedProduct: (state, action: PayloadAction<number>) => {
      state.createdProductIds = state.createdProductIds.filter(id => id !== action.payload)
      state.createdProducts = state.createdProducts.filter(p => p.id !== action.payload)
      if (typeof window !== 'undefined') {
        localStorage.setItem('userCreatedProducts', JSON.stringify(state.createdProductIds))
        localStorage.setItem('userCreatedProductsData', JSON.stringify(state.createdProducts))
      }
    },
    clearCreatedProducts: (state) => {
      state.createdProductIds = []
      state.createdProducts = []
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userCreatedProducts')
        localStorage.removeItem('userCreatedProductsData')
      }
    },
    initializeUserProducts: (state) => {
      // Only run on client-side
      if (typeof window === 'undefined') return
      
      try {
        const savedIds = localStorage.getItem('userCreatedProducts')
        const savedProducts = localStorage.getItem('userCreatedProductsData')
        state.createdProductIds = savedIds ? JSON.parse(savedIds) : []
        state.createdProducts = savedProducts ? JSON.parse(savedProducts) : []
      } catch (error) {
        console.error('Error parsing user products from localStorage:', error)
      }
    },
  },
})

export const { 
  addCreatedProduct, 
  updateCreatedProduct,
  removeCreatedProduct, 
  clearCreatedProducts, 
  initializeUserProducts 
} = userProductsSlice.actions
export default userProductsSlice.reducer
