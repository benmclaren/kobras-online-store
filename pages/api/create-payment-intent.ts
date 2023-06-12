import Stripe from "stripe"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
})

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

  res.status(200).json({ userSession })
  return 

  // data necessary for the order
  const orderData = {
    user: {connect: {id: userSession.user?.id!}},

  }
}
