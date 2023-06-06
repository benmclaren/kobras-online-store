import {create} from 'zustand'
import { persist } from 'zustand/middleware'

// shopping cart using zustand state management 

type CartItem = {
  name: string,
  id: string,
  images?: string[],
  description?: string,
  unit_amount: number,
  quantity: number
}

type CartState = {
  isOpen: boolean
  cart: CartItem[]
  toggleCart: () => void
}

export const useCartStore = create<CartState>() (
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      // modify isOpen to be opposite of what it is. Toggles true and false
      toggleCart: () => set((state) => ({isOpen: !state.isOpen})),
    }),
    { name: "cart-store" }
  )
)
