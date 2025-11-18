'use client'

import 'swiper/css'
import 'swiper/css/navigation'
import styles from './SneakersSlider.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import SneakerItem from '@/components/features/sneaker/SneakerItem/SneakerItem'
import Button from '@/components/ui/Button/Button'
import { ProductWithBrand } from '@/lib/types/product'

export default function SneakersSlider({ title, sneakers }: { title: string; sneakers: ProductWithBrand[] }) {
  return (
    <div className={styles['sneakers-slider']}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Button variant="link">Voir tout</Button>
      </div>

      <Swiper className={styles['swiper']} spaceBetween={32} slidesPerView={5.5} slidesPerGroup={5} modules={[Navigation]} navigation>
        {sneakers.map((sneaker, index) => (
          <SwiperSlide key={index}>
            <SneakerItem sneaker={sneaker} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
