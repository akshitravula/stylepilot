import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types/product'

interface WishlistState {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearWishlist: () => void
  isWishlisted: (productId: string) => boolean
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const exists = get().items.some((i) => i.id === product.id)
        if (!exists) {
          set((state) => ({ items: [...state.items, product] }))
        }
      },

      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== productId) }))
      },

      clearWishlist: () => set({ items: [] }),

      isWishlisted: (productId) => get().items.some((i) => i.id === productId),
    }),
    {
      name: 'stylepilot-wishlist',
    }
  )
)
