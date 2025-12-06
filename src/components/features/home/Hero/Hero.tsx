import Image from 'next/image'
import styles from './Hero.module.css'
import Button from '@/components/ui/ActionLink/ActionLink'
import CTA from '@/components/ui/CTA/CTA'

export default function Hero() {
  return (
    <div className={styles['hero']}>
      <Image src="/images/hero/home.webp" alt="hero image" width={2000} height={680} />

      <div className={styles['hero-content']}>
        <div className={styles['title-container']}>
          <p className={styles['brand']}>Jordan</p>

          <p className={styles['fullname']}>
            Air jordan 10 <br />
            "steel"
          </p>
        </div>

        <div className={styles['cta-container']}>
          <CTA variant="secondary" href="/products/air-jordan-10-steel-20">
            Découvrir la paire
          </CTA>
        </div>
      </div>
    </div>
  )
}
