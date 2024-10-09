import { create } from 'zustand'
import { type Products } from '../types'
import { persist } from 'zustand/middleware'

interface State {
  products: Products[]
  currentPage: number
  fetchProducts: (limit: number) => Promise<void>
}

export const useProductsStore = create<State>()(persist((set) => {
  return {
    products: [],
    currentPage: 1,

    
    fetchProducts: async (limit: number) => {
      const res = await fetch('https://fakestoreapi.com/products/')
      const json = await res.json()

      const products = json.slice(0, limit)
      set({products})
    }
  } 
}, {
  name: 'products',
}))
 