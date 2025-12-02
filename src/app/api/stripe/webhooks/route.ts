import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'
import { headers } from 'next/headers'
import { CartItem } from '@/lib/types'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = (await headers()).get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Stripe signature missing' }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    // console.error('Erreur webhook:', err.message)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Payment successful
  if (event.type === 'checkout.session.completed') {
    const checkoutSession = event.data.object

    if (!checkoutSession.metadata) return

    const { userId, productsData } = checkoutSession.metadata

    const order = await prisma.order.create({
      data: {
        user: {
          connect: { id: userId },
        },
        totalAmountCent: checkoutSession.amount_total ?? 0,
        status: 'PAID',
        stripeSessionId: checkoutSession.id,
        stripePaymentId: checkoutSession.payment_intent as string,
        paymentMethod: '**** 42 42',
        transactionId: checkoutSession.payment_intent as string,
        items: {
          create: JSON.parse(productsData).map((data: any) => ({
            quantity: data.q,
            priceCent: data.p,
            product: { connect: { id: data.i } },
            size: { connect: { id: data.s } },
          })),
        },
      },
    })
  }

  return NextResponse.json({ received: true })
}
