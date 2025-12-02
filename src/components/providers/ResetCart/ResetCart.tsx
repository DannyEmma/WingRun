'use client'

import { useShoppingCartStore } from '@/lib/stores/shopping-cart.store'
import { useEffect } from 'react'

export default function ResetCart() {
  const removeAll = useShoppingCartStore((state) => state.removeAll)

  useEffect(() => removeAll(), [])

  return null
}
