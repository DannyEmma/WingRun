import Link from 'next/link'
import styles from './SneakerItem.module.css'
import Image from 'next/image'
import { ProductWithBrand } from '@/lib/types/product'
import { BASE_URL_PRODUCT_IMAGE } from '@/lib/constants'
import { getFullname } from '@/utils/product'
import { CartItem } from '@/lib/types'

interface SneakerItemProps {
  variant?: 'standard' | 'search' | 'payment'
  data: ProductWithBrand | CartItem
  highlight?: (text: string) => React.JSX.Element | string
  searchQuery?: string
}

function isCartItem(data: ProductWithBrand | CartItem): data is CartItem {
  return 'quantity' in data
}

export default function SneakerItem({ variant = 'standard', data, highlight }: SneakerItemProps) {
  //---------- VARIANT: "payment" ----------//
  if (isCartItem(data)) {
    const price = data.product.price / 100
    const displayPrice = price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
    const imageSrc = BASE_URL_PRODUCT_IMAGE + '/' + data.product.image

    return (
      <div className={`${styles['sneaker-item']} ${styles[variant + '-variant']}`}>
        <div className={styles['left-part']}>
          <div className={styles['image-container']} style={{ backgroundImage: `url(${imageSrc})` }}>
            <div className={styles['quantity-indicator']}>{data.quantity}</div>
          </div>
          <div className={styles.description}>
            <p className={styles.name}>{getFullname(data.product)} </p>
            {/* <p className={styles.size}>{data.product.colorFilter.name}</p> */}
            <p className={styles.size}>{data.size}</p>
          </div>
        </div>
        <div className={styles['right-part']}>
          <p className={styles.price}>{displayPrice}</p>
        </div>
      </div>
    )
  }

  const sneaker = data
  const price = sneaker.price / 100
  const displayPrice = price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })

  let displayName = []
  if (variant === 'search' && sneaker.brand.name !== 'JORDAN') displayName.push(highlight!(sneaker.brand.name.toLowerCase()))
  if (sneaker.line) displayName.push(variant === 'search' ? highlight!(sneaker.line) : sneaker.line + ' ')
  if (sneaker.model) displayName.push(variant === 'search' ? highlight!(sneaker.model) : sneaker.model + ' ')
  if (sneaker.edition) displayName.push(variant === 'search' ? highlight!(sneaker.edition) : sneaker.edition + ' ')

  let displayColorway: React.JSX.Element | string = variant === 'search' ? highlight!(sneaker.colorway) : sneaker.colorway

  let slug = ''
  if (sneaker.line) slug += sneaker.line + '-'
  if (sneaker.model) slug += sneaker.model + '-'
  if (sneaker.edition) slug += sneaker.edition + '-'
  if (sneaker.colorway) slug += sneaker.colorway + '-'
  slug += sneaker.id

  const path = `/products/${slug.replaceAll(' ', '-')}`
  const imageSrc = BASE_URL_PRODUCT_IMAGE + '/' + sneaker.image

  //---------- VARIANT: "search" ----------//
  if (variant === 'search') {
    const path = `/products/${slug.replaceAll(' ', '-')}`

    return (
      <Link href={path.toLowerCase()}>
        <div className={`${styles['sneaker-item']} ${styles[variant + '-variant']}`}>
          <div className={styles['image-container']}>
            <Image src={imageSrc} alt="Sneaker item" fill />
          </div>
          <div className={styles.description}>
            <p className={styles.name}>
              {displayName.map((value, index) => (
                <span key={index}>{value}&nbsp;</span>
              ))}
              <br />
              {displayColorway}
            </p>
          </div>
        </div>
      </Link>
    )
  }

  //---------- VARIANT: "standard" ----------//
  return (
    <Link href={path.toLowerCase()}>
      <div className={`${styles['sneaker-item']}`}>
        <div className={styles['image-container']}>
          <Image src={imageSrc} alt="Sneaker item" fill />
        </div>
        <div className={styles.description}>
          <p className={styles.brand}>{sneaker.brand.name.replaceAll('_', ' ')}</p>

          <p className={styles.name}>
            {displayName}
            <br />
            {'"' + sneaker.colorway + '"'}
          </p>

          <p className={styles.price}>{displayPrice}</p>
        </div>
      </div>
    </Link>
  )
}
