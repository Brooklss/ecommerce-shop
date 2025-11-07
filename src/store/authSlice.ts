import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types/auth'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

const getInitialAuthState = (): AuthState => {
  // Always return default state for server-side rendering
  // State will be hydrated from localStorage in initializeAuth action
  return {
    user: null,
    isAuthenticated: false,
  }
}

const initialState: AuthState = getInitialAuthState()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload))
      }
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user')
      }
    },
    initializeAuth: (state) => {
      // Only run on client-side
      if (typeof window === 'undefined') return
      
      try {
        const userStr = localStorage.getItem('user')
        if (userStr) {
          const user = JSON.parse(userStr)
          state.user = user
          state.isAuthenticated = true
        }
      } catch (error) {
        console.error('Error parsing user from localStorage:', error)
      }
    },
  },
})

export const { login, logout, initializeAuth } = authSlice.actions
export default authSlice.reducer
