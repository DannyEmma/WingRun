'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './ShoppingCart.module.css'
import Button from '@/components/ui/Button/Button'
import Image from 'next/image'
import { BASE_URL_PRODUCT_IMAGE } from '@/lib/constants'
import { CartItem } from '@/lib/types'
import { useShoppingCartStore } from '@/lib/stores/shopping-cart.store'
import { useRouter } from 'next/navigation'
import { getFormattedPrice, getFullname } from '@/utils/product'

export default function ShoppingCart() {
  const router = useRouter()
  const cartRef = useRef<HTMLDivElement>(null)
  const cartContainerRef = useRef<HTMLDivElement>(null)
  // const [open, setOpen] = useState(false)
  const cart = useShoppingCartStore((state) => state.cart)
  const isOpen = useShoppingCartStore((state) => state.isOpen)
  const setCartOpen = useShoppingCartStore((state) => state.setCartOpen)
  const removeCartItem = useShoppingCartStore((state) => state.remove)
  const incrementQuantity = useShoppingCartStore((state) => state.incrementQuantity)
  const decrementQuantity = useShoppingCartStore((state) => state.decrementQuantity)
  const totalAmount = useShoppingCartStore((state) => state.totalAmount)

  //----------  METHODS----------//
  const renderItem = (cartItem: CartItem, index: number) => {
    const fullname = getFullname({ line: cartItem.product.line, model: cartItem.product.model, edition: cartItem.product.edition, colorway: cartItem.product.colorway })
    const formattedPrice = getFormattedPrice(cartItem.product.price)

    return (
      <React.Fragment key={index}>
        <div className={styles['item']}>
          <div className={styles['item-image-container']}>
            <Image src={BASE_URL_PRODUCT_IMAGE + '/' + cartItem.product.image} alt="Sneaker Image" fill />
          </div>

          <div className={styles['details-container']}>
            <p className={styles['item-name']}>{fullname}</p>
            <p className={styles['item-price']}>{formattedPrice}</p>
            <p className={styles['item-color']}>Couleur: {cartItem.product.colorFilter.color}</p>
            <p className={styles['item-size']}>Taille: {cartItem.size}</p>
            <div className={styles['actions-container']}>
              <div className={styles['quantity-container']}>
                <button onClick={() => decrementQuantity(cartItem.id)} type="button" className={styles['quantity-less']}>
                  -
                </button>

                <output className={styles['quantity']}>{cartItem.quantity}</output>

                <button onClick={() => incrementQuantity(cartItem.id)} type="button" className={styles['quantity-more']}>
                  +
                </button>
              </div>
              <Button onClick={() => handleRemoveCartItem(cartItem.id)} variant="link">
                Supprimer
              </Button>
            </div>
          </div>
        </div>

        <div className={styles['item-separator']}></div>
      </React.Fragment>
    )
  }

  //---------- EVENTS HANDLERS ----------//
  const handleRemoveCartItem = (cartItemID: string) => removeCartItem(cartItemID)

  //---------- USE EFFECT ----------//
  useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (e.target !== cartRef.current && !cartRef.current?.contains(e.target as Node)) {
        setCartOpen(false)
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      cartContainerRef.current?.addEventListener('click', handleClickOutside)
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => cartContainerRef.current?.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  //---------- RENDER ----------//
  return (
    <>
      {/* //---------- TRIGGER ----------// */}
      <button onClick={() => setCartOpen(true)} className={styles['trigger']} type="button">
        <svg className={styles['cart-icon']} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.28305 5H4.14659C2.93858 5 2.3355 5 1.90712 5.265C1.52985 5.498 1.23993 5.865 1.08846 6.304C0.916554 6.803 1.01505 7.444 1.21391 8.724V8.726L2.08089 14.326C2.22864 15.276 2.30205 15.751 2.52228 16.108C2.71742 16.422 2.98968 16.67 3.30934 16.825C3.67175 17 4.11964 17 5.0145 17H12.9855C13.8804 17 14.3273 17 14.6907 16.825C15.0103 16.67 15.2835 16.422 15.4777 16.108C15.698 15.751 15.7714 15.276 15.9182 14.326L16.7861 8.726V8.722C16.9849 7.442 17.0834 6.802 16.9115 6.304C16.7603 5.8654 16.4709 5.49775 16.0938 5.265C15.6654 5 15.0614 5 13.8534 5H12.717M5.28305 5H12.717M5.28305 5C5.28305 3.93913 5.67465 2.92172 6.37172 2.17157C7.06878 1.42143 8.0142 1 9 1C9.9858 1 10.9312 1.42143 11.6283 2.17157C12.3253 2.92172 12.717 3.93913 12.717 5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* //---------- SHOPPING CART ----------// */}
      {isOpen && (
        <div ref={cartContainerRef} className={styles['shopping-cart-container']}>
          <div ref={cartRef} className={styles['shopping-cart']}>
            {/* //---------- HEADER ----------// */}
            <div className={styles['header']}>
              <p className={styles['title']}>
                Votre panier <span>{cart.length ? `(${cart.length})` : ''}</span>
              </p>
              <button onClick={() => setCartOpen(false)} className={styles['close']}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.666992 0.666687L12.667 12.6667M12.667 0.666687L0.666992 12.6667" stroke="#514E49" strokeWidth="1.33333" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* //---------- CONTENT ----------// */}
            <div className={styles['content']}>
              {cart.length ? (
                cart.map((item, index) => renderItem(item, index))
              ) : (
                <div className={styles['no-data']}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.28305 5H4.14659C2.93858 5 2.3355 5 1.90712 5.265C1.52985 5.498 1.23993 5.865 1.08846 6.304C0.916554 6.803 1.01505 7.444 1.21391 8.724V8.726L2.08089 14.326C2.22864 15.276 2.30205 15.751 2.52228 16.108C2.71742 16.422 2.98968 16.67 3.30934 16.825C3.67175 17 4.11964 17 5.0145 17H12.9855C13.8804 17 14.3273 17 14.6907 16.825C15.0103 16.67 15.2835 16.422 15.4777 16.108C15.698 15.751 15.7714 15.276 15.9182 14.326L16.7861 8.726V8.722C16.9849 7.442 17.0834 6.802 16.9115 6.304C16.7603 5.8654 16.4709 5.49775 16.0938 5.265C15.6654 5 15.0614 5 13.8534 5H12.717M5.28305 5H12.717M5.28305 5C5.28305 3.93913 5.67465 2.92172 6.37172 2.17157C7.06878 1.42143 8.0142 1 9 1C9.9858 1 10.9312 1.42143 11.6283 2.17157C12.3253 2.92172 12.717 3.93913 12.717 5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p>Votre panier est vide</p>

                  <Button
                    onClick={() => {
                      router.push('/')
                      setCartOpen(false)
                    }}
                    variant="cta-primary"
                    fit
                  >
                    Décourvrir la boutique
                  </Button>
                </div>
              )}
            </div>
            {/* //---------- FOOTER ----------// */}
            {cart.length > 0 && (
              <div className={styles['footer']}>
                <div className={styles['price-info-container']}>
                  <p className={styles['price-info-title']}>Montant total TTC</p>
                  <p className={styles['price']}>{getFormattedPrice(totalAmount())}</p>
                </div>
                <Button variant="cta-primary">
                  <svg className={styles['cart-icon']} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.28305 5H4.14659C2.93858 5 2.3355 5 1.90712 5.265C1.52985 5.498 1.23993 5.865 1.08846 6.304C0.916554 6.803 1.01505 7.444 1.21391 8.724V8.726L2.08089 14.326C2.22864 15.276 2.30205 15.751 2.52228 16.108C2.71742 16.422 2.98968 16.67 3.30934 16.825C3.67175 17 4.11964 17 5.0145 17H12.9855C13.8804 17 14.3273 17 14.6907 16.825C15.0103 16.67 15.2835 16.422 15.4777 16.108C15.698 15.751 15.7714 15.276 15.9182 14.326L16.7861 8.726V8.722C16.9849 7.442 17.0834 6.802 16.9115 6.304C16.7603 5.8654 16.4709 5.49775 16.0938 5.265C15.6654 5 15.0614 5 13.8534 5H12.717M5.28305 5H12.717M5.28305 5C5.28305 3.93913 5.67465 2.92172 6.37172 2.17157C7.06878 1.42143 8.0142 1 9 1C9.9858 1 10.9312 1.42143 11.6283 2.17157C12.3253 2.92172 12.717 3.93913 12.717 5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className={styles['shopping-button-title']}>Passer à la caisse</p>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
