'use client'

import SizeGuide from '@/components/features/article/SizeGuide/SizeGuide'
import styles from './SizePicker.module.css'
import Button from '@/components/ui/Button/Button'
import { Size } from '@/lib/types'

interface SizePickerProps {
  sizes: Size[]
  sizesStock: any[]
  selectedSize: Size | null
  setSelectedSize: React.Dispatch<React.SetStateAction<Size | null>>
}

export default function SizePicker({ sizes, sizesStock, selectedSize, setSelectedSize }: SizePickerProps) {
  return (
    <>
      <div className={styles['sizes-picker']}>
        <div className={styles['header']}>
          <p className={styles['title']}>Taille</p>
          <SizeGuide trigger={<Button variant="link">Guide des tailles</Button>} />
        </div>

        <div className={styles['list']}>
          {sizes.map((size, index) => (
            <div
              key={index}
              onClick={() => sizesStock.includes(size.size) && setSelectedSize(size)}
              className={`${styles['size']} ${!sizesStock.includes(size.size) && styles['disabled']} ${selectedSize && selectedSize.size === size.size ? styles['selected'] : ''}`}
            >
              {size.size}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
