'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { initializeAuth } from '@/store/authSlice'
import { initializeUserProducts } from '@/store/userProductsSlice'
import { initializeFavorites } from '@/store/favoritesSlice'

export default function AuthInitializer() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAuth())
    dispatch(initializeUserProducts())
    dispatch(initializeFavorites())
  }, [dispatch])

  return null
}

