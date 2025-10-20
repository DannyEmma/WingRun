import Link from 'next/link'
import styles from './SneakerItem.module.css'
import Image from 'next/image'

interface SneakerItemProps extends React.HTMLAttributes<HTMLDivElement> {
  sneaker: any
}

export default function SneakerItem({ sneaker, className }: SneakerItemProps) {
  const edition = sneaker.edition ? sneaker.edition : ''
  const name = sneaker.line + ' ' + sneaker.model + ' ' + edition
  const price = sneaker.price / 100
  const displayPrice = price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
  const colorway = '"' + sneaker.colorway + '"'
  const slug = `${sneaker.line}-${sneaker.model}-${edition !== '' ? edition + '-' : ''}${sneaker.colorway}-${sneaker.id}`
  const path = `/${sneaker.brand}/${slug.replaceAll(' ', '-')}`
  const imageSrc = '/images/products/' + sneaker.image

  return (
    <div className={`${styles['sneaker-item']} ${className}`}>
      <Link href={path.toLowerCase()}>
        <div className={styles['image-container']}>
          <Image src={imageSrc} alt="Sneaker item" fill />
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
