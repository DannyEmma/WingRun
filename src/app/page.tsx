import styles from './HomePage.module.css'
import EmailVerificationToast from '@/components/providers/EmailVerificationToast/EmailVerificationToast'
import SneakersSlider from '@/components/features/sneaker/SneakersSlider/SneakersSlider'
import Hero from '@/components/features/home/Hero/Hero'

export default async function HomePage() {
  const sneakers = Array(10).fill({
    id: 1234,
    brand: { name: 'Jordan' },
    audience: 'MEN',
    line: 'Air Jordan',
    model: '4',
    variant: null,
    colorway: 'Fear',
    year: null,
    price: 18900,
    image: '7f1c2879-8ce6-432c-871f-a0fc821ae402.webp',
  })

  return (
    <>
      <EmailVerificationToast />
      <Hero />
      <main className={styles['main']}>
        <div className={styles['sneakers-slider-container']}>
          <SneakersSlider title="Meilleurs ventes" sneakers={sneakers} />
        </div>
      </main>
    </>
  )
}
