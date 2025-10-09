import Link from 'next/link'
import styles from './SneakerItem.module.css'
import Image from 'next/image'

interface SneakerItemProps extends React.HTMLAttributes<HTMLDivElement> {
  sneaker: any
}

export default function SneakerItem({ sneaker, className }: SneakerItemProps) {
  const variant = sneaker.variant ? sneaker.variant : ''
  const name = sneaker.line + ' ' + sneaker.model + ' ' + variant
  const price = sneaker.price_cents / 100
  const displayPrice = price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
  const colorway = '"' + sneaker.colorway + '"'
  const slug = `${sneaker.line}-${sneaker.model}-${variant !== '' ? variant + '-' : ''}${sneaker.colorway}-${sneaker.id}`
  const path = `/${sneaker.brand}/${slug.replaceAll(' ', '-')}`

  return (
    <div className={`${styles['sneaker-item']} ${className}`}>
      <Link href={path.toLowerCase()}>
        <div className={styles['image-container']}>
          <Image src="/pictures/jordan/air-jordan-4.webp" alt="Sneaker item" fill />
        </div>
        <div className={styles.description}>
          <p className={styles.brand}>{sneaker.brand}</p>

          <p className={styles.name}>
            {name}
            <br />
            {colorway}
          </p>

          <p className={styles.price}>{displayPrice}</p>
        </div>
      </Link>
    </div>
  )
}
