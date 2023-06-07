'use client'

import Image from "next/image"
import { useCartStore } from "@/store"
import formatPrice from "@/util/PriceFormat"

// The physical cart UI
export default function Cart() {
  const cartStore = useCartStore()
  // console.log(cartStore.isOpen)
  // console.log(cartStore)

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
              <h2>x {item.quantity}</h2>
              <p className="text-sm">{item.unit_amount && formatPrice(item.unit_amount)}</p>
            </div>
          </div>
        ))}
        <button className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white">
          Checkout 
        </button>
      </div>
      
    </div>
  )
}
