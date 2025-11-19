'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { initializeAuth } from '@/store/authSlice'
import { initializeCart } from '@/store/cartSlice'
import { initializeUserProducts } from '@/store/userProductsSlice'

export default function AuthInitializer() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAuth())
    dispatch(initializeCart())
    dispatch(initializeUserProducts())
  }, [dispatch])

  return null
}

