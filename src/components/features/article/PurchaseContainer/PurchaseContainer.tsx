'use client'

import PurchaseSection from '@/components/features/article/PurchaseSection/PurchaseSection'
import styles from './PurchaseContainer.module.css'
import SizePicker from '@/components/features/article/SizePicker/SizePicker'
import { useState } from 'react'
import { ProductCart } from '@/lib/types'

interface PurchaseContainer {
  sizes: string[]
  sizesStock: any[]
  sneaker: ProductCart
}

export default function PurchaseContainer({ sizes, sizesStock, sneaker }: PurchaseContainer) {
  const [selectedSize, setSelectedSize] = useState('')

  return (
    <>
      <SizePicker sizes={sizes} sizesStock={sizesStock} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />

      <hr className={styles['separator']} />

      <PurchaseSection selectedSize={selectedSize} sneaker={sneaker} />
    </>
  )
}
