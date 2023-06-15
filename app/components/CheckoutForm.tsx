'use client'

import { useState, useEffect } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import formatPrice from "@/util/PriceFormat"
import { useCartStore } from "@/store"
// import totalPrice from "@/util/TotalPrice"
import { spawn } from "child_process"

export default function CheckoutForm({clientSecret}: {clientSecret: string}){
  
  const stripe = useStripe()
  const elements =useElements()
  const [isLoading, setIsLoading] = useState(false)
  const cartStore = useCartStore()
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!
  }, 0)
  const formattedPrice = formatPrice(totalPrice)
  
  useEffect(() => {
    // if there is no stripe then return 
    if(!stripe) {
      return
    }
    // if no client secret then user cannot finish payment
    if(!clientSecret) {
      return
    }
    // dependency array. if stripe loads a bit later it will re-render the useEffect
  }, [stripe])

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    if(!stripe || !elements){
      return
    }
    setIsLoading(true)

    stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    })
    .then((result) => {
      if (!result.error) {
        cartStore.setCheckout("success")
      }
      setIsLoading(false)
    })
  }

  return(
    <form onSubmit={handleSubmit} id="payment-form">
      <PaymentElement id="payment-element" options={{layout:"tabs"}}/>
      <h1>Total: {formattedPrice}</h1>
      <button id="submit" disabled={isLoading || !stripe || !elements}>
        <span id="button-text">
          {isLoading ? <span>Processing...👀</span> : <span>pay now 💸</span>}
        </span>
      </button>
    </form>
  )
}
