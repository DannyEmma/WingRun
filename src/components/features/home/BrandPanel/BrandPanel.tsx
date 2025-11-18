import Image from 'next/image'
import styles from './BrandPanel.module.css'
import { BASE_URL_BRAND_IMAGE } from '@/lib/constants'

export default function BrandPanel() {
  return (
    <div className={styles['brand-panel']}>
      <h2 className={styles['title']}>Nos marques</h2>

      <div className={styles['brand-container']}>
        <div className={styles['brand-item']}>
          <div className={styles['image-container']}>
            <Image src={`${BASE_URL_BRAND_IMAGE}/nike.jpg`} alt="Brand Image" fill />
          </div>
          <p className={styles['image-title']}>Nike</p>
        </div>

        <div className={styles['brand-item']}>
          <div className={styles['image-container']}>
            <Image src={`${BASE_URL_BRAND_IMAGE}/jordan.jpg`} alt="Brand Image" fill />
          </div>
          <p className={styles['image-title']}>Jordan</p>
        </div>

        <div className={styles['brand-item']}>
          <div className={styles['image-container']}>
            <Image src={`${BASE_URL_BRAND_IMAGE}/asics.jpg`} alt="Brand Image" fill />
          </div>
          <p className={styles['image-title']}>Asics</p>
        </div>

        <div className={styles['brand-item']}>
          <div className={styles['image-container']}>
            <Image src={`${BASE_URL_BRAND_IMAGE}/Adidas.jpg`} alt="Brand Image" fill />
          </div>
          <p className={styles['image-title']}>Adidas</p>
        </div>

        <div className={styles['brand-item']}>
          <div className={styles['image-container']}>
            <Image src={`${BASE_URL_BRAND_IMAGE}/new_balance.jpg`} alt="Brand Image" fill />
          </div>
          <p className={styles['image-title']}>New Balance</p>
        </div>
      </div>
    </div>
  )
}
