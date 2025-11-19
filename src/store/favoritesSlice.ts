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
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload)
    },
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const exists = state.products.find(p => p.id === action.payload.id)
      if (exists) {
        state.products = state.products.filter(p => p.id !== action.payload.id)
      } else {
        state.products.push(action.payload)
      }
    },
  },
})

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer

