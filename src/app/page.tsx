import styles from './HomePage.module.css'
import EmailVerificationToast from '@/components/providers/EmailVerificationToast/EmailVerificationToast'
import SneakersSlider from '@/components/features/sneaker/SneakersSlider/SneakersSlider'
import Hero from '@/components/features/home/Hero/Hero'
import { ProductTag } from '@prisma/client'
import ProductService from '@/lib/services/product'
import { ProductWithBrand } from '@/lib/types/product'
import BrandPanel from '@/components/features/home/BrandPanel/BrandPanel'

export default async function HomePage() {
  const sneakers: Record<ProductTag, ProductWithBrand[]> = { BEST_SELLER: [], OUR_PICK: [], NEW_ARRIVAL: [], POPULAR: [] }

  sneakers.BEST_SELLER = (await ProductService.getSliderProductsWithBrandByTag('BEST_SELLER')).data
  sneakers.OUR_PICK = (await ProductService.getSliderProductsWithBrandByTag('OUR_PICK')).data
  sneakers.NEW_ARRIVAL = (await ProductService.getSliderProductsWithBrandByTag('NEW_ARRIVAL')).data
  sneakers.POPULAR = (await ProductService.getSliderProductsWithBrandByTag('POPULAR')).data

  return (
    <>
      <EmailVerificationToast />
      <Hero />
      <main className={styles['main']}>
        <div className={styles['sneakers-slider-container']}>
          <SneakersSlider title="Meilleurs ventes" sneakers={sneakers.BEST_SELLER} />
          <SneakersSlider title="Notre sélection" sneakers={sneakers.OUR_PICK} />
          <SneakersSlider title="Nouveautés" sneakers={sneakers.NEW_ARRIVAL} />
          <BrandPanel />
          <SneakersSlider title="Populaires" sneakers={sneakers.POPULAR} />
        </div>
      </main>
    </>
  )
}
