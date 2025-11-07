import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/types/product'

interface FavoritesState {
  products: Product[]
}

const initialState: FavoritesState = {
  products: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Product>) => {
      const exists = state.products.find(p => p.id === action.payload.id)
      if (!exists) {
        state.products.push(action.payload)
        if (typeof window !== 'undefined') {
          localStorage.setItem('favorites', JSON.stringify(state.products))
        }
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload)
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state.products))
      }
    },
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const exists = state.products.find(p => p.id === action.payload.id)
      if (exists) {
        state.products = state.products.filter(p => p.id !== action.payload.id)
      } else {
        state.products.push(action.payload)
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state.products))
      }
    },
    initializeFavorites: (state) => {
      // Only run on client-side
      if (typeof window === 'undefined') return
      
      try {
        const saved = localStorage.getItem('favorites')
        if (saved) {
          state.products = JSON.parse(saved)
        }
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error)
      }
    },
  },
})

export const { addFavorite, removeFavorite, toggleFavorite, initializeFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer

