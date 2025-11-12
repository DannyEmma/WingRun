'use client'

import Image from 'next/image'
import { BASE_URL_PRODUCT_IMAGE } from '@/lib/constants'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './Visualizer.module.css'

// import required modules
import { Navigation } from 'swiper/modules'

interface VisualizerProps {
  images: string[]
}

export default function Visualizer({ images }: VisualizerProps) {
  return (
    <Swiper className={styles.visualizer} modules={[Navigation]} navigation>
      {images.map((src, index) => (
        <SwiperSlide key={index} className={styles['swiper-slide']}>
          <div className={styles['image-container']}>
            <Image className={styles['image']} src={BASE_URL_PRODUCT_IMAGE + src} alt="Preview Image" fill />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
