'use client'

import SizeGuide from '@/components/features/article/SizeGuide/SizeGuide'
import styles from './SizePicker.module.css'
import Button from '@/components/ui/Button/Button'

interface SizePickerProps {
  sizes: string[]
  sizesStock: any[]
  selectedSize: string
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>
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
              onClick={() => sizesStock.includes(size) && setSelectedSize(size)}
              className={`${styles['size']} ${!sizesStock.includes(size) && styles['disabled']} ${selectedSize === size && styles['selected']}`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
