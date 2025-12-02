'use client'

import Button from '@/components/ui/Button/Button'
import styles from './PurchaseSection.module.css'
import { useShoppingCartStore } from '@/lib/stores/shopping-cart.store'
import Image from 'next/image'
import { ProductCart, Size } from '@/lib/types'

interface PurchaseSection {
  sneaker: ProductCart
  selectedSize: Size | null
}

export default function PurchaseSection({ sneaker, selectedSize }: PurchaseSection) {
  const addIntoShoppingCart = useShoppingCartStore((state) => state.add)
  const setCartOpen = useShoppingCartStore((state) => state.setCartOpen)

  //---------- EVENTS HANDLERS ----------//
  const handleAddToCart = () => {
    if (selectedSize) {
      addIntoShoppingCart({ id: crypto.randomUUID(), quantity: 1, product: sneaker, size: selectedSize })
      setCartOpen(true)
    }
  }

  return (
    <div className={styles['purchase-section']}>
      <Button onClick={handleAddToCart} variant="cta-primary" disabled={!selectedSize}>
        Ajouter au panier
      </Button>

      <div className={styles['reassurance-container']}>
        <div className={styles['payement-icons-container']}>
          <Image src="/images/ui/icons/paypal-icon.png" alt="Paypal Icon" width={50} height={50} />
          <Image src="/images/ui/icons/visa-icon.png" alt="Visa Icon" width={50} height={50} />
          <Image src="/images/ui/icons/mastercard-icon.png" alt="MasterCard Icon" width={50} height={50} />
        </div>
        <p>Paiement 100% sécurisé par PayPal, Visa, Mastercard.</p>
      </div>
    </div>
  )
}
