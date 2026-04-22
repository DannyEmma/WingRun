'use client'

import Image from 'next/image'
import Visualizer from '@/components/features/sneaker/Visualizer/Visualizer'
import { useEffect, useState } from 'react'
import { BASE_URL_PRODUCT_IMAGE } from '@/lib/constants'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import styles from './PreviewSneakers.module.css'

interface PreviewSneakersProps {
  images: string[]
}

export default function PreviewSneakers({ images }: PreviewSneakersProps) {
  const [showVisualizer, setShowVisualizer] = useState(false)
  const [startIndex, setStartIndex] = useState(0)
  // const [isMobile, setIsMobile] = useState(false)

  //---------- EVENTS HANDLERS ----------//
  const handleVisualizer = (index: number) => {
    setStartIndex(index)
    setShowVisualizer(true)
  }

  // //-- Need to know if is mobile --
  // useEffect(() => {
  //   //-- On mount --
  //   window.matchMedia('(max-width: 768px)').matches && setIsMobile(true)

  //   //-- On resize --
  //   const handleResize = () => (window.matchMedia('(max-width: 768px)').matches ? setIsMobile(true) : setIsMobile(false))
  //   window.addEventListener('resize', handleResize)

  //   return () => window.removeEventListener('resize', handleResize)
  // }, [])

  useEffect(() => {
    const body = document.querySelector('body')

    if (body) {
      if (showVisualizer) {
        body.style.overflow = 'hidden'
      } else {
        body.style.overflow = 'auto'
      }
    }
  }, [showVisualizer])

  return (
    <div className={styles['preview-sneakers']}>
      {showVisualizer && <Visualizer images={images} initialSlide={startIndex} setShowVisualizer={setShowVisualizer} />}

      {/* //---------- DESKTOP PREVIEW ----------// */}
      <div className={styles['preview-desktop']}>
        {/* //----------- MAIN PICTURE -----------// */}
        <div className={styles['preview-image-container']}>
          <Image onClick={() => handleVisualizer(0)} className={styles['primary-image']} src={BASE_URL_PRODUCT_IMAGE + images[0]} width={2424} height={1885} alt="Preview Image" />
        </div>

        {/* //----------- PICTURES GRID -----------// */}
        <div className={styles['preview-grid']}>
          {images.map((src, index) => {
            if (index !== 0)
              return (
                <div key={index} className={styles['preview-image-container']}>
                  <Image onClick={() => handleVisualizer(index)} className={styles['image']} src={BASE_URL_PRODUCT_IMAGE + src} width={2424} height={1885} alt="Preview Image" />
                </div>
              )
          })}
        </div>
      </div>

      {/* //---------- MOBILE PREVIEW ----------// */}
      <div className={styles['preview-mobile']}>
        <Swiper
          className={styles['swiper']}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index} className={styles['swiper-slide']}>
              <div className={styles['preview-mobile-image-container']}>
                <Image onClick={() => handleVisualizer(index)} className={styles['image']} src={BASE_URL_PRODUCT_IMAGE + src} fill alt="Preview Image" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

// <SwiperSlide>Slide 1</SwiperSlide>
