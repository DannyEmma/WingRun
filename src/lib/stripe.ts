import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) throw new Error("Missing env variable STRIPE_SECRET_KEY")

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-02-25.clover",
  typescript: true,
})
