'use client'

import { useShoppingCartStore } from '@/lib/stores/shopping-cart.store'
import styles from './ListSneakerPayment.module.css'
import SneakerItem from '@/components/features/sneaker/SneakerItem/SneakerItem'

export default function ListSneakerPayment() {
  const cart = useShoppingCartStore((state) => state.cart)

  return (
    <div className="list-sneaker-payment">
      {cart.map((cartItem, index) => (
        <SneakerItem key={index} variant="payment" data={cartItem} />
      ))}
    </div>
  )
}
