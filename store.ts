import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import { AddCartType } from './types/AddCartType'

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
  clearCart: () => void
  addProduct: (item: CartItem) => void
  removeProduct: (item: CartItem) => void
  paymentIntent: string
  setPaymentIntent: (val:string) => void
  onCheckout: string
  setCheckout: (val:string) => void
}

export const useCartStore = create<CartState>() (
  // telling zustand the data we want to have. Using the persist and set functions
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      paymentIntent: "",
      // this is for when you click on the checkout button and want to render a different component
      onCheckout: "cart",
      // modify isOpen to be opposite of what it is. Toggles true and false
      toggleCart: () => set((state) => ({isOpen: !state.isOpen})),
      addProduct: (item) => set((state) => {
        // finding if the item exists in the cart already. Because if item already exists we just want to add to it not replace
        const existingItem = state.cart.find(cartItem => cartItem.id === item.id )
        if (existingItem) {
          const updatedCart = state.cart.map((cartItem) => {
            if(cartItem.id === item.id){
              return {...cartItem, quantity: cartItem.quantity +1}
            }
            return cartItem
          })
          return {cart: updatedCart}
        } else{
          // keep cart as it was and add an item with a quantity of 1 to it
          return { cart: [...state.cart, {...item, quantity: 1 }] }
        }
      }),
      removeProduct: (item) => set((state) => {
        // cartItem.id is from the state and item.id is being passed down as props
        const existingItem = state.cart.find(cartItem => cartItem.id === item.id)
        // console.log(existingItem)
        if(existingItem && existingItem.quantity! > 1) {
          const updatedCart = state.cart.map((cartItem) => {
            if(cartItem.id === item.id){
              return {...cartItem, quantity: cartItem.quantity! -1}
            }
            return cartItem
          })
          return { cart: updatedCart}
        } else {
          // remove item from cart
          // filteredCart returns items thats id does not match the original id
          const filteredCart = state.cart.filter((cartItem) => cartItem.id !== item.id)
          // console.log(filteredCart)
          return { cart: filteredCart }
        }
      }),
      setPaymentIntent: (val) => set((state) => ({ ...state, paymentIntent: val })),
      setCheckout: (val) => set((state) => ({onCheckout: val})),
      // empities the cart when order is complete
      clearCart: () => set((state) => ({cart: []}))
    }),
    // custom name of the data
    { name: "cart-store" }
  )
)

type ThemeState = {
  mode: 'synthwave' | 'cyberpunk',
  toggleMode: (theme: "synthwave" | "cyberpunk") => void
}

export const useThemestore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'synthwave',
      toggleMode: (theme) => set((state) => ({mode: theme})),
    }),
    {name: 'theme-store'}
  )
)

