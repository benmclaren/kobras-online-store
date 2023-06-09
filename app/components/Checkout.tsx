'use client'

import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useCartStore } from '@/store'
import { useState, useEffect } from 'react'

// need the NEXT>PUBLIC as we are rendering on client side.Not needed when server component
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CHeckout(){
  const cartStore = useCartStore()
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    // create a payment intent as soon as the page loads. Only one payment should be created so that you can return to same checkout after adding/removing items. By default stripe would create a new order everytime which we do not want
    fetch('/api/create-payment-intent', {
      method: "POST",
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        items: CartStore.cart,
        payment_intent_id: cartStore.paymentIntent,
      })
    })
  },[])
}
