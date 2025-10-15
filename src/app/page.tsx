import styles from './HomePage.module.css'
import EmailVerificationToast from '@/components/providers/EmailVerificationToast/EmailVerificationToast'
import SneakersSlider from '@/components/features/sneaker/SneakersSlider/SneakersSlider'
import Hero from '@/components/features/home/Hero/Hero'

export default async function HomePage() {
  const sneakers = Array(10).fill({
    id: 1234,
    brand: 'Jordan',
    line: 'Air Jordan',
    model: '4',
    variant: null,
    colorway: 'Cave Stone',
    year: null,
    price_cents: 20000,
  })

  return (
    <>
      <EmailVerificationToast />
      <Hero />
      <main className={styles['main']}>
        <div className={styles['sneakers-slider-container']}>
          <SneakersSlider title="Meilleurs ventes" sneakers={sneakers} />
          {/* <SneakersSlider title="Nouveautés" sneakers={sneakers} />
          <SneakersSlider title="Populaire" sneakers={sneakers} /> */}
        </div>
      </main>
    </>
  )
}
