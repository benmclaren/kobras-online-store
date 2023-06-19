'use client'

import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useCartStore } from '@/store'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CheckoutForm  from './CheckoutForm'
import OrderAnimation from './OrderAnimation'

// need the NEXT_PUBLIC as we are rendering on client side.Not needed when server component
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout(){
  const cartStore = useCartStore()
  // clientSecret is a key unique to the individual
  const [clientSecret, setClientSecret] = useState("")
  const router = useRouter()

  useEffect(() => {
    // create a payment intent as soon as the page loads. Only one payment should be created so that you can return to same checkout after adding/removing items. By default stripe would create a new order everytime which we do not want
    fetch('/api/create-payment-intent', {
      method: "POST",
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent_id: cartStore.paymentIntent,
      }),
    }).then((res) => {
      // this is where client secret and payment intent associated with it will go
      console.log(res)
      if(res.status === 403){
        return router.push('/api/auth/signin')
      }
      return res.json()
    }).then((data) => {
      setClientSecret(data.paymentIntent.client_secret)
      cartStore.setPaymentIntent(data.paymentIntent.id)
    })
  },[])


const options: StripeElementsOptions = {
  clientSecret,
  appearance: {
    theme: "flat",
    labels: "floating",
  },
}

  // client secret needed to authorise tranaction
  return (
    <div>
      {!clientSecret && <OrderAnimation/>}
      {  clientSecret && (
        <div>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret}/>
          </Elements>
        </div>
      )}
    </div>
  )
}
