import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { CartItem } from '@/lib/types'
import { BASE_URL_PRODUCT_IMAGE } from '@/lib/constants'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { service } from '@/lib/services'
import { util } from '@/lib/utils'

interface CheckoutRequestBody {
  cart: CartItem[]
}

export async function POST(request: NextRequest) {
  try {
    const { cart } = (await request.json()) as CheckoutRequestBody

    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return

    const { data: user, error } = await service.user.getUser(session.user.id)
    if (!user) return

    const userDefaultAdress = user.addresses.find((adress) => adress.isDefault)

    const customer = await stripe.customers.create({
      email: user.email,
      ...(userDefaultAdress && {
        shipping: {
          name: userDefaultAdress.firstname + ' ' + userDefaultAdress.lastname,
          address: {
            line1: userDefaultAdress.address,
            line2: userDefaultAdress.address_2 ?? undefined,
            city: userDefaultAdress.city,
            postal_code: userDefaultAdress.cp,
            country: userDefaultAdress.destination.code_iso,
          },
        },
      }),
    })

    // Create the stripe checkout session
    const chekoutSession = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: cart.map((cartItem: CartItem) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: util.product.getFullname(cartItem.product),
            images: [`${process.env.NEXT_PUBLIC_BASE_URL}${BASE_URL_PRODUCT_IMAGE}/${cartItem.product.image}`],
          },
          unit_amount: cartItem.product.price,
        },
        quantity: cartItem.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/successful?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      shipping_address_collection: {
        allowed_countries: ['FR', 'RE', 'GP', 'MQ', 'YT', 'GF'],
      },
      billing_address_collection: 'required',
      metadata: {
        userId: user.id,
        productsData: JSON.stringify(cart.map((item) => ({ i: item.product.id, s: item.size.id, q: item.quantity, p: item.product.price }))), // We use letters keys because stripe have a char limit at 500
      },
    })

    return NextResponse.json({ chekoutSession })
  } catch (error: any) {
    // console.error('Erreur checkout:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
