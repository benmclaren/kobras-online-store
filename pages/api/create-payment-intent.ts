// This is for connecting the items in the cart with a stripe payment

import Stripe from "stripe"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"
import { AddCartType } from "@/types/AddCartType"
import { PrismaClient } from "@prisma/client"

// 1. IMPORTING STRIPE AND PRISMA
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
})

const prisma = new PrismaClient()

// 2. CALCULATES THE TOTAL VALUE OF THE ITEMS IN THE CART
const calculateOrderAmount = (items: AddCartType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!
  }, 0)
  return totalPrice
} 

// 3. CHECKING IF USER IS LOGGGED IN OR NOT
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  // check if user is here
  const userSession = await getServerSession(req, res, authOptions)
  // if user is not logged in displays error message and text
  if(!userSession?.user){
    res.status(403).json({message: 'Not logged in'})
    return
  }
  // if they are logged in then we extract data from the body
  // 4. EXTRACTING THE DATA. ITEMS IS WHAT IS CURRENTLY IN CART AND PAYMENT_INTENT_ID IS EMPTY STRINGS
  const { items, payment_intent_id } = req.body

  // 5. Create the order data. this is all Prisma code 
  const orderData = {
    user: {connect: {id: userSession.user?.id}},
    amount: calculateOrderAmount(items),
    currency: 'gbp',
    status: 'pending',
    // comes from req.body
    paymentIntentId: payment_intent_id,
    products: {
      create: items.map((item) => ({
        name: item.name,
        description: item.description,
        unit_amount: item.unit_amount,
        image: item.image,
        quantity: item.quantity
      })),
    },
  }

  // Check if payment intent exists just update the order. First time it wotn exist so it goes to the else section to generate a new order
  if(payment_intent_id){
    const currentIntent = await stripe.paymentIntents.retrieve(payment_intent_id)
    // if it exists then find it and update the amount. This is the sitatuion where a user has left the checkout and added more items and then come back
    if (currentIntent) {
      const updatedIntent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: calculateOrderAmount(items) } 
      )
      // fetch order with product ids
      const existing_order = await prisma.order.findFirst({
        where: { paymentIntendId: updatedIntent.id },
        include: { products: true }
      })
      if(!existing_order){
        res.status(400).json({ message: 'Invalid Payment Intent' })
      }
      // update existing order. Effectively delete everything that was there and re add it all including the new items the user has now added
      const updated_order = await prisma.order.update({
        where: {id: existing_order?.id!},
        data: {
          amount: calculateOrderAmount(items),
          products: {
            deleteMany: {},
            create: items.map((item) => ({
              name: item.name,
              description: item.description,
              unit_amount: item.unit_amount,
              image: item.image,
              quantity: item.quantity 
            })),
          },
        },
      })
      res.status(200).json({paymentIntent: updatedIntent})
      return
    }
  } else {
    // Create a new order with prisma if one does not already exist
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "gbp",
      automatic_payment_methods: { enabled: true }
    })
    // assigning the orderData to the new payment intent
    orderData.paymentIntentId = payment_intent_id
    const newOrder = await prisma.order.create({
      data: orderData
    })
  }

  
  // successful sending pack the paymen intent id to frontend
  res.status(200).json({ payment_intent_id})
  return
}
