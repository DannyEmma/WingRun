import styles from './HomePage.module.css'
import EmailVerificationToast from '@/components/providers/EmailVerificationToast/EmailVerificationToast'
import SneakersSlider from '@/components/features/sneaker/SneakersSlider/SneakersSlider'
import Hero from '@/components/features/home/Hero/Hero'
import BrandPanel from '@/components/features/home/BrandPanel/BrandPanel'
import { MAX_SLIDER_PRODUCTS } from '@/lib/constants'
import { service } from '@/lib/services'

export default async function HomePage() {
  const [bestSellers, ourPicks, newArrivals, populars] = await Promise.all([
    service.product.getProductsByTag('BEST_SELLER', MAX_SLIDER_PRODUCTS).then((res) => res.data),
    service.product.getProductsByTag('OUR_PICK', MAX_SLIDER_PRODUCTS).then((res) => res.data),
    service.product.getProductsByTag('NEW_ARRIVAL', MAX_SLIDER_PRODUCTS).then((res) => res.data),
    service.product.getProductsByTag('POPULAR', MAX_SLIDER_PRODUCTS).then((res) => res.data),
  ])

  return (
    <>
      <EmailVerificationToast />
      <Hero />
      <main className={styles['main']}>
        <div className={styles['sneakers-slider-container']}>
          <SneakersSlider title="Meilleurs ventes" sneakers={bestSellers} />
          <SneakersSlider title="Notre sélection" sneakers={ourPicks} />
          <SneakersSlider title="Nouveautés" sneakers={newArrivals} />
          <BrandPanel />
          <SneakersSlider title="Populaires" sneakers={populars} />
        </div>
      </main>
    </>
  )
}
