import Link from 'next/link'
import styles from './SneakerItem.module.css'
import Image from 'next/image'

interface SneakerItemProps {
  sneaker: any
}

export default function SneakerItem({ sneaker }: SneakerItemProps) {
  const price = sneaker.price / 100
  const displayPrice = price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
  let displayName = ''
  if (sneaker.line) displayName += sneaker.line + ' '
  if (sneaker.model) displayName += sneaker.model + ' '
  if (sneaker.edition) displayName += sneaker.edition

  let slug = ''
  if (sneaker.line) slug += sneaker.line + '-'
  if (sneaker.model) slug += sneaker.model + '-'
  if (sneaker.edition) slug += sneaker.edition + '-'
  if (sneaker.colorway) slug += sneaker.colorway + '-'
  slug += sneaker.id

  const path = `/products/${slug.replaceAll(' ', '-')}`
  const imageSrc = '/images/products/' + sneaker.image

  return (
    <div className={`${styles['sneaker-item']}`}>
      <Link href={path.toLowerCase()}>
        <div className={styles['image-container']}>
          <Image src={imageSrc} alt="Sneaker item" fill />
        </div>
        <div className={styles.description}>
          <p className={styles.brand}>{sneaker.brand}</p>

          <p className={styles.name}>
            {displayName}
            <br />
            {'"' + sneaker.colorway + '"'}
          </p>

          <p className={styles.price}>{displayPrice}</p>
        </div>
      </Link>
    </div>
  )
}
