'use client'

import Image from "next/image"
import { useCartStore } from "@/store"
import formatPrice from "@/util/PriceFormat"
import {IoAddCircle, IoRemoveCircle} from 'react-icons/io5'
import emptyCart from '@/public/emptyCart.png'

// The physical cart UI
export default function Cart() {
  const cartStore = useCartStore()
  // console.log(cartStore.isOpen)
  // console.log(cartStore)

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount * item.quantity
    console.log(item)
  }, 0)
  // 0 is starting value

  return (
    <div 
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      {/* stopPropgation stops the click event from above */}
      <div onClick={(e) => e.stopPropagation()} className="bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-gray-70">
        <h1>Shopping Cart 🛒</h1>
        {cartStore.cart.map((item) => (
          <div className="flex py-4 gap-4">
            <Image
              className="rounded-md h-24 w-24" 
              src={item.image} 
              alt={item.name} 
              width={120} 
              height={120}
            />
            <div>
              <h2>{item.name}</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => 
                    cartStore.removeProduct({
                      id: item.id, 
                      image: item.image, 
                      name: item.name, 
                      unit_amount: item.unit_amount, 
                      quantity: item.quantity
                    })
                  }
                >
                  <IoRemoveCircle />
                </button>
                <h2>{item.quantity}</h2>
                <button 
                  onClick={() => 
                    cartStore.addProduct({
                      id: item.id, 
                      image: item.image, 
                      name: item.name, 
                      unit_amount: item.unit_amount, 
                      quantity: item.quantity
                    })
                  }
                >
                  <IoAddCircle />
                </button>
              </div>
              <p className="text-sm">{item.unit_amount && formatPrice(item.unit_amount)}</p>
            </div>
          </div>
        ))}
        {/* checkout and total */}
        {cartStore.cart.length >= 1 && (
          <p>Total: {formatPrice(totalPrice)}</p>
        )} 
        {cartStore.cart.length > 0 && (
          <button className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white">
            Checkout 
          </button>
        )}
        {!cartStore.cart.length && (
          <div className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75">
            <h1>Shopping cart is empty...😢</h1>
            <Image src={emptyCart} alt='image of empty shopping cart' width={200} height={200}/>
          </div>
        )}
      </div>
      
    </div>
  )
}
