import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";


// set up for stripe webhook
export const config ={
  api: {
    bodyParser: false
  }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
})

const prisma = new PrismaClient()

export default async function handler(req:NextApiRequest, res:NextApiResponse){
  const buf = await buffer(req)
  const sig = req.headers["stripe-signature"]

  if(!sig){
    return res.status(400).send('Missing the stripe signature')
  }

  let event: Stripe.Event

  try{
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch(err) {
    return res.status(400).send("Webhook error" + err)
  }
} 
