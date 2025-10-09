import Image from 'next/image'
import styles from './Hero.module.css'
import Button from '@/components/ui/Button/Button'

export default function Hero() {
  return (
    <div className={styles['hero']}>
      <Image src="/images/hero/hero3.jpg" alt="hero image" width={3000} height={2000} />

      <div className={styles['hero-content']}>
        <div className={styles['title-container']}>
          <p className={styles['brand']}>Jordan</p>
          <p className={styles['fullname']}>
            Air jordan 10 <br />
            "steel"
          </p>
        </div>
        <Button variant="cta-secondary" fit>
          Découvrir la paire
        </Button>
      </div>
    </div>
  )
}
