import axios from 'axios'
import { Product, ProductsResponse } from '@/types/product'

const API_BASE_URL = 'https://dummyjson.com'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const productApi = {
  // Get all products with pagination
  getProducts: async (limit = 10, skip = 0): Promise<ProductsResponse> => {
    const response = await api.get(`/products?limit=${limit}&skip=${skip}`)
    return response.data
  },

  // Search products
  searchProducts: async (query: string): Promise<ProductsResponse> => {
    const response = await api.get(`/products/search?q=${query}`)
    return response.data
  },

  // Get product by ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    const response = await api.get('/products/categories')
    return response.data
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<ProductsResponse> => {
    const response = await api.get(`/products/category/${category}`)
    return response.data
  },

  // Create product
  createProduct: async (product: Partial<Product>): Promise<Product> => {
    const response = await api.post('/products/add', product)
    return response.data
  },

  // Update product
  updateProduct: async (id: number, product: Partial<Product>): Promise<Product> => {
    const response = await api.put(`/products/${id}`, product)
    return response.data
  },

  // Delete product
  deleteProduct: async (id: number): Promise<Product> => {
    const response = await api.delete(`/products/${id}`)
    return response.data
  },
}

export default api

