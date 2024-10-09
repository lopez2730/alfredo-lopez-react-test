import { create } from 'zustand';
import { Product, type Products } from '../types';
import { persist } from 'zustand/middleware';
import confetti from 'canvas-confetti'

interface State {
  products: Products[];
  currentPage: number;
  fetchProducts: (limit: number) => Promise<void>;
  addProduct: (newProduct: Product) => void;
  deleteProduct: (title: string) => void;
  editProduct: (title: string, updatedProduct: Product) => void;
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
    },

    addProduct: (newProduct: Product) => {
      confetti()
      set((state) => ({
        products: [...state.products, newProduct],
      }))
    },

    deleteProduct: (title: string) => set((state) => ({
      products: state.products.filter(product => product.title !== title),
    })),

    editProduct: (title: string, updatedProduct: Product) =>
      set((state) => ({
        products: state.products.map((product) =>
          product.title === title && product.isNew
            ? { ...product, ...updatedProduct }
            : product
        ),
      })),

  } 
}, {
  name: 'products',
}))
 