import Link from 'next/link'
import styles from './SneakerItem.module.css'
import Image from 'next/image'
import { audienceToCategory } from '@/utils/audience'
import { Audience } from '@prisma/client'

interface SneakerItemProps {
  variant?: 'standard' | 'search'
  sneaker: any
  category?: string
  highlight?: (text: string) => React.JSX.Element | string
  searchQuery?: string
}

export default function SneakerItem({ variant = 'standard', sneaker, category, highlight }: SneakerItemProps) {
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

  const path = `/${category}/products/${slug.replaceAll(' ', '-')}`
  const imageSrc = '/images/products/' + sneaker.image

  //---------- VARIANT: "search" ----------//
  if (variant === 'search') {
    const category = audienceToCategory[sneaker.audience as Audience]
    const path = `/${category}/products/${slug.replaceAll(' ', '-')}`

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
