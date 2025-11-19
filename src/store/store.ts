import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './favoritesSlice'
import themeReducer from './themeSlice'
import authReducer from './authSlice'
import cartReducer from './cartSlice'
import userProductsReducer from './userProductsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
      theme: themeReducer,
      auth: authReducer,
      cart: cartReducer,
      userProducts: userProductsReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

