'use client'

import { useEffect, useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './Visualizer.module.css'
import Image from 'next/image'
import { BASE_URL_PRODUCT_IMAGE } from '@/lib/constants'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperType from 'swiper'

interface VisualizerProps {
  images: string[]
  initialSlide: number
  setShowVisualizer: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Visualizer({ images, initialSlide, setShowVisualizer }: VisualizerProps) {
  const imagesRefs = useRef<Array<HTMLImageElement>>([])
  const [activeIndex, setActiveIndex] = useState(initialSlide)
  const [isZoomIn, setIsZoomIn] = useState(false)

  //---------- EVENTS HANDLERS ----------//
  const zoomIn = () => {
    const currentImage = imagesRefs.current[activeIndex]

    currentImage.style.transform = 'scale(1.5)'
    currentImage.style.cursor = 'zoom-out'
    setIsZoomIn(true)
  }
  const zoomOut = () => {
    const currentImage = imagesRefs.current[activeIndex]

    currentImage.style.transform = 'scale(1)'
    currentImage.style.cursor = 'zoom-in'
    setIsZoomIn(false)
  }
  //---------- EVENTS HANDLERS ----------//
  const handleSlideChange = (swiper: SwiperType) => {
    //-- Reset Zoom --
    zoomOut()

    setActiveIndex(swiper.activeIndex)
  }
  const handleClose = () => setShowVisualizer(false)

  const handleZoom = () => (isZoomIn ? zoomOut() : zoomIn())

  return (
    <Swiper className={styles['visualizer']} modules={[Navigation]} navigation initialSlide={initialSlide} onSlideChange={handleSlideChange}>
      {/* //-- Close button -- */}
      <button type="button" onClick={handleClose} className={styles['close-button']}>
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L13 13M13 1L1 13" stroke="#514e49" strokeWidth="1.33333" strokeLinecap="round" />
        </svg>
      </button>

      {/* //-- List of images -- */}
      {images.map((src, index) => (
        <SwiperSlide className={styles['swiper-slide']}>
          <div key={index} className={styles['image-container']}>
            <Image
              ref={(el) => {
                if (el) imagesRefs.current[index] = el
              }}
              onClick={handleZoom}
              className={styles['image']}
              src={BASE_URL_PRODUCT_IMAGE + '/' + src}
              alt="Preview Image"
              fill
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
