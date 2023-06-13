// This is for connecting the items in the cart with a stripe payment

import Stripe from "stripe"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"
import { AddCartType } from "@/types/AddCartType"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
})

const calculateOrderAmount = (items: AddCartType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!
  }, 0)
  return totalPrice
} 

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  // check if user is here
  const userSession = await getServerSession(req, res, authOptions)
  // if user is not logged in displays error message and text
  if(!userSession?.user){
    res.status(403).json({message: 'Not logged in'})
    return
  }
  // if they are logged in then we extract data from the body
  const { items, payment_intent_id } = req.body

  // Create the order data. this is all Prisma code 
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
        quantity: item.quantity
      })),
    },
  }

  // successful
  res.status(200).json({ userSession })
  return 

}
