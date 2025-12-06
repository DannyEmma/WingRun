'use client'

import 'swiper/css'
import 'swiper/css/navigation'
import styles from './SneakersSlider.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import SneakerItem from '@/components/features/sneaker/SneakerItem/SneakerItem'
import ActionLink from '@/components/ui/ActionLink/ActionLink'
import { ProductWithBrand } from '@/lib/types/_internals/product'

export default function SneakersSlider({ title, sneakers }: { title: string; sneakers: ProductWithBrand[] | null }) {
  return (
    <div className={styles['sneakers-slider']}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <ActionLink>Voir tout</ActionLink>
      </div>

      <Swiper className={styles['swiper']} spaceBetween={32} slidesPerView={5.5} slidesPerGroup={5} modules={[Navigation]} navigation>
        {sneakers?.map((sneaker, index) => (
          <SwiperSlide key={index}>
            <SneakerItem data={sneaker} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
