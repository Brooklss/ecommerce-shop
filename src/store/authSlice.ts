import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types/auth'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

const getInitialAuthState = (): AuthState => {
  if (typeof window === 'undefined') {
    return {
      user: null,
      isAuthenticated: false,
    }
  }

  try {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      const user = JSON.parse(userStr)
      return {
        user,
        isAuthenticated: true,
      }
    }
  } catch (error) {
    console.error('Error parsing user from localStorage:', error)
  }

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
      const initial = getInitialAuthState()
      state.user = initial.user
      state.isAuthenticated = initial.isAuthenticated
    },
  },
})

export const { login, logout, initializeAuth } = authSlice.actions
export default authSlice.reducer
